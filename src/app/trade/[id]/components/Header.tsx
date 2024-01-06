import Image from "next/image";

import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-3">
        <div className="relative h-[50px] w-[50px] lg:h-[150px] lg:w-[150px]">
          <Image
            src="https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg"
            fill={true}
            alt="test image"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex space-x-3">
            <div>
              <Badge variant="secondary" className="text-xs lg:text-base">
                Politics
              </Badge>
            </div>
            <div className="hidden space-x-3 lg:flex">
              <div className="border-b border-gray-600 text-xs text-gray-600 lg:text-base">
                Total Bet: $182,000
              </div>
              <div className="border-b border-gray-600 text-xs text-gray-600 lg:text-base">
                Expires: Nov 8, 2024
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col justify-center">
            <div className="hidden lg:block">
              <h1 className="text-3xl font-bold">
                Who will win the 2024 presidential election?
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <h1 className="text-3xl font-bold">
          Who will win the 2024 presidential election?
        </h1>
      </div>
    </div>
  );
}
