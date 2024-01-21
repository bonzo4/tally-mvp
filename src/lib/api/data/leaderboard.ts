import { fetchData } from "../fetch";

export async function getLeaderboardData(
  filter: string = "Day",
  order: string = "volume"
) {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/leaderboard?filter=${filter}&order=${order}`;
  const leaderboardData = await fetchData<any, {}>({ url, options: {} });

  return leaderboardData;
}
