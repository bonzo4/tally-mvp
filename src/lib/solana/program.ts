import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";

import { TallyClob, IDL } from "./tally-clob";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export function getTallyClob() {
  const programID = new PublicKey(
    "9XnGPkzHYqs4UbLi5NDTkterYnmXuiBQZkd2PtZKzQQP"
  );

  const keypair = new Keypair({
    publicKey: new PublicKey(process.env.MANAGER_WALLET_KEY!).toBytes(),
    secretKey: JSON.parse(process.env.MANAGER_WALLET_SECRET_KEY!),
  });
  //   const wallet = new Wallet(keypair);
  const wallet = new NodeWallet(keypair);
  const network = clusterApiUrl("devnet");
  const connection = new Connection(network);

  const provider = new AnchorProvider(connection, wallet, {});

  const program = new Program(IDL, programID, provider) as Program<TallyClob>;

  return program;
}
