import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getMarketsBanners } from "@/lib/supabase/marketsBanners";

import Chart from "./components/Chart";
import Chat from "./components/Chat";
import Copy from "./components/Copy";
import Header from "./components/Header";
import Order from "./components/Order";
import OrderDrawer from "./components/OrderDrawer";
import OrderBook from "./components/OrderBook";
import Polls from "./components/Polls";
import RelatedMarkets from "./components/RelatedMarkets";

import Banner from "@/components/Banner"


export default async function TradePage() {
  const supabase = createServerSupabaseClient();
  const marketsBanners = await getMarketsBanners({ supabase });

  return (
    <div>
      <OrderDrawer />
      <Banner banners={marketsBanners} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 p-4 lg:px-16 lg-py-5 space-x-5">
        <div className="col-span-2 flex flex-col space-y-5 py-5">
          <Chart />
          <OrderBook />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Polls />
            <Chat />
          </div>
          <Copy />
          <RelatedMarkets />
        </div>
        <div className="hidden lg:block sticky col-span-1 top-0 h-screen overflow-auto py-5">
          <Order/>
        </div>
      </div>
    </div>
  );
}
