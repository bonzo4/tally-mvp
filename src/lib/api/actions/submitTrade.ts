"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";

// Schema for a single field
const fieldSchema = z.object({
  name: z.any(),
  value: z.any(),
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
//

// Data received from form has radio buttons input (e.g. "Yes" or "No") separate
// from amount input (e.g. "$100"). They are associated by the name of the input.
// The former has a name "[id]" while the latter has a name "[id] amount".
// Thus we want to group them together.
function formatFormData(formData: FormData) {
  const formDataFormatted: Record<
    number,
    { choice_market_id: number; amount?: number }
  > = {};
  for (const [key, value] of formData.entries()) {
    const keySplit = key.split(" ");
    if (
      keySplit.length === 2 &&
      !isNaN(keySplit[0]) &&
      keySplit[1] === "amount"
    ) {
      formDataFormatted[keySplit[0]]["amount"] = value;
    } else if (keySplit.length === 1 && !isNaN(keySplit[0])) {
      formDataFormatted[key] = { choice_market_id: value };
    }
  }

  const formDataArray = [];
  for (const key in formDataFormatted) {
    if (!formDataFormatted[key].amount) {
      continue;
    }
    formDataArray.push({
      sub_market_id: key,
      choice_market_id: formDataFormatted[key].choice_market_id,
      amount: formDataFormatted[key].amount,
    });
  }
  return formDataArray;
}

export default async function submitTrade(prevState: any, formData: FormData) {
  console.log("formData", formData);
  console.log("21 amount", formData.get("21 amount"));
  const formDataFormatted = formatFormData(formData);
  console.log(formDataFormatted);
  // const parse = formSchema.parse(formData);
  // console.log("parse", parse);

  return prevState;
}
