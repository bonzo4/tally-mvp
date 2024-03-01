"use server";

import { redirect } from "next/navigation";
import { z, ZodError } from "zod";

import { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { Database } from "@/lib/supabase/types";
import { FEE_RATE } from "@/lib/constants";

type trade_status = Database["public"]["Enums"]["trade_status"];

export type FairLaunchErrorMessages = {
  radio: string;
  text: string;
};

type FairLaunchErrors = {
  [key: number]: FairLaunchErrorMessages;
};

export type FairLaunchUseFormState =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors: FairLaunchErrors;
    }
  | null;

class FormError extends Error {
  errors: FairLaunchErrors;

  constructor(errors: FairLaunchErrors) {
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
    };
    // if another error instance, return error message
    // e.g. database error
  } else if (error instanceof Error) {
    return {
      message: error.message,
    };
    // if not an error instance but something else crashed
    // return generic error message
  } else {
    return {
      message: "An unknown error occurred",
    };
  }
}

const fairLaunchSchema = z.object({
  amount: z.coerce.number(),
});

function validateFormData(formData: FormData) {
  try {
    const { amount } = fairLaunchSchema.parse({
      amount: formData.get("amount"),
    });
    return amount;
  } catch (error) {
    return fromErrorToFormState(error);
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

    return {
      status: "success",
      message: "Order validated successfully.",
    };
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

    const txns = [];

    txns.push({
      user_id: user.id,
      choice_market_id: choice_market_id,
      total_amount: amount,
      shares: amount * 2,
      avg_share_price: 0.5,
      status: "CONFIRMED" as trade_status,
      fees: amount * FEE_RATE,
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
