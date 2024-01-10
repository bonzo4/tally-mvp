import { NextRequest, NextResponse } from "next/server";

export type Newsletter = {
  id: string;
  title: string;
  subtitle: string;
  publish_date: number;
  display_date: string;
  authors: string[];
  thumbnail_url: string;
  subject_line: string;
  preview_text: string;
  web_url: string;
  content_tags: string[];
  content?: { free: { web: string } } | null;
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const contentTags = searchParams.get("contentTags") ?? [];

  const limit = searchParams.get("limit") ?? 5;

  const url = `https://api.beehiiv.com/v2/publications/${process.env.BEE_HIIV_ID}/posts?status=confirmed&limit=${limit}&order_by=publish_date&direction=desc`;

  if (contentTags) {
    url.concat(`&content_tags=${contentTags}`);
  }
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BEE_HIIV_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const resData: Newsletter[] = data.data;

    return NextResponse.json(resData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error as string }, { status: 500 });
  }
}
