import { cn } from "@/lib/utils";
import Image from "next/image";

type PriceBarProps = {
  icon: string;
  title: string;
  prices: {
    title: string;
    price: number;
  }[];
};

export default function PriceBar({ icon, title, prices }: PriceBarProps) {
  const priceTitleColors = prices.map((price, index) => {
    if (index % 4 == 0) {
      return "text-tally-primary";
    } else if (index % 4 == 1) {
      return "text-tally-red";
    } else if (index % 2 == 1) {
      return "text-tally-yellow";
    } else {
      return "text-tally-blue";
    }
  });

  const priceBarColors = prices.map((price, index) => {
    if (index % 4 == 0) {
      return "bg-tally-primary";
    } else if (index % 4 == 1) {
      return "bg-tally-red";
    } else if (index % 2 == 1) {
      return "bg-tally-yellow";
    } else {
      return "bg-tally-blue";
    }
  });

  return (
    <div className="flex w-full">
      {prices.length == 2 ? (
        <div className="flex w-full flex-row space-x-5">
          <div className="flex flex-row space-x-1">
            <Image src={icon} width={20} height={20} alt="icon" />
            <span className="whitespace-nowrap text-xs text-white">
              {title}
            </span>
          </div>
          <div className="flex w-full flex-col space-y-1">
            <div className="flex flex-row justify-between">
              <span className="whitespace-nowrap text-sm text-tally-primary">
                Yes: {prices[0].price * 100}%
              </span>
              <span className="whitespace-nowrap text-sm text-tally-red">
                No: {prices[1].price * 100}%
              </span>
            </div>
            <div className="relative flex h-[2px] w-full">
              <div
                style={{ width: `${prices[0].price * 100}%` }}
                className="h-full rounded-l bg-tally-primary"
              />
              <div
                style={{ width: `${prices[1].price * 100}%` }}
                className="h-full rounded-r bg-tally-red"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col space-y-1">
          <div className="flex flex-row justify-between">
            {prices.map((price, index) => {
              return (
                <span
                  key={index}
                  className={cn(
                    "whitespace-nowrap text-sm",
                    priceTitleColors[index]
                  )}
                >
                  {price.title}: {price.price * 100}%
                </span>
              );
            })}
          </div>
          <div className="relative flex h-[2px] w-full">
            {prices.map((price, index) => {
              return (
                <div
                  key={index}
                  style={{ width: `${price.price * 100}%` }}
                  className={cn("h-full", priceBarColors[index])}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
