import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { getCategoryData } from "@/lib/api/data/categories";

import Banner from "@/components/Banner";
import MarketsGallery from "./components/MarketsGallery";
import { getMarketsBanners } from "@/lib/supabase/queries/banners/marketsBanners";

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

  const categories = await getCategoryData();
  const marketsBanners = await getMarketsBanners({ supabase, options: {} });

  return (
    <div className="w-full  pb-4 lg:pb-16">
      <Banner banners={marketsBanners} />
      <div className="flex w-full flex-col space-y-4">
        <div className="px-4 lg:px-16">
          <h2 className="text-4xl font-bold text-white">Prediction Markets</h2>
        </div>
        <MarketsGallery categories={["Top", "New 🎉", ...(categories || [])]} />
      </div>
    </div>
  );
}
