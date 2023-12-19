import { cookies } from "next/headers";
import Link from "next/link";
import { createServerClient } from "@supabase/ssr";

import { Database } from "@/lib/types";
import { convertDollarsToCents } from "@/lib/formats";
import { getTickers } from "@/lib/supabase/tickers";

import { FcBullish } from "react-icons/fc";
import { FcBearish } from "react-icons/fc";

interface TickerProps {
  choice: string;
  choice_market_id: number;
  share_price: number;
  direction: string;
}

function Ticker({ choice, choice_market_id, share_price, direction }: TickerProps) { 

  const href = `/markets/${choice_market_id}/`
  return (
    <Link href={href}>
      <div className="h-full flex justify-center items-center space-x-1">
        <div className="whitespace-nowrap">
          {choice}
        </div>
        <div>
          {convertDollarsToCents(share_price)}
        </div>
        <div>
          {direction === "up" ? <FcBullish /> : <FcBearish />}
        </div>
      </div>
    </Link>
  )
}

export default async function Tickers() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const tickers = await getTickers({ supabase });

  return (
    <div className="w-full flex justify-between items-center bg-purple-50 py-2 px-2 lg:px-5 space-x-3 overflow-scroll">
    {
      tickers.map(({ choice, choice_market_id, share_price, direction }, index) => {
        if (choice && choice_market_id && share_price && direction) {
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
      })
    }
    </div>
  )
}
