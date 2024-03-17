"use server";

import { redirect } from "next/navigation";
import { z, ZodError } from "zod";

import { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { Database } from "@/lib/supabase/types";
import { FAIR_LAUNCH_FEE_RATE } from "@/lib/constants";
import { getTallyClob } from "@/lib/solana/program";
import { getManagerKeyPair } from "@/lib/solana/wallet";
import {
  getMarketPDA,
  getMarketPortfolioPDA,
  getUserPDA,
} from "@/lib/solana/pdas";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { sendTransactions } from "@/lib/solana/transaction";

type trade_status = Database["public"]["Enums"]["trade_status"];

export type FairLaunchEstimate = {
  subMarketTitle: string;
  choiceMarketTitle: string;
  choiceMarketId: number;
  avgPrice: number;
  cumulativeDollars: number;
  cumulativeShares: number;
  fees: number;
  totalDollars: number;
};

// Note: This is mean to work with zods fielErrors type
type FieldErrors = {
  [key: string | number | symbol]: string[] | undefined;
};

type FairLaunchSuccess = {
  status: "success";
  message: string;
  estimate: FairLaunchEstimate;
};

export type FairLaunchError = {
  status: "error";
  message: string;
  errors: FieldErrors;
};

export type FairLaunchUseFormState = FairLaunchSuccess | FairLaunchError | null;

class FormError extends Error {
  errors: FieldErrors;

  constructor(fieldErrors: FieldErrors) {
    super("Form validation failed.");
    this.errors = fieldErrors;
  }
}

type FormattedFairLaunchFormData = {
  sub_market_id: string;
  choice_market_id: string;
  amount: number;
};

function fromErrorToFormState(error: unknown) {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      status: "error" as const,
      message: error.errors[0].message,
      errors: error.flatten().fieldErrors,
    };
  } else if (error instanceof FormError) {
    return {
      status: "error" as const,
      message: error.message,
      errors: error.errors,
    };
  } else if (error instanceof Error) {
    return {
      status: "error" as const,
      message: error.message,
      errors: {} as FieldErrors,
    };
  } else {
    return {
      status: "error" as const,
      message: "An unknown error occurred",
      errors: {} as FieldErrors,
    };
  }
}

async function checkUserLoggedIn({ supabase }: { supabase: SupabaseClient }) {
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    throw new FormError({ amount: ["Please login before submitting order."] });
  }
  const user = authUser
    ? await getUser({
        supabase: supabase,
        options: { userId: authUser.id },
      })
    : null;

  if (!user) {
    throw new FormError({ amount: ["AuthError: User is not authenticated."] });
  }
  return user;
}

const fairLaunchSchema = z.object({
  amount: z.coerce.number().gt(0),
});

function validateFormData(formData: FormData) {
  const { amount } = fairLaunchSchema.parse({
    amount: formData.get("amount"),
  });
  return amount;
}

function calculateSpend(amount: number) {
  return {
    totalAmount: amount,
    amountForShares: amount * (1 - FAIR_LAUNCH_FEE_RATE),
    fees: amount * FAIR_LAUNCH_FEE_RATE,
  };
}

async function checkSufficientFunds({
  supabase,
  userId,
  amount,
}: {
  supabase: SupabaseClient<Database>;
  userId: number;
  amount: number;
}) {
  const { data: balancesData, error: balancesError } = await supabase
    .from("user_balances")
    .select()
    .eq("user_id", userId);
  if (!balancesData) {
    throw new FormError({ amount: ["Insufficient balance"] });
  }
  const userBalance =
    balancesData[0].usdc_balance + balancesData[0].unredeemable_balance;
  const totalAmount = amount;
  if (userBalance < totalAmount) {
    throw new FormError({ amount: ["Insufficient balance"] });
  }

  return balancesData[0];
}

async function validateTimeToSubmitFairLaunch(
  supabase: SupabaseClient,
  choice_market_id: number
) {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("choice_markets")
    .select("*, sub_markets(fair_launch_end)")
    .eq("id", choice_market_id);
  if (error) {
    throw new FormError({ amount: ["Unexpected error."] });
  }
  const choice_market = data[0];
  if (now > choice_market.sub_markets.fair_launch_end) {
    throw new FormError({ amount: ["Fair launch has ended."] });
  }
}

// TODO: Figure out why Typescript thinks the return data type is
// { card_title: string; }[], when we know it's not an array.
async function getRelatedInfo(
  supabase: SupabaseClient,
  choice_market_id: number
) {
  const { data, error } = await supabase
    .from("choice_markets")
    .select("title, sub_markets(card_title)")
    .eq("id", choice_market_id);
  if (error) {
    throw error;
  }
  return data[0] as unknown as {
    title: string;
    sub_markets: { card_title: string };
  };
}

export async function validateFairLaunch(
  choice_market_id: number,
  prevState: any,
  formData: FormData
): Promise<FairLaunchUseFormState> {
  try {
    const supabase = createServerSupabaseClient();

    // check user is logged in
    const user = await checkUserLoggedIn({ supabase });

    // check if form is valid
    const amount = validateFormData(formData) as number;

    // calculate spend
    const { totalAmount, amountForShares, fees } = calculateSpend(amount);

    // check that user it's not too late to submit fair launch order
    await validateTimeToSubmitFairLaunch(supabase, choice_market_id);

    await checkSufficientFunds({
      supabase,
      userId: user.id,
      amount: totalAmount,
    });

    // get information submarket information
    const relatedInfo = await getRelatedInfo(supabase, choice_market_id);

    const estimate: FairLaunchEstimate = {
      choiceMarketTitle: relatedInfo.title,
      subMarketTitle: relatedInfo.sub_markets.card_title,
      choiceMarketId: choice_market_id,
      cumulativeDollars: amountForShares,
      cumulativeShares: amountForShares * 2,
      avgPrice: 0.5,
      fees: fees,
      totalDollars: totalAmount,
    };

    return {
      status: "success",
      message: "Order validated successfully.",
      estimate: estimate,
    };
  } catch (error: any) {
    return fromErrorToFormState(error);
  }
}

export async function submitFairLaunch(
  sub_market_id: number,
  choice_market_id: number,
  formState: any,
  formData: FormData
): Promise<FairLaunchUseFormState> {
  try {
    const supabase = createServerSupabaseClient();

    // check user is logged in
    const user = await checkUserLoggedIn({ supabase });

    // check if form is valid
    const amount = validateFormData(formData) as number;

    // calculate spend
    const { totalAmount, amountForShares, fees } = calculateSpend(amount);

    // check that user it's not too late to submit fair launch order
    await validateTimeToSubmitFairLaunch(supabase, choice_market_id);

    const balanceData = await checkSufficientFunds({
      supabase,
      userId: user.id,
      amount: amount,
    });

    const { data: subMarketData, error: subMarketError } = await supabase
      .from("sub_markets")
      .select("prediction_market_id")
      .eq("id", sub_market_id)
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

    const txns = [
      {
        user_id: user.id,
        choice_market_id: choice_market_id,
        total_amount: amountForShares,
        shares: amountForShares * 2,
        avg_share_price: 0.5,
        status: "PENDING" as trade_status,
        fees: fees,
      },
    ];

    const { data: data, error: error } = await supabase
      .from("fair_launch_order")
      .insert(txns)
      .select();

    // TODO: Handle error if smart contract fails and redirect appropriately
    if (error) {
      throw error;
    }
    const fairLaunchOrder = {
      orderId: data[0].id,
      subMarketId: sub_market_id,
      choiceId: choice_market_id,
      amount: amount,
      requestedPricePerShare: 0.5,
    };

    // TODO: submit transaction to smart contract
    await submitToSmartContract({
      userWallet: balanceData.public_key,
      marketKey: predictionMarketData.public_key,
      fairLaunchOrders: [fairLaunchOrder],
      userId: user.id,
    });
  } catch (error: any) {
    console.log(error);
    return fromErrorToFormState(error);
  }
  redirect("/profile");
}

type SubmitToSmartContractOptions = {
  userWallet: string;
  marketKey: string;
  userId: number;
  fairLaunchOrders: {
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
  fairLaunchOrders,
  userId,
}: SubmitToSmartContractOptions) {
  const program = getTallyClob();
  const managerWallet = getManagerKeyPair();
  const userPDA = getUserPDA(new PublicKey(userWallet), program);
  const marketPDA = getMarketPDA(new PublicKey(marketKey), program);
  const marketPortfolioPDA = getMarketPortfolioPDA(marketPDA, userPDA, program);

  const orders = fairLaunchOrders.map((order) => ({
    id: new BN(order.orderId),
    subMarketId: new BN(order.subMarketId),
    choiceId: new BN(order.choiceId),
    amount: new BN(order.amount * Math.pow(10, 9)),
    requestedPricePerShare: 0.5,
  }));

  const bulkBuyTx = await program.methods
    .fairLaunchOrder(orders, new BN(userId))
    .signers([managerWallet])
    .accounts({
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
