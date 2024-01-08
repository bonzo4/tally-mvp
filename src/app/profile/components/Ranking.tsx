import { formatDollarsWithCents } from "@/lib/formats";

export default function Ranking() {
  const ranking = 2;
  const value = 1000;
  const metric = "Profit";
  return (
    <div className="flex w-full flex-col items-center space-y-1 rounded-2xl border-2 border-tally-primary p-4">
      <div className="w-full text-center text-gray-400">{metric}</div>
      <div className="w-full text-center text-2xl font-medium text-white">
        {formatDollarsWithCents(value)}
      </div>
      <div className="w-full text-center text-sm text-tally-primary">{`Rank ${ranking}`}</div>
    </div>
  );
}
