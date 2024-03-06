import { createNewSolanaConnection } from "@/lib/solana/connection";
import { getUserPDA } from "@/lib/solana/pdas";
import { getTallyClob } from "@/lib/solana/program";
import { sendTransactions } from "@/lib/solana/transaction";
import { createWallet, getManagerKeyPair } from "@/lib/solana/wallet";
import { createRouteSupabaseClient } from "@/lib/supabase/server";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
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
    .from("user_balances")
    .select("*")
    .eq("user_id", userDoc.id)
    .single();

  if (!wallet) {
    const connection = createNewSolanaConnection({ type: "devnet" });

    const walletKeys = createWallet(connection);

    const program = getTallyClob();
    const managerWallet = getManagerKeyPair();
    const userPDA = getUserPDA(
      new PublicKey(walletKeys.publicKeyString),
      program
    );

    const initWalletTx = await program.methods
      .initWallet(new PublicKey(walletKeys.publicKeyString))
      .signers([managerWallet])
      .accounts({ user: userPDA, signer: managerWallet.publicKey })
      .instruction()
      .catch((err) => console.log(err));
    const addToWalletTx = await program.methods
      .addToBalance(new BN(1000 * Math.pow(10, 9)))
      .signers([managerWallet])
      .accounts({ user: userPDA, signer: managerWallet.publicKey })
      .instruction();

    if (!initWalletTx || !addToWalletTx) {
      throw new Error("Error creating transaction");
    }

    await sendTransactions({
      connection: program.provider.connection,
      transactions: [initWalletTx, addToWalletTx],
      signer: managerWallet,
    });

    const { error } = await supabase.from("user_balances").insert({
      user_id: userDoc.id,
      public_key: walletKeys.publicKeyString,
      usdc_balance: 1000,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  return NextResponse.redirect(new URL(redirectTo, req.url));
}
