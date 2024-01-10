import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types";
import { fetchQuery } from "../fetch";
import { SubMarket } from "./subMarkets";
import { ChoiceMarket } from "./choiceMarkets";

export type PredictionMarket =
  Database["public"]["Tables"]["prediction_markets"]["Row"];

type GetPredictionMarketsQueryOptions = {
  category?: string;
};

type GetPredictionMarketsOptions = {
  supabase: SupabaseClient<Database>;
  options: GetPredictionMarketsQueryOptions;
};

type SubMarketWithChoiceMarkets = SubMarket & {
  choice_markets: ChoiceMarket[];
};

type PredictionMarketsCard = {
  sub_markets: SubMarketWithChoiceMarkets[];
} & PredictionMarket;

async function getPredictionMarketsQuery({
  supabase,
  options: { category },
}: GetPredictionMarketsOptions): Promise<
  PostgrestResponse<PredictionMarketsCard>
> {
  let query = supabase
    .from("prediction_markets")
    .select(
      "*, sub_markets(*, choice_markets!choice_markets_sub_market_id_fkey(*))"
    )
    .limit(12);

  if (category) {
    if (category === "Top") {
      query = query.order("total_pot", { ascending: false });
    } else if (category === "New 🎉") {
      query = query.order("created_at", { ascending: false });
    } else {
      query = query.eq("category", category);
    }
  }

  return await query;
}

export async function getPredictionMarketCards({
  supabase,
  options,
}: GetPredictionMarketsOptions) {
  return await fetchQuery<
    PredictionMarketsCard,
    GetPredictionMarketsQueryOptions
  >({
    supabase: supabase,
    query: getPredictionMarketsQuery,
    options,
  });
}
