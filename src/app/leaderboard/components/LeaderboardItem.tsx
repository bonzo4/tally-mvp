import MedalRankDisplay from "./MedalRankDisplay"

import { convertNumberToDollars } from "@/lib/formats";

export default function LeaderboardItem({ name, rank, value }: { name: string, rank: number, value: number }) {
  const valueFormatted = convertNumberToDollars(value)
  
  let backgroundColor: string;
  switch (rank) {
    case 1:
      backgroundColor = "bg-yellow-100"
      break;
    case 2:
      backgroundColor = "bg-gray-100"
      break;
    case 3:
      backgroundColor = "bg-orange-50"
      break;
    default:
      backgroundColor = ""
  }

  return (
    <div className={`w-full flex flex-row items-center px-2 space-x-2 rounded ${backgroundColor}`}>
      <MedalRankDisplay rank={rank} />
      <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] md:gap-2 w-full items-center">
        <span className="text-left text-sm lg:text-base font-bold truncate">{name}</span>
        <span className="text-left md:text-right text-sm text-gray-500">{valueFormatted}</span>
      </div>
    </div>
  )
}

