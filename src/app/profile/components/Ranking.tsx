import { formatDollarsWithoutCents } from "@/lib/formats";

function PseudoMargin() {
  return <div className="min-w-[0px] lg:min-w-[40px]"></div>;
}

function Ranking({ metric }: { metric?: string }) {
  const ranking = 2;
  const value = 1000;
  return (
    <div className="flex min-w-[40%] flex-col items-center space-y-1 rounded-2xl border-2 border-tally-primary p-4 md:w-full md:min-w-0">
      <div className="w-full text-center text-gray-400">{metric}</div>
      <div className="w-full text-center text-2xl font-medium text-white">
        {formatDollarsWithoutCents(value)}
      </div>
      <div className="w-full text-center text-sm text-tally-primary">{`Rank ${ranking}`}</div>
    </div>
  );
}

export default function Rankings() {
  return (
    <div className="flex w-full items-center space-x-4 overflow-x-auto lg:space-x-6">
      <PseudoMargin />
      <Ranking metric="Portfolio Value" />
      <Ranking metric="PNL" />
      <Ranking metric="Volume" />
      <Ranking metric="Markets Traded" />
      <Ranking metric="Fair Launches" />
      <PseudoMargin />
    </div>
  );
}
