import { MarketTeaser, MarketTeaserProps } from "@/components/MarketTeaser";

const TEST_MARKET_TEASER_DATA: MarketTeaserProps[] = [
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

export default function OtherMarkets() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <MarketTeaser {...TEST_MARKET_TEASER_DATA[0]}/>
      <MarketTeaser {...TEST_MARKET_TEASER_DATA[1]}/>
      <MarketTeaser {...TEST_MARKET_TEASER_DATA[2]}/>
    </div>
  )
}
