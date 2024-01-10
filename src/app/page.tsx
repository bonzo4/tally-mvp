import Banner from "@/components/Banner";
import PredictionMarkets from "./components/PredictionMarkets";
import Promotions from "./components/Promotions";
import LiveNewsFeed from "./components/LiveNewsFeed";
import Insights from "./components/Insights";
import Guide from "./components/Guide";
import {
  getBlogs,
  getCategoryData,
  getLandingBannersData,
  getLandingMarketCards,
} from "@/lib/api";

export default async function LandingPage() {
  const categories = await getCategoryData();
  const predictionMarkets = await getLandingMarketCards();
  const landingBanners = await getLandingBannersData();
  const blogs = await getBlogs();

  return (
    <div className="w-full">
      <Banner banners={landingBanners} />
      <div className="flex w-full flex-col space-y-12 py-10">
        <Promotions />
        <PredictionMarkets
          predictionMarkets={predictionMarkets}
          categories={["Top", "New 🎉", ...categories]}
        />
        <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0">
          <Insights blogs={blogs} />
          <LiveNewsFeed />
        </div>

        <Guide />
      </div>
    </div>
  );
}
