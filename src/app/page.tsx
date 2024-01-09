import { getLandingBanners } from "@/lib/supabase/landingBanners";
import { getSubMarkets } from "@/lib/supabase/markets";
import { createServerSupabaseClient } from "@/lib/supabase/server";

import Banner from "@/components/Banner";
import PredictionMarkets from "./components/PredictionMarkets";
import Promotions from "./components/Promotions";
import LiveNewsFeed from "./components/LiveNewsFeed";
import Insights from "./components/Insights";
import Guide from "./components/Guide";

export default async function LandingPage() {
  const supabase = createServerSupabaseClient();

  const subMarkets = await getSubMarkets({ supabase, options: {} });
  const landingBanners = await getLandingBanners({ supabase, options: {} });

  return (
    <div className="w-full">
      <Banner banners={landingBanners} />
      <div className="flex w-full flex-col space-y-12 py-10">
        <Promotions />
        <PredictionMarkets subMarkets={subMarkets} />
        <Insights />
        <LiveNewsFeed />
        <Guide />
      </div>
    </div>
  );
}
