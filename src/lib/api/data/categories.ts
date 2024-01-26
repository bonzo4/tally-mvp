import { fetchData } from "../fetch";

export async function getCategoryData() {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/categories`;
  const categories = await fetchData<string[], {}>({ url, options: {} });

  return categories;
}
