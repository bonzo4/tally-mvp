import DisplayPicture from "./components/DisplayPicture";
import Overview from "./components/Overview";
import Account from "./components/Account";
import Ranking from "./components/Ranking";
import Activities from "./components/Activities";

export default function Profile() {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center px-4 py-5 lg:px-16">
        <div className="mb-5 flex w-full flex-col items-center justify-between space-y-8 lg:flex-row lg:space-y-0">
          <div className="flex w-full items-center">
            <DisplayPicture />
            <Overview />
          </div>
          <Account />
        </div>
        <div className="mb-5 flex w-full flex-col space-y-2 md:flex-row md:space-x-5 md:space-y-0 lg:mb-12 lg:w-3/4">
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
