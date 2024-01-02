import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { convertNumberToDollars } from "@/lib/formats";

import { IconContext } from "react-icons";
import { BsChat } from "react-icons/bs";


export interface MarketTileProps extends React.HTMLAttributes<HTMLDivElement> {
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

function Footer({betTotal, commentTotal}: { betTotal: number, commentTotal: number }) {
  const betTotalFormatted = convertNumberToDollars(betTotal);
  return (
    <div className="w-full flex justify-between">
      <div className="text-sm text-gray-400">{`${betTotalFormatted} bet`}</div>
      <div className="flex items-center space-x-1">
        <BsChat className="text-gray-400"/>
        <div className="text-xs text-gray-400">{commentTotal}</div>
      </div>
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

export function MarketTile({ title, category, image, yesPrice, noPrice, ...restProps }: MarketTileProps) {
  return (
    <div {...restProps}>
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
            <Footer betTotal={2432542.94561} commentTotal={40} />
          </div>
        </div>
      </Link>
    </div>
  )
}
