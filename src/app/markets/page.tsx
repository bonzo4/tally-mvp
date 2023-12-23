import { Database } from "@/lib/types";
import { getLandingBanners } from "@/lib/supabase/landingBanners";
import { getSubMarkets } from "@/lib/supabase/markets";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import Banner from "@/components/Banner";
import Tickers from "@/components/Tickers";
import { MarketTileProps, MarketTile } from "@/components/MarketTile";
import { getMarketsBanners } from "@/lib/supabase/marketsBanners";

const TEST_MARKET_TILE_DATA: MarketTileProps[] = [
  {
    title: "Will Trump win the Republican Nominee?",
    category: "Politics",
    image: "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-2.jpg",
    yesPrice: 50,
    noPrice: 50,
  },
  {
    title: "Will the USA confirm the existence of aliens?",
    category: "Science",
    image: "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-3.jpg",
    yesPrice: 1,
    noPrice: 99,
  },
  {
    title: "Will Shohei Ohtani join the Dodgers?",
    category: "Sports",
    image: "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg",
    yesPrice: 97,
    noPrice: 3,
  },
  {
    title: "Will Claudine Gay, Harvard college president who testified on antisemitism, stay through 2023?",
    category: "Politics",
    image: "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg",
    yesPrice: 97,
    noPrice: 3,
  },
  {
    title: "Will US inflation be >0.2% from Nov to Dec 2023?",
    category: "Economy",
    image: "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-4.jpg",
    yesPrice: 28,
    noPrice: 72,
  },
]

function MarketsGallery() {
  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-4xl font-bold text-white">Markets</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <MarketTile {...TEST_MARKET_TILE_DATA[0]}/>
        <MarketTile {...TEST_MARKET_TILE_DATA[1]}/>
        <MarketTile {...TEST_MARKET_TILE_DATA[2]}/>
        <MarketTile {...TEST_MARKET_TILE_DATA[3]}/>
        <MarketTile {...TEST_MARKET_TILE_DATA[4]}/>
        <MarketTile {...TEST_MARKET_TILE_DATA[0]}/>
        <MarketTile {...TEST_MARKET_TILE_DATA[0]}/>
      </div>
    </div>
  )
}

function FairLaunchTeaser() {
  return (
    <div className="w-full h-[180px] rounded-2xl bg-yellow-100">
    </div>
  )
}

function FairLaunchGallery() {
  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-4xl font-bold text-white">Fair Launch</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <FairLaunchTeaser />
        <FairLaunchTeaser />
        <FairLaunchTeaser />
        <FairLaunchTeaser />
        <FairLaunchTeaser />
        <FairLaunchTeaser />
        <FairLaunchTeaser />
      </div>
    </div>
  )
}

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
    <div className="w-full bg-black">
      <Tickers />
      <Banner banners={marketsBanners} />
      <div className="w-full flex flex-col space-y-5 p-4 lg:p-16">
        <FairLaunchGallery />
        <MarketsGallery />
      </div>
    </div>
  );
}
