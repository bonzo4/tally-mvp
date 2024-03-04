"use client";

import { useFormState } from "react-dom";
import { Database } from "@/lib/supabase/types";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input as InputPrimitive, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { ChoiceMarket } from "@/lib/supabase/queries/markets/subMarkets";
import { FilterButton } from "@/components/FilterButton";
import { formatDollarsWithoutCents } from "@/lib/formats";
import {
  validateFairLaunch,
  submitFairLaunch,
  FairLaunchEstimate,
  FairLaunchUseFormState,
  FairLaunchError,
} from "@/lib/api/actions/submitFairLaunch";
import { textCssMap } from "@/lib/cssMaps";
import { FairLaunchConfirmation } from "./Popup";

type Color = Database["public"]["Enums"]["colors_enum"];

const borderCssMap: Record<Color, string> = {
  primary: "border-tally-primary hover:border-tally-primary/90",
  red: "border-tally-red hover:border-tally-red/90",
  orange: "border-tally-orange hover:border-tally-orange/90",
  yellow: "border-tally-yellow hover:border-tally-yellow/90",
  green: "border-tally-green hover:border-tally-green/90",
  blue: "border-tally-blue hover:border-tally-blue/90",
  purple: "border-tally-purple hover:border-tally-purple/90",
  indigo: "border-tally-indigo hover:border-tally-indigo/90",
  gray: "border-tally-gray hover:border-tally-gray/90",
  white: "border-tally-white hover:border-tally-white/90",
};

const buttonCssMap: Record<Color, string> = {
  primary: "bg-tally-primary hover:bg-tally-primary/90",
  red: "bg-tally-red hover:bg-tally-red/90",
  orange: "bg-tally-orange hover:bg-tally-orange/90",
  yellow: "bg-tally-yellow hover:bg-tally-yellow/90",
  green: "bg-tally-green hover:bg-tally-green/90",
  blue: "bg-tally-blue hover:bg-tally-blue/90",
  purple: "bg-tally-purple hover:bg-tally-purple/90",
  indigo: "bg-tally-indigo hover:bg-tally-indigo/90",
  gray: "bg-tally-gray hover:bg-tally-gray/90",
  white: "bg-tally-white hover:bg-tally-white/90",
};

export function isFairLaunchError(
  state: FairLaunchUseFormState
): state is FairLaunchError {
  return state ? state.status === "error" : false;
}

type InputWithErrorProps = InputProps & {
  validateFormState: FairLaunchUseFormState;
};

function Input(props: InputWithErrorProps) {
  let isError: boolean = false;
  let errorMessage: string = "";
  if (
    props.name &&
    props.validateFormState?.status === "error" &&
    props.validateFormState?.errors[props.name]
  ) {
    isError = true;
    errorMessage = props.validateFormState.errors[props.name];
  }
  return (
    <div className="flex flex-col gap-2">
      <InputPrimitive
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={cn(
          isError ? "border border-tally-red" : "border-0",
          "bg-tally-layer-2 text-tally-gray placeholder:text-tally-gray lg:w-[220px]"
        )}
        placeholder={props.placeholder}
      />

      {isError && <div className="text-sm text-tally-red">{errorMessage}</div>}
    </div>
  );
}

function OrderCard({ choice }: { choice: ChoiceMarket }) {
  const color = choice.color || "primary";
  const borderCss = borderCssMap[color as keyof typeof borderCssMap];
  const buttonCss = buttonCssMap[color as keyof typeof buttonCssMap];
  const textCss = textCssMap[color as keyof typeof textCssMap];
  const [amount, setAmount] = useState<number>();

  const [validateFormState, validateFormAction] = useFormState<
    FairLaunchUseFormState,
    FormData
  >(validateFairLaunch.bind(null, choice.id), null);

  const [submitFormState, submitFormAction] = useFormState<
    FairLaunchUseFormState,
    FormData
  >(submitFairLaunch.bind(null, choice.id), null);

  const [estimate, setEstimate] = useState<FairLaunchEstimate | null>(null);

  useEffect(() => {
    console.log("Validate Form State", validateFormState);
  }, [validateFormState]);

  useEffect(() => {
    if (validateFormState?.status === "success") {
      setEstimate(validateFormState.estimate);
    }
  }, [validateFormState]);

  return (
    <form
      id={`fair-launch-form-${choice.id}`}
      action={(payload) => submitFormAction(payload)}
      className={cn(
        borderCss,
        "flex flex-col space-y-4 rounded-2xl border-2 bg-black p-4"
      )}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-end space-x-2">
          <div className="text-4xl font-bold text-white">{choice.title}</div>
          <div className={cn(textCss, "text-2xl")}>$.50</div>
        </div>
        <div className="text-sm text-tally-gray">{`Total Pot: ${formatDollarsWithoutCents(
          choice.total_pot
        )}`}</div>
      </div>
      <div className="flex space-x-2">
        <div className="flex flex-col">
          <Input
            name="amount"
            value={amount ? amount : ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border-0 bg-tally-layer-2 text-tally-gray placeholder:text-tally-gray lg:w-[220px]"
            placeholder="$0"
            validateFormState={validateFormState}
          />
        </div>
        <FairLaunchConfirmation
          className={cn(borderCss)}
          estimate={estimate}
          trigger={
            <Button
              formAction={(payload) => validateFormAction(payload)}
              className={cn(buttonCss, "text-black hover:text-black")}
            >
              Buy
            </Button>
          }
          submit={
            <Button
              type="submit"
              form={`fair-launch-form-${choice.id}`}
              className={cn(buttonCss, "text-black hover:text-black")}
            >
              Submit
            </Button>
          }
        />
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between">
          <div className="text-sm text-tally-gray">Shares</div>
          <div className="text-white">
            {Number(amount) ? Number(amount) * 2 : 0}
          </div>
        </div>
      </div>
    </form>
  );
}

function OrderCardMulti({ choice }: { choice: ChoiceMarket }) {
  const color = choice.color || "primary";
  const borderCss = borderCssMap[color as keyof typeof borderCssMap];
  const buttonCss = buttonCssMap[color as keyof typeof buttonCssMap];
  const textCss = textCssMap[color as keyof typeof textCssMap];

  return (
    <div
      className={cn(
        "flex flex-col justify-between space-x-0 space-y-2 rounded-2xl border border-tally-layer-2 bg-tally-background/90 p-4 lg:flex-row lg:space-x-8 lg:space-y-0"
      )}
    >
      <div className="flex flex-shrink flex-col truncate">
        <div className="flex items-center space-x-2 truncate">
          {choice.icon ? (
            <div className="relative h-[55px] w-[55px] flex-shrink-0">
              <Image
                src={choice.icon}
                alt="something"
                fill={true}
                className="rounded-lg object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-col">
            <div className="flex-row items-end justify-between space-x-2 truncate lg:flex-col lg:items-start lg:space-x-0">
              <div className="truncate text-3xl font-bold text-white">
                {choice.title}
              </div>
              <div className={cn(textCss, "text-lg")}>$.50</div>
            </div>
            <div className="mt-2 text-sm text-tally-gray lg:hidden">{`Total Pot: ${formatDollarsWithoutCents(
              choice.total_pot
            )}`}</div>
          </div>
        </div>
        <div className="mt-2 hidden text-sm text-tally-gray lg:flex">{`Total Pot: ${formatDollarsWithoutCents(
          choice.total_pot
        )}`}</div>
      </div>
      <div className="flex flex-shrink-0 flex-col justify-between">
        <div className="flex space-x-2">
          <Button
            type="submit"
            className={cn(buttonCss, "text-black hover:text-black")}
          >
            Submit
          </Button>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-sm text-tally-gray">Shares</div>
          <div className="text-white">0</div>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-sm text-tally-gray">Potential Return</div>
          <div className="text-white">$0 (0%)</div>
        </div>
      </div>
    </div>
  );
}

export function OrderMobile({ choices }: { choices: ChoiceMarket[] }) {
  const [selected, setSelected] = useState<string>(choices[0].title);
  if (choices.length < 4) {
    return (
      <div className="space-y-6 px-4 py-10 lg:hidden">
        <div className="flex w-full space-x-2">
          {choices.map((choice, index) => (
            <FilterButton
              key={index}
              className="flex-grow"
              selectedCss={cn(
                buttonCssMap[
                  (choice.color || "primary") as keyof typeof buttonCssMap
                ],
                "text-black"
              )}
              name={choice.title}
              selected={selected}
              onClick={() => setSelected(choice.title)}
            />
          ))}
        </div>
        {choices
          .map((choice, index) => <OrderCard key={index} choice={choice} />)
          .filter((choice) => choice.props.choice.title === selected)}
      </div>
    );
  } else {
    return (
      <div className="space-y-4 px-4 lg:hidden">
        {choices.map((choice, index) => (
          <OrderCardMulti key={index} choice={choice} />
        ))}
      </div>
    );
  }
}

export function OrderDesktop({ choices }: { choices: ChoiceMarket[] }) {
  if (!choices) return;
  if (choices.length < 4) {
    return (
      <div className="hidden space-x-6 lg:flex">
        {choices.map((choice, index) => (
          <OrderCard key={index} choice={choice} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
        {choices.map((choice, index) => (
          <OrderCardMulti key={index} choice={choice} />
        ))}
      </div>
    );
  }
}
