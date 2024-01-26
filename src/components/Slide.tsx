import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getTradeMarkets } from "@/lib/supabase/queries/markets/tradeMarket";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  formatDollarsWithoutCents,
  formatIsoAsDateWithoutTime,
} from "@/lib/formats";

function TransparentToBlackGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-[#0C0D0C] to-transparent"></div>
  );
}

type InfoProps = {
  title: string;
  category: string | null;
  totalPot: number;
  expires: string | null;
  icon: string;
  alt: string;
};

function Info(props: InfoProps) {
  const { title, category, totalPot, expires, icon, alt } = props;
  return (
    <div className="absolute bottom-12 left-0 flex flex-col space-y-1 px-4 text-white lg:px-16">
      <div className="flex space-x-5 text-white">
        <div className="relative h-[80px] w-[80px] flex-shrink-0 lg:h-[120px] lg:w-[120px]">
          <Image
            src={icon}
            alt={alt}
            fill={true}
            className="rounded-2xl object-cover"
          />
        </div>
        <div className="flex h-[80px] flex-col justify-between lg:h-[120px]">
          <div>
            <Badge variant="secondary">{category}</Badge>
          </div>
          <div className="lg:hidden">{`Bet: ${formatDollarsWithoutCents(
            totalPot
          )}`}</div>
          {expires ? (
            <div className="lg:hidden">{`Expires: ${formatIsoAsDateWithoutTime(
              expires
            )}`}</div>
          ) : null}
          <div className="hidden flex-col lg:flex lg:flex-row lg:space-x-[38px]">
            <span>{`Bet: ${formatDollarsWithoutCents(totalPot)}`}</span>
            {expires ? (
              <span>{`Expires: ${formatIsoAsDateWithoutTime(expires)}`}</span>
            ) : null}
          </div>
          <div className="hidden lg:block">
            <h2 className="text-[32px] font-bold leading-[38px]">{title}</h2>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </div>
  );
}

export default async function Slide({ slug }: { slug: string }) {
  const supabase = createServerSupabaseClient();
  const markets = await getTradeMarkets({
    supabase: supabase,
    options: { slug },
  });
  if (!markets) {
    return;
  }
  const market = markets[0];
  console.log(market);
  const totalPot = market.sub_markets.reduce((acc, subMarket) => {
    return (
      acc +
      subMarket.choice_markets.reduce((acc, choice) => {
        return acc + choice.total_pot;
      }, 0)
    );
  }, 0);
  return (
    <div className="embla__slide relative h-full min-h-[372px] min-w-full flex-1">
      <Image
        src={market.banner}
        alt={"Market banner"}
        fill={true}
        className="object-cover"
      />
      <TransparentToBlackGradientOverlay />
      <Info
        title={market.title}
        category={market.category}
        totalPot={totalPot}
        expires={market.trading_end}
        icon={market.icon}
        alt={"Market icon"}
      />
    </div>
  );
}
