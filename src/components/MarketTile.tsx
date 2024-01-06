import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { convertNumberToDollars } from "@/lib/formats";

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
    <div className="absolute bottom-0 left-0 h-full w-full rounded-b-2xl bg-gradient-to-t from-gray-800 to-transparent"></div>
  );
}

function YesNoPriceBar({
  yesPrice,
  noPrice,
}: {
  yesPrice: number;
  noPrice: number;
}) {
  return (
    <div className="flex w-full flex-col space-y-1">
      <div className="flex w-full justify-between">
        <span className="whitespace-nowrap text-sm text-tally-primary">
          Yes: {yesPrice}%
        </span>
        <span className="whitespace-nowrap text-sm text-tally-red">
          No: {noPrice}%
        </span>
      </div>
      <div className="relative flex h-[2px] w-full">
        <div
          style={{ width: `${yesPrice}%` }}
          className="h-full rounded-l bg-tally-primary"
        ></div>
        <div
          style={{ width: `${noPrice}%` }}
          className="h-full rounded-r bg-tally-red"
        ></div>
      </div>
    </div>
  );
}

function Footer({
  betTotal,
  commentTotal,
}: {
  betTotal: number;
  commentTotal: number;
}) {
  const betTotalFormatted = convertNumberToDollars(betTotal);
  return (
    <div className="flex w-full justify-between">
      <div className="text-sm text-gray-400">{`${betTotalFormatted} bet`}</div>
      <div className="flex items-center space-x-1">
        <BsChat className="text-gray-400" />
        <div className="text-xs text-gray-400">{commentTotal}</div>
      </div>
    </div>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-white">{title}</h1>
    </div>
  );
}

export function MarketTile({
  title,
  category,
  image,
  yesPrice,
  noPrice,
  ...restProps
}: MarketTileProps) {
  return (
    <div {...restProps}>
      <Link href="/">
        <div className="relative flex h-full min-h-[200px] flex-col space-y-2 rounded-2xl shadow">
          <Image
            src={image}
            fill={true}
            alt="test image"
            className="rounded-2xl object-cover"
          />
          <div className="absolute right-0 top-0 pr-3">
            <Badge>{category}</Badge>
          </div>
          <TransparentToGrayGradientOverlay />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col space-y-2 px-4 py-2">
            <div className="flex flex-col">
              <Title title={title} />
              <YesNoPriceBar yesPrice={yesPrice} noPrice={noPrice} />
            </div>
            <Footer betTotal={2432542.94561} commentTotal={40} />
          </div>
        </div>
      </Link>
    </div>
  );
}
