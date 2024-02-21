"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWindowSize } from "usehooks-ts";

import Chat from "./Chat";
import Chart from "./Chart";
import Order from "./Order";
import OrderDrawer from "./OrderDrawer";
import OrderBook from "./OrderBook";
import Polls from "./Polls";

import { UserDoc } from "@/lib/supabase/queries/user";
import { PredictionMarketWithHoldings } from "@/lib/supabase/queries/markets/tradeMarket";

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

// Rationale for this component is threefold:
// 1) We have two Order components, one for mobile and another for desktop.
// 2) We need to dynamically render only one at a time since they share id attributes (css hidden is not enough).
// 3) To assess window size, it needs to be a client component.
export default function TradeBody({
  slug,
  user,
  market,
}: {
  slug: string;
  user: UserDoc | null;
  market: PredictionMarketWithHoldings;
}) {
  const { width, height } = useWindowSize();
  return (
    <>
      <div className="flex flex-grow flex-col space-y-8 py-5">
        <Chart slug={slug} />
        {width < 1024 ? (
          <OrderDrawer
            slug={slug}
            user={user}
            subMarkets={market.sub_markets}
          />
        ) : null}
        <TradingTabs />
      </div>
      <div className="hidden py-5 lg:block">
        {width >= 1024 ? (
          <Order slug={slug} user={user} subMarkets={market.sub_markets} />
        ) : null}
      </div>
    </>
  );
}
