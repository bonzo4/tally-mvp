import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";
import { createBrowserClient } from "@supabase/ssr";

export function createClientSupabaseClient(): SupabaseClient<Database> {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
