import Image from "next/image";

import { Leaderboard as LeaderboardType } from "@/app/api/leaderboard/route";
import { formatDollarsWithoutCents } from "@/lib/formats";

function Place({ place, user }: { place: string; user: LeaderboardType }) {
  const { username, image, volume } = user;
  return (
    <div className="flex w-full justify-between rounded-2xl border-2 border-tally-primary px-6 py-4">
      <div className="flex">
        <div className="relative h-[82px] w-[82px]">
          <Image
            src={image}
            alt=""
            fill={true}
            className="rounded-xl object-cover"
          />
        </div>
        <div className="relative flex items-center justify-center">
          <p className="ml-4 text-2xl text-white">{username}</p>
          <div className="absolute left-4 text-7xl font-bold text-tally-primary/15">
            {place}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <div className="text-sm font-bold text-white">
          <span>Total Volume</span>
        </div>
        <div className="text-xl text-white">
          <span>{formatDollarsWithoutCents(volume)}</span>
        </div>
      </div>
    </div>
  );
}

export default function Podium({
  leaderboard,
}: {
  leaderboard: LeaderboardType[];
}) {
  return (
    <div className="flex grid w-full grid-cols-3 gap-4">
      <Place place="1st" user={leaderboard[0]} />
      <Place place="2nd" user={leaderboard[1]} />
      <Place place="3rd" user={leaderboard[2]} />
    </div>
  );
}
