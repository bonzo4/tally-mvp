import Tickers from "@/components/Tickers";
import DisplayPicture from "./components/DisplayPicture";
import Overview from "./components/Overview";
import Account from "./components/Account";
import Ranking from "./components/Ranking";
import Activities from "./components/Activities";

export default function Profile() {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center py-5 px-2 lg:px-10">
        <div className="w-full grid grid-cols-3 lg:grid-cols-5 space-y-5 lg:space-y-0 mb-5 lg:mb-12">
          <div className="w-full flex col-span-5 lg:col-span-3 space-x-16">
            <DisplayPicture />
            <Overview />
          </div>
          <div className="w-full lg:h-full flex items-center col-span-5 lg:col-span-2">
            <Account />
          </div>
        </div>
        <div className="w-full lg:w-3/4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 mb-5 lg:mb-12">
          <Ranking />
          <Ranking />
          <Ranking />
          <Ranking />
          <Ranking />
        </div>
        <div className="w-full">
          <Activities />
        </div>
      </div>
    </div>
  );
}
