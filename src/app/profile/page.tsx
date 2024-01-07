import DisplayPicture from "./components/DisplayPicture";
import Overview from "./components/Overview";
import Account from "./components/Account";
import Ranking from "./components/Ranking";
import Activities from "./components/Activities";

export default function Profile() {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center px-2 py-5 lg:px-10">
        <div className="mb-5 grid w-full grid-cols-3 space-y-5 lg:mb-12 lg:grid-cols-5 lg:space-y-0">
          <div className="col-span-5 flex w-full space-x-16 lg:col-span-3">
            <DisplayPicture />
            <Overview />
          </div>
          <div className="col-span-5 flex w-full items-center lg:col-span-2 lg:h-full">
            <Account />
          </div>
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
