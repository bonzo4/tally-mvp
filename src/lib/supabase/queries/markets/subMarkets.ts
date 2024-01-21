import { Database } from "../../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from "@supabase/postgrest-js";
import { fetchQuery } from "../../fetch";

export type SubMarket = Database["public"]["Tables"]["sub_markets"]["Row"];

type GetSubMarketsQueryOptions = {};

type GetSubMarketsOptions = {
  supabase: SupabaseClient<Database>;
  options: GetSubMarketsQueryOptions;
};

const getSubMarketsQuery = async ({
  supabase,
}: GetSubMarketsOptions): Promise<PostgrestResponse<SubMarket>> => {
  return await supabase.from("sub_markets").select("*");
};

export const getSubMarkets = async ({ supabase }: GetSubMarketsOptions) =>
  await fetchQuery<SubMarket, GetSubMarketsQueryOptions>({
    supabase: supabase,
    query: getSubMarketsQuery,
    options: {},
  });
