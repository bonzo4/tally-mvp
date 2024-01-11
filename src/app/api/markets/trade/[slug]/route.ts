import { PredictionMarketsWithSubMarkets } from "@/lib/supabase/markets/predictionMarkets";
import { getTradeMarkets } from "@/lib/supabase/markets/tradeMarket";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    const supabase = createRouteSupabaseClient();
    const data = await getTradeMarkets({ supabase, options: { slug } });

    const resData: PredictionMarketsWithSubMarkets = data[0];

    return NextResponse.json(resData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error as string }, { status: 500 });
  }
}
