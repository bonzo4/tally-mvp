import { Database } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { queryLeaderboard } from "@/lib/supabase/leaderboard";

export type Leaderboard =
  Database["public"]["Tables"]["leaderboard_daily"]["Row"];

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const filter = searchParams.get("filter") ?? "Day";
  const order = searchParams.get("order") ?? "volume";

  try {
    const supabase = createRouteSupabaseClient();
    const data = await queryLeaderboard(supabase, {
      filter: filter,
      order: order,
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
