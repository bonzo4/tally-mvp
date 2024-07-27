import { NextRequest, NextResponse } from "next/server";

type NewsArticles = {
  articles: {
    author: string;
    title: string;
  }[];
};

export async function GET(request: NextRequest) {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  );

  const data = await response.json();

  if (data.status !== "ok") {
    return NextResponse.json([{}, {}, {}, {}, {}], { status: 200 });
  }

  return NextResponse.json(data.articles.slice(0, 5), { status: 200 });
}
