import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { fetchQuery } from "../fetch";
import { PredictionMarketsWithSubMarkets } from "./predictionMarkets";

type GetTradeMarketsQueryOptions = {
  slug: string;
};

type GetTradeMarketsOptions = {
  supabase: SupabaseClient<Database>;
  options: GetTradeMarketsQueryOptions;
};

async function getTradeMarketsQuery({
  supabase,
  options,
}: GetTradeMarketsOptions) {
  return await supabase
    .from("prediction_markets")
    .select(
      "*, sub_markets(*, choice_markets!choice_markets_sub_market_id_fkey(*))"
    )
    .eq("slug", options.slug);
}

export async function getTradeMarkets({
  supabase,
  options,
}: GetTradeMarketsOptions) {
  return await fetchQuery<
    PredictionMarketsWithSubMarkets,
    GetTradeMarketsQueryOptions
  >({
    supabase: supabase,
    query: getTradeMarketsQuery,
    options: options,
  });
}
