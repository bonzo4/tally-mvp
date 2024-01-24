import {
  formatDollarsWithoutCents,
  formatNumberWithCommasNoDecimals,
} from "@/lib/formats";

function PseudoMargin() {
  return <div className="min-w-[0px] lg:min-w-[40px]"></div>;
}

function RankPrimitive({
  metric,
  rank,
  value,
}: {
  metric: string;
  rank: number;
  value: string;
}) {
  return (
    <div className="flex min-w-[40%] flex-col items-center space-y-1 rounded-2xl border-2 border-tally-primary p-4 md:w-full md:min-w-0">
      <div className="w-full text-center text-gray-400">{metric}</div>
      <div className="w-full text-center text-2xl font-medium text-white">
        {value}
      </div>
      <div className="w-full text-center text-sm text-tally-primary">{`Rank ${formatNumberWithCommasNoDecimals(
        rank
      )}`}</div>
    </div>
  );
}

function RankPortfolio({ value, rank }: { value: number; rank: number }) {
  return (
    <RankPrimitive
      metric="Portfolio Value"
      rank={rank}
      value={formatDollarsWithoutCents(value)}
    />
  );
}

function RankPNL({ value, rank }: { value: number; rank: number }) {
  return (
    <RankPrimitive
      metric="PNL"
      rank={rank}
      value={`${value > 0 ? "+" : "-"}${formatDollarsWithoutCents(value)}`}
    />
  );
}

function RankVolume({ value, rank }: { value: number; rank: number }) {
  return (
    <RankPrimitive
      metric="Volume"
      rank={rank}
      value={formatDollarsWithoutCents(value)}
    />
  );
}

function RankMarkets({ value, rank }: { value: number; rank: number }) {
  return (
    <RankPrimitive metric="Markets" rank={rank} value={value.toString()} />
  );
}

function RankFairLaunches({ value, rank }: { value: number; rank: number }) {
  return (
    <RankPrimitive
      metric="Fair Launches"
      rank={rank}
      value={value.toString()}
    />
  );
}

export default function Rankings({
  fairLaunches,
  markets,
  pnl,
  volume,
}: {
  fairLaunches: number;
  markets: number;
  pnl: number;
  volume: number;
}) {
  return (
    <div className="flex w-full items-center space-x-4 overflow-x-auto lg:space-x-6">
      <PseudoMargin />
      <RankPortfolio value={1000} rank={32} />
      <RankPNL value={pnl} rank={1324} />
      <RankVolume value={volume} rank={334242} />
      <RankMarkets value={markets} rank={1} />
      <RankFairLaunches value={fairLaunches} rank={344} />
      <PseudoMargin />
    </div>
  );
}
