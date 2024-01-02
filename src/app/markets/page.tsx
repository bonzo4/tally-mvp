import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { getLandingBanners } from "@/lib/supabase/landingBanners";
import { getMarketsBanners } from "@/lib/supabase/marketsBanners";
import { getSubMarkets } from "@/lib/supabase/markets";

import Banner from "@/components/Banner";
import FairLaunchGallery from "./components/FairLaunchGallery";
import MarketsGallery from "./components/MarketsGallery";

import Tickers from "@/components/Tickers";

export default async function MarketsPage() {
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

  const marketsBanners = await getMarketsBanners({ supabase });

  return (
    <div className="w-full bg-black pb-4 lg:pb-16">
      <Banner banners={marketsBanners} />
      <div className="w-full flex flex-col space-y-16">
        <FairLaunchGallery />
        <MarketsGallery />
      </div>
    </div>
  );
}
