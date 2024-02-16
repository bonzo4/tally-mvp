import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";
import { fetchQuery } from "../fetch";

export type ProxyWallet = {
  unredeemable_balance: number;
  usdc_balance: number;
};

type GetProxyWalletQueryOptions = {
  userId: number;
};

type GetProxyWalletOptions = {
  supabase: SupabaseClient<Database>;
  options: GetProxyWalletQueryOptions;
};

async function getProxyWalletQuery({
  supabase,
  options: { userId },
}: GetProxyWalletOptions): Promise<PostgrestResponse<ProxyWallet>> {
  return await supabase
    .from("user_balances")
    .select("unredeemable_balance, usdc_balance")
    .eq("user_id", userId);
}

export async function getProxyWallet({
  supabase,
  options,
}: GetProxyWalletOptions) {
  return (
    await fetchQuery<ProxyWallet, GetProxyWalletQueryOptions>({
      supabase,
      options,
      query: getProxyWalletQuery,
    })
  )[0];
}
