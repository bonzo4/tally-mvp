"use client";

import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input, InputProps } from "@/components/ui/input";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Color, textCssMap } from "@/lib/cssMaps";
import {
  ChoiceMarket,
  SubMarketWithChoiceMarkets,
} from "@/lib/supabase/queries/markets/tradeMarket";

import { VscCircleFilled } from "react-icons/vsc";

export interface OrderButtonProps extends ButtonProps {
  price: number;
  selected: string | null;
}

function YesButton(props: OrderButtonProps) {
  const { price, selected, ...rest } = props;

  let color =
    "bg-transparent hover:bg-tally-primary/10 text-tally-primary/50 hover:text-tally-primary/60 border border-tally-primary/50";
  if (selected === "Yes") {
    color =
      "bg-tally-primary/20 hover:bg-tally-primary/30 text-tally-primary hover:text-tally border border-tally-primary";
  }

  return (
    <Button
      variant="outline"
      className={cn(color, "font-bold")}
    >{`Yes ${price}¢`}</Button>
  );
}

function NoButton(props: OrderButtonProps) {
  const { price, selected, ...rest } = props;

  let color =
    "bg-transparent hover:bg-tally-red/10 text-tally-red/50 hover:text-tally-red/60 border border-tally-red/50";
  if (selected === "No") {
    color =
      "bg-tally-red/20 hover:bg-tally-red/30 text-tally-red border border-tally-red";
  }

  return (
    <Button
      variant="outline"
      className={cn(color, "font-bold")}
    >{`No ${price}¢`}</Button>
  );
}

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

const choiceMarketButtonUnselectedCssMap = {
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

const choiceMarketButtonSelectedCssMap = {
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

function ChoiceMarketButton({
  selected,
  choiceMarket,
}: {
  selected: string;
  choiceMarket: ChoiceMarket;
}) {
  const { share_price, color, title, ...rest } = choiceMarket;

  let className_ =
    selected === title
      ? choiceMarketButtonSelectedCssMap[color as Color]
      : choiceMarketButtonUnselectedCssMap[color as Color] + " bg-transparent";

  return (
    <Button
      variant="outline"
      className={cn(className_, "h-[40px] w-full font-bold")}
    >{`${title} ${share_price * 100}¢`}</Button>
  );
}

function OrderSubMarket({
  subMarket,
}: {
  subMarket: SubMarketWithChoiceMarkets;
}) {
  const { card_title } = subMarket;
  const color = subMarket.color || "primary";
  const dotColor = textCssMap[color as keyof typeof textCssMap];
  console.log(subMarket.icon);

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
          <ChoiceMarketButton
            key={index}
            choiceMarket={choiceMarket}
            selected={"Yes"}
          />
        ))}
      </div>
      <AmountInput amount={0} />
    </div>
  );
}

function OrderItem({
  title,
  color,
  yesPrice,
  noPrice,
  selected,
}: {
  title: string;
  color: string;
  yesPrice: number;
  noPrice: number;
  selected: string | null;
}) {
  let dotColor = "text-black";
  if (color in textCssMap) {
    dotColor = textCssMap[color as keyof typeof textCssMap];
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-1">
        <VscCircleFilled className={cn(dotColor, "")} />
        <h2 className="text-lg text-white">{title}</h2>
      </div>
      <div className="grid w-full grid-cols-3 gap-3">
        <YesButton name="Yes" price={yesPrice} selected={selected} />
        <NoButton name="No" price={noPrice} selected={selected} />
        <AmountInput amount={0} />
      </div>
    </div>
  );
}

function BuyOrderSummary() {
  return (
    <div className="flex w-full flex-col space-y-5 pb-2 pt-4">
      <div className="space-y-2">
        <div className="flex w-full items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Order Amount</h2>
          </div>
          <div className="text-lg font-bold text-white">$100</div>
        </div>
        <Button className="w-full bg-tally-primary px-5 py-2 text-black hover:bg-tally-primary/90 hover:text-black">
          Buy
        </Button>
      </div>
      <div className="space-y-1 text-sm text-white">
        <div className="flex w-full justify-between">
          <div className="text-sm text-gray-400">Average Price:</div>
          <div>$.50</div>
        </div>
        <div className="flex w-full justify-between">
          <div className="text-sm text-gray-400">Shares:</div>
          <div>45000</div>
        </div>
        <div className="flex w-full justify-between">
          <div className="text-sm text-gray-400">Potential Return:</div>
          <div>$1000 (50%)</div>
        </div>
      </div>
    </div>
  );
}

function SellOrderSummary() {
  return (
    <div className="flex w-full flex-col space-y-5 pb-2 pt-4">
      <div className="space-y-2">
        <div className="flex w-full items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Shares</h2>
          </div>
          <div className="text-lg font-bold text-white">$100</div>
        </div>
        <Button className="w-full bg-tally-red px-5 py-2 text-black hover:bg-tally-red/90 hover:text-black">
          Sell
        </Button>
      </div>
      <div className="space-y-1 text-sm text-white">
        <div className="flex w-full justify-between">
          <div className="text-sm text-gray-400">Shares</div>
          <div>100</div>
        </div>
        <div className="flex w-full justify-between">
          <div className="text-sm text-gray-400">
            Estimated Amount Received:
          </div>
          <div>$74.15</div>
        </div>
      </div>
    </div>
  );
}

export default function Order({
  subMarkets,
}: {
  subMarkets: SubMarketWithChoiceMarkets[];
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
        <Card className="flex flex-col border-0 bg-transparent">
          <CardContent className="space-y-4 px-0 py-4">
            {subMarkets.map((subMarket, index) => (
              <OrderSubMarket key={index} subMarket={subMarket} />
            ))}
          </CardContent>
          <CardFooter className="flex flex-col px-0 py-4">
            <Separator className="bg-neutral-800" />
            <BuyOrderSummary />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent
        className="flex flex-col overflow-auto bg-transparent"
        value="sell"
      >
        <Card className="flex flex-col overflow-auto border-0 bg-zinc-900">
          <CardContent className="space-y-3 overflow-auto px-2 py-4 lg:px-6">
            <OrderItem
              title="Donald Trump"
              color="red"
              yesPrice={60}
              noPrice={40}
              selected={"No"}
            />
            <OrderItem
              title="Ron Desantis"
              color="orange"
              yesPrice={33}
              noPrice={67}
              selected={"Yes"}
            />
            <OrderItem
              title="Nikki Haley"
              color="yellow"
              yesPrice={4}
              noPrice={96}
              selected={null}
            />
          </CardContent>
          <CardFooter className="flex flex-col px-2 py-4 lg:px-6">
            <Separator className="bg-neutral-800" />
            <SellOrderSummary />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
