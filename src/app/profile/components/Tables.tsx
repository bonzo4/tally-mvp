"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { ButtonProps } from "@/components/ui/button";
import { FilterButtonPrimitive } from "@/components/FilterButton";

import FairLaunchTable from "./FairLaunchTable";
import PortfolioTable from "./PortfolioTable";
import TradesTable from "./TradesTable";

import { Holdings } from "@/lib/supabase/queries/holdings";
import { FairLaunchHistory } from "@/lib/supabase/queries/fairLaunchHistory";
import { TradeHistory } from "@/lib/supabase/queries/tradeHistory";

interface FilterButtonProps extends ButtonProps {
  name: string;
}

function FilterButtonTable(props: FilterButtonProps) {
  const { name, ...rest } = props;

  return (
    <FilterButtonPrimitive
      {...rest}
      className="bg-tally-layer-1 text-tally-gray hover:bg-tally-layer-1 data-[state=active]:bg-white data-[state=active]:text-tally-background"
    >
      {name}
    </FilterButtonPrimitive>
  );
}

function PseudoMargin() {
  return <div className="min-w-[8px] lg:hidden"></div>;
}

export default function Tables({
  fairLaunchHistory,
  portfolio,
  tradeHistory,
}: {
  fairLaunchHistory: FairLaunchHistory[];
  portfolio: Holdings[];
  tradeHistory: TradeHistory[];
}) {
  return (
    <Tabs.Root defaultValue="Trades" className="w-full">
      <Tabs.List className="mb-4 flex w-full space-x-2 overflow-x-auto whitespace-nowrap lg:px-16">
        <PseudoMargin />
        <Tabs.Trigger value="Trades" className="w-full" asChild>
          <FilterButtonTable name="Trade History" />
        </Tabs.Trigger>
        <Tabs.Trigger value="Fair Launches" className="w-full" asChild>
          <FilterButtonTable name="Fair Launches" />
        </Tabs.Trigger>
        <Tabs.Trigger value="Portfolio" className="w-full" asChild>
          <FilterButtonTable name="Portfolio" />
        </Tabs.Trigger>
        <PseudoMargin />
      </Tabs.List>
      <Tabs.Content className="px-4 lg:px-16" value="Trades">
        <TradesTable tradeHistory={tradeHistory} />
      </Tabs.Content>
      <Tabs.Content className="px-4 lg:px-16" value="Fair Launches">
        <FairLaunchTable fairLaunchHistory={fairLaunchHistory} />
      </Tabs.Content>
      <Tabs.Content className="px-4 lg:px-16" value="Portfolio">
        <PortfolioTable portfolio={portfolio} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
