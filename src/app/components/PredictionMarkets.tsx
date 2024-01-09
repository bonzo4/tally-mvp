import Link from "next/link";

import { Button } from "@/components/ui/button";

import MarketsGallery from "@/app/markets/components/MarketsGallery";

import { PredictionMarketData } from "../api/markets/landing/route";

type PredictionMarketProps = {
  predictionMarkets: PredictionMarketData[];
};

export default function PredictionMarkets({
  predictionMarkets,
}: PredictionMarketProps) {
  return (
    <div className="space-y-5">
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
      <MarketsGallery predictionMarkets={predictionMarkets} />
    </div>
  );
}
