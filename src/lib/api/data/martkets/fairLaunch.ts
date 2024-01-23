import { fetchData } from "../../fetch";
import { SubMarketWithChoiceMarket } from "@/lib/supabase/queries/markets/subMarkets";

export async function getFairLaunch(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/fair-launch/${slug}`;
  const res = await fetchData(url);

  if (res.status !== 200) {
    console.error("Failed to fetch the API:" + url);
    return null;
  }
  return (await res.json()) as SubMarket;
}
