import { getLandingBanners } from "@/lib/supabase/landingBanners";
import { createServerSupabaseClient } from "@/lib/supabase/server";

import Banner from "@/components/Banner";
import PredictionMarkets from "./components/PredictionMarkets";
import Promotions from "./components/Promotions";
import LiveNewsFeed from "./components/LiveNewsFeed";
import Insights from "./components/Insights";
import Guide from "./components/Guide";
import { PredictionMarketData } from "./api/markets/landing/route";

async function getLandingMarketCards() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/markets/landing`);
  return (await res.json()) as PredictionMarketData[];
}

export default async function LandingPage() {
  const supabase = createServerSupabaseClient();

  const predictionMarkets = await getLandingMarketCards();
  const landingBanners = await getLandingBanners({ supabase, options: {} });

  console.log(predictionMarkets);

  return (
    <div className="w-full">
      <Banner banners={landingBanners} />
      <div className="flex w-full flex-col space-y-12 py-10">
        <Promotions />
        <PredictionMarkets predictionMarkets={predictionMarkets} />
        <Insights />
        <LiveNewsFeed />
        <Guide />
      </div>
    </div>
  );
}
