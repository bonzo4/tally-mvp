"use server";
import { NextRequest, NextResponse } from "next/server";

const url = `https://api.beehiiv.com/v2/publications/${process.env.BEE_HIIV_ID}/subscriptions`;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.BEE_HIIV_TOKEN}`,
    },
    body: JSON.stringify({
      email,
    }),
  };

  try {
    console.log(email);
    return NextResponse.json(email, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
