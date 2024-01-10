import Link from "next/link";

import { Button } from "@/components/ui/button";

import MarketsGallery from "@/app/markets/components/MarketsGallery";

import { LandingPredictionMarketData } from "../api/markets/landing/route";

type PredictionMarketProps = {
  predictionMarkets: LandingPredictionMarketData[];
  categories: string[];
};

export default function PredictionMarkets({
  predictionMarkets,
  categories,
}: PredictionMarketProps) {
  return (
    <div className="flex flex-col space-y-5">
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
      <div className="flex flex-row justify-between px-4 lg:px-16"></div>
      <MarketsGallery
        predictionMarkets={predictionMarkets}
        categories={categories}
      />
    </div>
  );
}
