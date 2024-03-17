import {
  Connection,
  Keypair,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { web3 } from "@coral-xyz/anchor";

type SendTransactionsOptions = {
  connection: Connection;
  transactions: TransactionInstruction[];
  signer: Keypair;
};

export async function sendTransactions({
  connection,
  transactions,
  signer,
}: SendTransactionsOptions): Promise<void> {
  const additionalComputeBudgetInstruction =
    web3.ComputeBudgetProgram.setComputeUnitLimit({
      units: 1_400_000,
    });
  const tx = new Transaction()
    .add(additionalComputeBudgetInstruction)
    .add(...transactions);

  await sendAndConfirmTransaction(connection, tx, [signer]).catch((err) => {
    console.error(err);
    throw new Error(err.message);
  });

  return;
}
