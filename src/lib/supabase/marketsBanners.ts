import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from '@supabase/postgrest-js'
import { getAndCacheQuery } from './index'

export type MarketsBanner = Database["public"]["Tables"]["market_banners"]["Row"];

const getMarketsBannersQuery = async (supabase: SupabaseClient<Database>): Promise<PostgrestResponse<MarketsBanner>> => {
  return await supabase
    .from("market_banners")
    .select("*")
    .limit(10)
    .order("created_at", { ascending: false })
}

export const getMarketsBanners = async ({ supabase }: { supabase: SupabaseClient<Database> }) =>
  await getAndCacheQuery({supabase: supabase, query: getMarketsBannersQuery})

