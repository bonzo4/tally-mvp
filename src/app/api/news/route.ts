import { NextRequest, NextResponse } from "next/server";

type NewsArticles = {
  articles: {
    author: string;
    title: string;
  }[];
};

export async function GET(request: NextRequest) {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=country=us&apiKey=${process.env.NEWS_API_KEY}`
  );

  const data = await response.json();

  if (data.status !== "ok") {
    return NextResponse.json("Failed to get news", { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
