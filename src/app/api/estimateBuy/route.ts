import { NextRequest, NextResponse } from "next/server";

import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { estimateBuy } from "@/lib/estimatePrice";
import { BuyFormState } from "@/app/trade/[slug]/components/BuyCard";
import getUser from "@/lib/supabase/user";

export type Estimate = {
  subMarketId: number;
  subMarketTitle: string;
  choiceMarketId: number;
  choiceMarketTitle: string;
  tradeSide: "BUY" | "SELL";
  avgPrice: number;
  cumulativeDollars: number;
  cumulativeShares: number;
  fees: number;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const supabase = createRouteSupabaseClient();
    const user = await getUser(supabase);
    const txns: BuyFormState[] = await req.json();
    let resData: Estimate[] = [];

    for (const txn of txns) {
      const { choiceMarketId, amount } = txn;
      if (!choiceMarketId || !amount) {
        continue;
      }
      const { avgPrice, cumulativeDollars, cumulativeShares, fees } =
        await estimateBuy(supabase, choiceMarketId, amount);
      resData.push({
        subMarketId: txn.subMarketId,
        subMarketTitle: txn.subMarketTitle,
        choiceMarketId: txn.choiceMarketId,
        choiceMarketTitle: txn.choiceMarketTitle,
        tradeSide: "BUY",
        avgPrice: avgPrice,
        cumulativeDollars: cumulativeDollars,
        cumulativeShares: cumulativeShares,
        fees: fees,
      });
    }

    return NextResponse.json(resData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
