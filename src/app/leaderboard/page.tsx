import { Button } from "@/components/ui/button";
import Leaderboard from "./components/Leaderboard";

function FilterByTimeInterval() {
  return (
    <div className="flex w-full justify-center space-x-3">
      <Button className="text-white ">Day</Button>
      <Button variant="secondary">Week</Button>
      <Button variant="secondary">Month</Button>
      <Button variant="secondary">All</Button>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <div className="flex w-full flex-col items-center space-y-5 px-2 py-5 lg:px-10 lg:py-10">
      <div className="flex w-full justify-center">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
      </div>
      <FilterByTimeInterval />
      <div className="grid w-full max-w-[1100px] grid-cols-2 gap-1 px-2 lg:gap-3 lg:px-10">
        <Leaderboard title="Volume" />
        <Leaderboard title="Profit " />
      </div>
    </div>
  );
}
