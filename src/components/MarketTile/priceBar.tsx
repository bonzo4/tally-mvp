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
  return (
    <div className="flex w-full justify-between">
      {prices.length == 2 ? (
        <div className="flex flex-row space-x-3">
          <div className="flex flex-row space-x-1">
            <Image src={icon} width={20} height={20} alt="icon" />
            <span className="whitespace-nowrap text-xs">{title}</span>
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
              ></div>
              <div
                style={{ width: `${prices[1].price * 100}%` }}
                className="h-full rounded-r bg-tally-red"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
