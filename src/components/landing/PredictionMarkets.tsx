import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"

function Markets() {
  return (
    <div>
      <Link href="/">
        <div className="bg-green-100 flex flex-col h-[40vw] md:h-[15vw] space-y-2 p-2">
          <div className="flex space-x-2 w-full h-2/3">
            <div className="relative flex w-1/3">
              <Image 
                src="https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-2.jpg" 
                fill={true}
                alt="test image"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col w-2/3 justify-center">
              <h2 className="text-gray-600">Politics</h2>
              <div className="">
                <h1 className="font-bold">Will Trump win the Republican Nominee?</h1>
              </div>
            </div>
          </div>
          <div className="flex w-full h-1/3">
            <div className="bg-green-300 w-1/2 h-full">
              Yes: 50%
            </div>
            <div className="bg-red-300 w-1/2 h-full">
              No: 50%
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function PredictionMarkets() {
  return(
    <div className="space-y-5">
      <div>
        <h2 className="text-4xl font-bold">Prediction Markets</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Markets />
        <Markets />
        <Markets />
        <Markets />
        <Markets />
        <Markets />
        <Markets />
        <Markets />
      </div>
      <div>
        <Link href="/">
          <Button>View All</Button>
        </Link>
      </div>
    </div>
  )
}
