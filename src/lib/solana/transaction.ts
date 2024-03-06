import {
  Connection,
  Keypair,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

type SendTransactionsOptions = {
  connection: Connection;
  transactions: TransactionInstruction[];
  signer: Keypair;
};

export async function sendTransactions({
  connection,
  transactions,
  signer,
}: SendTransactionsOptions): Promise<string> {
  const tx = new Transaction().add(...transactions);

  return await sendAndConfirmTransaction(connection, tx, [signer]);
}
