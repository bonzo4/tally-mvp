import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"

function Insight() {
  return (
    <div className="w-full">
      <Link href="/">
        <div className="flex w-full">
          <div className="relative h-[100px] w-[100px] flex-shrink-0">
            <Image 
              src="https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs/src/assets/images/slide-1.jpg" 
              fill={true}
              alt="test image"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="self-stretch flex flex-col space-y-1 justify-center px-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs text-tally-primary">Finance</h3>
              </div>
              <div className="lg:hidden text-xs text-gray-400 font-medium text-nowrap">
                Nov 28th
              </div>
            </div>
            <div>
              <h2 className="font-bold text-white">Bitcoin ETF approved by Jan 15?</h2>
            </div>
            <div className="text-sm text-white w-full line-clamp-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et eros id massa dictum semper. Vestibulum quis tortor a sem lacinia finibus quis et est. Nulla suscipit diam ac interdum aliquam. And if there happens to be more text it should cut off see here it&apos;s going to keep going and let&apos;s see what happens to the text here.
              </p>
            </div>
          </div>
          <div className="hidden lg:flex self-stretch items-center px-6">
            <div className="text-xs text-gray-400 font-medium text-nowrap">
              Nov 28th
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

function InsightGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Insight />
      <Insight />
      <Insight />
      <Insight />
      <Insight />
      <Insight />
      <Insight />
      <Insight />
    </div>
  )
}

export default function Insights() {
  return (
    <div className="flex flex-col space-y-5 px-4 lg:px-16">
      <div className="flex justify-between">
        <Link href="/markets">
          <h2 className="text-4xl text-white font-bold hover:underline">Insights</h2>
        </Link>
        <Button className="text-tally-primary bg-black border border-tally-primary" asChild>
          <Link href="/markets">
            View All
          </Link>
        </Button>
      </div>
      <InsightGallery />
    </div>
  )
}

