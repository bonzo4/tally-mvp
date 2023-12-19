import "server-only";
import { cache } from "react";
import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { PostgrestResponse } from '@supabase/postgrest-js'

type QueryFunction<T> = (supabase: SupabaseClient<Database>) => Promise<PostgrestResponse<T>>;

export type GetCacheQueryProps<T> = {
  supabase: SupabaseClient<Database>;
  query: QueryFunction<T>;
};


export function getAndCacheQuery<T>({
  supabase,
  query,
}: GetCacheQueryProps<T>): Promise<T[]> {
  return cache(async () => {
    const { data, error } = await query(supabase);
    if (error) throw error;
    return data as T[];
  })();
}
