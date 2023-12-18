import Tickers from "@/components/Tickers";
import Banner from "@/components/Banner";
import FairLaunch from "./components/FairLaunch";
import PredictionMarkets from "./components/PredictionMarkets";
import LiveNewsFeed from "./components/LiveNewsFeed";
import Insights from "./components/Insights";
import Guide from "./components/Guide";
import { SubMarket, getSubMarketsDocs } from "@/lib/supabase/markets";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types";

async function getSubMarkets({
  supabase,
}: {
  supabase: SupabaseClient<Database>;
}): Promise<SubMarket[]> {
  const data = await getSubMarketsDocs({ supabase, table: "sub_markets" });
  return data;
  // const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/markets/landing");
  // const data = await res.json();
  // return data as SubMarket[];
}

export default async function LandingPage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const subMarkets = await getSubMarkets({ supabase });

  return (
    <div className="w-full">
      <Tickers />
      <Banner />
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
