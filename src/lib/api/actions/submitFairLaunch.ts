"use server";

import { redirect } from "next/navigation";
import { z, ZodError } from "zod";

import { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { Database } from "@/lib/supabase/types";
import { FEE_RATE } from "@/lib/constants";

type trade_status = Database["public"]["Enums"]["trade_status"];

export type FairLaunchEstimate = {
  subMarketTitle: string;
  choiceMarketTitle: string;
  choiceMarketId: number;
  avgPrice: number;
  cumulativeDollars: number;
  cumulativeShares: number;
  fees: number;
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

async function checkSufficientFunds({
  supabase,
  userId,
  amount,
}: {
  supabase: SupabaseClient;
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
    throw error;
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

    // check that user it's not too late to submit fair launch order
    await validateTimeToSubmitFairLaunch(supabase, choice_market_id);

    await checkSufficientFunds({
      supabase,
      userId: user.id,
      amount: amount,
    });

    // get information submarket information
    const relatedInfo = await getRelatedInfo(supabase, choice_market_id);

    const fees = amount * FEE_RATE;
    const amountPostFees = amount - fees;
    console.log("relatedInfo", relatedInfo);

    const estimate: FairLaunchEstimate = {
      choiceMarketTitle: relatedInfo.title,
      subMarketTitle: relatedInfo.sub_markets.card_title,
      choiceMarketId: choice_market_id,
      cumulativeDollars: amountPostFees,
      cumulativeShares: amountPostFees * 2,
      avgPrice: 0.5,
      fees: fees,
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

    // check that user it's not too late to submit fair launch order
    await validateTimeToSubmitFairLaunch(supabase, choice_market_id);

    await checkSufficientFunds({
      supabase,
      userId: user.id,
      amount: amount,
    });

    const fees = amount * FEE_RATE;
    const amountPostFees = amount - fees;

    const txns = [];

    txns.push({
      user_id: user.id,
      choice_market_id: choice_market_id,
      total_amount: amountPostFees,
      shares: amountPostFees * 2,
      avg_share_price: 0.5,
      status: "CONFIRMED" as trade_status,
      fees: fees,
    });

    const { data: data, error: error } = await supabase
      .from("fair_launch_order")
      .insert(txns)
      .select();

    // TODO: Handle error if smart contract fails and redirect appropriately
    if (error) {
      throw error;
    }
  } catch (error: any) {
    return fromErrorToFormState(error);
  }
  redirect("/profile");
}
