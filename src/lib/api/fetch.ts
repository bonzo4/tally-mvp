import { PredictionMarketData } from "@/app/api/markets/route";
import { LandingBanner } from "../supabase/banners/landingBanners";
import { MarketsBanner } from "../supabase/banners/marketsBanners";
import { Newsletter } from "@/app/api/blogs/route";
import { NewsletterWithContent } from "@/app/api/blogs/[id]/route";
import { PredictionMarketsWithSubMarkets } from "../supabase/markets/predictionMarkets";
// import { Ticker } from "../supabase/tickers";

export async function getCategoryData() {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/categories`;
  const res = await fetch(url);

  if (res.status !== 200) {
    console.error("Failed to fetch the API:" + url);
    return [];
  }

  return (await res.json()) as string[];
}

export async function getPredictionMarkets(category: string = "Top") {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/markets?category=${category}`;
  const res = await fetch(url);

  if (res.status !== 200) {
    console.error("Failed to fetch the API:" + url);
    return [];
  }

  return (await res.json()) as PredictionMarketData[];
}

export async function getLandingBannersData() {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/banners/landing`;
  const res = await fetch(url);

  if (res.status !== 200) {
    console.error("Failed to fetch the API:" + url);
    return [];
  }

  return (await res.json()) as LandingBanner[];
}

export async function getMarketBannersData() {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/banners/markets`;
  const res = await fetch(url);

  if (res.status !== 200) {
    console.error("Failed to fetch the API:" + url);
    return [];
  }

  return (await res.json()) as MarketsBanner[];
}

export async function getBlogs(limit: number = 12, page: number = 1) {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/blogs?limit=${limit}&page=${page}`;
  const res = await fetch(url);

  if (res.status !== 200) {
    console.error("Failed to fetch the API:" + url);
    return [];
  }

  return (await res.json()) as Newsletter[];
}

export async function getBlog(id: string) {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/blogs/${id}`;
  const res = await fetch(url);

  if (res.status !== 200) {
    console.error("Failed to fetch the API:" + url);
    return null;
  }

  return (await res.json()) as NewsletterWithContent;
}

export async function getTradingMarketData(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/markets/trade/${slug}`;
  const res = await fetch(url);

  if (res.status !== 200) {
    console.error("Failed to fetch the API:" + url);
    return null;
  }

  return (await res.json()) as PredictionMarketsWithSubMarkets;
}

// export async function getTickers() {
//   const url = `${process.env.NEXT_PUBLIC_URL}/api/tickers`;
//   const res = await fetch(url);

//   if (res.status !== 200) {
//     console.error("Failed to fetch the API:" + url);
//     return [];
//   }

//   return (await res.json()) as Ticker[];
// }
