"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { ButtonProps } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FairLaunchHistory } from "@/lib/supabase/queries/fairLaunchHistory";
import { FilterButtonPrimitive } from "@/components/FilterButton";
import {
  formatDollarsWithCents,
  formatIsoAsDateWithTime,
  formatNumberWithCommasNoDecimals,
} from "@/lib/formats";
import { TradeHistory } from "@/lib/supabase/queries/tradeHistory";

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

function FairLaunchTable({
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

function TradesTable({ tradeHistory }: { tradeHistory: TradeHistory[] }) {
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

interface FilterButtonProps extends ButtonProps {
  name: string;
}

function FilterButtonTable(props: FilterButtonProps) {
  const { name, ...rest } = props;

  return (
    <FilterButtonPrimitive
      {...rest}
      className="bg-tally-layer-1 text-tally-gray data-[state=active]:bg-white data-[state=active]:text-tally-background"
    >
      {name}
    </FilterButtonPrimitive>
  );
}

export default function Tables({
  fairLaunchHistory,
  tradeHistory,
}: {
  fairLaunchHistory: FairLaunchHistory[];
  tradeHistory: TradeHistory[];
}) {
  return (
    <Tabs.Root defaultValue="Trades" className="w-full">
      <Tabs.List className="mb-4 w-full space-x-2">
        <Tabs.Trigger value="Trades" className="w-full" asChild>
          <FilterButtonTable name="Trade History" />
        </Tabs.Trigger>
        <Tabs.Trigger value="Fair Launches" className="w-full" asChild>
          <FilterButtonTable name="Fair Launches" />
        </Tabs.Trigger>
        <Tabs.Trigger value="Resolutions" className="w-full" asChild>
          <FilterButtonTable name="Resolutions" />
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="Trades">
        <TradesTable tradeHistory={tradeHistory} />
      </Tabs.Content>
      <Tabs.Content value="Fair Launches">
        <FairLaunchTable fairLaunchHistory={fairLaunchHistory} />
      </Tabs.Content>
      <Tabs.Content value="Resolutions">
        <FairLaunchTable fairLaunchHistory={fairLaunchHistory} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
