import { Database } from "../../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from "@supabase/postgrest-js";
import { fetchQuery } from "../../fetch";

export type SubMarket = Database["public"]["Tables"]["sub_markets"]["Row"];

type GetSubMarketsQueryOptions = { slug: string };

type GetSubMarketsOptions = {
  supabase: SupabaseClient<Database>;
  options: GetSubMarketsQueryOptions;
};

const getSubMarketsQuery = async ({
  supabase,
  options,
}: GetSubMarketsOptions): Promise<PostgrestResponse<SubMarket>> => {
  const slug = options.slug;
  return await supabase.from("sub_markets").select("*").eq("slug", slug);
};

export const getSubMarkets = async ({
  supabase,
  options,
}: GetSubMarketsOptions) =>
  await fetchQuery<SubMarket, GetSubMarketsQueryOptions>({
    supabase: supabase,
    query: getSubMarketsQuery,
    options: options,
  });
