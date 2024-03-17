import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export const feeAccounts = {
  mint: new PublicKey(process.env.USDC_MINT!),
  fromUsdcAccount: getAssociatedTokenAddressSync(
    new PublicKey(process.env.USDC_MINT!),
    new PublicKey(process.env.MANAGER_WALLET_KEY!)
  ),
  feeUsdcAccount: getAssociatedTokenAddressSync(
    new PublicKey(process.env.USDC_MINT!),
    new PublicKey(process.env.FEE_MANAGER_KEY!)
  ),
};
