import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BuyCard from "./components/BuyCard";
import SellCard from "./components/SellCard";
import Chart from "./components/Chart";
import Chat from "./components/Chat";
import Order from "./components/Order";
import OrderDrawer from "./components/OrderDrawer";
import OrderBook from "./components/OrderBook";
import Polls from "./components/Polls";
import RelatedMarkets from "./components/RelatedMarkets";
import Slide from "@/components/Slide";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getHoldings } from "@/lib/supabase/queries/holdings";
import { getTradeMarkets } from "@/lib/supabase/queries/markets/tradeMarket";
import { getUser } from "@/lib/supabase/queries/user";

function TradingTabs() {
  return (
    <Tabs defaultValue="orderbook">
      <TabsList className="flex justify-start space-x-4 bg-black">
        <TabsTrigger
          className="data-[state=active]: rounded-none border-tally-primary px-0 text-lg data-[state=active]:border-b data-[state=active]:bg-black data-[state=active]:text-tally-primary"
          value="orderbook"
        >
          Order book
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]: rounded-none border-tally-primary px-0 text-lg data-[state=active]:border-b data-[state=active]:bg-black data-[state=active]:text-tally-primary"
          value="chat"
        >
          Chat
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]: rounded-none border-tally-primary px-0 text-lg data-[state=active]:border-b data-[state=active]:bg-black data-[state=active]:text-tally-primary"
          value="polls"
        >
          Polls
        </TabsTrigger>
      </TabsList>
      <TabsContent value="orderbook">
        <OrderBook />
      </TabsContent>
      <TabsContent value="chat">
        <Chat />
      </TabsContent>
      <TabsContent value="polls">
        <Polls />
      </TabsContent>
    </Tabs>
  );
}

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
          <div className="flex flex-grow flex-col space-y-8 py-5">
            <Chart />
            <OrderDrawer
              buyCard={<BuyCard subMarkets={market.sub_markets} />}
              sellCard={<SellCard subMarkets={market.sub_markets} />}
            />
            <TradingTabs />
          </div>
          <div className="hidden py-5 lg:block">
            <Order
              buyCard={<BuyCard subMarkets={market.sub_markets} />}
              sellCard={<SellCard subMarkets={market.sub_markets} />}
            />
          </div>
        </div>
        <RelatedMarkets />
      </div>
    </div>
  );
}
