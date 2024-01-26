import Banner from "@/components/Banner";
import PredictionMarkets from "./components/PredictionMarkets";
import Promotions from "./components/Promotions";
import LiveNewsFeed from "./components/LiveNewsFeed";
import Insights from "./components/Insights";
import Guide from "./components/Guide";
import { getCategoryData } from "@/lib/api/data/categories";
import { getLandingBannersData } from "@/lib/api/data/banners/landingBanners";
import { getBlogs } from "@/lib/api/data/blogs";
import { preload } from "@/lib/api/fetch";

export default async function LandingPage() {
  const dataFuncs = [getCategoryData, getLandingBannersData, getBlogs];

  preload(dataFuncs);

  const categories = await getCategoryData();
  const landingBanners = await getLandingBannersData();
  const blogs = await getBlogs({ limit: 5 });

  return (
    <div className="w-full">
      <Banner banners={landingBanners || []} />
      <div className="flex w-full flex-col space-y-12 py-10">
        <Promotions />
        <PredictionMarkets
          categories={["Top", "New 🎉", ...(categories || [])]}
        />
        <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0">
          <Insights blogs={blogs || []} />
          <LiveNewsFeed />
        </div>

        <Guide />
      </div>
    </div>
  );
}
