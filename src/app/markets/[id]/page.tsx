import Tickers from "@/components/Tickers";
import Banner from "./components/Banner";
import Countdown from "./components/Countdown";
import HowItWorks from "./components/HowItWorks";
import ActionItem from "./components/ActionItem";
import OtherMarkets from "./components/OtherMarkets";

const TEST_MARKET_STATUS: { status: string; image: string }[] = [
  {
    status: "fairLaunch",
    image:
      "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg",
  },
  {
    status: "trading",
    image:
      "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-2.jpg",
  },
  {
    status: "frozen",
    image:
      "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-3.jpg",
  },
  {
    status: "resolution",
    image:
      "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-4.jpg",
  },
];

export default function MarketPage({ params }: { params: { id: number } }) {
  const id = params.id; // to get url param
  const page_props = TEST_MARKET_STATUS[id];

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Banner {...page_props} />
      <Countdown {...page_props} />
      <div className="lg:w-[70vw] h-full flex flex-col justify-center items-center px-2 lg:px-0 pb-5">
        <HowItWorks />
        <ActionItem {...page_props} />
        <OtherMarkets />
      </div>
    </div>
  );
}
