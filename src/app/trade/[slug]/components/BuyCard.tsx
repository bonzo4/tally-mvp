"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { textCssMap } from "@/lib/cssMaps";
import { Separator } from "@/components/ui/separator";
import { SubMarketWithHoldings } from "@/lib/supabase/queries/markets/tradeMarket";
import { VscCircleFilled } from "react-icons/vsc";

import AmountInput from "./TradeInput";
import ChoiceButton from "./ChoiceButton";
import Summary from "./Summary";
import submitTrade from "@/lib/api/actions/submitTrade";

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
      <fieldset className="space-y-2">
        <div className="flex w-full space-x-2">
          {subMarket.choice_markets.map((choiceMarket, index) => (
            <ChoiceButton
              id={choiceMarket.id.toString()}
              name={subMarket.id.toString()}
              value={choiceMarket.id.toString()}
              key={index}
              className="h-[40px] w-full"
              choiceMarket={choiceMarket}
            />
          ))}
        </div>
        <AmountInput
          id={subMarket.id.toString() + " amount"}
          name={subMarket.id.toString() + " amount"}
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
  const [state, formAction] = useFormState(submitTrade, null);
  return (
    <form action={(payload) => formAction(payload)}>
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
    </form>
  );
}