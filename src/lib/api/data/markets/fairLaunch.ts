import { fetchData } from "../../fetch";
import { SubMarketWithChoiceMarkets } from "@/lib/supabase/queries/markets/subMarkets";

export async function getFairLaunch(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/fair-launch/${slug}`;
  const subMarket = await fetchData<
    SubMarketWithChoiceMarkets,
    { slug: string }
  >({
    url,
    options: { slug: slug },
  });

  return subMarket;
}
