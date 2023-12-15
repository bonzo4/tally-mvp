import Image from "next/image";

import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-3">
        <div className="relative w-[50px] h-[50px] lg:w-[150px] lg:h-[150px]">
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
              <Badge variant="secondary" className="text-xs lg:text-base">Politics</Badge>
            </div>
            <div className="hidden lg:flex space-x-3">
              <div className="text-xs lg:text-base text-gray-600 border-b border-gray-600">Total Bet: $182,000</div>
              <div className="text-xs lg:text-base text-gray-600 border-b border-gray-600">Expires: Nov 8, 2024</div>
            </div>
          </div>
          <div className="flex flex-col justify-center h-full">
            <div className="hidden lg:block">
              <h1 className="text-3xl font-bold">Who will win the 2024 presidential election?</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <h1 className="text-3xl font-bold">Who will win the 2024 presidential election?</h1>
      </div>
    </div>
  )
}
