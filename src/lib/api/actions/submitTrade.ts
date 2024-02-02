"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { estimateSpend } from "@/lib/estimateSpend";

// state.errors[21][25];
export type SubscribeState =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      /*
         {
            21: {
              25: "Invalid email address."
            }
         }
      */
      errors?: {
        [key: number]: {
          [nestedKey: number]: string;
        };
      };
    }
  | null;

// Schema for a single field
const fieldSchema = z.object({
  sub_market_id: z.number(),
  choice_market_id: z.number(),
  value: z.number(),
});

// Schema for the entire form (an array of fields)
const formSchema = z.array(fieldSchema);

// Data received from form has radio buttons input (e.g. "Yes" or "No") separate
// from amount input (e.g. "$100"). They are associated by the name of the input.
// The former has a name "[id]" while the latter has a name "[id] amount".
// Thus we want to group them together.
function formatFormData(formData_: FormData) {
  const formData: Record<
    number,
    { choice_market_id?: string; amount?: string }
  > = {};
  for (const [_key, value] of formData_.entries()) {
    const keySplit = _key.split(" ");
    const key = keySplit[0];
    const isAmount = keySplit[1] === "amount";

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

export default async function submitTrade(prevState: any, formData: FormData) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    console.log("User not authenticated");
    return;
  }
  const user = authUser
    ? await getUser({
        supabase: supabase,
        options: { userId: authUser.id },
      })
    : null;

  if (!user) {
    console.log("User not found");
    return;
  }

  // convert FormData to cleaner object
  let formData_ = formatFormData(formData);

  // remove unfilled fields
  formData_ = formData_.filter(
    (data) => data.amount !== "" && data.choice_market_id !== ""
  );

  // group transactions together before POSTING
  const txns = [];
  for (const txn of formData_) {
    // validate that amount is a number and not negative
    const { avgPrice, cumulative, shareCount } = await estimateSpend(
      supabase,
      Number(txn.sub_market_id),
      Number(txn.choice_market_id),
      Number(txn.amount)
    );
    txns.push({
      user_id: user.id,
      choice_market_id: txn.choice_market_id,
      total_amount: cumulative,
      shares: shareCount,
      avg_share_price: avgPrice,
      trade_side: "BUY",
      status: "PENDING",
    });
  }
  const { data, error } = await supabase.from("orders").insert(txns).select();

  return prevState;
}
