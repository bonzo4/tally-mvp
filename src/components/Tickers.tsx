"use client";
import Link from "next/link";

import TickerCarousel from "./TickerCarousel";
import { convertDollarsToCents } from "@/lib/formats";

import { IconContext } from "react-icons";
import { BsTriangleFill } from "react-icons/bs";
import { Ticker } from "@/lib/supabase/tickers";
import { cn } from "@/lib/utils";

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
  const directionColor = direction
    ? direction === "up"
      ? "text-[#46FF9B]"
      : "text-[#FF6F6F]"
    : "text-white";
  return (
    <IconContext.Provider value={{ className: "" }}>
      <Link href={href}>
        <div className="flex h-full min-w-[200px] flex-row items-center justify-center space-x-[6px]">
          <div className=" text-[16px] font-medium text-white">{choice}</div>
          {direction ? (
            <div className={cn(directionColor, "mt-0.5")}>
              {direction === "up" ? (
                <BsTriangleFill size={12} />
              ) : (
                <BsTriangleFill size={12} className="rotate-180" />
              )}
            </div>
          ) : null}
          <span className={cn(directionColor, "text-[16px] font-normal")}>
            {convertDollarsToCents(share_price)}
          </span>
        </div>
      </Link>
    </IconContext.Provider>
  );
}

type TickersProps = {
  tickers: Ticker[];
};

export default function Tickers({ tickers }: TickersProps) {
  return (
    <div className="flex w-full items-center justify-between space-x-3 overflow-auto bg-[#232427] py-3">
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
