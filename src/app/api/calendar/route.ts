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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
