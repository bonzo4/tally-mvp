import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from "@supabase/postgrest-js";
import { fetchQuery } from "../fetch";

export type LeaderboardDaily =
  Database["public"]["Tables"]["leaderboard_daily"]["Row"];

export type LeaderboardWeekly =
  Database["public"]["Tables"]["leaderboard_weekly"]["Row"];

export type LeaderboardMonthly =
  Database["public"]["Tables"]["leaderboard_monthly"]["Row"];

export type LeaderboardAll =
  Database["public"]["Tables"]["leaderboard_all"]["Row"];

const mapParamToTable: Record<string, string> = {
  Day: "leaderboard_daily",
  Week: "leaderboard_weekly",
  Month: "leaderboard_monthly",
  All: "leaderboard_all",
};

interface LeaderboardOptions {
  filter?: string;
  order?: string;
}

interface LeaderboardQueryParams {
  supabase: SupabaseClient<Database>;
  options: LeaderboardOptions;
}

// PostgrestResponse<LeaderboardDaily>;

async function leaderboardQuery({
  supabase,
  options,
}: LeaderboardQueryParams): Promise<PostgrestResponse<LeaderboardDaily>> {
  let { filter = "Day", order = "volume" } = options;
  let table;
  if (!mapParamToTable[filter]) {
    table = "leaderboard_daily";
  } else {
    table = mapParamToTable[filter];
  }
  return await supabase
    .from(table)
    .select("*")
    .order(order, { ascending: false })
    .limit(15);
}

type LeaderboardTypeMap = {
  Day: LeaderboardDaily;
  Week: LeaderboardWeekly;
  Month: LeaderboardMonthly;
  All: LeaderboardAll;
};

export async function queryLeaderboard<K extends keyof LeaderboardTypeMap>(
  supabase: SupabaseClient<Database>,
  options: LeaderboardOptions
) {
  return await fetchQuery<LeaderboardDaily, LeaderboardOptions>({
    supabase: supabase,
    query: leaderboardQuery,
    options: options,
  });
}
