import {
  LandingBanner,
  getLandingBanners,
} from "@/lib/supabase/banners/landingBanners";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();

    const landingBanners = await getLandingBanners({ supabase, options: {} });

    const resData: LandingBanner[] = landingBanners;

    return NextResponse.json(resData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error as string }, { status: 500 });
  }
}
