import { MarketsBanner } from "@/lib/supabase/queries/banners/marketsBanners";
import { fetchData } from "../../fetch";

export async function getMarketBannersData() {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/banners/market`;
  const banners = await fetchData<MarketsBanner[], {}>({
    url,
    options: {},
  });

  return banners;
}
