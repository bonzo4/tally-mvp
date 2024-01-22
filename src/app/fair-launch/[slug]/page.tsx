import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ClaimCardsDesktop, ClaimCardsMobile } from "./components/ClaimCards";
import Countdown from "./components/Countdown";
import Faq from "./components/Faq";
import { OrderCardsDesktop, OrderCardsMobile } from "./components/OrderCards";
import { SubMarketWithChoiceMarkets } from "@/app/api/fair-launch/[slug]/route";
import TradePhase from "./components/TradePhase";
import FreezePhase from "./components/FreezePhase";
import ResolutionPhase from "./components/ResolutionPhase";
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

function Info(market: SubMarketWithChoiceMarkets) {
  const title = market.title;
  const total_pot = market.choice_markets.reduce(
    (acc, choice) => acc + choice.total_pot,
    0
  );
  const phase = calculatePeriod(market);

  return (
    <div className="mb-6 mt-4 flex flex-col items-center space-y-3">
      <Badge className="bg-white text-xs text-black hover:bg-white hover:text-black">
        {market.prediction_markets.category}
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
  const now = new Date().toISOString();
  return ["resolved", market.trading_end];
  //if (now < market.fair_launch_end) {
  //  return ["fair-launch", market.fair_launch_end];
  //} else if (now < market.trading_start) {
  //  return ["freeze", market.trading_start];
  //} else if (now < market.trading_end) {
  //  return ["trade", market.trading_end];
  //}
  //if (!market.has_resolved) {
  //  return ["resolution", market.trading_end];
  //} else {
  //  return ["resolved", market.trading_end];
  //}
}

export default async function FairLaunchPage({
  params,
}: {
  params: { slug: string };
}) {
  const market = await getFairLaunch(params.slug);
  if (!market) return;
  const [phase, end] = calculatePeriod(market);

  return (
    <div className="w-full">
      <div className="relative flex h-[372px] w-full items-end justify-center px-4 py-10 lg:h-[750px]">
        <Banner src={market.banner} />
        <div className="z-50 flex flex-col items-center">
          {phase === "trade" ? (
            <TradePhase className="hidden lg:flex" />
          ) : phase === "freeze" ? (
            <FreezePhase />
          ) : phase === "resolution" ? (
            <ResolutionPhase />
          ) : null}
          <Countdown end={new Date(end)} />
          <Info {...market} />
          {phase === "fair-launch" ? (
            <OrderCardsDesktop choices={market.choice_markets} />
          ) : null}
          {phase === "resolved" ? (
            <div className="flex w-full flex-col items-center space-y-4">
              <ClaimCardsDesktop
                className="hidden"
                choices={market.choice_markets}
                winner={market.choice_markets[0].id}
              />
            </div>
          ) : null}
        </div>
      </div>
      {phase === "trade" ? (
        <TradePhase className="flex bg-transparent lg:hidden" />
      ) : null}
      {phase === "fair-launch" ? (
        <OrderCardsMobile choices={market.choice_markets} />
      ) : null}
      {phase === "resolved" ? (
        <ClaimCardsMobile
          className="flex w-full flex-col lg:hidden"
          winner={market.choice_markets[0].id}
          choices={market.choice_markets}
        />
      ) : null}
      <Faq />
    </div>
  );
}
