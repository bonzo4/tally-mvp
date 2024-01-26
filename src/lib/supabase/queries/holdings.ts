import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";
import { fetchQuery } from "../fetch";
import { Color } from "@/lib/cssMaps";

export type Holdings = Database["public"]["Tables"]["holdings"]["Row"] & {
  choice_markets: {
    title: string;
    color: Color | null;
    share_price: number;
    sub_market_id: number;
    sub_markets: { title: string; has_resolved: boolean } | null;
  } | null;
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
    .select(
      "*, choice_markets(title, color, share_price, sub_market_id, sub_markets(title, has_resolved))"
    )
    .eq("user_id", userId)
    .order("choice_markets(title)", { ascending: false });
}

export async function getHoldings({ supabase, options }: GetHoldingsOptions) {
  return await fetchQuery<Holdings, GetHoldingsQueryOptions>({
    supabase,
    options,
    query: getHoldingsQuery,
  });
}
