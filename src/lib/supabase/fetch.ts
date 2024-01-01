"use server";

import { cache } from "react";
import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";

type QueryFunction<T> = (
  supabase: SupabaseClient<Database>
) => Promise<PostgrestResponse<T>>;

export type FetchQueryProps<T> = {
  supabase: SupabaseClient<Database>;
  query: QueryFunction<T>;
};

export async function fetchQuery<T>({
  supabase,
  query,
}: FetchQueryProps<T>): Promise<T[]> {
  return cache(async () => {
    const { data, error } = await query(supabase);

    if (error) throw error;
    return data as T[];
  })();
}
