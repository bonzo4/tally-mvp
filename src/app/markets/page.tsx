
import Banner from "@/components/landing/Banner";
import Tickers from "@/components/landing/Tickers";
import { MarketTeaserProps, MarketTeaser } from "@/components/MarketTeaser";

const TEST_MARKET_TEASER_DATA: MarketTeaserProps[] = [
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
        <h2 className="text-4xl font-bold">Markets</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <MarketTeaser {...TEST_MARKET_TEASER_DATA[0]}/>
        <MarketTeaser {...TEST_MARKET_TEASER_DATA[1]}/>
        <MarketTeaser {...TEST_MARKET_TEASER_DATA[2]}/>
        <MarketTeaser {...TEST_MARKET_TEASER_DATA[3]}/>
        <MarketTeaser {...TEST_MARKET_TEASER_DATA[4]}/>
        <MarketTeaser {...TEST_MARKET_TEASER_DATA[0]}/>
        <MarketTeaser {...TEST_MARKET_TEASER_DATA[0]}/>
      </div>
    </div>
  )
}

function FairLaunchTeaser() {
  return (
    <div className="w-full h-[15vw] bg-yellow-100">
    </div>
  )
}

function FairLaunchGallery() {
  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-4xl font-bold">Fair Launch</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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

export default function MarketsPage() {
  return (
    <div className="w-full">
      <Tickers />
      <Banner />
      <div className="w-full flex flex-col space-y-5 p-3 lg:p-10">
        <FairLaunchGallery />
        <MarketsGallery />
      </div>
    </div>
  );
}
