import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TradeHistory } from "@/lib/supabase/queries/tradeHistory";
import {
  formatDollarsWithCents,
  formatIsoAsDateWithTime,
  formatNumberWithCommasNoDecimals,
} from "@/lib/formats";
import { textCssMap } from "@/lib/cssMaps";

function TradesRow({ tradeTxn }: { tradeTxn: TradeHistory }) {
  const color = tradeTxn.choice_markets?.color || "primary";
  const textCss = textCssMap[color as keyof typeof textCssMap];
  const {
    created_at,
    choice_markets,
    shares,
    avg_share_price,
    total_amount,
    trade_side,
  } = tradeTxn;
  return (
    <TableRow className="border-0">
      <TableCell className="text-tally-gray">
        {formatIsoAsDateWithTime(created_at)}
      </TableCell>
      <TableCell className="text-white">
        {choice_markets?.sub_markets?.title || ""}
      </TableCell>
      <TableCell className={textCss}>{choice_markets?.title || ""}</TableCell>
      <TableCell className="text-center text-white">{trade_side}</TableCell>
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
    <div className="rounded-2xl bg-tally-layer-1 px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-tally-layer-1">
            <TableHead className="text-tally-gray">Date</TableHead>
            <TableHead className="text-tally-gray">Market</TableHead>
            <TableHead className="text-tally-gray">Choice</TableHead>
            <TableHead className="text-center text-tally-gray">
              Buy / Sell
            </TableHead>
            <TableHead className="text-right text-tally-gray">
              Share Price
            </TableHead>
            <TableHead className="text-right text-tally-gray">Shares</TableHead>
            <TableHead className="text-right text-tally-gray">
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
