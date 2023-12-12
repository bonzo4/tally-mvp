import Link from "next/link";
import { Button } from "@/components/ui/button"

function Tickers() {
  return (
    <div className="w-full min-h-[5vh] bg-purple-50">
      <p>Tickers</p>
    </div>
  )
}

function Banner() {
  return (
    <div className="w-full min-h-[50vh] bg-orange-100">
      Banner
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
    <div>
      <h2 className="bg-purple-100 text-4xl font-bold">Live News Feed</h2>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="w-full">
      <Tickers />
      <Banner />
      <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 px-10 py-10">
        <div className="md:w-[60vw] space-y-5">
          <FairLaunch />
          <PredictionMarkets />
        </div>
        <div className="md:w-[40vw]">
          <LiveNewsFeed />
        </div>
      </div>
    </div>
  );
}
