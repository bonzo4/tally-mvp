import { getLeaderboardData } from "@/lib/api/data/leaderboard";

import Leaderboard from "./components/Leaderboard";

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboardData();
  return (
    <div className="lg:py-15 flex w-full flex-col items-center space-y-5 py-10">
      <div className="flex w-full px-4 lg:px-16">
        <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
      </div>
      <Leaderboard _leaderboard={leaderboard} />
    </div>
  );
}
