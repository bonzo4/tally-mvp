import { NextRequest, NextResponse } from "next/server";
import { getPriceHistory } from "@/lib/supabase/queries/markets/priceHistory";
import { createRouteSupabaseClient } from "@/lib/supabase/server";

import { TimeFrame } from "@/lib/supabase/queries/markets/priceHistory";

// Function to check if a string is a valid TimeFrame
function isValidTimeFrame(value: string): value is TimeFrame {
  const validTimeFrames: TimeFrame[] = [
    "1 hour",
    "1 day",
    "1 week",
    "1 month",
    "all",
  ];
  return validTimeFrames.includes(value as TimeFrame);
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    const timeFrame = searchParams.get("timeFrame");

    if (!slug || !timeFrame || !isValidTimeFrame(timeFrame)) {
      throw new Error("Both slug and timeFrame are required.");
    }
    const resData = await getPriceHistory({
      supabase: supabase,
      options: { slug, timeFrame },
    });
    return NextResponse.json(resData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
