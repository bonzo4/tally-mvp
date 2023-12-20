import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from '@supabase/postgrest-js'
import { getAndCacheQuery } from './index'

export type Tickers = Database["public"]["Tables"]["market_tickers"]["Row"]

const getTickersQuery = async (supabase: SupabaseClient<Database>): Promise<PostgrestResponse<Tickers>> => {
  return await supabase
    .from("market_tickers")
    .select("*")
    .eq("active", true)
    .limit(10)
    .order("share_price", { ascending: false })
}

export const getTickers = async ({ supabase }: { supabase: SupabaseClient<Database> }) =>
  await getAndCacheQuery({supabase: supabase, query: getTickersQuery})

