"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { VscCircleFilled } from "react-icons/vsc";

import OrderInput from "./OrderInput";
import ChoiceButton from "./ChoiceButton";
import { SummaryBuy } from "./Summary";

import { Estimate } from "@/app/api/estimateBuy/route";
import { SubMarketWithHoldings } from "@/lib/supabase/queries/markets/tradeMarket";
import { UserDoc } from "@/lib/supabase/queries/user";
import submitBuy, {
  validateBuy,
  BuyUseFormState,
  BuyErrorMessages,
} from "@/lib/api/actions/submitBuy";
import { textCssMap } from "@/lib/cssMaps";

function BuySubMarket({
  subMarket,
  formState,
  error,
  handleRadioButtonChange,
  handleAmountChange,
}: {
  subMarket: SubMarketWithHoldings;
  formState: BuyFormState;
  error: BuyErrorMessages | null;
  handleRadioButtonChange: ({
    sharePrice,
    choiceMarketTitle,
    choiceMarketId,
  }: {
    sharePrice: number;
    choiceMarketTitle: string;
    choiceMarketId: number;
  }) => void;
  handleAmountChange: (amount: number) => void;
}) {
  const { card_title } = subMarket;
  const color = subMarket.color || "primary";
  const dotColor = textCssMap[color as keyof typeof textCssMap];

  const errorCss = error ? "rounded-lg border border-red-500 p-1" : "";

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
        <div className="space-y-1">
          <div
            className={cn(
              error?.radio ? errorCss : "",
              "flex w-full space-x-2"
            )}
          >
            {subMarket.choice_markets.map((choiceMarket, index) => {
              return (
                <ChoiceButton
                  id={choiceMarket.id.toString()}
                  name={subMarket.id.toString()}
                  value={choiceMarket.id.toString()}
                  key={index}
                  className="h-[40px] w-full"
                  choiceMarket={choiceMarket}
                  sharePrice={choiceMarket.share_price}
                  checked={formState.choiceMarketId === choiceMarket.id}
                  onChange={(e) =>
                    handleRadioButtonChange({
                      choiceMarketTitle: choiceMarket.title,
                      choiceMarketId: choiceMarket.id,
                      sharePrice: choiceMarket.share_price,
                    })
                  }
                />
              );
            })}
          </div>
          {error?.radio && (
            <div className="text-xs text-red-500">{error.radio}</div>
          )}
        </div>
        <OrderInput
          id={subMarket.id.toString() + " amount"}
          error={error?.text}
          label="Amount in $"
          name={subMarket.id.toString() + " amount"}
          placeholder="Order amount in $"
          step="any"
          value={formState.amount}
          onChange={(e) => handleAmountChange(Number(e.target.value))}
        />
      </fieldset>
    </div>
  );
}

function LoginButton({ slug }: { slug: string }) {
  return (
    <Link
      href={`/login?redirect=/trade/${slug}`}
      className="w-full underline hover:cursor-pointer hover:no-underline"
    >
      <Button className="w-full border border-tally-primary bg-tally-background px-5 py-2 text-[16px] font-medium text-tally-primary hover:bg-tally-layer-1">
        Log In
      </Button>
    </Link>
  );
}

// The index and subMarketTitle don't change with user input,
// but we want to pass this data to the Summary component.
export type BuyFormState = {
  subMarketId: number;
  subMarketTitle: string;
  choiceMarketId: number;
  choiceMarketTitle: string;
  sharePrice: number;
  amount: number;
};

export default function BuyCard({
  subMarkets,
  user,
  slug,
}: {
  subMarkets: SubMarketWithHoldings[];
  user: UserDoc | null;
  slug: string;
}) {
  const [validateFormState, validateFormAction] = useFormState<
    BuyUseFormState,
    FormData
  >(validateBuy, null);

  const [formState, setFormState] = useState<BuyFormState[]>(
    Array(subMarkets.length).fill({
      subMarketId: 0,
      choiceMarketId: 0,
      sharePrice: 0,
      amount: "",
      submitType: "",
    })
  );

  const [estimate, setEstimate] = useState<Estimate[] | null>(null);
  const newSubmitBuy = submitBuy.bind(null, estimate);

  // The sharePrice and choiceMarketTitle change whenever user selects a different option.
  // The index and subMarketTitle are closures and don't need to change.
  const handleRadioButtonChange =
    (index: number, subMarketId: number, subMarketTitle: string) =>
    ({
      choiceMarketTitle,
      choiceMarketId,
      sharePrice,
    }: {
      choiceMarketTitle: string;
      choiceMarketId: number;
      sharePrice: number;
    }) => {
      setFormState([
        ...formState.slice(0, index),
        {
          choiceMarketId,
          choiceMarketTitle,
          subMarketId,
          subMarketTitle,
          sharePrice,
          amount: formState[index].amount,
        },
        ...formState.slice(index + 1),
      ]);
    };

  // The amount changes whenever user types in a different amount.
  const handleAmountChange =
    (index: number, subMarketId: number, subMarketTitle: string) =>
    (amount: number) => {
      setFormState([
        ...formState.slice(0, index),
        {
          choiceMarketId: formState[index].choiceMarketId,
          choiceMarketTitle: formState[index].choiceMarketTitle,
          subMarketId,
          subMarketTitle,
          sharePrice: formState[index].sharePrice || 0,
          amount: amount,
        },
        ...formState.slice(index + 1),
      ]);
    };

  return (
    <form id="buy-form" action={newSubmitBuy}>
      <Card className="flex flex-col border-0 bg-transparent">
        <CardContent className="space-y-4 px-0 py-4">
          {subMarkets.map((subMarket, index) => (
            <BuySubMarket
              key={index}
              subMarket={subMarket}
              formState={formState[index]}
              error={
                validateFormState?.status === "error"
                  ? validateFormState.errors[subMarket.id]
                  : null
              }
              handleRadioButtonChange={handleRadioButtonChange(
                index,
                subMarket.id,
                subMarket.title
              )}
              handleAmountChange={handleAmountChange(
                index,
                subMarket.id,
                subMarket.title
              )}
            />
          ))}
        </CardContent>
        <CardFooter className="flex flex-col px-0 py-4">
          <Separator className="bg-neutral-800" />
          {user ? (
            <SummaryBuy
              formState={formState}
              validateFormState={validateFormState}
              validateFormAction={(payload) => validateFormAction(payload)}
              estimate={estimate}
              setEstimate={setEstimate}
            />
          ) : (
            <LoginButton slug={slug} />
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
