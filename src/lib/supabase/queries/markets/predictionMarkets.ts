import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types";
import { fetchQuery } from "../../fetch";
import { SubMarket } from "./subMarkets";
import { ChoiceMarket } from "./choiceMarkets";

export type PredictionMarket =
  Database["public"]["Tables"]["prediction_markets"]["Row"];

type GetPredictionMarketsQueryOptions = {
  category?: string;
  limit?: number;
};

type SubMarketWithChoiceMarkets = SubMarket & {
  choice_markets: ChoiceMarket[];
};

export type PredictionMarketsWithSubMarkets = {
  sub_markets: SubMarketWithChoiceMarkets[];
} & PredictionMarket;

type GetPredictionMarketsOptions = {
  supabase: SupabaseClient<Database>;
  options: GetPredictionMarketsQueryOptions;
};

async function getPredictionMarketsQuery({
  supabase,
  options: { category, limit },
}: GetPredictionMarketsOptions): Promise<
  PostgrestResponse<PredictionMarketsWithSubMarkets>
> {
  let query;
  if (limit) {
    query = supabase
      .from("prediction_markets")
      .select(
        "*, sub_markets(*, choice_markets!choice_markets_sub_market_id_fkey(*))"
      )
      .limit(limit);
  } else {
    query = supabase
      .from("prediction_markets")
      .select(
        "*, sub_markets(*, choice_markets!choice_markets_sub_market_id_fkey(*))"
      );
  }

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
    PredictionMarketsWithSubMarkets,
    GetPredictionMarketsQueryOptions
  >({
    supabase: supabase,
    query: getPredictionMarketsQuery,
    options,
  });
}
