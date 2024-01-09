import { NextRequest, NextResponse } from "next/server";
import { getSubMarkets } from "@/lib/supabase/markets";
import { createRouteSupabaseClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();

    const data = await getSubMarkets({ supabase, options: {} });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error as string }, { status: 500 });
  }
}
