export default function MedalRankDisplay({ rank }: { rank: number }) {

  let backgroundColor: string;
  switch (rank) {
    case 1:
      backgroundColor = "bg-yellow-500";
      break;
    case 2:
      backgroundColor = "bg-gray-400";
      break;
    case 3:
      backgroundColor = "bg-orange-700";
      break;
    default:
      backgroundColor = "bg-black";
  }

  return (
    <div className={`w-5 h-5 flex flex-shrink-0 items-center justify-center rounded-full ${backgroundColor}`}>
      <span className="text-white font-bold text-xs">{rank}</span>
    </div>
  )
}
