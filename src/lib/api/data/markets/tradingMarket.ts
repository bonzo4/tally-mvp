import { PredictionMarketsWithSubMarkets } from "@/lib/supabase/queries/markets/predictionMarkets";
import { fetchData } from "../../fetch";

export async function getTradingMarketData(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/markets/trade/${slug}`;
  const market = await fetchData<PredictionMarketsWithSubMarkets, {}>({
    url,
    options: {},
  });

  return market;
}
