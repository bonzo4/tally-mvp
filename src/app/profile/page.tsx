import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserDoc, getUser } from "@/lib/supabase/queries/user";

import DisplayPicture from "./components/DisplayPicture";
import Overview from "./components/Overview";
import Account from "./components/Account";
import Rankings from "./components/Ranking";
import Tables from "./components/Activities";

export default async function Profile() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  const user = await getUser({
    supabase: supabase,
    options: { userId: authUser.id },
  });

  console.log("authUser", authUser);
  console.log("user", user);

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center space-y-12 pb-16 pt-8">
        <div className="flex w-full flex-col items-center justify-between space-y-8 px-4 lg:flex-row lg:space-y-0 lg:px-16">
          <div className="flex w-full items-center">
            <DisplayPicture image={user.icon} />
            <Overview user={user} />
          </div>
          <Account />
        </div>
        <Rankings />
        <div className="w-full px-4 lg:px-16">
          <Tables />
        </div>
      </div>
    </div>
  );
}
