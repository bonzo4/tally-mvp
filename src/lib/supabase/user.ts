import { SupabaseClient } from "@supabase/supabase-js";
import { getUser as getUserQuery } from "@/lib/supabase/queries/user";

export default async function getUser(supabase: SupabaseClient) {
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw Error(error.message);
  }

  const user = authUser
    ? await getUserQuery({
        supabase: supabase,
        options: { userId: authUser.id },
      })
    : null;

  if (!user) {
    throw Error("AuthError: User could not be found.");
  }
  return user;
}
