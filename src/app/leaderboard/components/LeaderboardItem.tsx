import MedalRankDisplay from "./MedalRankDisplay";

import { convertNumberToDollars } from "@/lib/formats";

export default function LeaderboardItem({
  name,
  rank,
  value,
}: {
  name: string;
  rank: number;
  value: number;
}) {
  const valueFormatted = convertNumberToDollars(value);

  let backgroundColor: string;
  switch (rank) {
    case 1:
      backgroundColor = "bg-yellow-100";
      break;
    case 2:
      backgroundColor = "bg-gray-100";
      break;
    case 3:
      backgroundColor = "bg-orange-50";
      break;
    default:
      backgroundColor = "";
  }

  return (
    <div
      className={`flex w-full flex-row items-center space-x-2 rounded px-2 ${backgroundColor}`}
    >
      <MedalRankDisplay rank={rank} />
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-[auto,1fr] md:gap-2">
        <span className="truncate text-left text-sm font-bold lg:text-base">
          {name}
        </span>
        <span className="text-left text-sm text-gray-500 md:text-right">
          {valueFormatted}
        </span>
      </div>
    </div>
  );
}
