import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types";
import { fetchQuery } from "../../fetch";

export type RankByVolume = {
  total_volume: number;
  rank: number;
};

type GetRankByVolumeQueryOptions = {
  userId: number;
};

type GetRankByVolumeOptions = {
  supabase: SupabaseClient<Database>;
  options: GetRankByVolumeQueryOptions;
};

async function getRankByVolumeQuery({
  supabase,
  options: { userId },
}: GetRankByVolumeOptions): Promise<PostgrestResponse<RankByVolume>> {
  return await supabase.rpc("rank_users_by_volume").eq("user_id", userId);
}

export async function getRankByVolume({
  supabase,
  options,
}: GetRankByVolumeOptions) {
  return (
    await fetchQuery<RankByVolume, GetRankByVolumeQueryOptions>({
      supabase,
      options,
      query: getRankByVolumeQuery,
    })
  )[0];
}
