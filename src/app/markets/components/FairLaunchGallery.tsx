import { MarketTileProps, MarketTile } from "@/components/MarketTile";

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
    category: "Education",
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

function FairLaunchTeaser() {
  return <div className="h-[180px] w-full rounded-2xl bg-yellow-100"></div>;
}

export default function FairLaunchGallery() {
  return (
    <div className="w-full space-y-5 px-4 lg:px-16">
      <div>
        <h2 className="text-4xl font-bold text-white">Fair Launch</h2>
      </div>
      <div className="flex space-x-5 overflow-x-auto md:gap-2 md:space-x-0 xl:grid xl:grid-cols-4">
        {TEST_MARKET_TILE_DATA.map((market, index) => {
          return (
            <MarketTile
              key={index}
              className={"min-w-[80%] md:min-w-[40%]"}
              {...market}
            />
          );
        })}
      </div>
    </div>
  );
}
