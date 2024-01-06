import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-1 self-stretch px-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-tally-primary">
                  Finance
                </h3>
              </div>
              <div className="text-nowrap text-xs font-medium text-gray-400 lg:hidden">
                Nov 28th
              </div>
            </div>
            <div>
              <h2 className="font-bold text-white">
                Bitcoin ETF approved by Jan 15?
              </h2>
            </div>
            <div className="line-clamp-2 w-full text-sm text-white">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
                eros id massa dictum semper. Vestibulum quis tortor a sem
                lacinia finibus quis et est. Nulla suscipit diam ac interdum
                aliquam. And if there happens to be more text it should cut off
                see here it&apos;s going to keep going and let&apos;s see what
                happens to the text here.
              </p>
            </div>
          </div>
          <div className="hidden items-center self-stretch px-6 lg:flex">
            <div className="text-nowrap text-xs font-medium text-gray-400">
              Nov 28th
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function InsightGallery() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <Insight />
      <Insight />
      <Insight />
      <Insight />
      <Insight />
      <Insight />
      <Insight />
      <Insight />
    </div>
  );
}

export default function Insights() {
  return (
    <div className="flex flex-col space-y-5 px-4 lg:px-16">
      <div className="flex justify-between">
        <Link href="/markets">
          <h2 className="text-4xl font-bold text-white hover:underline">
            Insights
          </h2>
        </Link>
        <Button
          className="border border-tally-primary bg-black text-tally-primary"
          asChild
        >
          <Link href="/markets">View All</Link>
        </Button>
      </div>
      <InsightGallery />
    </div>
  );
}
