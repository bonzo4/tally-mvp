import { Database } from "../../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { fetchQuery } from "../../fetch";
import { PredictionMarketsWithSubMarkets } from "./predictionMarkets";

export type SubMarket = Database["public"]["Tables"]["sub_markets"]["Row"];
export type ChoiceMarket =
  Database["public"]["Tables"]["choice_markets"]["Row"];

export type SubMarketWithChoiceMarkets = SubMarket & {
  choice_markets: ChoiceMarket[];
};

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
    .eq("slug", options.slug)
    .order("order", { foreignTable: "sub_markets", ascending: true });
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
