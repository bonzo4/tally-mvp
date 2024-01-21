import {
  MarketsBanner,
  getMarketsBanners,
} from "@/lib/supabase/queries/banners/marketsBanners";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();

    const landingBanners = await getMarketsBanners({ supabase, options: {} });

    const resData: MarketsBanner[] = landingBanners;

    return NextResponse.json(resData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
