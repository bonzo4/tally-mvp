import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getFairLaunchHistory } from "@/lib/supabase/queries/fairLaunchHistory";
import { getHoldings, Holdings } from "@/lib/supabase/queries/holdings";
import { getUserBalance } from "@/lib/supabase/queries/userBalance";
import { getRankByVolume } from "@/lib/supabase/queries/rank/volume";
import { getTradeHistory } from "@/lib/supabase/queries/tradeHistory";
import { getUser } from "@/lib/supabase/queries/user";

import DisplayPicture from "./components/DisplayPicture";
import Overview from "./components/Overview";
import Account from "./components/Account";
import Rankings from "./components/Ranking";
import Tables from "./components/Tables";

function countUniqueSubMarkets(arr: Holdings[]) {
  let mapObj = new Map();

  arr.forEach((holding) => {
    if (!holding.choice_markets) return;
    let alreadyExists = mapObj.get(holding.choice_markets.sub_market_id);
    if (!alreadyExists) {
      mapObj.set(holding.choice_markets.sub_market_id, holding);
    }
  });
  return Array.from(mapObj.values()).length;
}

function countUniqueFairLaunches(arr: Holdings[]) {
  arr = arr.filter((holding) => holding.fair_launch_shares);

  let mapObj = new Map();

  arr.forEach((holding) => {
    if (!holding.choice_markets) return;
    let alreadyExists = mapObj.get(holding.choice_markets.sub_market_id);
    if (!alreadyExists) {
      mapObj.set(holding.choice_markets.sub_market_id, holding);
    }
  });
  return Array.from(mapObj.values()).length;
}

function calculatePNL(holdings: Holdings[]) {
  return holdings.reduce((acc, holding) => {
    return (
      acc +
      holding.total_sell_value -
      (holding.total_buy_value / holding.shares_bought) * holding.shares_sold
    );
  }, 0);
}

function calculatePortfolio(holdings: Holdings[]) {
  return holdings.reduce((acc, holding) => {
    if (!holding.choice_markets) return acc;
    return acc + holding.shares * holding.choice_markets.share_price;
  }, 0);
}

export default async function Profile() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  const user = await getUser({
    supabase: supabase,
    options: { userId: authUser.id },
  });

  const userBalances = await getUserBalance({
    supabase: supabase,
    options: { userId: user.id },
  });

  const holdings = await getHoldings({
    supabase: supabase,
    options: { userId: user.id },
  });

  const tradeHistory = await getTradeHistory({
    supabase: supabase,
    options: { userId: user.id },
  });

  const fairLaunchHistory = await getFairLaunchHistory({
    supabase: supabase,
    options: { userId: user.id },
  });

  const volumeAndRank = await getRankByVolume({
    supabase: supabase,
    options: { userId: user.id },
  });

  const balance = userBalances.unredeemable_balance + userBalances.usdc_balance;
  const volume = holdings.reduce((acc, holding) => {
    return acc + holding.total_sell_value + holding.total_sell_value;
  }, 0);
  const markets = countUniqueSubMarkets(holdings);
  const fairLaunches = countUniqueFairLaunches(holdings);
  const pnl = calculatePNL(holdings);
  const portfolio = calculatePortfolio(holdings);

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center space-y-12 pb-16 pt-8">
        <div className="flex w-full flex-col items-center justify-between space-y-8 px-4 lg:flex-row lg:space-y-0 lg:px-16">
          <div className="flex w-full items-center">
            <DisplayPicture image={user.icon} />
            <Overview user={user} />
          </div>
          <Account balance={balance} portfolio={portfolio} userId={user.id} />
        </div>
        <Rankings
          portfolio={portfolio}
          fairLaunches={fairLaunches}
          markets={markets}
          pnl={pnl}
          volumeAndRank={volumeAndRank}
        />
        <div className="w-full ">
          <Tables
            tradeHistory={tradeHistory}
            fairLaunchHistory={fairLaunchHistory}
            portfolio={holdings.filter((holding) => holding.shares > 0)}
          />
        </div>
      </div>
    </div>
  );
}
