import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";
import { fetchQuery } from "./fetch";

export type PredictionMarket =
  Database["public"]["Tables"]["prediction_markets"]["Row"];

type GetPredictionMarketsQueryOptions = {};

type GetPredictionMarketsOptions = {
  supabase: SupabaseClient<Database>;
  options: GetPredictionMarketsQueryOptions;
};

const getSubMarketsQuery = async ({
  supabase,
}: GetPredictionMarketsOptions) => {
  return await supabase.from("prediction_markets").select("*");
};

export const getPredictionMarkets = async ({
  supabase,
}: GetPredictionMarketsOptions) =>
  await fetchQuery<PredictionMarket, GetPredictionMarketsQueryOptions>({
    supabase: supabase,
    query: getSubMarketsQuery,
    options: {},
  });
