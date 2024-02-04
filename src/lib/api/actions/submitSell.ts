"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries/user";
import { estimateSell } from "@/lib/estimatePrice";
import { Database } from "@/lib/supabase/types";

type trade_status = Database["public"]["Enums"]["trade_status"];
type trade_side = Database["public"]["Enums"]["trade_side"];

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

function formatSellFormData(formData_: FormData) {
  const formData: Record<
    number,
    { choice_market_id?: string; amount?: string }
  > = {};
  const formDataArr = [];
  for (const [key, value] of formData_.entries()) {
    formDataArr.push({
      choice_market_id: key,
      amount: value,
    });
  }
  return formDataArr;
}

export default async function submitSell(prevState: any, formData: FormData) {
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

  // format data
  let formData_ = formatSellFormData(formData);

  // remove unfilled fields
  formData_ = formData_.filter((data) => data.amount !== "");

  // group transactions together before POSTING
  const txns = [];
  for (const txn of formData_) {
    // validate that amount is a number and not negative
    const { avgPrice, cumulative, shareCount } = await estimateSell({
      supabase: supabase,
      choiceMarketId: Number(txn.choice_market_id),
      userId: user.id,
      amount: Number(txn.amount),
    });
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

  return prevState;
}
