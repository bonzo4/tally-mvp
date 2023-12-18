import { cache } from "react";
import "server-only";
import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";

export type CreateGetItemsProps = {
  table: keyof Database["public"]["Tables"];
  supabase: SupabaseClient<Database>;
};

export function preload(props: CreateGetItemsProps): void {
  void getItems(props);
}

export function getItems<T>({
  supabase,
  table,
}: CreateGetItemsProps): Promise<T[]> {
  return cache(async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw error;
    return data as T[];
  })();
}
