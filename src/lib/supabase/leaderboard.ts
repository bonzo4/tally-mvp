import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from "@supabase/postgrest-js";
import { fetchQuery } from "./fetch";

export type LeaderboardDaily =
  Database["public"]["Tables"]["leaderboard_daily"]["Row"];

const mapParamToTable: Record<string, string> = {
  Day: "leaderboard_daily",
  Week: "leaderboard_weekly",
  Month: "leaderboard_monthly",
  All: "leaderboard_all",
};

interface LeaderboardDailyOptions {
  table?: string;
  order?: string;
}

interface LeaderboardDailyQuery {
  supabase: SupabaseClient<Database>;
  options: LeaderboardDailyOptions;
}

async function leaderboardDailyQuery({
  supabase,
  options,
}: LeaderboardDailyQuery): Promise<PostgrestResponse<LeaderboardDaily>> {
  let { table = "Day", order = "volume" } = options;
  if (!mapParamToTable[table]) {
    table = "Day";
  } else {
    table = mapParamToTable[table];
  }
  return await supabase
    .from(table)
    .select("*")
    .order(order, { ascending: false })
    .limit(15);
}

export async function getLeaderboardDaily(
  supabase: SupabaseClient<Database>,
  options: LeaderboardDailyOptions
) {
  return await fetchQuery<LeaderboardDaily, LeaderboardDailyOptions>({
    supabase: supabase,
    query: leaderboardDailyQuery,
    options: options,
  });
}
