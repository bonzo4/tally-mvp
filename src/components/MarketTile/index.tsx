import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import PriceBar from "./priceBar";
import MarketFooter from "./footer";
import { useState } from "react";
// import { MdKeyboardArrowDown } from "react-icons/md";

export interface MarketTileProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  category: string | null;
  image: string;
  totalPot: number;
  totalComments: number;
  slug: string;
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
  title,
  category,
  image,
  totalPot,
  totalComments,
  subMarkets,
  slug,
  ...restProps
}: MarketTileProps) {
  const [expand, setExpand] = useState(false);

  const expandedSubMarkets = expand
    ? subMarkets.slice(0, 5)
    : subMarkets.slice(0, 2);

  const marketStyle = expand
    ? "relative flex h-full min-h-[250px] flex-col space-y-2 rounded-2xl shadow"
    : "relative flex h-full min-h-[200px] flex-col space-y-2 rounded-2xl shadow";

  return (
    <div {...restProps}>
      <Link href={`/trade/${slug}`}>
        <div className={marketStyle}>
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
            <div className="flex flex-col space-y-1">
              <h1 className="font-semibold text-white">{title}</h1>
              {expandedSubMarkets.map((subMarket, index) => {
                return (
                  <div key={index}>
                    <PriceBar
                      icon={subMarket.icon}
                      title={subMarket.title}
                      prices={subMarket.prices}
                      isOnlySubMarket={expandedSubMarkets.length == 1}
                    />
                  </div>
                );
              })}
            </div>
            {/* {subMarkets.length >= 2 && (
              <button
                // onClick={() => setExpand(!expand)}
                className="z-100 flex w-full flex-row items-center justify-center"
              >
                <MdKeyboardArrowDown />
              </button>
            )} */}
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
