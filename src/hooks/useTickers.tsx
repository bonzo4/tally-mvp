import { getTickersData } from "@/lib/api/data/tickers";
import { Ticker } from "@/lib/supabase/queries/tickers";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type useTickersOptions = {
  supabase: SupabaseClient<Database>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useTickers({ supabase, setLoading }: useTickersOptions) {
  const [tickers, setTickers] = useState<Ticker[]>([]);
  useEffect(() => {
    const getTickers = async () => {
      const data = await getTickersData();

      setTickers(data || []);
      setLoading(false);
    };
    getTickers();
  }, [supabase, setLoading]);
  return tickers;
}
