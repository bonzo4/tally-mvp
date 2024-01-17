import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { getFairLaunch } from "@/lib/api/fetch";

import Faq from "./components/Faq";
import { OrderCardsDesktop, OrderCardsMobile } from "./components/OrderCards";

function TransparentToBlackGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-tally-background to-transparent"></div>
  );
}

function Banner({ src }: { src: string }) {
  return (
    <div className="absolute left-0 top-0 h-[372px] w-full md:h-[738px]">
      <Image src={src} alt="" layout="fill" className="object-cover" />
      <TransparentToBlackGradientOverlay />
    </div>
  );
}

function Unit({ unit, amount }: { unit: string; amount: number }) {
  return (
    <div className="flex max-w-[70px] flex-col items-center justify-center rounded-lg bg-neutral-800/80 px-2 py-2 md:px-4">
      <div>
        <div className="-mb-1 -mt-1 text-center text-xl font-bold text-white lg:text-3xl">
          {amount}
        </div>
        <div className="-mb-1 text-center text-xs font-bold text-tally-gray lg:text-base">
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
      <div className="text-xs text-white lg:text-sm">Total Pot: $2,432,543</div>
      <div className="text-center text-2xl font-bold text-white lg:text-3xl">
        {title}
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
      <div className="relative flex h-[372px] w-full items-end justify-center px-4 py-10 md:h-[738px]">
        <Banner src={market.banner} />
        <div className="z-50 flex flex-col items-center space-y-4">
          <Countdown />
          <Info title={market.title} />
          <OrderCardsDesktop />
        </div>
      </div>
      <OrderCardsMobile />
      <Faq />
    </div>
  );
}
