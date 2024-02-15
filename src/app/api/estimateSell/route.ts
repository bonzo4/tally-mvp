import { NextRequest, NextResponse } from "next/server";

import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { estimateSell } from "@/lib/estimatePrice";
import getUser from "@/lib/supabase/user";

import { SellFormState } from "@/app/trade/[slug]/components/SellCard";
import { Estimate } from "@/app/trade/[slug]/components/Popup";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const supabase = createRouteSupabaseClient();
    const user = await getUser(supabase);
    const txns: SellFormState = await req.json();
    let resData: Estimate[] = [];

    for (const key of Object.keys(txns)) {
      const txn = txns[Number(key)];
      const { choiceMarketId, shares } = txn;
      if (!choiceMarketId || !shares) {
        continue;
      }
      const { avgPrice, cumulativeDollars, cumulativeShares } =
        await estimateSell({
          supabase: supabase,
          choiceMarketId: choiceMarketId,
          userId: user.id,
          shares: shares,
        });
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
