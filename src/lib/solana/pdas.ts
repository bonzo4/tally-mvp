import { Program, utils } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { TallyClob } from "./tally-clob-types";

export function getUserPDA(
  userKey: PublicKey,
  program: Program<TallyClob>
): PublicKey {
  const [userPDA, _] = PublicKey.findProgramAddressSync(
    [utils.bytes.utf8.encode("users"), userKey.toBuffer()],
    program.programId
  );

  return userPDA;
}

export function getMarketPDA(
  marketKey: PublicKey,
  program: Program<TallyClob>
): PublicKey {
  const [userPDA, _] = PublicKey.findProgramAddressSync(
    [utils.bytes.utf8.encode("markets"), marketKey.toBuffer()],
    program.programId
  );

  return userPDA;
}

export function getMarketPortfolioPDA(
  marketKey: PublicKey,
  userKey: PublicKey,
  program: Program<TallyClob>
): PublicKey {
  const [marketPortfolioPDA, _] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode("market_portfolios"),
      marketKey.toBuffer(),
      userKey.toBuffer(),
    ],
    program.programId
  );

  return marketPortfolioPDA;
}
