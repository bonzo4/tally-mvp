import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

export type UserDoc = Database["public"]["Tables"]["users"]["Row"];

type GetUserOptions = {
  supabase: SupabaseClient<Database>;
  userId: string;
};

export async function getUser({
  supabase,
  userId,
}: GetUserOptions): Promise<UserDoc> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) {
    throw error;
  }

  return data;
}
