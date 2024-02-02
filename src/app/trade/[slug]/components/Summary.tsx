import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  formatNumberWithCommasNoDecimals,
  formatDollarsWithCents,
} from "@/lib/formats";

function LineItem({
  title,
  shares,
  value,
}: {
  title: string;
  shares: number;
  value: number;
}) {
  return (
    <div className="flex w-full justify-between">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="flex">
        <span>{formatNumberWithCommasNoDecimals(shares)}</span>
        <span>&nbsp;{`(${formatDollarsWithCents(value)})`}</span>
      </div>
    </div>
  );
}

export default function Summary({ isBuy }: { isBuy: boolean }) {
  return (
    <div className="flex w-full flex-col space-y-5 pb-2 pt-4">
      <div className="space-y-2">
        <div className="text-tally-gray">Total Cost</div>
        <Input
          className="border border-tally-layer-2 bg-transparent text-tally-gray"
          value="$200"
        />
        {isBuy ? (
          <Button
            type="submit"
            className="w-full bg-tally-primary px-5 py-2 text-black hover:bg-tally-primary/90 hover:text-black"
          >
            Buy
          </Button>
        ) : (
          <Button className="w-full bg-tally-red px-5 py-2 text-black hover:bg-tally-red/90 hover:text-black">
            Sell
          </Button>
        )}
      </div>
      <div className="space-y-1 text-sm text-white">
        <LineItem title="Shares" shares={100} value={100} />
        <LineItem title="Shares" shares={100} value={100} />
      </div>
    </div>
  );
}
