"use server";

import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

type QueryFunctionOptions<T> = {
  supabase: SupabaseClient<Database>;
  options: T;
};

type QueryFunction<T, Options> = ({
  supabase,
  options,
}: QueryFunctionOptions<Options>) => Promise<PostgrestResponse<T>>;

export type FetchQueryProps<T, Options> = {
  supabase: SupabaseClient<Database>;
  query: QueryFunction<T, Options>;
  options: Options;
};

export async function fetchQuery<T, Options>({
  supabase,
  query,
  options,
}: FetchQueryProps<T, Options>): Promise<T[]> {
  const { data, error } = await query({ supabase, options });

  if (error) {
    throw error;
  }
  return data as T[];
}
