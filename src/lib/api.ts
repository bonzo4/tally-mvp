import { LandingPredictionMarketData } from "@/app/api/markets/landing/route";

export async function getCategoryData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`);

  return (await res.json()) as string[];
}

export async function getLandingMarketCards(category: string = "Top") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/markets/landing?category=${category}`
  );
  return (await res.json()) as LandingPredictionMarketData[];
}
