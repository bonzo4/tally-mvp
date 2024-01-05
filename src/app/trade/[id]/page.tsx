import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getMarketsBanners } from "@/lib/supabase/marketsBanners";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import Banner from "@/components/Banner"
import Chart from "./components/Chart";
import Chat from "./components/Chat";
import Copy from "./components/Copy";
import Header from "./components/Header";
import Order from "./components/Order";
import OrderDrawer from "./components/OrderDrawer";
import OrderBook from "./components/OrderBook";
import Polls from "./components/Polls";
import RelatedMarkets from "./components/RelatedMarkets";

function TradingTabs() {
  return (
    <Tabs defaultValue="orderbook">
      <TabsList className="flex justify-start bg-black space-x-4">
        <TabsTrigger className="px-0 text-lg rounded-none data-[state=active]:bg-black data-[state=active]:border-b data-[state=active]: border-tally-primary data-[state=active]:text-tally-primary" value="orderbook">Order book</TabsTrigger>
        <TabsTrigger className="px-0 text-lg rounded-none data-[state=active]:bg-black data-[state=active]:border-b data-[state=active]: border-tally-primary data-[state=active]:text-tally-primary" value="chat">Chat</TabsTrigger>
        <TabsTrigger className="px-0 text-lg rounded-none data-[state=active]:bg-black data-[state=active]:border-b data-[state=active]: border-tally-primary data-[state=active]:text-tally-primary" value="polls">Polls</TabsTrigger>
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
  )
}

export default async function TradePage() {
  const supabase = createServerSupabaseClient();
  const marketsBanners = await getMarketsBanners({ supabase });

  return (
    <div className="w-full">
      <Banner banners={marketsBanners} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 p-4 lg:px-16 lg:py-5 space-x-5">
        <div className="lg:col-span-2 flex flex-col space-y-5 py-5">
          <Chart />
          <OrderDrawer />
          <TradingTabs />
          <RelatedMarkets />
        </div>
        <div className="hidden lg:block col-span-1 sticky top-0 h-screen overflow-auto py-5">
          <Order/>
        </div>
      </div>
    </div>
  );
}
