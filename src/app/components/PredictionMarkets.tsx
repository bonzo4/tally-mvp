import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MarketTileProps, MarketTile } from "@/components/MarketTile";
import { SubMarket } from "@/lib/supabase/markets";

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

type PrediciontMarketProps = {
  subMarkets: SubMarket[];
};

export default function PredictionMarkets({
  subMarkets,
}: PrediciontMarketProps) {
  return (
    <div className="space-y-5">
      <div className="flex">
        <Link href="/markets">
          <h2 className="text-4xl font-bold hover:underline">
            Prediction Markets
          </h2>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MarketTile {...TEST_MARKET_TILE_DATA[0]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[1]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[2]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[3]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[4]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[0]} />
        <MarketTile {...TEST_MARKET_TILE_DATA[0]} />
      </div>
      <div>
        <Link href="/markets">
          <Button>View All</Button>
        </Link>
      </div>
    </div>
  );
}
