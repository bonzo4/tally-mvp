import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { getLandingBanners } from "@/lib/supabase/landingBanners";
import { getMarketsBanners } from "@/lib/supabase/marketsBanners";
import { getSubMarkets } from "@/lib/supabase/markets";

import Banner from "@/components/Banner";
import FilterMarkets from "./components/FilterMarkets";
import { MarketTileProps, MarketTile } from "@/components/MarketTile";
import Tickers from "@/components/Tickers";

const TEST_MARKET_TILE_DATA: MarketTileProps[] = [
  {
    title: "Will Trump win the Republican Nominee?",
    category: "Politics",
    image:
      "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-2.jpg",
    yesPrice: 50,
    noPrice: 50,
  },
  {
    title: "Will the USA confirm the existence of aliens?",
    category: "Science",
    image:
      "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-3.jpg",
    yesPrice: 1,
    noPrice: 99,
  },
  {
    title: "Will Shohei Ohtani join the Dodgers?",
    category: "Sports",
    image:
      "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg",
    yesPrice: 97,
    noPrice: 3,
  },
  {
    title:
      "Will Claudine Gay, Harvard college president who testified on antisemitism, stay through 2023?",
    category: "Politics",
    image:
      "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg",
    yesPrice: 97,
    noPrice: 3,
  },
  {
    title: "Will US inflation be >0.2% from Nov to Dec 2023?",
    category: "Economy",
    image:
      "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-4.jpg",
    yesPrice: 28,
    noPrice: 72,
  },
];
function MarketsGallery() {
  return (
    <div className="w-full space-y-5">
      <div className="px-4 lg:px-16">
        <h2 className="text-4xl font-bold text-white">Prediction Markets</h2>
      </div>
      <div className="">
        <FilterMarkets />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-2 px-4 lg:px-16">
        <MarketTile {...TEST_MARKET_TILE_DATA[0]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[1]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[2]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[3]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[4]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[0]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[1]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[2]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[3]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[4]} />
      </div>
    </div>
  );
}

function FairLaunchTeaser() {
  return <div className="w-full h-[180px] rounded-2xl bg-yellow-100"></div>;
}

function FairLaunchGallery() {
  return (
    <div className="w-full space-y-5 px-4 lg:px-16">
      <div>
        <h2 className="text-4xl font-bold text-white">Fair Launch</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <MarketTile {...TEST_MARKET_TILE_DATA[0]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[1]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[2]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[3]} />
      </div>
    </div>
  );
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
    <div className="w-full bg-black pb-4 lg:pb-16">
      <Banner banners={marketsBanners} />
      <div className="w-full flex flex-col space-y-16">
        <FairLaunchGallery />
        <MarketsGallery />
      </div>
    </div>
  );
}
