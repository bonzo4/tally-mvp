"use server";

import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  getSubMarkets,
  SubMarketWithChoiceMarkets,
} from "@/lib/supabase/queries/markets/subMarkets";

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

function getPotSizes(
  subMarket: SubMarketWithChoiceMarkets,
  choiceMarketId: number
) {
  // get initial pot values
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
  const { cumulative, shareCount } = estimateBuyByDollars({
    amount,
    cumulative: 0,
    shareCount: 0,
    choicePot,
    totalPot,
  });
  const avgPrice = shareCount ? cumulative / shareCount : 0;
  console.log(
    "avgPrice",
    avgPrice,
    "cumulative",
    cumulative,
    "shareCount",
    shareCount
  );
  return { avgPrice, cumulative, shareCount };
}

function estimateBuyByDollars({
  amount,
  cumulative,
  shareCount,
  choicePot,
  totalPot,
}: {
  amount: number;
  cumulative: number;
  shareCount: number;
  choicePot: number;
  totalPot: number;
}) {
  let sharePrice = choicePot / totalPot;
  while (cumulative + sharePrice <= amount) {
    choicePot += sharePrice;
    totalPot += sharePrice;
    shareCount += 1;
    cumulative += sharePrice;
    sharePrice = choicePot / totalPot;
  }
  return { cumulative, shareCount };
}

export async function estimateSell({
  supabase,
  choiceMarketId,
  userId,
  amount,
}: {
  supabase: SupabaseClient<Database>;
  choiceMarketId: number;
  userId: number;
  amount: number;
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
  const { cumulative, shareCount } = estimateSellByDollars({
    amount,
    cumulative: 0,
    shareCount: 0,
    choicePot,
    totalPot,
    sharesHeld,
  });
  const avgPrice = shareCount ? cumulative / shareCount : 0;
  console.log(
    "avgPrice",
    avgPrice,
    "cumulative",
    cumulative,
    "shareCount",
    shareCount
  );
  return { avgPrice, cumulative, shareCount };
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
  let sharePrice = choicePot / totalPot;
  while (sharesHeld && cumulative + sharePrice <= amount) {
    choicePot -= sharePrice;
    totalPot -= sharePrice;
    shareCount += 1;
    sharesHeld -= 1;
    cumulative += sharePrice;
    sharePrice = choicePot / totalPot;
  }
  return { cumulative, shareCount };
}
