import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";

import { FEE_RATE } from "@/lib/constants";
import {
  getSubMarkets,
  SubMarketWithChoiceMarkets,
} from "@/lib/supabase/queries/markets/subMarkets";
import { SubMarketWithHoldings } from "@/lib/supabase/queries/markets/tradeMarket";

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

export function getPotSizes(subMarket: SubMarket, choiceMarketId: number) {
  let totalPot = 0;
  let choicePot = 0;
  for (const choiceMarket of subMarket.choice_markets) {
    if (choiceMarket.id === choiceMarketId) {
      choicePot = choiceMarket.total_pot;
    }
    totalPot += choiceMarket.total_pot;
  }
  return {
    totalPot: totalPot,
    choicePot: choicePot,
  };
}

export function getSharePrice(subMarket: SubMarket, choiceMarketId: number) {
  const { choicePot, totalPot } = getPotSizes(subMarket, choiceMarketId);
  const sharePrice = calculateSharePrice({ choicePot, totalPot });
  return sharePrice;
}

function calculateSharePrice({
  choicePot,
  totalPot,
}: {
  choicePot: number;
  totalPot: number;
}) {
  return choicePot && totalPot ? choicePot / totalPot : 1;
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

  // get initial pot values
  const { totalPot, choicePot } = getPotSizes(subMarkets, choiceMarketId);

  // calculate total spend
  const { cumulativeDollars, cumulativeShares } = estimateBuyByDollars({
    amount,
    choicePot,
    totalPot,
  });
  const avgPrice = cumulativeShares ? cumulativeDollars / cumulativeShares : 0;

  const fees = estimateFees(cumulativeDollars);

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
  choicePot,
  totalPot,
}: {
  amount: number;
  choicePot: number;
  totalPot: number;
}) {
  let sharePrice = calculateSharePrice({ choicePot, totalPot });
  let cumulativeDollars = 0;
  let cumulativeShares = 0;
  while (cumulativeDollars + sharePrice <= amount) {
    choicePot += sharePrice;
    totalPot += sharePrice;
    cumulativeShares += 1;
    cumulativeDollars += sharePrice;
    sharePrice = calculateSharePrice({ choicePot, totalPot });
  }
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
  const subMarkets = (
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

  // get initial pot values
  const { totalPot, choicePot } = getPotSizes(subMarkets, choiceMarketId);

  // calculate total spend
  const { cumulativeDollars, cumulativeShares } = estimateSellByShares({
    cumulativeDollars: 0,
    cumulativeShares: 0,
    shares: shares,
    choicePot,
    totalPot,
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
  cumulativeDollars,
  cumulativeShares,
  shares,
  choicePot,
  totalPot,
  sharesHeld,
}: {
  cumulativeDollars: number;
  cumulativeShares: number;
  shares: number;
  sharesHeld: number;
  choicePot: number;
  totalPot: number;
}) {
  let sharePrice = calculateSharePrice({ choicePot, totalPot });
  while (sharesHeld && cumulativeShares < shares) {
    choicePot -= sharePrice;
    totalPot -= sharePrice;
    cumulativeShares += 1;
    sharesHeld -= 1;
    cumulativeDollars += sharePrice;
    sharePrice = calculateSharePrice({ choicePot, totalPot });
  }
  return { cumulativeDollars, cumulativeShares };
}

function estimateSellByDollars({
  amount,
  cumulative,
  shareCount,
  choicePot,
  totalPot,
  sharesHeld,
}: {
  amount: number;
  cumulative: number;
  shareCount: number;
  sharesHeld: number;
  choicePot: number;
  totalPot: number;
}) {
  let sharePrice = calculateSharePrice({ choicePot, totalPot });
  while (sharesHeld && cumulative + sharePrice <= amount) {
    choicePot -= sharePrice;
    totalPot -= sharePrice;
    shareCount += 1;
    sharesHeld -= 1;
    cumulative += sharePrice;
    sharePrice = calculateSharePrice({ choicePot, totalPot });
  }
  return { cumulative, shareCount };
}
