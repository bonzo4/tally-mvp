import { LandingBanner } from "@/lib/supabase/queries/banners/landingBanners";
import { fetchData } from "../../fetch";

export async function getLandingBannersData() {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/banners/landing`;
  const banners = await fetchData<LandingBanner[], {}>({
    url,
    options: {},
  });

  return banners;
}
