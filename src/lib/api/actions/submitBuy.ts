"use server";

import { redirect } from "next/navigation";

import { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { Database } from "@/lib/supabase/types";
import { Estimate } from "@/app/api/estimateBuy/route";
import { getTallyClob } from "@/lib/solana/program";
import { getManagerKeyPair } from "@/lib/solana/wallet";
import {
  getMarketPDA,
  getMarketPortfolioPDA,
  getUserPDA,
} from "@/lib/solana/pdas";
import { PublicKey } from "@solana/web3.js";
import { AnchorError, BN } from "@coral-xyz/anchor";
import { sendTransactions } from "@/lib/solana/transaction";
import { feeAccounts } from "@/lib/solana/feeAccounts";

type trade_status = Database["public"]["Enums"]["trade_status"];
type trade_side = Database["public"]["Enums"]["trade_side"];

export type BuyErrorMessages = {
  radio: string;
  text: string;
};

type BuyErrors = {
  [key: number]: BuyErrorMessages;
};

export type BuyUseFormState =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors: BuyErrors;
    }
  | null;

class FormError extends Error {
  errors: BuyErrors;

  constructor(errors: BuyErrors) {
    super("Form validation failed.");
    this.errors = errors;
  }
}

type FormattedBuyFormData = {
  sub_market_id: string;
  choice_market_id: string | undefined;
  amount: string | undefined;
};

async function checkUserLoggedIn({
  supabase,
}: {
  supabase: SupabaseClient<Database>;
}) {
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
    throw Error("AuthError: User could not be found.");
  }
  return user;
}

// Data received from form has radio buttons input (e.g. "Yes" or "No") separate
// from amount input (e.g. "$100"). They are associated by the name of the input.
// The former has a name "[id]" while the latter has a name "[id] amount".
// Thus we want to group them together.
function formatFormData(formData_: FormData): FormattedBuyFormData[] {
  const formData: Record<
    string,
    { choice_market_id?: string; amount?: string }
  > = {};
  for (const [_key, _value] of formData_.entries()) {
    const keySplit = _key.split(" ");
    const key = keySplit[0];
    const isAmount = keySplit[1] === "amount";
    const value = String(_value);

    if (isAmount) {
      if (key in formData) {
        formData[key].amount = value;
      } else {
        formData[key] = { choice_market_id: "", amount: value };
      }
    } else {
      if (key in formData) {
        formData[key].choice_market_id = value;
      } else {
        formData[key] = { choice_market_id: value, amount: "" };
      }
    }
  }

  const formDataArr = [];
  for (const key in formData) {
    formDataArr.push({
      sub_market_id: key,
      choice_market_id: formData[key].choice_market_id,
      amount: formData[key].amount,
    });
  }
  return formDataArr;
}

function validateFormData(formData: FormattedBuyFormData[]) {
  const errors = {} as BuyErrors;
  for (const { sub_market_id, choice_market_id, amount } of formData) {
    // Check if there are amounts without any radio buttons
    if (amount && Number(amount) > 0 && !choice_market_id) {
      errors[Number(sub_market_id)] = {
        ...errors[Number(sub_market_id)],
        radio: "Missing selection.",
      };
    }
    // Check if amount is 100,000,000 or more.
    if (amount && Number(amount) >= 100000000) {
      errors[Number(sub_market_id)] = {
        ...errors[Number(sub_market_id)],
        text: "Number too large. Must be <$100,000,000.",
      };
    }
  }
  if (Object.keys(errors).length) {
    throw new FormError(errors);
  }
}

async function checkSufficientFunds({
  supabase,
  userId,
  formData_,
}: {
  supabase: SupabaseClient<Database>;
  userId: number;
  formData_: FormattedBuyFormData[];
}) {
  const { data: balancesData, error: balancesError } = await supabase
    .from("user_balances")
    .select()
    .eq("user_id", userId)
    .single();
  if (!balancesData) {
    throw new Error("Insufficient balance");
  }
  const userBalance =
    balancesData.usdc_balance + balancesData.unredeemable_balance;
  const totalAmount = formData_.reduce((acc, data) => {
    return acc + Number(data?.amount);
  }, 0);

  if (userBalance < totalAmount) {
    throw new Error("Insufficient balance");
  }

  return balancesData;
}

export async function validateBuy(
  prevState: any,
  formData: FormData
): Promise<BuyUseFormState> {
  try {
    const supabase = createServerSupabaseClient();

    // check user is logged in
    const user = await checkUserLoggedIn({ supabase });

    // convert FormData to cleaner object
    let formData_ = formatFormData(formData);

    // check if form is valid
    validateFormData(formData_);

    // remove unfilled fields
    formData_ = formData_.filter(
      (data) => data.amount !== "" && data.choice_market_id !== ""
    );

    // check if user has enough funds
    await checkSufficientFunds({
      supabase,
      userId: user.id,
      formData_: formData_,
    });

    return {
      status: "success",
      message: "Order validated successfully.",
    };
  } catch (error: any) {
    if (error instanceof FormError) {
      const useFormState: BuyUseFormState = {
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
}

export default async function submitBuy(
  estimate: Estimate[] | null,
  formData: FormData
): Promise<BuyUseFormState> {
  try {
    if (!estimate) {
      throw new Error("No estmate. Please try again.");
    }
    const supabase = createServerSupabaseClient();

    // check user is logged in
    const user = await checkUserLoggedIn({ supabase });

    // convert FormData to cleaner object
    let formData_ = formatFormData(formData);

    // check if form is valid
    validateFormData(formData_);

    // remove unfilled fields
    formData_ = formData_.filter(
      (data) => data.amount !== "" && data.choice_market_id !== ""
    );

    const { data: subMarketData, error: subMarketError } = await supabase
      .from("sub_markets")
      .select("prediction_market_id")
      .eq("id", formData_[0].sub_market_id)
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

    // check if user has enough funds
    const balanceData = await checkSufficientFunds({
      supabase,
      userId: user.id,
      formData_: formData_,
    });

    // group transactions together before POSTING
    const txns = estimate.map((values) => ({
      user_id: user.id,
      choice_market_id: Number(values.choiceMarketId),
      total_amount: values.cumulativeDollars,
      shares: values.cumulativeShares,
      avg_share_price: values.avgPrice,
      trade_side: values.tradeSide,
      status: "PENDING" as trade_status,
      fees: values.fees,
    }));

    const { data: data, error: error } = await supabase
      .from("orders")
      .insert(txns)
      .select();

    if (error) {
      throw error;
    }

    const buyOrders = estimate.map((values, index) => ({
      orderId: data[index].id,
      subMarketId: values.subMarketId,
      choiceId: values.choiceMarketId,
      amount: values.cumulativeDollars,
      requestedPricePerShare: values.avgPrice,
    }));

    // TODO: submit transaction to smart contract
    await submitToSmartContract({
      userWallet: balanceData.public_key,
      marketKey: predictionMarketData.public_key,
      buyOrders,
      userId: user.id,
    });
  } catch (error: any) {
    console.log(error);
    if (error instanceof AnchorError) {
      const err = error as AnchorError;
      const useFormState: BuyUseFormState = {
        status: "error",
        message: err.message,
        errors: [],
      };
      return useFormState;
    }
    if (error instanceof FormError) {
      const useFormState: BuyUseFormState = {
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
  userId: number;
  buyOrders: {
    orderId: number;
    subMarketId: number;
    choiceId: number;
    amount: number;
    requestedPricePerShare: number;
  }[];
};

async function submitToSmartContract({
  marketKey,
  userWallet,
  buyOrders,
  userId,
}: SubmitToSmartContractOptions) {
  const program = getTallyClob();
  const managerWallet = getManagerKeyPair();
  const userPDA = getUserPDA(new PublicKey(userWallet), program);
  const marketPDA = getMarketPDA(new PublicKey(marketKey), program);
  const marketPortfolioPDA = getMarketPortfolioPDA(marketPDA, userPDA, program);

  const orders = buyOrders.map((order) => ({
    id: new BN(order.orderId),
    subMarketId: new BN(order.subMarketId),
    choiceId: new BN(order.choiceId),
    amount: new BN(BigInt(order.amount) * BigInt(Math.pow(10, 9))),
    requestedPricePerShare: order.requestedPricePerShare,
  }));

  const bulkBuyTx = await program.methods
    .bulkBuyByPrice(orders, new BN(userId))
    .signers([managerWallet])
    .accounts({
      ...feeAccounts,
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
