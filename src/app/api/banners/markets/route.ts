import {
  MarketsBanner,
  getMarketsBanners,
} from "@/lib/supabase/banners/marketsBanners";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();

    const landingBanners = await getMarketsBanners({ supabase, options: {} });

    const resData: MarketsBanner[] = landingBanners;

    return NextResponse.json(resData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error as string }, { status: 500 });
  }
}
