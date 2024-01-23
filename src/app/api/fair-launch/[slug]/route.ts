import { NextRequest, NextResponse } from "next/server";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { getSubMarkets, SubMarket } from "@/lib/supabase/markets/subMarkets";

export type { SubMarket };

export async function GET(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    const supabase = createRouteSupabaseClient();
    const data = await getSubMarkets({ supabase, options: { slug } });

    const resData: SubMarket = data[0];

    return NextResponse.json(resData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
