import { getCategories } from "@/lib/supabase/categories";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteSupabaseClient();
    const data = await getCategories({ supabase, options: {} });

    const resData: string[] = data.map((category) => category.name);

    return NextResponse.json(resData, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
