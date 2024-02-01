"use client";

import { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SubMarketWithHoldings } from "@/lib/supabase/queries/markets/tradeMarket";

export default function Order({
  buyCard,
  sellCard,
}: {
  buyCard: ReactNode;
  sellCard: ReactNode;
}) {
  return (
    <Tabs
      className="flex flex-col overflow-auto bg-tally-layer-1 px-2 py-4 lg:w-[350px] lg:px-6"
      defaultValue="buy"
    >
      <TabsList className="flex justify-start bg-transparent">
        <TabsTrigger
          className="rounded-none border-tally-primary px-4 text-lg data-[state=active]:border-b data-[state=active]:bg-transparent data-[state=active]:text-tally-primary"
          value="buy"
        >
          Buy
        </TabsTrigger>
        <TabsTrigger
          className="rounded-none border-tally-red px-4 text-lg data-[state=active]:border-b data-[state=active]:bg-transparent data-[state=active]:text-tally-red"
          value="sell"
        >
          Sell
        </TabsTrigger>
      </TabsList>
      <TabsContent className="flex flex-col overflow-auto" value="buy">
        {buyCard}
      </TabsContent>
      <TabsContent
        className="flex flex-col overflow-auto bg-transparent"
        value="sell"
      >
        {sellCard}
      </TabsContent>
    </Tabs>
  );
}
