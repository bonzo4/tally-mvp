import { Keypair } from "@solana/web3.js";
import { createNewSolanaConnection } from "./connection";
import CryptoJS from "crypto-js";

type CreateWalletReturn = {
  publicKeyString: string;
  encryptedSecretKey: string;
};

export function createWallet(): CreateWalletReturn {
  createNewSolanaConnection({ type: "devnet" });

  const { publicKey, secretKey } = Keypair.generate();

  const publicKeyString = publicKey.toBase58();

  const encryptedSecretKey = CryptoJS.AES.encrypt(
    secretKey.toString(),
    process.env.WALLET_SECRET_KEY_SEED!
  ).toString();

  return {
    publicKeyString,
    encryptedSecretKey,
  };
}
