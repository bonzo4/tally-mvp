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

import { FilterButtonPrimitive } from "@/components/FilterButton";
import { formatDollarsWithCents } from "@/lib/formats";

interface FairLaunchRowProps {
  date: string;
  market: string;
  choice: string;
  order: string;
  pnl: number;
  value: number;
}

const FAIR_LAUNCH_ROW_DATA = {
  date: "12th Jan 2024 12:34PM",
  market: "Will Trump Win the 2024 Election",
  choice: "Trump - Yes",
  order: "Buy",
  pnl: 0.1,
  value: 250,
};

function FairLaunchRow({
  date,
  market,
  choice,
  order,
  pnl,
  value,
}: TradeRowProps) {
  return (
    <TableRow className="border-0">
      <TableCell className="text-gray-400">{date}</TableCell>
      <TableCell className="text-white">{market}</TableCell>
      <TableCell className="text-white">{choice}</TableCell>
      <TableCell className="text-white">{order}</TableCell>
      <TableCell className="text-tally-primary">
        {Math.round(pnl * 100)}%
      </TableCell>
      <TableCell className="text-right text-white">
        {formatDollarsWithCents(value)}
      </TableCell>
    </TableRow>
  );
}

const FAIR_LAUNCH_TABLE_DATA = Array(4).fill(FAIR_LAUNCH_ROW_DATA);

function FairLaunchTable() {
  return (
    <div className="rounded-2xl bg-zinc-900 px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-900">
            <TableHead className="text-gray-400">Date</TableHead>
            <TableHead className="text-gray-400">Market</TableHead>
            <TableHead className="text-gray-400">Choice</TableHead>
            <TableHead className="text-gray-400">Order</TableHead>
            <TableHead className="text-gray-400">PNL</TableHead>
            <TableHead className="text-right text-gray-400">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FAIR_LAUNCH_TABLE_DATA.map((trade, index) => (
            <FairLaunchRow key={index} {...trade} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface TradeRowProps {
  date: string;
  market: string;
  choice: string;
  order: string;
  pnl: number;
  value: number;
}

const TRADES_ROW_DATA = {
  date: "12th Jan 2024 12:34PM",
  market: "Will Trump Win the 2024 Election",
  choice: "Trump - Yes",
  order: "Buy",
  pnl: 0.1,
  value: 250,
};

const TRADES_TABLE_DATA = Array(10).fill(TRADES_ROW_DATA);

function TradesRow({ date, market, choice, order, pnl, value }: TradeRowProps) {
  return (
    <TableRow className="border-0">
      <TableCell className="text-gray-400">{date}</TableCell>
      <TableCell className="text-white">{market}</TableCell>
      <TableCell className="text-white">{choice}</TableCell>
      <TableCell className="text-white">{order}</TableCell>
      <TableCell className="text-tally-primary">
        {Math.round(pnl * 100)}%
      </TableCell>
      <TableCell className="text-right text-white">
        {formatDollarsWithCents(value)}
      </TableCell>
    </TableRow>
  );
}

function TradesTable() {
  return (
    <div className="rounded-2xl bg-zinc-900 px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-900">
            <TableHead className="text-gray-400">Date</TableHead>
            <TableHead className="text-gray-400">Market</TableHead>
            <TableHead className="text-gray-400">Choice</TableHead>
            <TableHead className="text-gray-400">Order</TableHead>
            <TableHead className="text-gray-400">PNL</TableHead>
            <TableHead className="text-right text-gray-400">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TRADES_TABLE_DATA.map((trade, index) => (
            <TradesRow key={index} {...trade} />
          ))}
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
      className="text-black text-gray-400 hover:bg-neutral-200 hover:bg-zinc-800 hover:bg-zinc-900 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:hover:bg-neutral-200"
    >
      {name}
    </FilterButtonPrimitive>
  );
}

export default function Tables() {
  return (
    <Tabs.Root defaultValue="Trades" className="w-full">
      <Tabs.List className="mb-4 w-full space-x-2">
        <Tabs.Trigger value="Trades" className="w-full" asChild>
          <FilterButtonTable name="Trade History" />
        </Tabs.Trigger>
        <Tabs.Trigger value="Fair Launches" className="w-full" asChild>
          <FilterButtonTable name="Fair Launches" />
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="Trades">
        <TradesTable />
      </Tabs.Content>
      <Tabs.Content value="Fair Launches">
        <FairLaunchTable />
      </Tabs.Content>
    </Tabs.Root>
  );
}
