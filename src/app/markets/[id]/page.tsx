import Image from "next/image";

import Tickers from "@/components/landing/Tickers";
import { MarketTeaser, MarketTeaserProps } from "@/components/MarketTeaser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BannerTitle() {
  return (
    <div className="justify-center items-center">
      <h1 className="text-3xl md:text-5xl text-green-500 font-bold text-center lg:text-left">TOTAL POT: $0.00</h1>
      <h1 className="text-3xl md:text-5xl text-white font-bold text-center lg:text-left">WHO WILL WIN THE 2024 PRESIDENTIAL ELECTION?</h1>
    </div>
  )
}

function BannerYesContainer() {
  return (
    <div className="bg-green-500 flex flex-col space-y-2 border border-black rounded p-3">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">Yes</h1>
        </div>
        <div className="">
          <Input className="w-40 ml-5"/>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">$.50</h1>
        </div>
        <div className="flex justify-end self-end">
          <Button>Buy</Button>
        </div>
      </div>
    </div>
  )
}

function BannerNoContainer() {
  return (
    <div className="bg-red-500 flex flex-col space-y-2 border border-black rounded p-3">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">No</h1>
        </div>
        <div className="">
          <Input className="w-40 ml-5"/>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">$.50</h1>
        </div>
        <div className="flex justify-end self-end">
          <Button>Buy</Button>
        </div>
      </div>
    </div>
  )
}

function Banner() {
  return (
    <div className="bg-gray-500 w-full min-h-[60vh] flex justify-center items-center p-3 lg:pt-[10vh] pb-[12vh]">
    <div className="lg:w-[70vw] flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-3 justify-center items-center">
      <BannerTitle />
      <div className="h-full flex flex-col space-y-5">
        <BannerYesContainer />
        <BannerNoContainer />
      </div>
    </div>
    </div>
  )
}

function CountdownUnit({ value, unit }: { value: number, unit: string}) {
  return (
    <div className="bg-white border border-black p-5 flex flex-col items-center">
      <div>
        <h1 className="text-3xl md:text-7xl font-bold text-center">{value}</h1>
      </div>
      <div className="flex justify-center">
        <span className="text-sm md:text-lg text-center">{unit}</span>
      </div>
    </div>
  )
}

function Countdown() {
  return (
    <div className="relative w-full bg-red-100 h-[15vh] lg:h-[15vw] flex justify-center">
      <div className="absolute bg-white border border-black min-w-[70vw] min-h-[120px] h-[20vw] lg:h-[12vw] -top-[10vh] z-10 flex justify-center p-4">
        <div className="relative">
          <h1 className="text-2xl md:text-4xl font-bold text-center">FAIR LAUNCH COUNTDOWN</h1>
          <div className="relative min-w-[50vw] min-h-[10vh] z-20 grid grid-cols-4 gap-2 md:gap-5 p-2 lg:p-4">
            <CountdownUnit value={15} unit={"DAYS"}/>
            <CountdownUnit value={22} unit={"HOURS"}/>
            <CountdownUnit value={43} unit={"MINUTES"}/>
            <CountdownUnit value={38} unit={"SECONDS"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

function Instruction() {
  return (
    <div className="flex lg:flex-row justify-between border border-gray-200 shadow p-2">
      <div className="flex justify-center items-center p-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus elit in eros scelerisque, aliquet facilisis orci accumsan. Vestibulum porta dapibus nisi in cursus. Sed hendrerit vehicula nunc a ultricies. Sed justo lorem, tincidunt ac quam et, rhoncus pharetra orci. Curabitur sed mattis ipsum. Integer at ornare nibh. Donec et sem vitae augue malesuada hendrerit vitae vitae lacus. Nam a mattis est, sit amet interdum sem. Pellentesque ut neque eget sem tincidunt vestibulum non eu odio. Pellentesque hendrerit volutpat lorem nec commodo.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="relative w-[15vw] h-[15vw]">
          <Image 
            src= "https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-3.jpg"
            fill={true}
            alt="test image"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

function HowItWorks() {
  return (
    <div className="w-full flex flex-col items-center space-y-5 py-5">
      <h2 className="text-4xl font-bold">HOW IT WORKS</h2>
      <div className="flex flex-col space-y-4">
          <Instruction />
          <Instruction />
          <Instruction />
          <Instruction />
          <Instruction />
      </div>
    </div>
  )
}

function PredictNow() {
  return (
    <div className="w-full flex justify-center items-center pb-5">
      <Button>Predict Now</Button>
    </div>
  )
}

function OtherMarkets() {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <MarketTeaser {...TEST_MARKET_TEASER_DATA[0]}/>
      <MarketTeaser {...TEST_MARKET_TEASER_DATA[1]}/>
      <MarketTeaser {...TEST_MARKET_TEASER_DATA[2]}/>
    </div>
  )
}

export default function MarketPage({ params }: { params: { id: number } }) {
  const id = params.id // to get url param

    const TEST_MARKET_STATUS = {
      1: {
        status: "fairLaunch"
      },
      2: {
        status: "trading",
        yesPot: 68000,
        yesPrice: 68,
        noPot: 32000,
        noPrice: 32,
        winner: true
      },
      3: {
        status: "frozen",
        yesPot: 84000,
        yesPrice: 42,
        noPot: 98000,
        noPrice: 58,
        leading: false
      },
      4: {
        status: "resolution",
        yesPot: 84000,
        yesPrice: 1.21,
        noPot: 98000,
        noPrice: 0,
        leading: true
      },
    }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Tickers />
      <Banner />
      <Countdown />
      <div className="lg:w-[70vw] h-full flex flex-col justify-center items-center px-2 lg:px-0 pb-5">
        <HowItWorks />
        <PredictNow />
        <OtherMarkets />
      </div>
    </div>
  );
}
