"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { FilterButton } from "@/components/FilterButton";

function OrderButton({ choice, color }: { choice: string; color?: string }) {
  const borderCssMap = {
    red: "border-tally-red hover:border-tally-red/90",
    orange: "border-tally-orange hover:border-tally-orange/90",
    yellow: "border-tally-yellow hover:border-tally-yellow/90",
    green: "border-tally-green hover:border-tally-green/90",
    blue: "border-tally-blue hover:border-tally-blue/90",
    purple: "border-tally-purple hover:border-tally-purple/90",
    indigo: "border-tally-indigo hover:border-tally-indigo/90",
    gray: "border-tally-gray hover:border-tally-gray/90",
  };

  let borderCss = "border-tally-primary hover:border-tally-primary/90";
  if (choice === "No") {
    borderCss = "border-tally-red hover:border-tally-red/90";
  } else if (borderCssMap[color as keyof typeof borderCssMap]) {
    borderCss = borderCssMap[color as keyof typeof borderCssMap];
  }

  const buttonCssMap = {
    red: "bg-tally-red hover:bg-tally-red/90",
    orange: "bg-tally-orange hover:bg-tally-orange/90",
    yellow: "bg-tally-yellow hover:bg-tally-yellow/90",
    green: "bg-tally-green hover:bg-tally-green/90",
    blue: "bg-tally-blue hover:bg-tally-blue/90",
    purple: "bg-tally-purple hover:bg-tally-purple/90",
    indigo: "bg-tally-indigo hover:bg-tally-indigo/90",
    gray: "bg-tally-gray hover:bg-tally-gray/90",
  };

  let buttonCss = "bg-tally-primary hover:bg-tally-primary/90";
  if (choice === "No") {
    buttonCss = "bg-tally-red hover:bg-tally-red/90";
  } else if (buttonCssMap[color as keyof typeof buttonCssMap]) {
    buttonCss = buttonCssMap[color as keyof typeof buttonCssMap];
  }

  const textCssMap = {
    red: "text-tally-red",
    orange: "text-tally-orange",
    yellow: "text-tally-yellow",
    green: "text-tally-green",
    blue: "text-tally-blue",
    purple: "text-tally-purple",
    indigo: "text-tally-indigo",
    gray: "text-tally-gray",
  };

  let textCss = "text-tally-primary";
  if (choice === "No") {
    textCss = "text-tally-red";
  } else if (textCssMap[color as keyof typeof textCssMap]) {
    textCss = textCssMap[color as keyof typeof textCssMap];
  }

  return (
    <div
      className={cn(
        borderCss,
        "flex flex-col space-y-4 rounded-2xl border-2 bg-black p-4"
      )}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-end space-x-2">
          <div className="text-4xl font-bold text-white">{choice}</div>
          <div className={cn(textCss, "text-2xl")}>$.50</div>
        </div>
        <div className="text-sm text-tally-gray">Total Pot: $1,432,543</div>
      </div>
      <div className="flex space-x-2">
        <Input
          className="border-0 bg-tally-layer-2 text-tally-gray placeholder:text-tally-gray lg:w-[220px]"
          placeholder="$0"
        />
        <Button className={cn(buttonCss, "text-black hover:text-black")}>
          Buy
        </Button>
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between">
          <div className="text-sm text-tally-gray">Shares</div>
          <div className="text-white">0</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-tally-gray">Potential Return</div>
          <div className="text-white">$0 (0%)</div>
        </div>
      </div>
    </div>
  );
}

export function OrderCardsMobile() {
  const [selected, setSelected] = useState<string>("Yes");
  return (
    <div className="space-y-6 px-4 py-10 md:hidden">
      <div className="flex w-full space-x-2">
        <FilterButton
          className="flex-grow"
          selectedCss="bg-tally-primary hover:bg-tally-primary text-black"
          name="Yes"
          selected={selected}
          onClick={() => setSelected("Yes")}
        />
        <FilterButton
          className="flex-grow"
          selectedCss="bg-tally-red hover:bg-tally-red text-black"
          name="No"
          selected={selected}
          onClick={() => setSelected("No")}
        />
      </div>
      {selected === "Yes" ? (
        <OrderButton choice="Yes" />
      ) : (
        <OrderButton choice="No" />
      )}
    </div>
  );
}

export function OrderCardsDesktop() {
  return (
    <div className="hidden space-x-6 md:flex">
      <OrderButton choice="Yes" />
      <OrderButton choice="No" />
    </div>
  );
}
