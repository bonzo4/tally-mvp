import { NextRequest, NextResponse } from "next/server";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { getTickers } from "@/lib/supabase/tickers";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();

    const data = await getTickers({ supabase, options: {} });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error as string }, { status: 500 });
  }
}
