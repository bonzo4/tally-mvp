"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Tickers } from "@/lib/supabase/tickers";
import TickerCarousel from './TickerCarousel';
import { convertDollarsToCents } from "@/lib/formats";

import { IconContext } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsTriangleFill } from "react-icons/bs";


interface TickerProps {
  choice: string;
  choice_market_id: number;
  share_price: number;
  direction: string | null;
}

function Ticker({
  choice,
  choice_market_id,
  share_price,
  direction,
}: TickerProps) {
  const href = `/markets/${choice_market_id}/`;
  return (
    <IconContext.Provider value={{ className: "opacity-50" }}>
      <Link href={href}>
        <div className="h-full min-w-[200px] flex justify-center items-center space-x-2">
          <div className="whitespace-nowrap font-medium">{choice}</div>
          { direction ?  <div>{direction === "up" ? <BsTriangleFill /> :  <BsTriangleFill className="rotate-180" />}</div> : null }
          <div>{convertDollarsToCents(share_price)}</div>
        </div>
      </Link>
    </IconContext.Provider>
  );
}

function useTickers(
  supabase: SupabaseClient<Database>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [tickers, setTickers] = useState<Tickers[]>([]);
  useEffect(() => {
    const getTickers = async () => {
      const { data, error } = await supabase
        .from("market_tickers")
        .select("*")
        .eq("active", true)
        .order("share_price", { ascending: false })
        .limit(10);
      if (error) console.log("error", error);
      else setTickers(data);
    };
    getTickers();
    setLoading(false);
  }, [supabase, setLoading]);
  return tickers;
}

export default function Tickers() {
  const [loading, setLoading] = useState(true);


  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const tickers = useTickers(supabase, setLoading);

  // framer-motion-ticker library needs tickers.length or will crash
  if (loading || !tickers.length) {
    return (
      <div className="w-full justify-center items-center bg-purple-50 py-2 px-2 lg:px-5 space-x-3 overflow-hidden">
        <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between items-center bg-primary py-3 space-x-3 overflow-auto">
      <TickerCarousel duration={20}>
        {tickers.map(({ choice, choice_market_id, share_price, direction }, index) => {
          if (choice && choice_market_id && share_price) {
            return (
              <Ticker
                key={index}
                choice={choice}
                choice_market_id={choice_market_id}
                share_price={share_price}
                direction={direction}
              />
            )
          }
        })}
      </TickerCarousel>
    </div>
  );
}
