import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import BannerCarousel from "@/components/BannerCarousel"

function Tickers() {
  return (
    <div className="w-full min-h-[8vh] bg-purple-50">
      <p>Tickers</p>
    </div>
  )
}

function Banner() {
  return (
    <div className="w-full min-h-[50vh] flex flex-col bg-orange-100">
      <BannerCarousel />
    </div>
  )
}

function FairLaunch() {
  return(
    <div className="space-y-5">
      <div>
        <h2 className="text-4xl font-bold">Fair Launch</h2>
      </div>
      <div className="bg-yellow-100 h-[50vw] md:h-[30vw]">
      </div>
    </div>
  )
}

function Markets() {
  return (
    <div className="bg-green-100 h-[30vw] md:h-[10vw]">
    </div>
  )
}

function PredictionMarkets() {
  return(
    <div className="space-y-5">
      <div>
        <h2 className="text-4xl font-bold">Prediction Markets</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Markets />
        <Markets />
        <Markets />
        <Markets />
        <Markets />
        <Markets />
        <Markets />
        <Markets />
      </div>
      <div>
        <Link href="/">
          <Button>View All</Button>
        </Link>
      </div>
    </div>
  )
}

function LiveNewsFeed() {
  return(
    <div className="flex flex-col h-[80vh] md:h-full space-y-5">
      <div>
        <h2 className="text-4xl font-bold">Live News Feed</h2>
      </div>
      <div className="bg-purple-100 flex-1">
      </div>
    </div>
  )
}

function Insight() {
  return (
    <div>
      <Link href="/">
        <div className="bg-pink-200 flex w-full h-[20vh]">
          <div className="relative h-full w-1/4">
            <Image 
              src="https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg" 
              fill={true}
              alt="test image"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col space-y-2 justify-center w-3/4 h-full p-3">
            <div>
              <h3 className="text-2xl font-bold">Insight Title</h3>
            </div>
            <div className="w-full overflow-hidden">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et eros id massa dictum semper. Vestibulum quis tortor a sem lacinia finibus quis et est. Nulla suscipit diam ac interdum aliquam.
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

function Insights() {
  return (
    <div className="flex flex-col h-full space-y-5">
      <div>
        <h3 className="text-2xl">The Latest</h3>
        <h2 className="text-4xl font-bold">Insights</h2>
      </div>
      <div className="space-y-5">
        <Insight />
        <Insight />
        <Insight />
        <Insight />
      </div>
      <Link href="/">
        <Button>View All</Button>
      </Link>
    </div>
  )
}

function Guide() {
  return (
    <div className="flex flex-col h-[80vh] md:h-full space-y-5">
      <div>
        <h2 className="text-4xl font-bold">Guide</h2>
      </div>
      <div className="bg-blue-100 flex-1">
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="w-full">
      <Tickers />
      <Banner />
      <div className="w-full flex flex-col space-y-5 px-10 py-10">
        <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <div className="md:w-[60vw] space-y-5">
            <FairLaunch />
            <PredictionMarkets />
          </div>
          <div className="md:w-[40vw]">
            <LiveNewsFeed />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <div className="md:w-[60vw] space-y-5">
            <Insights />
          </div>
          <div className="md:w-[40vw]">
            <Guide />
          </div>
        </div>
      </div>
    </div>
  );
}
