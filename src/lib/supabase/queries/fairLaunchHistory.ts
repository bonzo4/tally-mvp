import { Color } from "@/lib/cssMaps";
import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";
import { fetchQuery } from "../fetch";

export type FairLaunchHistory =
  Database["public"]["Tables"]["fair_launch_order"]["Row"] & {
    choice_markets: {
      title: string;
      color: Color | null;
      sub_markets: { title: string } | null;
    } | null;
  };

type GetFairLaunchHistoryQueryOptions = {
  userId: number;
};

type GetFairLaunchHistoryOptions = {
  supabase: SupabaseClient<Database>;
  options: GetFairLaunchHistoryQueryOptions;
};

async function getFairLaunchHistoryQuery({
  supabase,
  options: { userId },
}: GetFairLaunchHistoryOptions): Promise<PostgrestResponse<FairLaunchHistory>> {
  return await supabase
    .from("fair_launch_order")
    .select("*, choice_markets(title, color, sub_markets(title))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

export async function getFairLaunchHistory({
  supabase,
  options,
}: GetFairLaunchHistoryOptions) {
  return await fetchQuery<FairLaunchHistory, GetFairLaunchHistoryQueryOptions>({
    supabase,
    options,
    query: getFairLaunchHistoryQuery,
  });
}
