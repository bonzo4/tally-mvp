import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";
import { fetchQuery } from "./fetch";
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

const getPredictionMarketsQuery = async ({
  supabase,
  options: { category },
}: GetPredictionMarketsOptions): Promise<
  PostgrestResponse<PredictionMarketsCard>
> => {
  if (category) {
    return await supabase
      .from("prediction_markets")
      .select(
        "*, sub_markets(*, choice_markets!choice_markets_sub_market_id_fkey(*))"
      )
      .eq("category", category);
  }

  return await supabase
    .from("prediction_markets")
    .select(
      "*, sub_markets(*, choice_markets!choice_markets_sub_market_id_fkey(*))"
    );
};

export const getPredictionMarketCards = async ({
  supabase,
  options,
}: GetPredictionMarketsOptions) =>
  await fetchQuery<PredictionMarketsCard, GetPredictionMarketsQueryOptions>({
    supabase: supabase,
    query: getPredictionMarketsQuery,
    options,
  });
