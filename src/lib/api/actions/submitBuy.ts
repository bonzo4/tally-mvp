"use server";

import { redirect } from "next/navigation";

import { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { estimateBuy } from "@/lib/estimatePrice";
import { Database } from "@/lib/supabase/types";

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
  supabase: SupabaseClient;
  userId: number;
  formData_: FormattedBuyFormData[];
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
  const totalAmount = formData_.reduce((acc, data) => {
    return acc + Number(data?.amount);
  }, 0);

  if (userBalance < totalAmount) {
    throw new Error("Insufficient balance");
  }
}

export async function validateBuy(
  prevState: any,
  formData: FormData
): Promise<BuyUseFormState> {
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
  prevState: any,
  formData: FormData
): Promise<BuyUseFormState> {
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

    // check if user has enough funds
    await checkSufficientFunds({
      supabase,
      userId: user.id,
      formData_: formData_,
    });

    // group transactions together before POSTING
    const txns = [];
    for (const txn of formData_) {
      // validate that amount is a number and not negative
      const { avgPrice, cumulativeDollars, cumulativeShares } =
        await estimateBuy(
          supabase,
          Number(txn.choice_market_id),
          Number(txn.amount)
        );
      txns.push({
        user_id: user.id,
        choice_market_id: Number(txn.choice_market_id),
        total_amount: cumulativeDollars,
        shares: cumulativeShares,
        avg_share_price: avgPrice,
        trade_side: "BUY" as trade_side,
        status: "CONFIRMED" as trade_status,
      });
    }
    const { data: data, error: error } = await supabase
      .from("orders")
      .insert(txns)
      .select();

    // TODO: submit transaction to smart contract
    const { data: data_, error: error_ } = await submitToSmartContract(txns);

    // TODO: Handle error if smart contract fails and redirect appropriately

    if (error) {
      throw error;
    }
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
  redirect("/profile");
}

async function submitToSmartContract(txns: any) {
  return {
    data: true,
    error: false,
  };
}
