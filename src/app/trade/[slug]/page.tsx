import { createServerSupabaseClient } from "@/lib/supabase/server";

import TradeBody from "./components/TradeBody";
import RelatedMarkets from "./components/RelatedMarkets";
import Slide from "@/components/Slide";

import { getHoldings } from "@/lib/supabase/queries/holdings";
import { getTradeMarkets } from "@/lib/supabase/queries/markets/tradeMarket";
import { getUser } from "@/lib/supabase/queries/user";

export default async function TradePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const user = authUser
    ? await getUser({
        supabase: supabase,
        options: { userId: authUser.id },
      })
    : null;

  const holdings = user
    ? await getHoldings({
        supabase: supabase,
        options: { userId: user.id },
      })
    : null;

  const market = (await getTradeMarkets({ supabase, options: { slug } }))[0];

  if (!market) {
    return <div>404</div>;
  }

  return (
    <div className="w-full">
      <Slide slug={slug} />
      <div className="w-full px-4 pb-16 pt-4 lg:px-16">
        <div className="mb-10 flex w-full space-x-12">
          <TradeBody slug={slug} user={user} market={market} />
        </div>
        <RelatedMarkets />
      </div>
    </div>
  );
}
