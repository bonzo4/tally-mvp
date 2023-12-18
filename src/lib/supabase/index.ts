import { cache } from "react";
import "server-only";
import { Database } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";

export type GetItemsProps = {
  table: keyof Database["public"]["Tables"];
  supabase: SupabaseClient<Database>;
};

export type GetRecentLimitItemsProps = {
  table: keyof Database["public"]["Tables"];
  supabase: SupabaseClient<Database>;
  limit: number;
};

export function preload(props: GetItemsProps): void {
  void getItems(props);
}

export function getItems<T>({
  supabase,
  table,
}: GetItemsProps): Promise<T[]> {
  return cache(async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw error;
    return data as T[];
  })();
}

export function getRecentLimitItems<T>({ 
  supabase, 
  table,
  limit,
}: GetRecentLimitItemsProps): Promise<T[]> {
  return cache(async () => {
    const { data, error } = await supabase.from(table).select("*").limit(limit).order("created_at", { ascending: false });
    if (error) throw error;
    return data as T[];
  })();
}
