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
}: GetPriceHistoryOptions): Promise<PostgrestResponse<PredictionMarket_>> {
  return await supabase
    .from("prediction_markets")
    .select("*, sub_markets(id, choice_markets(id))")
    .eq("slug", options.slug);
}

export async function getPriceHistory({
  supabase,
  options,
}: GetPriceHistoryOptions) {
  return await fetchQuery<PredictionMarket_, GetPriceHistoryQueryOptions>({
    supabase: supabase,
    query: getPriceHistoryQuery,
    options: options,
  });
}
