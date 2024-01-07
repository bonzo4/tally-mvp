import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { getMarketsBanners } from "@/lib/supabase/marketsBanners";

import Banner from "@/components/Banner";
import FairLaunchGallery from "./components/FairLaunchGallery";
import MarketsGallery from "./components/MarketsGallery";

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
      <div className="flex w-full flex-col">
        <FairLaunchGallery />
        <div className="px-4 py-5 pt-16 lg:px-16">
          <h2 className="text-4xl font-bold text-white">Prediction Markets</h2>
        </div>
        <MarketsGallery />
      </div>
    </div>
  );
}
