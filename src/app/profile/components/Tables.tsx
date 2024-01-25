"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { ButtonProps } from "@/components/ui/button";
import { FilterButtonPrimitive } from "@/components/FilterButton";

import FairLaunchTable from "./FairLaunchTable";
import TradesTable from "./TradesTable";

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
        {/* 
        <Tabs.Trigger value="Resolutions" className="w-full" asChild>
          <FilterButtonTable name="Resolutions" />
        </Tabs.Trigger>
        */}
      </Tabs.List>
      <Tabs.Content value="Trades">
        <TradesTable tradeHistory={tradeHistory} />
      </Tabs.Content>
      <Tabs.Content value="Fair Launches">
        <FairLaunchTable fairLaunchHistory={fairLaunchHistory} />
      </Tabs.Content>
      {/* 
      <Tabs.Content value="Resolutions">
        <ResolutionTable resolutionHistory={resolutionHistory} />
      </Tabs.Content>
        */}
    </Tabs.Root>
  );
}
