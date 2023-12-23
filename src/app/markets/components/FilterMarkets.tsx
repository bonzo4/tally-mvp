"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function FilterButton({ category, selected }: { category: string, selected: string }) {
  const color = (category === selected) ? "bg-gray-100 text-black" : "bg-zinc-800 text-white";
  const variant = (category === selected) ? "secondary" : "default";

  return (
      <Badge 
        variant={variant} 
        className={`${color} flex-shrink-0 font-medium py-2 px-3 hover:cursor-pointer`}
      >
        {category}
      </Badge>
  )
}

export default function FilterMarkets() {
  return (
    <div className="flex space-x-2 overflow-auto no-scrollbar">
      <div className="min-w-[16px] lg:min-w-[64px] -mr-2"></div>
      <FilterButton category="All" selected="New" />
      <FilterButton category="New" selected="New" />
      <FilterButton category="Gaza" selected="New" />
      <FilterButton category="Ukraine" selected="New" />
      <FilterButton category="US Election" selected="New" />
      <FilterButton category="Airdrops" selected="New" />
      <FilterButton category="ETF" selected="New" />
      <FilterButton category="Politics" selected="New" />
      <FilterButton category="Sports" selected="New" />
      <FilterButton category="Economics" selected="New" />
      <FilterButton category="Biden" selected="New" />
      <FilterButton category="Trump" selected="New" />
      <FilterButton category="Bitcoin" selected="New" />
      <FilterButton category="Ethereum" selected="New" />
      <FilterButton category="Solana" selected="New" />
      <FilterButton category="NFTs" selected="New" />
      <FilterButton category="NBA" selected="New" />
      <FilterButton category="NHL" selected="New" />
      <FilterButton category="Soccer" selected="New" />
      <FilterButton category="Israel" selected="New" />
      <FilterButton category="Canada" selected="New" />
      <FilterButton category="China" selected="New" />
      <FilterButton category="Japan" selected="New" />
      <FilterButton category="Tennis" selected="New" />
    </div>
  )
}

