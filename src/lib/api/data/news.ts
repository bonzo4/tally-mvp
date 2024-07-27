import { fetchData } from "../fetch";

export async function getNews() {
  const data = await fetchData<any, {}>({
    url: `${process.env.NEXT_PUBLIC_URL}/api/news`,
    options: {},
  });

  return await data;
}
