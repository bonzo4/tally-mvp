import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDollarsWithCents } from "@/lib/formats";
import { Holdings } from "@/lib/supabase/queries/holdings";
import { textCssMap } from "@/lib/cssMaps";

function PortfolioRow({ holding }: { holding: Holdings }) {
  const color = holding.choice_markets?.color || "primary";
  const textCss = textCssMap[color as keyof typeof textCssMap];
  const { created_at, choice_markets, shares, shares_bought, total_buy_value } =
    holding;

  return (
    <TableRow className="border-0">
      <TableCell className="text-white">
        {choice_markets?.sub_markets?.title || ""}
      </TableCell>
      <TableCell className={textCss}>{choice_markets?.title}</TableCell>
      <TableCell className="text-right text-white">{shares}</TableCell>
      <TableCell className="text-right text-white">
        {formatDollarsWithCents(total_buy_value / shares_bought)}
      </TableCell>
      <TableCell className="text-right text-white">
        {formatDollarsWithCents(choice_markets?.share_price || 0)}
      </TableCell>
      <TableCell className="text-right text-white">
        {formatDollarsWithCents((choice_markets?.share_price || 0) * shares)}
      </TableCell>
      <TableCell className="text-center text-white">
        {choice_markets?.sub_markets?.has_resolved ? "Resolved" : "Ongoing"}
      </TableCell>
      <TableCell className="text-center text-white">{"TBD"}</TableCell>
    </TableRow>
  );
}

export default function PortfolioTable({
  portfolio,
}: {
  portfolio: Holdings[];
}) {
  return (
    <div className="rounded-2xl bg-tally-layer-1 px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-tally-layer-1">
            <TableHead className="text-tally-gray">Market</TableHead>
            <TableHead className="text-tally-gray">Choice</TableHead>
            <TableHead className="text-right text-tally-gray">Shares</TableHead>
            <TableHead className="text-right text-tally-gray">
              Average Purchase Price
            </TableHead>
            <TableHead className="text-right text-tally-gray">
              Latest Price
            </TableHead>
            <TableHead className="text-right text-tally-gray">Value</TableHead>
            <TableHead className="text-center text-tally-gray">
              Status
            </TableHead>
            <TableHead className="text-right text-tally-gray">
              Winnings
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolio ? (
            portfolio.map((holding, index) => (
              <PortfolioRow key={index} holding={holding} />
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
