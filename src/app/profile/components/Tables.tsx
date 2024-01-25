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
      className="bg-tally-layer-1 text-tally-gray data-[state=active]:bg-white data-[state=active]:text-tally-background"
    >
      {name}
    </FilterButtonPrimitive>
  );
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
      <Tabs.List className="mb-4 w-full space-x-2">
        <Tabs.Trigger value="Trades" className="w-full" asChild>
          <FilterButtonTable name="Trade History" />
        </Tabs.Trigger>
        <Tabs.Trigger value="Fair Launches" className="w-full" asChild>
          <FilterButtonTable name="Fair Launches" />
        </Tabs.Trigger>
        <Tabs.Trigger value="Portfolio" className="w-full" asChild>
          <FilterButtonTable name="Portfolio" />
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="Trades">
        <TradesTable tradeHistory={tradeHistory} />
      </Tabs.Content>
      <Tabs.Content value="Fair Launches">
        <FairLaunchTable fairLaunchHistory={fairLaunchHistory} />
      </Tabs.Content>
      <Tabs.Content value="Portfolio">
        <PortfolioTable portfolio={portfolio} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
