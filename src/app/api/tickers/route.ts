import { NextRequest, NextResponse } from "next/server";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { getTickers } from "@/lib/supabase/queries/tickers";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();

    const data = await getTickers({ supabase, options: {} });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
