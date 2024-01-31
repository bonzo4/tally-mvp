"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input, InputProps } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VscCircleFilled } from "react-icons/vsc";

import { cn } from "@/lib/utils";
import { Color, textCssMap } from "@/lib/cssMaps";
import {
  ChoiceMarketWithHoldings,
  SubMarketWithHoldings,
} from "@/lib/supabase/queries/markets/tradeMarket";
import {
  formatNumberWithCommasNoDecimals,
  formatDollarsWithCents,
} from "@/lib/formats";

interface AmountInputProps extends InputProps {
  amount: number;
}

function AmountInput(props: AmountInputProps) {
  const { amount, className, ...rest } = props;

  let color =
    "hover:bg-tally-layer-2 focus:bg-tally-layer-2 text-tally-gray/40 hover:text-tally-gray/40 border border-tally-gray/40";
  if (amount > 0) {
    color = "text-tally-red hover:text-tally-gray border border-tally-gray";
  }

  return (
    <Input
      {...rest}
      placeholder="Order amount"
      className={cn(color, className, "h-[44px] bg-tally-layer-2")}
    ></Input>
  );
}

const choiceButtonUnselectedCssMap = {
  primary:
    "text-tally-primary/50 border-tally-primary/50 hover:bg-tally-primary/10 hover:text-tally-primary/60 border",
  red: "text-tally-red/50 border-tally-red/50 hover:bg-tally-red/10 hover:text-tally-red/60 border",
  orange:
    "text-tally-orange/50 border-tally-orange/50 hover:bg-tally-orange/10 hover:text-tally-orange/60 border",
  yellow:
    "text-tally-yellow/50 border-tally-yellow/50 hover:bg-tally-yellow/10 hover:text-tally-yellow/60 border",
  green:
    "text-tally-green/50 border-tally-green/50 hover:bg-tally-green/10 hover:text-tally-green/60 border",
  blue: "text-tally-blue/50 border-tally-blue/50 hover:bg-tally-blue/10 hover:text-tally-blue/60 border",
  purple:
    "text-tally-purple/50 border-tally-purple/50 hover:bg-tally-purple/10 hover:text-tally-purple/60 border",
  indigo:
    "text-tally-indigo/50 border-tally-indigo/50 hover:bg-tally-indigo/10 hover:text-tally-indigo/60 border",
  gray: "text-tally-gray/50 border-tally-gray/50 hover:bg-tally-gray/10 hover:text-tally-gray/60 border",
  white:
    "text-tally-white/50 border-tally-white/50 hover:bg-tally-white/10 hover:text-tally-white/60 border",
};

const choiceButtonSelectedCssMap = {
  primary:
    "bg-tally-primary/20 text-tally-primary border border-tally-primary hover:bg-tally-primary/30 hover:text-tally",
  red: "bg-tally-red/20 text-tally-red border border-tally-red hover:bg-tally-red/30 hover:text-tally",
  orange:
    "bg-tally-orange/20 text-tally-orange border border-tally-orange hover:bg-tally-orange/30 hover:text-tally",
  yellow:
    "bg-tally-yellow/20 text-tally-yellow border border-tally-yellow hover:bg-tally-yellow/30 hover:text-tally",
  green:
    "bg-tally-green/20 text-tally-green border border-tally-green hover:bg-tally-green/30 hover:text-tally",
  blue: "bg-tally-blue/20 text-tally-blue border border-tally-blue hover:bg-tally-blue/30 hover:text-tally",
  purple:
    "bg-tally-purple/20 text-tally-purple border border-tally-purple hover:bg-tally-purple/30 hover:text-tally",
  indigo:
    "bg-tally-indigo/20 text-tally-indigo border border-tally-indigo hover:bg-tally-indigo/30 hover:text-tally",
  gray: "bg-tally-gray/20 text-tally-gray border border-tally-gray hover:bg-tally-gray/30 hover:text-tally",
  white:
    "bg-tally-white/20 text-tally-white border border-tally-white hover:bg-tally-white/30 hover:text-tally",
};

type ChoiceButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  selected: string;
  choiceMarket: ChoiceMarketWithHoldings;
};

function ChoiceButton({
  selected,
  choiceMarket,
  className,
  ...rest
}: ChoiceButtonProps) {
  const { share_price, color, title } = choiceMarket;

  let className_ =
    selected === title
      ? choiceButtonSelectedCssMap[color as Color]
      : choiceButtonUnselectedCssMap[color as Color] + " bg-transparent";

  return (
    <Button
      variant="outline"
      className={cn(className, className_, "font-bold")}
    >{`${title} ${share_price * 100}¢`}</Button>
  );
}

function BuySubMarket({ subMarket }: { subMarket: SubMarketWithHoldings }) {
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
      <div className="flex w-full space-x-2">
        {subMarket.choice_markets.map((choiceMarket, index) => (
          <ChoiceButton
            key={index}
            className="h-[40px] w-full"
            choiceMarket={choiceMarket}
            selected={"Yes"}
          />
        ))}
      </div>
      <AmountInput amount={0} />
    </div>
  );
}

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

function LineItem({
  title,
  shares,
  value,
}: {
  title: string;
  shares: number;
  value: number;
}) {
  return (
    <div className="flex w-full justify-between">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="flex">
        <span>{formatNumberWithCommasNoDecimals(shares)}</span>
        <span>&nbsp;{`(${formatDollarsWithCents(value)})`}</span>
      </div>
    </div>
  );
}

function Summary({ isBuy }: { isBuy: boolean }) {
  return (
    <div className="flex w-full flex-col space-y-5 pb-2 pt-4">
      <div className="space-y-2">
        <div className="text-tally-gray">Total Cost</div>
        <Input
          className="border border-tally-layer-2 bg-transparent text-tally-gray"
          value="$200"
        />
        {isBuy ? (
          <Button className="w-full bg-tally-primary px-5 py-2 text-black hover:bg-tally-primary/90 hover:text-black">
            Buy
          </Button>
        ) : (
          <Button className="w-full bg-tally-red px-5 py-2 text-black hover:bg-tally-red/90 hover:text-black">
            Sell
          </Button>
        )}
      </div>
      <div className="space-y-1 text-sm text-white">
        <LineItem title="Shares" shares={100} value={100} />
        <LineItem title="Shares" shares={100} value={100} />
      </div>
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
                console.log(choice_market);
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

function BuyCard({ subMarkets }: { subMarkets: SubMarketWithHoldings[] }) {
  return (
    <Card className="flex flex-col border-0 bg-transparent">
      <CardContent className="space-y-4 px-0 py-4">
        {subMarkets.map((subMarket, index) => (
          <BuySubMarket key={index} subMarket={subMarket} />
        ))}
      </CardContent>
      <CardFooter className="flex flex-col px-0 py-4">
        <Separator className="bg-neutral-800" />
        <Summary isBuy={true} />
      </CardFooter>
    </Card>
  );
}

function SellCard({ subMarkets }: { subMarkets: SubMarketWithHoldings[] }) {
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

export default function Order({
  subMarkets,
}: {
  subMarkets: SubMarketWithHoldings[];
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
        <BuyCard subMarkets={subMarkets} />
      </TabsContent>
      <TabsContent
        className="flex flex-col overflow-auto bg-transparent"
        value="sell"
      >
        <SellCard subMarkets={subMarkets} />
      </TabsContent>
    </Tabs>
  );
}
