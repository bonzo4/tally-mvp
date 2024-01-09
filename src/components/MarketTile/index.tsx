import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import PriceBar from "./priceBar";
import MarketFooter from "./footer";

export interface MarketTileProps extends React.HTMLAttributes<HTMLDivElement> {
  key: number;
  title: string;
  category: string | null;
  image: string;
  totalPot: number;
  totalComments: number;
  subMarkets: {
    icon: string;
    title: string;
    prices: {
      title: string;
      price: number;
    }[];
  }[];
}

export default function MarketTile({
  key,
  title,
  category,
  image,
  totalPot,
  totalComments,
  subMarkets,
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
              <h1 className="font-semibold text-white">{title}</h1>
              {subMarkets.map((subMarket, index) => {
                return (
                  <div key={index}>
                    <PriceBar
                      icon={subMarket.icon}
                      title={subMarket.title}
                      prices={subMarket.prices}
                    />
                  </div>
                );
              })}
            </div>
            <MarketFooter totalPot={totalPot} totalComments={totalComments} />
          </div>
        </div>
      </Link>
    </div>
  );
}

function TransparentToGrayGradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 h-full w-full rounded-b-2xl bg-gradient-to-t from-gray-800 to-transparent"></div>
  );
}
