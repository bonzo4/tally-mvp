"use server";

import { SubscribeState, subscribeSchema } from "./subscribeForm";

const url = `https://api.beehiiv.com/v2/publications/${process.env.BEE_HIIV_ID}/subscriptions`;

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  try {
    const parse = subscribeSchema.safeParse(formData);

    if (!parse.success) {
      throw new Error("Invalid email address.");
    }

    const { email } = parse.data;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.BEE_HIIV_TOKEN}`,
      },
      body: JSON.stringify({
        email: email,
      }),
    };
    const res = await fetch(url, options);
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Error subscribing. Please try again.");
    }
    formData.set("email", "");
    return JSON.parse(
      JSON.stringify({
        status: "success",
        message: "Success! Thank you for subscribing.",
      })
    );
  } catch (error: any) {
    return JSON.parse(
      JSON.stringify({ status: "error", message: error.message })
    );
  }
}
