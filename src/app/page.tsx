import Tickers from "@/components/landing/Tickers"
import Banner from "@/components/landing/Banner"
import FairLaunch from "@/components/landing/FairLaunch"
import PredictionMarkets from "@/components/landing/PredictionMarkets"
import LiveNewsFeed from "@/components/landing/LiveNewsFeed"
import Insights from "@/components/landing/Insights"
import Guide from "@/components/landing/Guide"

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
