import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ResultsDesktop, ResultsMobile } from "./components/ResultsCards";
import Countdown from "./components/Countdown";
import Faq from "./components/Faq";
import { OrderDesktop, OrderMobile } from "./components/OrderCards";
import { SubMarketWithChoiceMarkets } from "@/app/api/fair-launch/[slug]/route";
import TradePhase from "./components/TradePhase";
import FreezePhase from "./components/FreezePhase";
import ResolutionPhase from "./components/ResolutionPhase";
import { getFairLaunch } from "@/lib/api/data/markets/fairLaunch";
import { formatDollarsWithoutCents } from "@/lib/formats";

function calculatePeriod(market: SubMarketWithChoiceMarkets) {
  const now = new Date().toISOString();
  if (now < market.fair_launch_end) {
    return ["fair-launch", market.fair_launch_end];
  } else if (now < market.trading_start) {
    return ["freeze", market.trading_start];
  } else if (now < market.trading_end) {
    return ["trade", market.trading_end];
  }
  if (!market.has_resolved) {
    return ["resolution", market.trading_end];
  } else {
    return ["results", market.trading_end];
  }
}

function TransparentToBlackGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-tally-background to-transparent"></div>
  );
}

function Banner({ src }: { src: string }) {
  return (
    <div className="absolute left-0 top-0 -z-50 h-[372px] w-full lg:h-[738px]">
      <Image src={src} alt="" fill={true} className="object-cover" />
      <TransparentToBlackGradientOverlay />
    </div>
  );
}

function Info(market: SubMarketWithChoiceMarkets) {
  const title = market.title;
  const total_pot =
    market.choice_markets.reduce((acc, choice) => acc + choice.total_pot, 0) ||
    0;
  const phase = calculatePeriod(market);

  return (
    <div className="mb-6 mt-4 flex flex-col items-center space-y-3">
      <Badge className="bg-white text-xs text-black hover:bg-white hover:text-black">
        {market.prediction_markets?.category}
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

function PseudoTopMargin() {
  /* This component is to create space so that the info starts midway down banner. */
  return <div className="min-h-[150px] w-full lg:min-h-[200px]"></div>;
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
      <div className="relative flex w-full flex-col items-center px-4 py-10">
        <Banner src={market.banner} />
        <PseudoTopMargin />
        <div className="flex flex-col items-center">
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
            <OrderDesktop choices={market.choice_markets} />
          ) : null}
          {phase === "results" ? (
            <div className="flex w-full flex-col items-center space-y-4">
              <ResultsDesktop
                className="hidden"
                choices={market.choice_markets}
              />
            </div>
          ) : null}
        </div>
      </div>
      {phase === "trade" ? (
        <TradePhase className="flex bg-transparent lg:hidden" />
      ) : null}
      {phase === "fair-launch" ? (
        <OrderMobile choices={market.choice_markets} />
      ) : null}
      {phase === "results" ? (
        <ResultsMobile
          className="flex w-full flex-col lg:hidden"
          choices={market.choice_markets}
        />
      ) : null}
      <Faq />
    </div>
  );
}
