import { Database } from "../../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { fetchQuery } from "../../fetch";

type PredictionMarket =
  Database["public"]["Tables"]["prediction_markets"]["Row"];
type SubMarket = Database["public"]["Tables"]["sub_markets"]["Row"];
type ChoiceMarket = Database["public"]["Tables"]["choice_markets"]["Row"];
type Holding = Database["public"]["Tables"]["holdings"]["Row"];

export type ChoiceMarketWithHoldings = ChoiceMarket & {
  holdings: Holding[];
};

export type SubMarketWithHoldings = SubMarket & {
  choice_markets: ChoiceMarketWithHoldings[];
};

export type PredictionMarketWithHoldings = PredictionMarket & {
  sub_markets: SubMarketWithHoldings[];
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
    .select("*, sub_markets(*, choice_markets(*, holdings(*)))")
    .eq("slug", options.slug)
    .order("order", { foreignTable: "sub_markets", ascending: true })
    .order("order", {
      foreignTable: "sub_markets.choice_markets",
      ascending: true,
    })
    .order("created_at", {
      foreignTable: "sub_markets.choice_markets",
      ascending: true,
    });
}

export async function getTradeMarkets({
  supabase,
  options,
}: GetTradeMarketsOptions) {
  return await fetchQuery<
    PredictionMarketWithHoldings,
    GetTradeMarketsQueryOptions
  >({
    supabase: supabase,
    query: getTradeMarketsQuery,
    options: options,
  });
}
