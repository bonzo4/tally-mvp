"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Order from "./Order";
import { SubMarketWithHoldings } from "@/lib/supabase/queries/markets/tradeMarket";
import { UserDoc } from "@/lib/supabase/queries/user";

export default function OrderDrawer({
  user,
  subMarkets,
  slug,
}: {
  user: UserDoc | null;
  subMarkets: SubMarketWithHoldings[];
  slug: string;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="sticky bottom-4 z-50 w-full lg:hidden">
          <Button className="w-full bg-tally-primary text-black hover:bg-tally-primary">
            Place Bet
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="mt-5 max-h-[96%] border-0 bg-zinc-900 px-4">
        <DrawerHeader>
          {/* Header is for margin between top of content and drag bar. */}
        </DrawerHeader>
        <Order slug={slug} user={user} subMarkets={subMarkets} />
      </DrawerContent>
    </Drawer>
  );
}
