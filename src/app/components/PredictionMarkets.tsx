import Link from "next/link";

import { Button } from "@/components/ui/button";

import MarketsGallery from "@/app/markets/components/MarketsGallery";

type PredictionMarketProps = {
  categories: string[];
};

export default function PredictionMarkets({
  categories,
}: PredictionMarketProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between px-4 lg:px-16">
        <Link href="/markets">
          <h2 className="text-2xl font-bold text-white hover:underline lg:text-4xl">
            Prediction Markets
          </h2>
        </Link>
        <Button
          className="border border-tally-primary bg-black text-tally-primary"
          asChild
        >
          <Link href="/markets">View All</Link>
        </Button>
      </div>
      <MarketsGallery categories={categories} limit={12} />
    </div>
  );
}
