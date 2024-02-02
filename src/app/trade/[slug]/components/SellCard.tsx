import Image from "next/image";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { textCssMap } from "@/lib/cssMaps";
import { Separator } from "@/components/ui/separator";
import { VscCircleFilled } from "react-icons/vsc";

import {
  ChoiceMarketWithHoldings,
  SubMarketWithHoldings,
} from "@/lib/supabase/queries/markets/tradeMarket";
import {
  formatNumberWithCommasNoDecimals,
  formatDollarsWithCents,
} from "@/lib/formats";

import AmountInput from "./TradeInput";
import ChoiceButton from "./ChoiceButton";
import Summary from "./Summary";

function SellChoiceMarket({
  choiceMarket,
}: {
  choiceMarket: ChoiceMarketWithHoldings;
}) {
  const shares = choiceMarket.holdings[0].shares;
  const value = formatDollarsWithCents(shares * choiceMarket.share_price);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between space-x-2">
        <ChoiceButton
          className="h-[40px]"
          selected={""}
          choiceMarket={choiceMarket}
        />
        <div className="flex flex-col">
          <div className="text-right text-white">{`${formatNumberWithCommasNoDecimals(
            shares
          )} shares `}</div>
          <div className="text-right text-white">{`(${value})`}</div>
        </div>
      </div>
      <AmountInput amount={0} className="" />
    </div>
  );
}

type SellSubMarketProps = React.HTMLAttributes<HTMLDivElement> & {
  subMarket: SubMarketWithHoldings;
};

function SellSubMarket({ children, subMarket }: SellSubMarketProps) {
  const { card_title } = subMarket;
  const color = subMarket.color || "primary";
  const dotColor = textCssMap[color as keyof typeof textCssMap];

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        <div className="relative mr-2 h-[32px] w-[32px]">
          <Image
            src={subMarket.icon}
            fill={true}
            alt=""
            className="rounded object-cover"
          />
        </div>
        <h2 className="mr-1 text-lg text-white">{card_title}</h2>
        <VscCircleFilled className={cn(dotColor, "")} />
      </div>
      <div className="flex flex-col space-y-2">{children}</div>
    </div>
  );
}

function SellContent({
  subMarketsWithHoldings,
}: {
  subMarketsWithHoldings: SubMarketWithHoldings[];
}) {
  if (!subMarketsWithHoldings?.length)
    return (
      <div className="text-white">You don&apos;t own any shares to sell</div>
    );
  return (
    <>
      {subMarketsWithHoldings.map((subMarketWithHoldings, index) => {
        return (
          <SellSubMarket key={index} subMarket={subMarketWithHoldings}>
            {subMarketWithHoldings.choice_markets.map(
              (choice_market, index) => {
                if (!choice_market.holdings.length) return;
                return (
                  <SellChoiceMarket key={index} choiceMarket={choice_market} />
                );
              }
            )}
          </SellSubMarket>
        );
      })}
    </>
  );
}

export default function SellCard({
  subMarkets,
}: {
  subMarkets: SubMarketWithHoldings[];
}) {
  const subMarketsWithHoldings = subMarkets.filter((subMarket) => {
    return subMarket.choice_markets.filter(
      (choiceMarket) => choiceMarket.holdings.length
    ).length;
  });

  return (
    <Card className="flex flex-col overflow-auto border-0 bg-zinc-900">
      <CardContent className="space-y-3 overflow-auto px-0 py-4">
        <SellContent subMarketsWithHoldings={subMarketsWithHoldings} />
      </CardContent>
      {subMarketsWithHoldings.length ? (
        <CardFooter className="flex flex-col px-0 py-4">
          <Separator className="bg-neutral-800" />
          <Summary isBuy={false} />
        </CardFooter>
      ) : null}
    </Card>
  );
}
