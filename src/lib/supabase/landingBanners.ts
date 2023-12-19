import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from '@supabase/postgrest-js'
import { getAndCacheQuery } from './index'

export type LandingBanner = Database["public"]["Tables"]["landing_banners"]["Row"];

const getLandingBannersQuery = async (supabase: SupabaseClient<Database>): Promise<PostgrestResponse<LandingBanner>> => {
  return await supabase
    .from("landing_banners")
    .select("*")
    .limit(10)
    .order("created_at", { ascending: false })
}

export const getLandingBanners = async ({ supabase }: { supabase: SupabaseClient<Database> }) =>
  await getAndCacheQuery({supabase: supabase, query: getLandingBannersQuery})

