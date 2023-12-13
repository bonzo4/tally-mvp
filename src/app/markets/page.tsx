import Link from "next/link";
import Image from "next/image";

import Banner from "@/components/landing/Banner";
import Tickers from "@/components/landing/Tickers";

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

interface MarketTeaserProps {
  title: string;
  category: string;
  image: string;
  yesPrice: number;
  noPrice: number;
}

function MarketTeaser({ title, category, image, yesPrice, noPrice }: MarketTeaserProps) {
  return (
    <div>
      <Link href="/">
        <div className="flex flex-col h-full border border-gray-100 rounded shadow space-y-2 p-3">
          <div className="flex space-x-3 w-full h-2/3">
            <div>
              <div className="relative w-[75px] h-[75px]">
                <Image 
                  src={image}
                  fill={true}
                  alt="test image"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-gray-600 text-xs">{category}</h2>
              <div className="justify-self-center overflow-clip">
                <h1 className="font-bold">{title}</h1>
              </div>
            </div>
          </div>
          <div className="flex w-full h-[50px] relative space-x-1">
            <div style={{ width: `${yesPrice}%` }} className="bg-green-100 h-full rounded-l"></div>
            <div style={{ width: `${noPrice}%` }} className="bg-red-100 h-full rounded-r"></div>

            <div className="absolute top-0 left-0 w-full h-full flex items-center px-2">
              <span className="text-green-600 font-semibold whitespace-nowrap absolute left-2">
                Yes: {yesPrice}¢
              </span>
              <span className="text-red-600 font-semibold whitespace-nowrap absolute right-2">
                No: {noPrice}¢
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

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
      <div className="w-full flex flex-col space-y-5 px-3 py-3 lg:px-10 lg:py-10">
        <FairLaunchGallery />
        <MarketsGallery />
      </div>
    </div>
  );
}
