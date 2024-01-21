import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";
import { fetchQuery } from "../fetch";

export type Category = Database["public"]["Tables"]["categories"]["Row"];

export type GetCategoriesQueryOptions = {};

type GetCategoriesOptions = {
  supabase: SupabaseClient<Database>;
  options: GetCategoriesQueryOptions;
};

async function getCategoriesQuery({
  supabase,
  options: {},
}: GetCategoriesOptions): Promise<PostgrestResponse<Category>> {
  let query = supabase.from("categories").select("*").limit(12);

  return await query;
}

export async function getCategories({
  supabase,
  options,
}: GetCategoriesOptions) {
  return await fetchQuery<Category, GetCategoriesQueryOptions>({
    supabase,
    options,
    query: getCategoriesQuery,
  });
}
