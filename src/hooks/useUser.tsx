import { Database } from "@/lib/types";
import { UserDoc, getUser } from "@/lib/user";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type UseUserOptions = {
  supabase: SupabaseClient<Database>;
  user: User | null;
};

export function useUser({ supabase, user }: UseUserOptions): UserDoc | null {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;

      const userDoc = await getUser({ supabase, userId: user.id });

      setUserDoc(userDoc);
    };
    fetchUser();
  }, [supabase, user]);

  return userDoc;
}
