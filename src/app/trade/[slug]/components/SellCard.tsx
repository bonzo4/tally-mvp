"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { textCssMap } from "@/lib/cssMaps";
import { Separator } from "@/components/ui/separator";
import { VscCircleFilled } from "react-icons/vsc";
import { UserDoc } from "@/lib/supabase/queries/user";
import {
  ChoiceMarketWithHoldings,
  SubMarketWithHoldings,
} from "@/lib/supabase/queries/markets/tradeMarket";
import {
  formatNumberWithCommasNoDecimals,
  formatDollarsWithCents,
} from "@/lib/formats";

import OrderInput from "./OrderInput";
import ChoiceButton from "./ChoiceButton";
import { SummarySell } from "./Summary";
import submitSell, {
  SellUseFormState,
  validateSell,
} from "@/lib/api/actions/submitSell";
import { getSharePrice } from "@/lib/estimatePrice";

type SellChoiceMarketProps = {
  choiceMarket: ChoiceMarketWithHoldings;
  sharePrice: number;
  formState: SellFormState;
  error: string | null;
  handleAmountChange: (value: number) => void;
  setIsFormEnabled: (enabled: boolean) => void;
  enabledInput: number | null;
};

function SellChoiceMarket({
  choiceMarket,
  sharePrice,
  formState,
  error,
  handleAmountChange,
  setIsFormEnabled,
  enabledInput,
}: SellChoiceMarketProps) {
  const shares = choiceMarket.holdings[0].shares;
  const value = formatDollarsWithCents(shares * sharePrice);

  const errorCss = error ? "rounded-lg border border-red-500 p-1" : "";
  const inputAmount = formState[choiceMarket.id]?.shares || 0;

  useEffect(() => {
    setIsFormEnabled(!error);
  }, [error, setIsFormEnabled]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between space-x-2">
        <ChoiceButton
          id={choiceMarket.id.toString()}
          name={choiceMarket.id.toString()}
          value={choiceMarket.id.toString()}
          className="h-[40px]"
          choiceMarket={choiceMarket}
          sharePrice={sharePrice}
          checked={!!formState[choiceMarket.id]?.shares}
          disabled={true}
        />
        <div className="flex flex-col">
          <div className="text-right text-white">{`${formatNumberWithCommasNoDecimals(
            shares
          )} shares `}</div>
        </div>
      </div>
      <OrderInput
        id={choiceMarket.id.toString()}
        name={choiceMarket.id.toString()}
        label="Shares"
        placeholder="Number of shares to sell"
        step="1"
        error={error}
        value={inputAmount}
        disabled={enabledInput ? enabledInput !== choiceMarket.id : false}
        onChange={(e) => handleAmountChange(Number(e.target.value))}
      />
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
  formState,
  setIsFormEnabled,
  validateFormState,
  handleAmountChange,
}: {
  subMarketsWithHoldings: SubMarketWithHoldings[];
  formState: SellFormState;
  setIsFormEnabled: (enabled: boolean) => void;
  validateFormState: SellUseFormState;
  handleAmountChange: (
    subMarketTitle: string,
    choiceMarketTitle: string,
    choice_market_id: number,
    sharePrice: number
  ) => (value: number) => void;
}) {
  if (!subMarketsWithHoldings?.length)
    return (
      <div className="text-white">You don&apos;t own any shares to sell</div>
    );

  return (
    <>
      {subMarketsWithHoldings.map((subMarketWithHoldings, index) => {
        // Only allow one choice within a submarket for sell order.
        // Preventing issue where price of later sells are impacted by prior sells.
        let enabledInput: number | null = null;
        for (const choiceMarket of subMarketWithHoldings.choice_markets) {
          if (formState[choiceMarket.id]?.shares) {
            enabledInput = choiceMarket.id;
            break;
          }
        }
        return (
          <SellSubMarket key={index} subMarket={subMarketWithHoldings}>
            {subMarketWithHoldings.choice_markets.map(
              (choice_market, index) => {
                if (!choice_market.holdings.length) return;
                const sharePrice = getSharePrice(
                  subMarketWithHoldings,
                  choice_market.id
                );
                const insufficientBalanceError =
                  choice_market.holdings[0].shares <
                  formState[choice_market.id]?.shares
                    ? "Insufficient balance."
                    : null;
                const backendError =
                  validateFormState?.status === "error"
                    ? validateFormState.errors[choice_market.id].text
                    : null;
                return (
                  <SellChoiceMarket
                    key={index}
                    choiceMarket={choice_market}
                    sharePrice={sharePrice}
                    formState={formState}
                    error={insufficientBalanceError || backendError}
                    setIsFormEnabled={setIsFormEnabled}
                    handleAmountChange={handleAmountChange(
                      subMarketWithHoldings.card_title ||
                        subMarketWithHoldings.title,
                      choice_market.title,
                      choice_market.id,
                      sharePrice
                    )}
                    enabledInput={enabledInput}
                  />
                );
              }
            )}
          </SellSubMarket>
        );
      })}
    </>
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

export type SellFormState = {
  [key: number]: {
    subMarketTitle: string;
    choiceMarketTitle: string;
    choiceMarketId: number;
    sharePrice: number;
    shares: number;
  };
};

export default function SellCard({
  subMarkets,
  user,
  slug,
}: {
  subMarkets: SubMarketWithHoldings[];
  user: UserDoc | null;
  slug: string;
}) {
  const [validateFormState, validateFormAction] = useFormState<
    SellUseFormState,
    FormData
  >(validateSell, null);
  const [submitFormState, submitFormAction] = useFormState<
    SellUseFormState,
    FormData
  >(submitSell, null);
  const [formState, setFormState] = useState<SellFormState>({});
  const [isFormEnabled, setIsFormEnabled] = useState<boolean>(true);

  const handleAmountChange =
    (
      subMarketTitle: string,
      choiceMarketTitle: string,
      choiceMarketId: number,
      sharePrice: number
    ) =>
    (shares: number) => {
      setFormState({
        ...formState,
        [choiceMarketId]: {
          subMarketTitle: subMarketTitle,
          choiceMarketTitle: choiceMarketTitle,
          choiceMarketId: choiceMarketId,
          sharePrice: sharePrice,
          shares: shares,
        },
      });
    };

  const subMarketsWithHoldings = subMarkets.filter((subMarket) => {
    return subMarket.choice_markets.filter(
      (choiceMarket) => choiceMarket.holdings.length
    ).length;
  });

  return (
    <form id="sell-form" action={(payload) => submitFormAction(payload)}>
      <Card className="flex flex-col overflow-auto border-0 bg-zinc-900">
        <CardContent className="space-y-3 overflow-auto px-0 py-4">
          {user ? (
            <SellContent
              subMarketsWithHoldings={subMarketsWithHoldings}
              formState={formState}
              setIsFormEnabled={setIsFormEnabled}
              validateFormState={validateFormState}
              handleAmountChange={handleAmountChange}
            />
          ) : (
            <LoginButton slug={slug} />
          )}
        </CardContent>
        {subMarketsWithHoldings.length ? (
          <CardFooter className="flex flex-col px-0 py-4">
            <Separator className="bg-neutral-800" />
            <SummarySell
              isFormEnabled={isFormEnabled}
              formState={formState}
              validateFormState={validateFormState}
              validateFormAction={validateFormAction}
            />
          </CardFooter>
        ) : null}
      </Card>
    </form>
  );
}
