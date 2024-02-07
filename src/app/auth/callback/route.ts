import { createWallet } from "@/lib/solana/wallet";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createRouteSupabaseClient();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo") || "/";

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data: userDoc } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!userDoc) {
    throw new Error("User not found");
  }

  const { data: wallet } = await supabase
    .from("proxy_wallets")
    .select("*")
    .eq("user_id", userDoc.id)
    .single();

  if (!wallet) {
    const walletKeys = createWallet();

    const { error } = await supabase.from("proxy_wallets").insert({
      user_id: userDoc.id,
      encrypted_secret_key: walletKeys.encryptedSecretKey,
      public_key: walletKeys.publicKeyString,
      unredeemable_balance: 5,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  return NextResponse.redirect(new URL(redirectTo, req.url));
}
