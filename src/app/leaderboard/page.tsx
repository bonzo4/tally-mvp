import { getLeaderboard } from "@/lib/api/fetch";

import Leaderboard from "./components/Leaderboard";
import Podium from "./components/Podium";

export default async function Page() {
  const leaderboard = await getLeaderboard();
  return (
    <div className="lg:py-15 flex w-full flex-col items-center space-y-5 px-4 py-10 lg:px-16">
      <div className="flex w-full">
        <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
      </div>
      <Podium leaderboard={leaderboard} />
      <Leaderboard _leaderboard={leaderboard} />
    </div>
  );
}
