"use server";

import { redirect } from "next/navigation";

import { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { Database } from "@/lib/supabase/types";
import { Estimate } from "@/app/api/estimateBuy/route";

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
  }
  if (Object.keys(errors).length) {
    throw new SellFormError(errors);
  }
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

    // check that users have enough shares
    await checkEnoughShares({
      supabase: supabase,
      formData_: formData_,
      userId: user.id,
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
