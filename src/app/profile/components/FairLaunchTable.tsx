import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatDollarsWithCents,
  formatIsoAsDateWithTime,
  formatNumberWithCommasNoDecimals,
} from "@/lib/formats";
import { FairLaunchHistory } from "@/lib/supabase/queries/fairLaunchHistory";

function FairLaunchRow({
  fairLaunchTxn,
}: {
  fairLaunchTxn: FairLaunchHistory;
}) {
  const { created_at, choice_markets, shares, avg_share_price } = fairLaunchTxn;

  return (
    <TableRow className="border-0">
      <TableCell className="text-gray-400">
        {formatIsoAsDateWithTime(created_at)}
      </TableCell>
      <TableCell className="text-white">
        {choice_markets?.sub_markets?.title || ""}
      </TableCell>
      <TableCell className="text-white">{choice_markets?.title}</TableCell>
      <TableCell className="text-right text-white">
        {formatNumberWithCommasNoDecimals(shares)}
      </TableCell>
      <TableCell className="text-right text-white">
        {formatDollarsWithCents(shares * avg_share_price)}
      </TableCell>
    </TableRow>
  );
}

export default function FairLaunchTable({
  fairLaunchHistory,
}: {
  fairLaunchHistory: FairLaunchHistory[];
}) {
  return (
    <div className="rounded-2xl bg-tally-layer-1 px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-tally-layer-1">
            <TableHead className="text-tally-gray">Date</TableHead>
            <TableHead className="text-tally-gray">Market</TableHead>
            <TableHead className="text-tally-gray">Choice</TableHead>
            <TableHead className="text-right text-tally-gray">Shares</TableHead>
            <TableHead className="text-right text-tally-gray">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fairLaunchHistory ? (
            fairLaunchHistory.map((fairLaunchTxn, index) => (
              <FairLaunchRow key={index} fairLaunchTxn={fairLaunchTxn} />
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
