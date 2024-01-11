"use client";

import { useEffect, useState } from "react";
import FilterMarkets from "./FilterMarkets";
import { PredictionMarketData } from "@/app/api/markets/route";
import MarketTile from "@/components/MarketTile";

type MarketsGalleryProps = {
  predictionMarkets: PredictionMarketData[];
  categories: string[];
  limit?: number;
};

export default function MarketsGallery({
  predictionMarkets,
  categories,
  limit,
}: MarketsGalleryProps) {
  const [markets, setMarkets] =
    useState<PredictionMarketData[]>(predictionMarkets);
  const [currentFilter, setCurrentFilter] = useState<string>("Top");

  useEffect(() => {
    const getFilteredMarkets = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/markets?category=${currentFilter}&limit=${limit}`
      );
      const data = await res.json();
      setMarkets(data);
    };

    getFilteredMarkets();
  }, [currentFilter, limit]);

  return (
    <div className="w-full space-y-5">
      <div>
        <FilterMarkets
          categories={categories}
          handleFilterChange={setCurrentFilter}
          selected={currentFilter}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 lg:px-16 xl:grid-cols-4">
        {markets.length &&
          markets.map((market) => {
            return (
              <div key={market.id}>
                <MarketTile
                  title={market.title}
                  category={market.category}
                  image={market.image}
                  totalPot={market.totalPot}
                  totalComments={market.totalComments}
                  subMarkets={market.subMarkets}
                />
              </div>
            );
          })}
      </div>
      {/* <Tiles markets={filteredMarkets} /> */}
    </div>
  );
}
