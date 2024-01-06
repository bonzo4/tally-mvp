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
    <div
      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${backgroundColor}`}
    >
      <span className="text-xs font-bold text-white">{rank}</span>
    </div>
  );
}
