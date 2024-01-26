import { Database } from "../../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from "@supabase/postgrest-js";
import { fetchQuery } from "../../fetch";

export type MarketsBanner =
  Database["public"]["Tables"]["market_banners"]["Row"];

type GetMarketsBannersQueryOptions = {};

type GetMarketsBannersOptions = {
  supabase: SupabaseClient<Database>;
  options: GetMarketsBannersQueryOptions;
};

const getMarketsBannersQuery = async ({
  supabase,
}: GetMarketsBannersOptions): Promise<PostgrestResponse<MarketsBanner>> => {
  return await supabase
    .from("market_banners")
    .select("*")
    .limit(10)
    .order("created_at", { ascending: false });
};

export const getMarketsBanners = async ({
  supabase,
}: GetMarketsBannersOptions) =>
  await fetchQuery<MarketsBanner, GetMarketsBannersQueryOptions>({
    supabase: supabase,
    query: getMarketsBannersQuery,
    options: {},
  });
