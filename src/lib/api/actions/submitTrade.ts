"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";

// Schema for a single field
const fieldSchema = z.object({
  sub_market_id: z.number(),
  choice_market_id: z.number(),
  value: z.number(),
});

// Schema for the entire form (an array of fields)
const formSchema = z.array(fieldSchema);
//const formSchema = zfd.formData({
//  "21 amount": z.string(),
//  "22 amount": z.string(),
//  "23 amount": z.string(),
//  "24 amount": z.string(),
//  "25 amount": z.string(),
//});
//

// Data received from form has radio buttons input (e.g. "Yes" or "No") separate
// from amount input (e.g. "$100"). They are associated by the name of the input.
// The former has a name "[id]" while the latter has a name "[id] amount".
// Thus we want to group them together.
function formatFormData(formData_: FormData) {
  const formData: Record<
    number,
    { choice_market_id?: string; amount?: string }
  > = {};
  for (const [_key, value] of formData_.entries()) {
    const keySplit = _key.split(" ");
    const key = keySplit[0];
    const isAmount = keySplit[1] === "amount";

    if (isAmount) {
      if (key in formData) {
        formData[key].amount = value;
      } else {
        formData[key] = { choice_market_id: "", amount: value };
      }
    } else {
      if (key in formData) {
        formData[key].choice_market_id = value;
      } else {
        formData[key] = { choice_market_id: value, amount: "" };
      }
    }
  }

  const formDataArr = [];
  for (const key in formData) {
    formDataArr.push({
      sub_market_id: key,
      choice_market_id: formData[key].choice_market_id,
      amount: formData[key].amount,
    });
  }
  return formDataArr;
}

export default async function submitTrade(prevState: any, formData: FormData) {
  console.log("formData", formData);
  console.log("21 amount", formData.get("21 amount"));
  const formData_ = formatFormData(formData);
  console.log(formData_);
  const parse = formSchema.safeParse(formData_);
  console.log("parse", parse);

  return prevState;
}
