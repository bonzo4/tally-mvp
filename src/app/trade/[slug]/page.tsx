import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Chart from "./components/Chart";
import Chat from "./components/Chat";
import Order from "./components/Order";
import OrderDrawer from "./components/OrderDrawer";
import OrderBook from "./components/OrderBook";
import Polls from "./components/Polls";
import RelatedMarkets from "./components/RelatedMarkets";
import Image from "next/image";
import { getTradingMarketData } from "@/lib/api/data/markets/tradingMarket";

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
  const market = await getTradingMarketData(slug);

  if (!market) {
    return <div>404</div>;
  }

  return (
    <div className="w-full">
      <div className="flex min-h-[50vh] w-full flex-col bg-black">
        <div className="flex space-x-5 text-white">
          <div className="relative h-[80px] w-[80px] flex-shrink-0 lg:h-[120px] lg:w-[120px]">
            <Image
              src={market.banner}
              alt="banner"
              fill={true}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
      {/* <Banner banners={marketsBanners} /> */}
      <div className="w-full px-4 pb-16 pt-4 lg:px-16">
        <div className="mb-10 flex w-full space-x-12">
          <div className="flex flex-grow flex-col space-y-8 py-5">
            <Chart />
            <OrderDrawer />
            <TradingTabs />
          </div>
          <div className="hidden py-5 lg:block">
            <Order />
          </div>
        </div>
        <RelatedMarkets />
      </div>
    </div>
  );
}
