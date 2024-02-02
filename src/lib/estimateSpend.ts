import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { getSubMarkets } from "@/lib/supabase/queries/markets/subMarkets";

export async function estimateSpend(
  supabase: SupabaseClient<Database>,
  subMarketId: number,
  choiceMarketId: number,
  amount: number
) {
  // get slug
  const { data, error } = await supabase
    .from("sub_markets")
    .select("slug")
    .eq("id", subMarketId);
  if (!data) {
    throw new Error("Submarket not found");
  }
  const slug = data[0].slug;

  // get submarket data
  const subMarkets = (
    await getSubMarkets({ supabase, options: { slug: slug } })
  )[0];

  // get initial pot values
  let totalPot = 0;
  let choicePot = 0;
  for (const choiceMarket of subMarkets.choice_markets) {
    if (choiceMarket.id === choiceMarketId) {
      choicePot = choiceMarket.total_pot;
    }
    totalPot += choiceMarket.total_pot;
  }

  // calculate total spend
  const { cumulative, shareCount } = estimateSpendByDollars({
    amount,
    cumulative: 0,
    shareCount: 0,
    choicePot,
    totalPot,
  });
  const avgPrice = shareCount ? cumulative / shareCount : 0;
  return { avgPrice, cumulative, shareCount };
}

function estimateSpendByDollars({
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
