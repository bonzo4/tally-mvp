import { PredictionMarketData } from "@/app/api/markets/route";
import { LandingBanner } from "./supabase/banners/landingBanners";
import { MarketsBanner } from "./supabase/banners/marketsBanners";
import { Newsletter } from "@/app/api/blogs/route";
import { NewsletterWithContent } from "@/app/api/blogs/[id]/route";
import { PredictionMarketsWithSubMarkets } from "./supabase/markets/landingMarkets";

export async function getCategoryData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`);

  return (await res.json()) as string[];
}

export async function getPredictionMarkets(category: string = "Top") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/markets?category=${category}`
  );
  return (await res.json()) as PredictionMarketData[];
}

export async function getLandingBannersData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/banners/landing`);

  return (await res.json()) as LandingBanner[];
}

export async function getMarketBannersData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/banners/markets`);

  return (await res.json()) as MarketsBanner[];
}

export async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blogs`);

  return (await res.json()) as Newsletter[];
}

export async function getBlog(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blogs/${id}`);

  return (await res.json()) as NewsletterWithContent;
}

export async function getTradingMarketData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/markets/trade/${slug}`
  );

  return (await res.json()) as PredictionMarketsWithSubMarkets;
}
