import { formatNumberWithCommasNoDecimals } from "@/lib/formats";

export default function Overview() {
  const points = 1000;
  const conviction = 3;

  return (
    <div className="flex h-full flex-col justify-center space-y-1">
      <div>
        <h1 className="text-2xl font-bold text-white lg:text-4xl">John Doe</h1>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="">
          <p className="text-lg text-neutral-400">Points</p>
        </div>
        <div>
          <p className="text-lg text-white">
            {formatNumberWithCommasNoDecimals(points)}
          </p>
        </div>
        <div className="">
          <p className="text-lg text-neutral-400">Conviction</p>
        </div>
        <div>
          <span className="text-lg">{"🔥 ".repeat(conviction)}</span>
          <span className="text-lg text-white/20">
            {"🔥 ".repeat(5 - conviction)}
          </span>
        </div>
      </div>
    </div>
  );
}
