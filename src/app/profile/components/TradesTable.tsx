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
import { TradeHistory } from "@/lib/supabase/queries/tradeHistory";

function TradesRow({ tradeTxn }: { tradeTxn: TradeHistory }) {
  const { created_at, choice_markets, shares, avg_share_price, total_amount } =
    tradeTxn;
  return (
    <TableRow className="border-0">
      <TableCell className="text-gray-400">
        {formatIsoAsDateWithTime(created_at)}
      </TableCell>
      <TableCell className="text-white">
        {choice_markets?.sub_markets?.title || ""}
      </TableCell>
      <TableCell className="text-white">
        {choice_markets?.title || ""}
      </TableCell>
      <TableCell className="text-right text-white">
        {formatDollarsWithCents(avg_share_price)}
      </TableCell>
      <TableCell className="text-right text-white">{shares}</TableCell>
      <TableCell className="text-right text-white">
        {formatDollarsWithCents(total_amount)}
      </TableCell>
    </TableRow>
  );
}

export default function TradesTable({
  tradeHistory,
}: {
  tradeHistory: TradeHistory[];
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-900">
            <TableHead className="text-gray-400">Date</TableHead>
            <TableHead className="text-gray-400">Market</TableHead>
            <TableHead className="text-gray-400">Choice</TableHead>
            <TableHead className="text-right text-gray-400">
              Share Price
            </TableHead>
            <TableHead className="text-right text-gray-400">Shares</TableHead>
            <TableHead className="text-right text-gray-400">
              Total Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeHistory ? (
            tradeHistory.map((trade, index) => (
              <TradesRow key={index} tradeTxn={trade} />
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
