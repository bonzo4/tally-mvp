"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { estimateBuy } from "@/lib/estimatePrice";
import { Database } from "@/lib/supabase/types";

type trade_status = Database["public"]["Enums"]["trade_status"];
type trade_side = Database["public"]["Enums"]["trade_side"];

type FormErrorProps = {
  sub_market_id: string;
  input_type: "RADIO" | "TEXT";
  message: string;
};

class FormError extends Error {
  errors: FormErrorProps[];

  constructor(errors: FormErrorProps[]) {
    super("Form validation failed.");
    this.errors = errors;
  }
}

export type SubMarketError = {
  input_type: "RADIO" | "TEXT";
  message: string;
};

export type UseFormState =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors: {
        [key: string]: SubMarketError;
      };
    }
  | null;

type FormattedFormData = {
  sub_market_id: string;
  choice_market_id: string | undefined;
  amount: string | undefined;
};

// Data received from form has radio buttons input (e.g. "Yes" or "No") separate
// from amount input (e.g. "$100"). They are associated by the name of the input.
// The former has a name "[id]" while the latter has a name "[id] amount".
// Thus we want to group them together.
function formatFormData(formData_: FormData): FormattedFormData[] {
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

function validateFormData(formData: FormattedFormData[]) {
  const errors = [];
  for (const { sub_market_id, choice_market_id, amount } of formData) {
    // Check if there are amounts without any radio buttons
    if (amount && !choice_market_id) {
      errors.push({
        message: "Missing selection.",
        sub_market_id: sub_market_id,
        input_type: "RADIO" as "RADIO" | "TEXT",
      });
    }
  }
  if (errors.length > 0) {
    throw new FormError(errors);
  }
}

export default async function submitBuy(
  prevState: any,
  formData: FormData
): Promise<UseFormState> {
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
      throw Error("AuthError: User could not be found.");
    }

    // convert FormData to cleaner object
    let formData_ = formatFormData(formData);

    // check if form is valid
    validateFormData(formData_);

    // remove unfilled fields
    formData_ = formData_.filter(
      (data) => data.amount !== "" && data.choice_market_id !== ""
    );

    // group transactions together before POSTING
    const txns = [];
    for (const txn of formData_) {
      // validate that amount is a number and not negative
      const { avgPrice, cumulative, shareCount } = await estimateBuy(
        supabase,
        Number(txn.choice_market_id),
        Number(txn.amount)
      );
      txns.push({
        user_id: user.id,
        choice_market_id: Number(txn.choice_market_id),
        total_amount: cumulative,
        shares: shareCount,
        avg_share_price: avgPrice,
        trade_side: "BUY" as trade_side,
        status: "PENDING" as trade_status,
      });
    }
    const { data, error } = await supabase.from("orders").insert(txns).select();
    if (error) {
      throw error;
    }

    return {
      status: "success",
      message: "Order submitted successfully.",
    };
  } catch (error) {
    if (error instanceof FormError) {
      const useFormState: UseFormState = {
        status: "error",
        message: "Form validation failed.",
        errors: {},
      };
      for (const err of error.errors) {
        useFormState.errors[err.sub_market_id] = {
          input_type: err.input_type,
          message: err.message,
        };
      }
      return useFormState;
    }
    return {
      status: "error",
      message: "An error occurred while submitting your order.",
      errors: {},
    };
  }
}
