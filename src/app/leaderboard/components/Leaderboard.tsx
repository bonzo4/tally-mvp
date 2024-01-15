"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Leaderboard } from "@/app/api/leaderboard/route";
import LeaderboardItem from "./LeaderboardItem";
import { FilterButton } from "@/components/FilterButton";
import {
  formatDollarsWithCents,
  formatNumberWithCommasNoDecimals,
} from "@/lib/formats";
import { getLeaderboard } from "@/lib/api/fetch";

const FILTERS = ["Day", "Week", "Month", "All"];

function FilterByTimeInterval({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) {
  return (
    <div className="flex w-full space-x-3">
      {FILTERS.map((f, i) => (
        <FilterButton
          key={i}
          name={f}
          selected={filter}
          onClick={() => setFilter(f)}
        />
      ))}
    </div>
  );
}

interface RowProps extends Leaderboard {
  rank: number;
}

function UserCell({ username, image }: { username: string; image: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative h-[24px] w-[24px]">
        <Image
          src={image}
          alt=""
          fill={true}
          className="rounded object-cover"
        />
      </div>
      <div>
        <span>{username}</span>
      </div>
    </div>
  );
}

function Row({
  username,
  image,
  rank,
  volume,
  profits,
  points,
  conviction,
}: RowProps) {
  const profitsColor = profits >= 0 ? "text-tally-primary" : "text-tally-red";
  return (
    <TableRow className="border-transparent bg-zinc-900 py-0 text-white hover:bg-zinc-800">
      <TableCell>{rank}</TableCell>
      <TableCell>
        <UserCell username={username} image={image} />
      </TableCell>
      <TableCell className="text-right">
        {formatDollarsWithCents(volume)}
      </TableCell>
      <TableCell className={`text-right ${profitsColor}`}>
        {`${profits >= 0 ? "+" : ""}${formatDollarsWithCents(profits)}`}
      </TableCell>
      <TableCell className="text-right">
        {formatNumberWithCommasNoDecimals(points)}
      </TableCell>
      <TableCell className="text-nowrap text-right">
        <span className="text-lg">{"🔥 ".repeat(Math.round(conviction))}</span>
        <span className="text-lg text-white/20">
          {"🔥 ".repeat(5 - Math.round(conviction))}
        </span>
      </TableCell>
    </TableRow>
  );
}

function LeaderboardTable({ leaderboard }: { leaderboard: Leaderboard[] }) {
  return (
    <div className="w-full rounded-2xl bg-zinc-900 px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow className="border-transparent hover:bg-zinc-900">
            <TableHead className="text-xs text-gray-400">Rank</TableHead>
            <TableHead className="text-xs text-gray-400">Name</TableHead>
            <TableHead className="text-right text-xs text-gray-400">
              Volume
            </TableHead>
            <TableHead className="text-right text-xs text-gray-400">
              Profits
            </TableHead>
            <TableHead className="text-right text-xs text-gray-400">
              Points
            </TableHead>
            <TableHead className="text-right text-xs text-gray-400">
              Conviction
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((row, i) => (
            <Row key={row.id} {...row} rank={i + 1} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Leaderboard({
  _leaderboard,
}: {
  _leaderboard: Leaderboard[];
}) {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>(_leaderboard);
  const [filter, setFilter] = useState("Day");
  useEffect(() => {
    async function updateLeaderboard() {
      const leaderboard_ = await getLeaderboard(filter);
      setLeaderboard(leaderboard_);
    }
    updateLeaderboard();
  }, [filter]);
  return (
    <div className="w-full space-y-5 px-4 lg:px-16">
      <FilterByTimeInterval filter={filter} setFilter={setFilter} />
      <LeaderboardTable leaderboard={leaderboard} />
    </div>
  );
}
