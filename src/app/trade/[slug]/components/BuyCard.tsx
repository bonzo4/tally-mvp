"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { textCssMap } from "@/lib/cssMaps";
import { Separator } from "@/components/ui/separator";
import { SubMarketWithHoldings } from "@/lib/supabase/queries/markets/tradeMarket";
import { VscCircleFilled } from "react-icons/vsc";

import AmountInput from "./TradeInput";
import ChoiceButton from "./ChoiceButton";
import Summary from "./Summary";
import submitBuy from "@/lib/api/actions/submitBuy";
import { getSharePrice } from "@/lib/estimatePrice";

type FormState = {
  trade_side: string;
  amount: string;
};

function BuySubMarket({
  subMarket,
  formState,
  handleRadioButtonChange,
  handleAmountChange,
}: {
  subMarket: SubMarketWithHoldings;
  formState: FormState;
  handleRadioButtonChange: (value: string) => void;
  handleAmountChange: (value: string) => void;
}) {
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
      <fieldset className="space-y-2">
        <div className="flex w-full space-x-2">
          {subMarket.choice_markets.map((choiceMarket, index) => {
            const sharePrice = getSharePrice(subMarket, choiceMarket.id);
            return (
              <ChoiceButton
                id={choiceMarket.id.toString()}
                name={subMarket.id.toString()}
                value={choiceMarket.id.toString()}
                key={index}
                className="h-[40px] w-full"
                choiceMarket={choiceMarket}
                sharePrice={sharePrice}
                checked={formState.trade_side === choiceMarket.title}
                onChange={(e) => handleRadioButtonChange(choiceMarket.title)}
              />
            );
          })}
        </div>
        <AmountInput
          id={subMarket.id.toString() + " amount"}
          name={subMarket.id.toString() + " amount"}
          value={formState.amount}
          onChange={(e) => handleAmountChange(e.target.value)}
        />
      </fieldset>
    </div>
  );
}

export default function BuyCard({
  subMarkets,
}: {
  subMarkets: SubMarketWithHoldings[];
}) {
  const [state, formAction] = useFormState(submitBuy, null);

  const [formState, setFormState] = useState(
    Array(subMarkets.length).fill({ trade_side: "", amount: "" })
  );

  const handleRadioButtonChange = (index: number) => (value: string) => {
    setFormState([
      ...formState.slice(0, index),
      { trade_side: value, amount: formState[index].amount },
      ...formState.slice(index + 1),
    ]);
  };

  const handleAmountChange = (index: number) => (value: string) => {
    setFormState([
      ...formState.slice(0, index),
      { trade_side: formState[index].trade_side, amount: value },
      ...formState.slice(index + 1),
    ]);
  };
  return (
    <form action={(payload) => formAction(payload)}>
      <Card className="flex flex-col border-0 bg-transparent">
        <CardContent className="space-y-4 px-0 py-4">
          {subMarkets.map((subMarket, index) => (
            <BuySubMarket
              key={index}
              subMarket={subMarket}
              formState={formState[index]}
              handleRadioButtonChange={handleRadioButtonChange(index)}
              handleAmountChange={handleAmountChange(index)}
            />
          ))}
        </CardContent>
        <CardFooter className="flex flex-col px-0 py-4">
          <Separator className="bg-neutral-800" />
          <Summary isBuy={true} />
        </CardFooter>
      </Card>
    </form>
  );
}
