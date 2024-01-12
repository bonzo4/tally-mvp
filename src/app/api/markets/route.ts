import { NextRequest, NextResponse } from "next/server";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { getPredictionMarketCards } from "@/lib/supabase/markets/predictionMarkets";

export type PredictionMarketData = {
  id: number;
  title: string;
  category: string | null;
  image: string;
  totalPot: number;
  totalComments: number;
  subMarkets: {
    icon: string;
    title: string;
    prices: {
      title: string;
      price: number;
    }[];
  }[];
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const category = searchParams.get("category") ?? undefined;
  const limit = searchParams.get("limit") ?? undefined;

  try {
    const supabase = createRouteSupabaseClient();

    const data = await getPredictionMarketCards({
      supabase,
      options: { category, limit: Number(limit) },
    });

    const resData: PredictionMarketData[] = data
      .filter((market) => market.sub_markets.length)
      .map((market) => {
        const subMarkets = market.sub_markets.map((subMarket) => {
          const prices = subMarket.choice_markets.map((choiceMarket) => ({
            title: choiceMarket.title,
            price: choiceMarket.share_price,
          }));

          return {
            icon: subMarket.icon,
            title: subMarket.card_title || subMarket.title,
            prices,
          };
        });

        return {
          id: market.id,
          title: market.title,
          category: market.category,
          image: market.thumbnail,
          totalPot: market.total_pot,
          totalComments: market.total_comments,
          subMarkets,
        };
      });

    return NextResponse.json(resData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
