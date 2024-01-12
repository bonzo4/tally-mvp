import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";
import { fetchQuery } from "./fetch";

export type UserDoc = Database["public"]["Tables"]["users"]["Row"];

type GetUserQueryOptions = {
  userId: string;
};

type GetUserOptions = {
  supabase: SupabaseClient<Database>;
  options: GetUserQueryOptions;
};

async function getUserQuery({
  supabase,
  options: { userId },
}: GetUserOptions): Promise<PostgrestResponse<UserDoc>> {
  return await supabase.from("users").select("*").eq("user_id", userId);
}

export async function getUser({ supabase, options }: GetUserOptions) {
  return (
    await fetchQuery<UserDoc, GetUserQueryOptions>({
      supabase,
      options,
      query: getUserQuery,
    })
  )[0];
}
