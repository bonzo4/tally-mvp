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

type FieldErrors = {
  [key: string]: string;
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

  constructor(errors: FieldErrors) {
    super("Form validation failed.");
    this.errors = errors;
  }
}

type FormattedFairLaunchFormData = {
  sub_market_id: string;
  choice_market_id: string;
  amount: number;
};

async function checkUserLoggedIn({ supabase }: { supabase: SupabaseClient }) {
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
    throw new Error("Insufficient balance");
  }
  const userBalance =
    balancesData[0].usdc_balance + balancesData[0].unredeemable_balance;
  const totalAmount = amount;
  if (userBalance < totalAmount * (1 + FEE_RATE)) {
    throw new Error("Insufficient balance");
  }
}

function fromErrorToFormState(error: unknown) {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message,
      fieldErrors: error.flatten().fieldErrors,
    };
    // if another error instance, return error message
    // e.g. database error
  } else if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
    };
    // if not an error instance but something else crashed
    // return generic error message
  } else {
    return {
      message: "An unknown error occurred",
      fieldErrors: {},
    };
  }
}

const fairLaunchSchema = z.object({
  amount: z.coerce.number().gt(0),
});

function validateFormData(formData: FormData) {
  try {
    const { amount } = fairLaunchSchema.parse({
      amount: formData.get("amount"),
    });
    return amount;
  } catch (error) {
    throw fromErrorToFormState(error);
  }
}

async function validateTimeToSubmitFairLaunch(
  supabase: SupabaseClient,
  choice_market_id: number
) {
  try {
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
      throw new Error("Fair launch as ended.");
    }
  } catch (error) {
    return fromErrorToFormState(error);
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
    return {
      status: "error",
      message: error.message,
      errors: error.fieldErrors || {},
    };
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
    if (error instanceof FormError) {
      const useFormState: FairLaunchUseFormState = {
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
