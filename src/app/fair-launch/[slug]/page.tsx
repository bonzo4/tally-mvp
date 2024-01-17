import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFairLaunch } from "@/lib/api/fetch";
import { cn } from "@/lib/utils";

import Faq from "./components/Faq";

function TransparentToBlackGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-tally-background to-transparent"></div>
  );
}

function Banner({ src }: { src: string }) {
  return (
    <div className="absolute left-0 top-0 h-[738px] w-full">
      <Image src={src} alt="" layout="fill" className="object-cover" />
      <TransparentToBlackGradientOverlay />
    </div>
  );
}

function Unit({ unit, amount }: { unit: string; amount: number }) {
  return (
    <div className="flex max-w-[70px] flex-col items-center justify-center rounded-lg bg-neutral-800/80 px-4 py-2">
      <div>
        <div className="-mb-1 -mt-1 text-center text-3xl font-bold text-white">
          {amount}
        </div>
        <div className="-mb-1 text-center text-base font-bold text-gray-400">
          {unit}
        </div>
      </div>
    </div>
  );
}

function Countdown() {
  return (
    <div className="flex space-x-2">
      <Unit unit="Days" amount={10} />
      <Unit unit="Hours" amount={4} />
      <Unit unit="Mins" amount={32} />
      <Unit unit="Secs" amount={12} />
    </div>
  );
}

function Info({ title }: { title: string }) {
  return (
    <div className="mt-4 flex flex-col items-center space-y-3">
      <Badge className="bg-white text-xs text-black hover:bg-white hover:text-black">
        Politics
      </Badge>
      <div className="text-sm text-white">Total Pot: $2,432,543</div>
      <div className="text-3xl font-bold text-white">{title}</div>
    </div>
  );
}

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
        <div className="flex items-end space-x-1">
          <div className="text-4xl font-bold text-white">{choice}</div>
          <div className={cn(textCss, "text-2xl")}>$.50</div>
        </div>
        <div className="text-sm text-tally-gray">Total Pot: $1,432,543</div>
      </div>
      <div className="flex space-x-2">
        <Input
          className="w-[220px] border-0 bg-tally-layer-2 text-tally-gray placeholder:text-tally-gray"
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

export default async function FairLaunchPage({
  params,
}: {
  params: { slug: string };
}) {
  const market = await getFairLaunch(params.slug);
  if (!market) return;
  return (
    <div className="w-full">
      <div className="relative flex h-[738px] w-full items-end justify-center py-10">
        <Banner src={market.banner} />
        <div className="z-50 flex flex-col items-center space-y-4">
          <Countdown />
          <Info title={market.title} />
          <div className="flex space-x-6">
            <OrderButton choice="Yes" />
            <OrderButton choice="No" />
          </div>
        </div>
      </div>
      <Faq />
    </div>
  );
}
