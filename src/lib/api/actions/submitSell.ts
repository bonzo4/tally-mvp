"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { estimateSell } from "@/lib/estimatePrice";
import { Database } from "@/lib/supabase/types";

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

export default async function submitSell(
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

    // group transactions together before POSTING
    const txns = [];
    for (const txn of formData_) {
      // validate that amount is a number and not negative
      const { avgPrice, cumulativeDollars, cumulativeShares } =
        await estimateSell({
          supabase: supabase,
          choiceMarketId: Number(txn.choice_market_id),
          userId: user.id,
          shares: Number(txn.shares),
        });
      txns.push({
        user_id: user.id,
        choice_market_id: Number(txn.choice_market_id),
        total_amount: cumulativeDollars,
        shares: cumulativeShares,
        avg_share_price: avgPrice,
        trade_side: "BUY" as trade_side,
        status: "PENDING" as trade_status,
      });
    }
    const { data, error } = await supabase.from("orders").insert(txns).select();

    return {
      status: "success",
      message: "Order submitted successfully.",
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
