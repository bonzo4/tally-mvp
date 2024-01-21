"use server";

import { cache } from "react";

export type FetchDataProps<T, Options> = {
  url: string;
  options: Options;
};

export async function fetchData<T, Options>({
  url,
  options,
}: FetchDataProps<T, Options>): Promise<T | null> {
  return cache(async (url: string, options: Options) => {
    const res = await fetch(url);

    if (res.status !== 200) {
      const data = await res.json();
      const msg = data?.error
        ? "Failed to fetch the API:" + url + data?.error
        : "Failed to fetch the API:" + url;
      console.error(msg);
      return null;
    }

    return (await res.json()) as T;
  })(url, options);
}

type FetchDataFunction = (options: any) => Promise<any>;

export const preload = (funcs: Array<FetchDataFunction>) => {
  funcs.forEach((func) => {
    void func({ options: {} });
  });
};
