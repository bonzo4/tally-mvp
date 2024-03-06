import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export const feeAccounts = {
  mint: new PublicKey(process.env.USDC_MINT!),
  from: getAssociatedTokenAddressSync(
    new PublicKey(process.env.USDC_MINT!),
    new PublicKey(process.env.MANAGER_PUBLIC_KEY!)
  ),
  feeAccount: getAssociatedTokenAddressSync(
    new PublicKey(process.env.USDC_MINT!),
    new PublicKey(process.env.FEE_MANAGER_KEY!)
  ),
};
