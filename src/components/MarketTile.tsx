import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";

export interface MarketTileProps {
  title: string;
  category: string;
  image: string;
  yesPrice: number;
  noPrice: number;
}

function TransparentToGrayGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-full rounded-b-2xl bg-gradient-to-t from-gray-800 to-transparent"></div>
  )
}


function YesNoPriceBar({ yesPrice, noPrice }: { yesPrice: number, noPrice: number }) {
  return (
    <div className="w-full flex flex-col space-y-1">
      <div className="w-full flex justify-between">
        <span className="text-tally-primary whitespace-nowrap text-sm">
          Yes: {yesPrice}%
        </span>
        <span className="text-tally-red whitespace-nowrap text-sm">
          No: {noPrice}%
        </span>
      </div>
      <div className="flex w-full h-[2px] relative">
        <div style={{ width: `${yesPrice}%` }} className="bg-tally-primary h-full rounded-l"></div>
        <div style={{ width: `${noPrice}%` }} className="bg-tally-red h-full rounded-r"></div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="w-full flex justify-between">
      <div className="text-sm text-gray-400">$2,432,543 bet</div>
    </div>
  )
}

function Title({ title }: { title: string }) {
  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-white">{title}</h1>
    </div>
  )
}


export function MarketTile({ title, category, image, yesPrice, noPrice }: MarketTileProps) {
  return (
    <div>
      <Link href="/">
        <div className="relative min-h-[200px] flex flex-col h-full rounded-2xl shadow space-y-2">
          <Image 
            src={image}
            fill={true}
            alt="test image"
            className="object-cover rounded-2xl"
          />
          <div className="absolute top-0 right-0 pr-3">
            <Badge>{category}</Badge>
          </div>
          <TransparentToGrayGradientOverlay />
           <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex flex-col space-y-2">
            <div className="flex flex-col">
              <Title title={title} />
              <YesNoPriceBar yesPrice={yesPrice} noPrice={noPrice} />
            </div>
            <Footer />
          </div>
        </div>
      </Link>
    </div>
  )
}
