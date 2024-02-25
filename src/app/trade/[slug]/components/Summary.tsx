import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BuyFormState } from "./BuyCard";
import { SellFormState } from "./SellCard";
import { BuyConfirmation, SellConfirmation } from "./Popup";
import {
  formatNumberWithCommasNoDecimals,
  formatDollarsWithCents,
  formatDollarsWithoutCents,
} from "@/lib/formats";
import { BuyUseFormState } from "@/lib/api/actions/submitBuy";
import { SellUseFormState } from "@/lib/api/actions/submitSell";

import { Estimate } from "@/app/api/estimateBuy/route";

function BuyLineItem({
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
        <span>&nbsp;{`${formatDollarsWithoutCents(value)}`}</span>
      </div>
    </div>
  );
}

function SellLineItem({
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
        <span>{`${formatNumberWithCommasNoDecimals(shares)}`}</span>
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <div className="text-sm text-red-500">{message}</div>;
}

export function SummarySell({
  isFormEnabled,
  formState,
  validateFormState,
  validateFormAction,
  estimate,
  setEstimate,
}: {
  isFormEnabled: boolean;
  formState: SellFormState;
  validateFormState: SellUseFormState;
  validateFormAction: (payload: any) => void;
  estimate: Estimate[] | null;
  setEstimate: (value: Estimate[] | null) => void;
}) {
  const { pending } = useFormStatus();

  let total = 0;
  for (const key in formState) {
    const number = Number(formState[key].shares) || 0;
    total += number;
  }

  return (
    <div className="flex w-full flex-col space-y-5 pb-2 pt-4">
      <div className="space-y-2">
        <div className="text-tally-gray">Total Shares</div>
        <Input
          className="border border-tally-layer-2 bg-transparent text-tally-gray"
          value={formatNumberWithCommasNoDecimals(total)}
          readOnly={true}
        />
        <SellConfirmation
          formState={formState}
          validateFormState={validateFormState}
          estimate={estimate}
          setEstimate={setEstimate}
          trigger={
            <Button
              type={undefined}
              formAction={validateFormAction}
              className="w-full bg-tally-red px-5 py-2 text-black hover:bg-tally-red/90 hover:text-black"
              disabled={!isFormEnabled}
            >
              Get Sell Estimate
            </Button>
          }
          submit={
            <Button
              type="submit"
              form="sell-form"
              className="w-full bg-tally-red px-5 py-2 text-black hover:bg-tally-red/90 hover:text-black"
              disabled={!!pending}
            >
              {pending ? "Processing..." : "Confirm Sell"}
            </Button>
          }
        />
      </div>
      <div className="space-y-1 text-sm text-white">
        {Object.entries(formState).map(([key, value], index) => {
          if (!value.shares) return null;
          return (
            <SellLineItem
              key={index}
              title={value.subMarketTitle + ": " + value.choiceMarketTitle}
              shares={value.shares}
              value={value.shares * value.sharePrice}
            />
          );
        })}
      </div>
    </div>
  );
}

export function SummaryBuy({
  formState,
  validateFormState,
  validateFormAction,
  estimate,
  setEstimate,
}: {
  formState: BuyFormState[];
  validateFormAction: (payload: any) => void;
  validateFormState: BuyUseFormState;
  estimate: Estimate[] | null;
  setEstimate: (value: Estimate[] | null) => void;
}) {
  const total = formState.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const { pending } = useFormStatus();

  return (
    <div className="flex w-full flex-col space-y-5 pb-2 pt-4">
      <div className="space-y-2">
        <div className="text-tally-gray">Total Cost</div>
        <Input
          className="border border-tally-layer-2 bg-transparent text-tally-gray"
          value={formatDollarsWithCents(total)}
          readOnly={true}
        />
        <BuyConfirmation
          formState={formState}
          validateFormState={validateFormState}
          trigger={
            <Button
              type={undefined}
              formAction={validateFormAction}
              className="w-full bg-tally-primary px-5 py-2 text-black hover:bg-tally-primary/90 hover:text-black"
            >
              Get Buy Estimate
            </Button>
          }
          submit={
            <Button
              type="submit"
              form="buy-form"
              className="w-full bg-tally-primary px-5 py-2 text-black hover:bg-tally-primary/90 hover:text-black"
              disabled={!!pending}
            >
              {pending ? "Processing..." : "Confirm Buy"}
            </Button>
          }
          estimate={estimate}
          setEstimate={setEstimate}
        >
          {pending && <div className="text-white">Processing...</div>}
        </BuyConfirmation>
        {validateFormState?.status === "error" && (
          <ErrorMessage message={validateFormState.message} />
        )}
      </div>
      <div className="space-y-1 text-sm text-white">
        {formState.map(
          (
            { subMarketTitle, choiceMarketTitle, sharePrice, amount },
            index
          ) => {
            if (!amount || !sharePrice) return null;
            return (
              <BuyLineItem
                key={index}
                title={subMarketTitle + ": " + choiceMarketTitle}
                shares={sharePrice ? amount / sharePrice : 0}
                value={amount}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
