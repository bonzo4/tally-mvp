import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import Faq from "./components/Faq";
import { OrderCardsDesktop, OrderCardsMobile } from "./components/OrderCards";
import { SubMarketWithChoiceMarkets } from "@/app/api/fair-launch/[slug]/route";
import TradeNow from "./components/TradeNow";
import { getFairLaunch } from "@/lib/api/fetch";
import { formatDollarsWithoutCents } from "@/lib/formats";

function TransparentToBlackGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-tally-background to-transparent"></div>
  );
}

function Banner({ src }: { src: string }) {
  return (
    <div className="absolute left-0 top-0 h-[372px] w-full lg:h-[738px]">
      <Image src={src} alt="" fill={true} className="object-cover" />
      <TransparentToBlackGradientOverlay />
    </div>
  );
}

function Unit({ unit, amount }: { unit: string; amount: number }) {
  return (
    <div className="flex max-w-[70px] flex-col items-center justify-center rounded-lg bg-neutral-800/80 px-2 py-2 lg:px-4">
      <div>
        <div className="-mb-1 -mt-1 text-center text-xl font-bold text-white lg:text-3xl">
          {amount}
        </div>
        <div className="-mb-1 text-center text-xs font-bold text-tally-gray lg:text-base">
          {unit}
        </div>
      </div>
    </div>
  );
}

function Countdown() {
  return (
    <div className="flex space-x-2">
      <Unit unit="Days" amount={10} />
      <Unit unit="Hours" amount={4} />
      <Unit unit="Mins" amount={32} />
      <Unit unit="Secs" amount={12} />
    </div>
  );
}

function Info(market: SubMarketWithChoiceMarkets) {
  const title = market.title;
  const total_pot = market.choice_markets.reduce(
    (acc, choice) => acc + choice.total_pot,
    0
  );
  const phase = calculatePeriod(market);

  return (
    <div className="mt-4 flex flex-col items-center space-y-3">
      <Badge className="bg-white text-xs text-black hover:bg-white hover:text-black">
        Politics
      </Badge>
      <div className="text-xs text-white lg:text-sm">{`Total Pot: ${formatDollarsWithoutCents(
        total_pot
      )}`}</div>
      <div className="text-center text-2xl font-bold text-white lg:text-3xl">
        {market.title}
      </div>
    </div>
  );
}

function calculatePeriod(market: SubMarketWithChoiceMarkets) {
  // const now = new Date().toISOString();
  // if (now < market.fair_launch_end) {
  //   return "fair-launch";
  // } else if (now < market.trading_start) {
  //   return "freeze";
  // } else if (now < market.trading_end) {
  //   return "trade";
  // } else if (now < market.claim_start) {
  //   return "resolution";
  // } else if (now < market.claim_end) {
  //   return "claim";
  // } else {
  //   return "closed";
  // }
  return "fair-launch";
}

export default async function FairLaunchPage({
  params,
}: {
  params: { slug: string };
}) {
  const market = await getFairLaunch(params.slug);
  if (!market) return;
  const phase = calculatePeriod(market);
  return (
    <div className="w-full">
      <div className="relative flex h-[372px] w-full items-end justify-center px-4 py-10 lg:h-[738px]">
        <Banner src={market.banner} />
        <div className="z-50 flex flex-col items-center space-y-4">
          {phase === "trade" ? <TradeNow className="hidden lg:flex" /> : null}
          <Countdown />
          <Info {...market} />
          {phase === "fair-launch" ? (
            <OrderCardsDesktop choices={market.choice_markets} />
          ) : null}
          {phase === "trade" ? <TradeNow className="flex lg:hidden" /> : null}
        </div>
      </div>
      {phase === "fair-launch" ? (
        <OrderCardsMobile choices={market.choice_markets} />
      ) : null}
      <Faq />
    </div>
  );
}
