import { NextRequest, NextResponse } from "next/server";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { getCalendar, getLastUpdated } from "@/lib/supabase/calendar";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();

    const calendar = await getCalendar({ supabase, options: {} });
    const lastUpdated = await getLastUpdated({ supabase, options: {} });

    return NextResponse.json(
      { calendar: calendar, lastUpdated: lastUpdated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error as string }, { status: 500 });
  }
}
