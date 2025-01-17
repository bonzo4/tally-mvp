import { getCategories } from "@/lib/supabase/queries/categories";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();
    const data = await getCategories({ supabase, options: {} });

    const resData: string[] = data.map((category) => category.name);

    return NextResponse.json(resData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
