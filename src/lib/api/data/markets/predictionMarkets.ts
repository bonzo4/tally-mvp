import { PredictionMarketData } from "@/app/api/markets/route";
import { fetchData } from "../../fetch";

export async function getPredictionMarkets(category: string = "Top") {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/markets?category=${category}`;
  const markets = await fetchData<PredictionMarketData, {}>({
    url,
    options: {},
  });
  return markets;
}
