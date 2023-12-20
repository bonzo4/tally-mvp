import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from '@supabase/postgrest-js'
import { getAndCacheQuery } from './index'

export type SubMarket = Database["public"]["Tables"]["sub_markets"]["Row"];

const getSubMarketsQuery = async (supabase: SupabaseClient<Database>): Promise<PostgrestResponse<SubMarket>> => {
  return await supabase
    .from("sub_markets")
    .select("*")
}

export const getSubMarkets = async ({ supabase }: { supabase: SupabaseClient<Database> }) =>
  await getAndCacheQuery({supabase: supabase, query: getSubMarketsQuery})
