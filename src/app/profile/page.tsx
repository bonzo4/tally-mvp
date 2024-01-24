import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getHoldings, Holdings } from "@/lib/supabase/queries/holdings";
import { getProxyWallet } from "@/lib/supabase/queries/proxyWallet";
import { getUser } from "@/lib/supabase/queries/user";

import DisplayPicture from "./components/DisplayPicture";
import Overview from "./components/Overview";
import Account from "./components/Account";
import Rankings from "./components/Ranking";
import Tables from "./components/Activities";

function countUniqueSubMarkets(arr: Holdings[]) {
  let mapObj = new Map();

  arr.forEach((holding) => {
    let alreadyExists = mapObj.get(holding.choice_markets.sub_market_id);
    if (!alreadyExists) {
      mapObj.set(holding.choice_markets.sub_market_id, holding);
    }
  });
  return Array.from(mapObj.values()).length;
}

function countUniqueFairLaunches(arr: Holdings[]) {
  arr = arr.filter((holding) => holding.participated_in_fair_launch);

  let mapObj = new Map();

  arr.forEach((holding) => {
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

  const proxyWallet = await getProxyWallet({
    supabase: supabase,
    options: { userId: user.id },
  });

  const holdings = await getHoldings({
    supabase: supabase,
    options: { userId: user.id },
  });

  console.log("authUser", authUser);
  console.log("user", user);
  console.log("proxyWallet", proxyWallet);
  console.log("holdings", holdings);

  const balance = proxyWallet.unredeemable_balance + proxyWallet.usdc_balance;
  const volume = holdings.reduce((acc, holding) => {
    return acc + holding.total_sell_value + holding.total_sell_value;
  }, 0);
  const markets = countUniqueSubMarkets(holdings);
  const fairLaunches = countUniqueFairLaunches(holdings);
  const pnl = calculatePNL(holdings);

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center space-y-12 pb-16 pt-8">
        <div className="flex w-full flex-col items-center justify-between space-y-8 px-4 lg:flex-row lg:space-y-0 lg:px-16">
          <div className="flex w-full items-center">
            <DisplayPicture image={user.icon} />
            <Overview user={user} />
          </div>
          <Account balance={balance} holdings={holdings} />
        </div>
        <Rankings
          fairLaunches={fairLaunches}
          markets={markets}
          pnl={pnl}
          volume={volume}
        />
        <div className="w-full px-4 lg:px-16">
          <Tables />
        </div>
      </div>
    </div>
  );
}
