"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

import { Database } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Ticker } from "@/lib/supabase/tickers";
import TickerCarousel from "./TickerCarousel";
import { convertDollarsToCents } from "@/lib/formats";

import { IconContext } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsTriangleFill } from "react-icons/bs";
import { useTickers } from "@/hooks/useTickers";

interface TickerProps {
  choice: string;
  choice_market_id: number;
  share_price: number;
  direction: string | null;
}

function TickerCell({
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
          {direction ? (
            <div>
              {direction === "up" ? (
                <BsTriangleFill />
              ) : (
                <BsTriangleFill className="rotate-180" />
              )}
            </div>
          ) : null}
          <div>{convertDollarsToCents(share_price)}</div>
        </div>
      </Link>
    </IconContext.Provider>
  );
}

export default function Tickers() {
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const tickers = useTickers({ supabase, setLoading });

  // framer-motion-ticker library needs tickers.length or will crash
  if (loading || !tickers.length) {
    return (
      <div className="w-full h-[48px] flex justify-center items-center bg-tally-primary py-3 space-x-3 overflow-auto">
        <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
        {""}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between items-center bg-tally-primary py-3 space-x-3 overflow-auto">
      <TickerCarousel duration={20}>
        {tickers.map(
          ({ choice, choice_market_id, share_price, direction }, index) => {
            if (choice && choice_market_id && share_price) {
              return (
                <TickerCell
                  key={index}
                  choice={choice}
                  choice_market_id={choice_market_id}
                  share_price={share_price}
                  direction={direction}
                />
              );
            }
          }
        )}
      </TickerCarousel>
    </div>
  );
}
