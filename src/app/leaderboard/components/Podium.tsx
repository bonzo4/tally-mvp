import Image from "next/image";

import { Leaderboard as LeaderboardType } from "@/app/api/leaderboard/route";
import { formatDollarsWithoutCents } from "@/lib/formats";

function Place({ place, user }: { place: string; user: LeaderboardType }) {
  const { username, image, volume } = user;
  return (
    <div className="flex w-[80vw] rounded-2xl border-2 border-tally-primary px-2 py-4 md:w-[40vw] lg:w-full lg:px-6">
      <div className="relative h-[82px] w-[82px] flex-shrink-0">
        <Image
          src={image}
          alt=""
          fill={true}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="relative flex flex-grow items-center justify-between truncate">
        <div className="flex items-center truncate">
          <p className="ml-4 truncate text-2xl text-white">{username}</p>
          <div className="absolute left-4 text-7xl font-bold text-tally-primary/20">
            {place}
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end justify-center">
          <div className="text-xs font-bold text-white lg:text-sm">
            <span>Total Volume</span>
          </div>
          <div className="text-white lg:text-xl">
            <span>{formatDollarsWithoutCents(volume)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PseudoMargin() {
  return <div className="max-w-[16px] lg:hidden"></div>;
}

export default function Podium({
  leaderboard,
}: {
  leaderboard: LeaderboardType[];
}) {
  return (
    <div className="flex w-full space-x-4 overflow-x-auto lg:grid lg:grid-cols-3 lg:gap-4 lg:space-x-0 lg:px-16">
      <PseudoMargin />
      <Place place="1st" user={leaderboard[0]} />
      <Place place="2nd" user={leaderboard[1]} />
      <Place place="3rd" user={leaderboard[2]} />
      <PseudoMargin />
    </div>
  );
}
