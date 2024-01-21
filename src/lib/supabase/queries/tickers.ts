import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from "@supabase/postgrest-js";
import { fetchQuery } from "../fetch";

export type Ticker = Database["public"]["Tables"]["market_tickers"]["Row"];

type GetTickersQueryOptions = {};

type GetTickersOptions = {
  supabase: SupabaseClient<Database>;
  options: GetTickersQueryOptions;
};

const getTickersQuery = async ({
  supabase,
}: GetTickersOptions): Promise<PostgrestResponse<Ticker>> => {
  return await supabase
    .from("market_tickers")
    .select("*")
    .eq("active", true)
    .limit(10)
    .order("share_price", { ascending: false });
};

export const getTickers = async ({ supabase }: GetTickersOptions) =>
  await fetchQuery<Ticker, GetTickersQueryOptions>({
    supabase: supabase,
    query: getTickersQuery,
    options: {},
  });
