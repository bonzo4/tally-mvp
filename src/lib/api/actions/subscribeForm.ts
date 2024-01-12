import { z } from "zod";
import { zfd } from "zod-form-data";

export type SubscribeState =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
    }
  | null;

export const subscribeSchema = zfd.formData({
  email: zfd.text(z.string().email()),
});
