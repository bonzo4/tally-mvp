import { getLandingBanners } from "@/lib/supabase/landingBanners";
import { getSubMarkets } from "@/lib/supabase/markets";
import { createServerSupabaseClient } from "@/lib/supabase/server";

import Tickers from "@/components/Tickers";
import Banner from "@/components/Banner";
import FairLaunch from "./components/FairLaunch";
import PredictionMarkets from "./components/PredictionMarkets";
import LiveNewsFeed from "./components/LiveNewsFeed";
import Insights from "./components/Insights";
import Guide from "./components/Guide";

export default async function LandingPage() {
  const supabase = createServerSupabaseClient();

  const subMarkets = await getSubMarkets({ supabase });
  const landingBanners = await getLandingBanners({ supabase });

  return (
    <div className="w-full">
      <Banner banners={landingBanners} />
      <div className="w-full flex flex-col space-y-5 px-10 py-10">
        <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <div className="md:w-[60vw] space-y-5">
            <FairLaunch />
            <PredictionMarkets subMarkets={subMarkets} />
          </div>
          <div className="md:w-[40vw]">
            <LiveNewsFeed />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <div className="md:w-[60vw] space-y-5">
            <Insights />
          </div>
          <div className="md:w-[40vw]">
            <Guide />
          </div>
        </div>
      </div>
    </div>
  );
}
