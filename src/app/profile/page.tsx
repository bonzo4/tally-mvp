import DisplayPicture from "./components/DisplayPicture";
import Overview from "./components/Overview";
import Account from "./components/Account";
import Rankings from "./components/Ranking";
import Tables from "./components/Activities";
import Payment from "@/components/Payment";

export default function Profile() {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center space-y-12 pb-16 pt-8">
        <div className="flex w-full flex-col items-center justify-between space-y-8 px-4 lg:flex-row lg:space-y-0 lg:px-16">
          <div className="flex w-full items-center">
            <DisplayPicture />
            <Overview />
          </div>
          <Account />
        </div>
        <Rankings />
        <div className="w-full px-4 lg:px-16">
          <Tables />
        </div>
        <Payment />
      </div>
    </div>
  );
}
