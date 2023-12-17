import Chart from "./components/Chart";
import Chat from "./components/Chat";
import Copy from "./components/Copy";
import Header from "./components/Header";
import Order from "./components/Order";
import OrderBook from "./components/OrderBook";
import Polls from "./components/Polls";
import RelatedMarkets from "./components/RelatedMarkets";


export default function TradePage() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 p-2 lg:px-10 lg-py-5 space-x-5">
      <div className="col-span-2 flex flex-col space-y-5 py-5">
        <Header />
        <div className="lg:hidden">
          <Order/>
        </div>
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
  );
}
