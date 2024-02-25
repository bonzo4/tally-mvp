import { NextRequest, NextResponse } from "next/server";

import { createRouteSupabaseClient } from "@/lib/supabase/server";
import getUser from "@/lib/supabase/user";
import { getUserBalance } from "@/lib/supabase/queries/userBalance";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const supabase = createRouteSupabaseClient();
    const user = await getUser(supabase);
    const userBalance = await getUserBalance({
      supabase: supabase,
      options: { userId: user.id },
    });

    const resData = {
      userBalance: userBalance.unredeemable_balance + userBalance.usdc_balance,
    };

    return NextResponse.json(resData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
