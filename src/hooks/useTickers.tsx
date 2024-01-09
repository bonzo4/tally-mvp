import { Ticker } from "@/lib/supabase/tickers";
import { Database } from "@/lib/types";
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tickers`);

      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        return;
      }

      setTickers(data);
      setLoading(false);
    };
    getTickers();
  }, [supabase, setLoading]);
  return tickers;
}
