import { Database } from "../../types";
import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { fetchQuery } from "../../fetch";

type PriceHistory = Database["public"]["Tables"]["price_histories"]["Row"];

export type PriceHistory_ = PriceHistory & {
  title: string;
  card_title: string;
  color: Color;
};

type PredictionMarket_ =
  Database["public"]["Tables"]["prediction_markets"]["Row"] & {
    sub_markets: {
      id: number;
      choice_markets: {
        id: number;
      }[];
    }[];
  };

type Color = Database["public"]["Enums"]["colors_enum"] | null;

export type RelatedInfo = {
  id: number;
  title: string;
  sub_markets: {
    card_title: string | null;
    color: Color;
  } | null;
};

export type TimeFrame = "1 hour" | "1 day" | "1 week" | "1 month" | "all";

type GetPriceHistoryQueryOptions = {
  slug: string;
  timeFrame: TimeFrame;
};

type GetPriceHistoryOptions = {
  supabase: SupabaseClient<Database>;
  options: GetPriceHistoryQueryOptions;
};

async function getPriceHistoryQuery({
  supabase,
  options,
}: GetPriceHistoryOptions): Promise<PostgrestResponse<PriceHistory_>> {
  // Using slug of market, get all relevant choice market ids.
  const { data, error }: PostgrestResponse<PredictionMarket_> = await supabase
    .from("prediction_markets")
    .select("*, sub_markets(id, choice_markets(id))")
    .eq("slug", options.slug);

  // Convert structured PredictionMarket_ type into a flat list of choice_market ids.
  const choiceMarketIds: number[] | undefined = data?.[0].sub_markets
    .map((subMarket) => {
      return subMarket.choice_markets.map((choiceMarket) => choiceMarket.id);
    })
    .flat();

  if (!choiceMarketIds) {
    throw new Error("No choice market ids found.");
  }

  // Now get the price histories.
  return await supabase.rpc("get_price_chart", {
    choice_market_ids: choiceMarketIds,
    date_interval: options.timeFrame,
  });
}

export async function getPriceHistory({
  supabase,
  options,
}: GetPriceHistoryOptions) {
  return await fetchQuery<PriceHistory_, GetPriceHistoryQueryOptions>({
    supabase: supabase,
    query: getPriceHistoryQuery,
    options: options,
  });
}
