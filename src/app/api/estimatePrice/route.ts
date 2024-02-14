import { NextRequest, NextResponse } from "next/server";

import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { estimateBuy } from "@/lib/estimatePrice";
import { BuyFormState } from "@/app/trade/[slug]/components/BuyCard";
import getUser from "@/lib/supabase/user";

export type BuyEstimate = {
  subMarketTitle: string;
  choiceMarketTitle: string;
  avgPrice: number;
  cumulativeDollars: number;
  cumulativeShares: number;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const supabase = createRouteSupabaseClient();
    const user = getUser(supabase);
    const txns: BuyFormState[] = await req.json();
    let resData: BuyEstimate[] = [];

    for (const txn of txns) {
      const { choiceMarketId, amount } = txn;
      if (!choiceMarketId || !amount) {
        continue;
      }
      const { avgPrice, cumulativeDollars, cumulativeShares } =
        await estimateBuy(supabase, choiceMarketId, amount);
      resData.push({
        subMarketTitle: txn.subMarketTitle,
        choiceMarketTitle: txn.choiceMarketTitle,
        avgPrice: avgPrice,
        cumulativeDollars: cumulativeDollars,
        cumulativeShares: cumulativeShares,
      });
    }
    return NextResponse.json(resData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
