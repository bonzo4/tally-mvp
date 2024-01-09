import DisplayPicture from "./components/DisplayPicture";
import Overview from "./components/Overview";
import Account from "./components/Account";
import Ranking from "./components/Ranking";
import Activities from "./components/Activities";

export default function Profile() {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center space-y-12 px-4 pb-16 pt-8 lg:px-16">
        <div className="flex w-full flex-col items-center justify-between space-y-8 lg:flex-row lg:space-y-0">
          <div className="flex w-full items-center">
            <DisplayPicture />
            <Overview />
          </div>
          <Account />
        </div>
        <div className="flex w-full flex-col items-center space-y-4 md:flex-row md:space-x-5 md:space-y-0">
          <Ranking />
          <Ranking />
          <Ranking />
          <Ranking />
          <Ranking />
        </div>
<<<<<<< HEAD
        <div className="w-full">
          <Activities />
        </div>
=======
        <Tables />
>>>>>>> f80bc3c (style: fix ranking component padding)
      </div>
    </div>
  );
}
