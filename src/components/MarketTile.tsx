import Link from "next/link";
import Image from "next/image";

export interface MarketTileProps {
  title: string;
  category: string;
  image: string;
  yesPrice: number;
  noPrice: number;
}

export function MarketTile({ title, category, image, yesPrice, noPrice }: MarketTileProps) {
  return (
    <div>
      <Link href="/">
        <div className="flex flex-col h-full border border-gray-100 rounded shadow space-y-2 p-3">
          <div className="flex space-x-3 w-full h-2/3">
            <div>
              <div className="relative w-[75px] h-[75px]">
                <Image 
                  src={image}
                  fill={true}
                  alt="test image"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-gray-600 text-xs">{category}</h2>
              <div className="justify-self-center overflow-clip">
                <h1 className="font-bold">{title}</h1>
              </div>
            </div>
          </div>
          <div className="flex w-full h-[50px] relative space-x-1">
            <div style={{ width: `${yesPrice}%` }} className="bg-green-100 h-full rounded-l"></div>
            <div style={{ width: `${noPrice}%` }} className="bg-red-100 h-full rounded-r"></div>

            <div className="absolute top-0 left-0 w-full h-full flex items-center px-2">
              <span className="text-green-600 font-semibold whitespace-nowrap absolute left-2">
                Yes: {yesPrice}¢
              </span>
              <span className="text-red-600 font-semibold whitespace-nowrap absolute right-2">
                No: {noPrice}¢
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
