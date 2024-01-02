import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from "@supabase/postgrest-js";
import { fetchQuery } from "./fetch";

export type SubMarket = Database["public"]["Tables"]["sub_markets"]["Row"];

const getSubMarketsQuery = async (
  supabase: SupabaseClient<Database>
): Promise<PostgrestResponse<SubMarket>> => {
  return await supabase.from("sub_markets").select("*");
};

export const getSubMarkets = async ({
  supabase,
}: {
  supabase: SupabaseClient<Database>;
}) => await fetchQuery({ supabase: supabase, query: getSubMarketsQuery });
