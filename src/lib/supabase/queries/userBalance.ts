import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";
import { fetchQuery } from "../fetch";

export type UserBalance = {
  unredeemable_balance: number;
  usdc_balance: number;
};

type GetUserBalanceQueryOptions = {
  userId: number;
};

type GetUserBalanceOptions = {
  supabase: SupabaseClient<Database>;
  options: GetUserBalanceQueryOptions;
};

async function getUserBalanceQuery({
  supabase,
  options: { userId },
}: GetUserBalanceOptions): Promise<PostgrestResponse<UserBalance>> {
  return await supabase
    .from("user_balances")
    .select("unredeemable_balance, usdc_balance")
    .eq("user_id", userId);
}

export async function getUserBalance({
  supabase,
  options,
}: GetUserBalanceOptions) {
  return (
    await fetchQuery<UserBalance, GetUserBalanceQueryOptions>({
      supabase,
      options,
      query: getUserBalanceQuery,
    })
  )[0];
}
