import {
  LandingBanner,
  getLandingBanners,
} from "@/lib/supabase/queries/banners/landingBanners";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();

    const landingBanners = await getLandingBanners({ supabase, options: {} });

    const resData: LandingBanner[] = landingBanners;

    return NextResponse.json(resData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
