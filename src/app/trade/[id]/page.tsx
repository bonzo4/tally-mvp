import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getMarketsBanners } from "@/lib/supabase/marketsBanners";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Banner from "@/components/Banner";
import Chart from "./components/Chart";
import Chat from "./components/Chat";
import Order from "./components/Order";
import OrderDrawer from "./components/OrderDrawer";
import OrderBook from "./components/OrderBook";
import Polls from "./components/Polls";
import RelatedMarkets from "./components/RelatedMarkets";

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

export default async function TradePage() {
  const supabase = createServerSupabaseClient();
  const marketsBanners = await getMarketsBanners({ supabase });

  return (
    <div className="w-full">
      <Banner banners={marketsBanners} />
      <div className="w-full px-4 pb-16 pt-4 lg:px-16">
        <div className="mb-10 grid w-full grid-cols-1 space-x-5 lg:grid-cols-3">
          <div className="flex flex-col space-y-5 py-5 lg:col-span-2">
            <Chart />
            <OrderDrawer />
            <TradingTabs />
          </div>
          <div className="col-span-1 hidden py-5 lg:block">
            <Order />
          </div>
        </div>
        <RelatedMarkets />
      </div>
    </div>
  );
}
