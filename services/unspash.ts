import { createApi } from "unsplash-js";

export const unsplash = createApi({
  accessKey: process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY!,
});

function fail(result: any): never {
  const status = result.response?.status;
  const body =
    typeof result.error === "string"
      ? result.error
      : (result.error?.errors?.[0] ?? JSON.stringify(result.error));
  throw new Error(`Unsplash ${status}: ${body}`);
}

export async function randomPhotos(count = 10, query?: string) {
  const result = await unsplash.GET("/photos/random", {
    params: { query: { count, query } },
  });
  if (result.error) fail(result);
  const data = result.data;
  return Array.isArray(data) ? data : [data];
}

let cache: any[] | null = null;

export async function cachedFoodPhotos() {
  if (!cache) cache = await randomPhotos(10, "food");
  return cache;
}
