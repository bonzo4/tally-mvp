import { fetchData } from "../fetch";
import { Ticker } from "@/lib/supabase/queries/tickers";

export async function getTickersData() {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/tickers`;
  const tickers = await fetchData<Ticker[], {}>({
    url,
    options: {},
  });

  return tickers;
}
