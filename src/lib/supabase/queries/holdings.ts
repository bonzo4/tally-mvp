import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";
import { fetchQuery } from "../fetch";

export type Holdings = Database["public"]["Tables"]["holdings"]["Row"] & {
  choice_markets: { share_price: number; sub_market_id: number } | null;
};

type GetHoldingsQueryOptions = {
  userId: number;
};

type GetHoldingsOptions = {
  supabase: SupabaseClient<Database>;
  options: GetHoldingsQueryOptions;
};

async function getHoldingsQuery({
  supabase,
  options: { userId },
}: GetHoldingsOptions): Promise<PostgrestResponse<Holdings>> {
  return await supabase
    .from("holdings")
    .select("*, choice_markets(share_price, sub_market_id)")
    .eq("user_id", userId);
}

export async function getHoldings({ supabase, options }: GetHoldingsOptions) {
  return await fetchQuery<Holdings, GetHoldingsQueryOptions>({
    supabase,
    options,
    query: getHoldingsQuery,
  });
}
