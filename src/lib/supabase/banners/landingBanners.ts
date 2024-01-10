import { Database } from "../../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from "@supabase/postgrest-js";
import { fetchQuery } from "../fetch";

export type LandingBanner =
  Database["public"]["Tables"]["landing_banners"]["Row"];

type GetLandingBannersQueryOptions = {};

type GetLandingBannersOptions = {
  supabase: SupabaseClient<Database>;
  options: GetLandingBannersQueryOptions;
};

const getLandingBannersQuery = async ({
  supabase,
}: GetLandingBannersOptions): Promise<PostgrestResponse<LandingBanner>> => {
  return await supabase
    .from("landing_banners")
    .select("*")
    .limit(10)
    .order("created_at", { ascending: false });
};

export const getLandingBanners = async ({
  supabase,
}: GetLandingBannersOptions) =>
  await fetchQuery<LandingBanner, GetLandingBannersQueryOptions>({
    supabase: supabase,
    query: getLandingBannersQuery,
    options: {},
  });
