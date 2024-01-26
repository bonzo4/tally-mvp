import { Color } from "@/lib/cssMaps";
import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";
import { fetchQuery } from "../fetch";

export type TradeHistory = Database["public"]["Tables"]["orders"]["Row"] & {
  choice_markets: {
    title: string;
    color: Color | null;
    sub_markets: { title: string } | null;
  } | null;
};

type GetTradeHistoryQueryOptions = {
  userId: number;
};

type GetTradeHistoryOptions = {
  supabase: SupabaseClient<Database>;
  options: GetTradeHistoryQueryOptions;
};

async function getTradeHistoryQuery({
  supabase,
  options: { userId },
}: GetTradeHistoryOptions): Promise<PostgrestResponse<TradeHistory>> {
  return await supabase
    .from("orders")
    .select("*, choice_markets(title, color, sub_markets(title))")
    .eq("user_id", userId);
}

export async function getTradeHistory({
  supabase,
  options,
}: GetTradeHistoryOptions) {
  return await fetchQuery<TradeHistory, GetTradeHistoryQueryOptions>({
    supabase,
    options,
    query: getTradeHistoryQuery,
  });
}
