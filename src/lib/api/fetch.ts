"use server";

type RequestCache =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload";

export type FetchDataProps<T, Options> = {
  url: string;
  options: Options;
  cache?: RequestCache;
};

export async function fetchData<T, Options>({
  url,
  options,
  cache = "no-store",
}: FetchDataProps<T, Options>): Promise<T | null> {
  return (async (url: string, options: Options) => {
    const res = await fetch(url, {
      cache: cache as RequestCache,
    });

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
