import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";

import idl from "./tally_clob.json";
import { TallyClob } from "./tally-clob-types";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

export function getTallyClob() {
  const programID = new PublicKey(
    "3DRCmEKEds4FUwZHYWuqfRqS8W5fpRaEYHzYbj7giQcj"
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

  const program = new Program(
    idl as Idl,
    programID,
    provider
  ) as unknown as Program<TallyClob>;

  return program;
}
