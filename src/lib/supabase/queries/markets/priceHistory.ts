import { Database } from "../../types";
import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { fetchQuery } from "../../fetch";

type PriceHistory = Database["public"]["Tables"]["price_histories"]["Row"];

type PriceHistory_ = PriceHistory & {
  choice_markets: {
    sub_market_id: number;
  } | null;
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
}: GetPriceHistoryOptions): Promise<PostgrestResponse<PriceHistory>> {
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

type GetRelatedInformationQueryOptions = {
  choice_market_ids: number[];
};

type GetRelatedInformationOptions = {
  supabase: SupabaseClient<Database>;
  options: GetRelatedInformationQueryOptions;
};

async function getRelatedInformation({
  supabase,
  options,
}: GetRelatedInformationOptions): Promise<PostgrestResponse<RelatedInfo>> {
  return await supabase
    .from("choice_markets")
    .select("id, title, sub_markets(card_title, color)")
    .in("id", options.choice_market_ids);
}

function getUniqueIds(priceHistory: PriceHistory[]): Array<number> {
  const uniqueIds = new Set<number>();
  for (const price of priceHistory) {
    uniqueIds.add(price.choice_market_id);
  }
  return Array.from(uniqueIds);
}

export async function getPriceHistory({
  supabase,
  options,
}: GetPriceHistoryOptions) {
  const prices = await fetchQuery<PriceHistory, GetPriceHistoryQueryOptions>({
    supabase: supabase,
    query: getPriceHistoryQuery,
    options: options,
  });
  const choiceMarketIds = getUniqueIds(prices);
  console.log("choiceMarketIds", choiceMarketIds);
  const relatedInfo = await fetchQuery<
    RelatedInfo,
    GetRelatedInformationQueryOptions
  >({
    supabase: supabase,
    query: getRelatedInformation,
    options: { choice_market_ids: choiceMarketIds },
  });
  return { priceHistory: prices, relatedInfo };
}
