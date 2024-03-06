import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import CryptoJS from "crypto-js";

type CreateWalletReturn = {
  publicKeyString: string;
  encryptedSecretKey: string;
};

export function createWallet(_connection: Connection): CreateWalletReturn {
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

export function getManagerKeyPair(): Keypair {
  return new Keypair({
    publicKey: new PublicKey(process.env.MANAGER_WALLET_KEY!).toBytes(),
    secretKey: JSON.parse(process.env.MANAGER_WALLET_SECRET_KEY!),
  });
}
