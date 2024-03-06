"use server";

import { redirect } from "next/navigation";

import { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { Database } from "@/lib/supabase/types";
import { Estimate } from "@/app/api/estimateBuy/route";
import { BN } from "@coral-xyz/anchor";
import { getTallyClob } from "@/lib/solana/program";
import { getManagerKeyPair } from "@/lib/solana/wallet";
import {
  getMarketPDA,
  getMarketPortfolioPDA,
  getUserPDA,
} from "@/lib/solana/pdas";
import { PublicKey } from "@solana/web3.js";
import { sendTransactions } from "@/lib/solana/transaction";
import { Holdings } from "@/lib/supabase/queries/holdings";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

type trade_status = Database["public"]["Enums"]["trade_status"];
type trade_side = Database["public"]["Enums"]["trade_side"];

export type SellErrorMessages = {
  text: string;
};

type SellErrors = {
  [key: number]: SellErrorMessages;
};

export type SellUseFormState =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors: SellErrors;
    }
  | null;

class SellFormError extends Error {
  errors: SellErrors;

  constructor(errors: SellErrors) {
    super("Form validation failed.");
    this.errors = errors;
  }
}

type FormattedSellFormData = {
  choice_market_id: string | undefined;
  shares: string | undefined;
};

function formatSellFormData(formData_: FormData): FormattedSellFormData[] {
  const formData: Record<
    number,
    { choice_market_id?: string; shares?: string }
  > = {};
  const formDataArr = [];
  for (const [key, value] of formData_.entries()) {
    formDataArr.push({
      choice_market_id: key,
      shares: value as string,
    });
  }
  return formDataArr;
}

function validateFormData(formData: FormattedSellFormData[]) {
  const errors = {} as SellErrors;
  for (const { choice_market_id, shares } of formData) {
    // Check if amount is 100,000,000 or more.
    if (shares && Number(shares) >= 100000000) {
      errors[Number(choice_market_id)] = {
        ...errors[Number(choice_market_id)],
        text: "Number too large. Must be <100,000,000.",
      };
    }
  }
  if (Object.keys(errors).length) {
    throw new SellFormError(errors);
  }
}

async function checkEnoughShares({
  supabase,
  formData_,
  userId,
}: {
  supabase: SupabaseClient;
  formData_: FormattedSellFormData[];
  userId: number;
}) {
  const holdings: Holdings[] = [];
  const errors = {} as SellErrors;
  for (const txn of formData_) {
    const { data, error } = await supabase
      .from("holdings")
      .select()
      .eq("user_id", userId)
      .eq("choice_market_id", Number(txn.choice_market_id));
    if (!data) {
      throw new Error("Insufficient shares.");
    }
    if (data[0]?.shares < Number(txn.shares)) {
      errors[Number(txn.choice_market_id)] = {
        text: "You do not have enough shares to sell.",
      };
    }
    holdings.push(data[0]);
  }
  if (Object.keys(errors).length) {
    throw new SellFormError(errors);
  }
  return holdings;
}

export async function validateSell(
  prevState: any,
  formData: FormData
): Promise<SellUseFormState> {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      throw Error("AuthError: User is not authenticated.");
    }
    const user = authUser
      ? await getUser({
          supabase: supabase,
          options: { userId: authUser.id },
        })
      : null;

    if (!user) {
      throw Error("AuthError: User is not authenticated.");
    }

    // format data
    let formData_ = formatSellFormData(formData);

    // check if form is valid
    validateFormData(formData_);

    // remove unfilled fields
    formData_ = formData_.filter((data) => data.shares !== "");

    // check that users have enough shares
    await checkEnoughShares({
      supabase: supabase,
      formData_: formData_,
      userId: user.id,
    });

    return {
      status: "success",
      message: "Order validated successfully.",
    };
  } catch (error) {
    if (error instanceof SellFormError) {
      const useFormState: SellUseFormState = {
        status: "error",
        message: "Form validation failed.",
        errors: error.errors,
      };
      return useFormState;
    }
    return {
      status: "error",
      message: "An error occurred while submitting your order.",
      errors: {},
    };
  }
}

export default async function submitSell(
  estimate: Estimate[] | null,
  formData: FormData
): Promise<SellUseFormState> {
  try {
    if (!estimate) {
      throw Error("No estimate provided. Please try again.");
    }

    const supabase = createServerSupabaseClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      throw Error("AuthError: User is not authenticated.");
    }
    const user = authUser
      ? await getUser({
          supabase: supabase,
          options: { userId: authUser.id },
        })
      : null;

    if (!user) {
      throw Error("AuthError: User is not authenticated.");
    }

    // format data
    let formData_ = formatSellFormData(formData);

    // check if form is valid
    validateFormData(formData_);

    // remove unfilled fields
    formData_ = formData_.filter((data) => data.shares !== "");

    const { data: subMarketData, error: subMarketError } = await supabase
      .from("sub_market_id")
      .select("prediction_market_id")
      .eq("id", estimate[0].subMarketId)
      .single();

    if (subMarketError) throw subMarketError;

    const { data: predictionMarketData, error: predictionMarketDataError } =
      await supabase
        .from("prediction_markets")
        .select("public_key")
        .eq("id", subMarketData.prediction_market_id)
        .single();

    if (predictionMarketDataError) throw predictionMarketDataError;
    if (!predictionMarketData.public_key)
      throw new Error("No public key found.");

    // check that users have enough shares
    await checkEnoughShares({
      supabase: supabase,
      formData_: formData_,
      userId: user.id,
    });

    const { data: balanceData, error: balancesError } = await supabase
      .from("user_balances")
      .select()
      .eq("user_id", user.id)
      .single();

    if (balancesError) {
      throw Error("Error fetching user balances.");
    }

    const sellOrders = estimate.map((values) => ({
      subMarketId: new BN(values.subMarketId),
      choiceId: new BN(values.choiceMarketId),
      amount: values.cumulativeDollars,
      requestedPricePerShare: values.avgPrice,
    }));

    // TODO: submit transaction to smart contract
    await submitToSmartContract({
      userWallet: balanceData.public_key,
      marketKey: predictionMarketData.public_key,
      sellOrders,
    });

    // group transactions together before POSTING
    const txns = [];
    for (const txn of estimate) {
      txns.push({
        user_id: user.id,
        choice_market_id: Number(txn.choiceMarketId),
        total_amount: txn.cumulativeDollars,
        shares: txn.cumulativeShares,
        avg_share_price: txn.avgPrice,
        trade_side: txn.tradeSide,
        status: "CONFIRMED" as trade_status,
        fees: txn.fees,
      });
    }

    const { data, error } = await supabase.from("orders").insert(txns).select();
  } catch (error: any) {
    if (error instanceof SellFormError) {
      const useFormState: SellUseFormState = {
        status: "error",
        message: "Form validation failed.",
        errors: error.errors,
      };
      return useFormState;
    }
    return {
      status: "error",
      message: error.message,
      errors: {},
    };
  }
  redirect("/profile");
}

type SubmitToSmartContractOptions = {
  userWallet: string;
  marketKey: string;
  sellOrders: {
    subMarketId: number;
    choiceId: number;
    amount: number;
    requestedPricePerShare: number;
  }[];
};

async function submitToSmartContract({
  marketKey,
  userWallet,
  sellOrders,
}: SubmitToSmartContractOptions) {
  const program = getTallyClob();
  const managerWallet = getManagerKeyPair();
  const userPDA = getUserPDA(new PublicKey(userWallet), program);
  const marketPDA = getMarketPDA(new PublicKey(marketKey), program);
  const marketPortfolioPDA = getMarketPortfolioPDA(marketPDA, userPDA, program);

  const orders = sellOrders.map((order) => ({
    subMarketId: new BN(order.subMarketId),
    choiceId: new BN(order.choiceId),
    amount: new BN(order.amount * Math.pow(10, 9)),
    requestedPricePerShare: order.requestedPricePerShare,
  }));

  const bulkBuyTx = await program.methods
    .bulkSellByShares(orders)
    .signers([managerWallet])
    .accounts({
      mint: new PublicKey(process.env.USDC_MINT!),
      fromUsdcAccount: getAssociatedTokenAddressSync(
        new PublicKey(process.env.USDC_MINT!),
        new PublicKey(process.env.MANAGER_PUBLIC_KEY!)
      ),
      feeUsdcAccount: getAssociatedTokenAddressSync(
        new PublicKey(process.env.USDC_MINT!),
        new PublicKey(process.env.FEE_MANAGER_KEY!)
      ),
      user: userPDA,
      market: marketPDA,
      marketPortfolio: marketPortfolioPDA,
      signer: managerWallet.publicKey,
    })
    .instruction();

  await sendTransactions({
    connection: program.provider.connection,
    transactions: [bulkBuyTx],
    signer: managerWallet,
  }).catch((err) => {
    throw new Error(err);
  });

  return {
    data: true,
    error: false,
  };
}
