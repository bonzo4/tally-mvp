import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";

import { FEE_RATE } from "@/lib/constants";
import {
  getSubMarkets,
  SubMarketWithChoiceMarkets,
} from "@/lib/supabase/queries/markets/subMarkets";
import { SubMarketWithHoldings } from "@/lib/supabase/queries/markets/tradeMarket";
import { quadraticFormula } from "@/lib/quadraticFormula";

type SubMarket = SubMarketWithChoiceMarkets | SubMarketWithHoldings;

async function getSlugFromChoiceMarketId(
  supabase: SupabaseClient<Database>,
  choiceMarketId: number
) {
  const { data, error } = await supabase
    .from("choice_markets")
    .select("sub_markets(slug)")
    .eq("id", choiceMarketId);
  if (error) {
    throw new Error(error.message);
  }
  if (!data[0].sub_markets) {
    throw new Error("Submarket not found");
  }
  return data[0].sub_markets.slug;
}

function estimateFees(amount: number) {
  return amount * FEE_RATE;
}

export async function estimateBuy(
  supabase: SupabaseClient<Database>,
  choiceMarketId: number,
  amount: number
) {
  const slug = await getSlugFromChoiceMarketId(supabase, choiceMarketId);

  const subMarkets = (
    await getSubMarkets({ supabase, options: { slug: slug } })
  )[0];

  // estimate fees
  const fees = estimateFees(amount);

  // calculate total spend
  const { cumulativeDollars, cumulativeShares } = estimateBuyByDollars({
    amount: amount - fees,
    choiceMarketId: choiceMarketId,
    subMarket: subMarkets,
  });
  const avgPrice = cumulativeShares ? cumulativeDollars / cumulativeShares : 0;

  console.log(
    "avgPrice",
    avgPrice,
    "cumulativeDollars",
    cumulativeDollars,
    "cumulativeShares",
    cumulativeShares,
    "fees",
    fees
  );

  return { avgPrice, cumulativeDollars, cumulativeShares, fees };
}

function estimateBuyByDollars({
  amount,
  choiceMarketId,
  subMarket,
}: {
  amount: number;
  choiceMarketId: number;
  subMarket: SubMarketWithChoiceMarkets;
}) {
  const invariant = subMarket.invariant;
  const sharesInMM1 = subMarket.choice_markets.filter(
    (choiceMarket) => choiceMarket.id === choiceMarketId
  )[0].shares_in_mm;
  const sharesInMM2 = subMarket.choice_markets.filter(
    (choiceMarket) => choiceMarket.id !== choiceMarketId
  )[0].shares_in_mm;

  const cumulativeDollars = amount;
  const cumulativeShares =
    sharesInMM1 + amount - invariant / (sharesInMM2 + amount);

  return { cumulativeDollars, cumulativeShares };
}

export async function estimateSell({
  supabase,
  choiceMarketId,
  userId,
  shares,
}: {
  supabase: SupabaseClient<Database>;
  choiceMarketId: number;
  userId: number;
  shares: number;
}) {
  // get slug
  const slug = await getSlugFromChoiceMarketId(supabase, choiceMarketId);

  // get submarket data
  const subMarket = (
    await getSubMarkets({ supabase, options: { slug: slug } })
  )[0];

  // get holdings data
  const { data: holdings, error: _ } = await supabase
    .from("holdings")
    .select("shares")
    .eq("user_id", userId)
    .eq("choice_market_id", choiceMarketId);

  if (!holdings) {
    throw new Error("Holdings not found");
  }
  const sharesHeld = holdings[0].shares;

  // calculate total spend
  const { cumulativeDollars, cumulativeShares } = estimateSellByShares({
    choiceMarketId,
    subMarket,
    shares,
    sharesHeld,
  });
  const avgPrice = cumulativeShares ? cumulativeDollars / cumulativeShares : 0;
  const fees = estimateFees(cumulativeDollars);
  console.log(
    "avgPrice",
    avgPrice,
    "cumulative dollars",
    cumulativeDollars,
    "cumulative shares",
    cumulativeShares,
    "fees",
    fees
  );
  return { avgPrice, cumulativeDollars, cumulativeShares, fees };
}

function estimateSellByShares({
  shares,
  choiceMarketId,
  subMarket,
  sharesHeld,
}: {
  shares: number;
  choiceMarketId: number;
  subMarket: SubMarketWithChoiceMarkets;
  sharesHeld: number;
}) {
  const invariant = subMarket.invariant;
  const sharesInMM1 = subMarket.choice_markets.filter(
    (choiceMarket) => choiceMarket.id === choiceMarketId
  )[0].shares_in_mm;
  const sharesInMM2 = subMarket.choice_markets.filter(
    (choiceMarket) => choiceMarket.id !== choiceMarketId
  )[0].shares_in_mm;

  const cumulativeShares = shares;
  const roots = quadraticFormula(
    1,
    -(sharesInMM1 + shares + sharesInMM2),
    (sharesInMM1 + shares) * sharesInMM2 - invariant
  );
  // TODO: Better way of ensuring the correct root is selected?
  const root = roots
    .filter((root) => root >= 0)
    .filter((root) => root <= sharesInMM1 + shares)[0];
  const cumulativeDollars = root;

  return { cumulativeDollars, cumulativeShares };
}
