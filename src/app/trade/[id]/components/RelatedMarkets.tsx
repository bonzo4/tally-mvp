import { MarketTile, MarketTileProps } from "@/components/MarketTile";

const TEST_MARKET_TILE_DATA: MarketTileProps[] = [
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
]

export default function RelatedMarkets() {
  return (
    <div className="w-full flex flex-col space-y-5">
      <div>
        <h2 className="text-3xl text-white font-bold">Related Markets</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <MarketTile {...TEST_MARKET_TILE_DATA[0]}/>
        <MarketTile {...TEST_MARKET_TILE_DATA[1]}/>
        <MarketTile {...TEST_MARKET_TILE_DATA[2]}/>
      </div>
    </div>
  )
}

