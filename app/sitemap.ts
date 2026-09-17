import type { MetadataRoute } from "next";
import { AREAS } from "@/lib/areas";
import { EVENTS } from "@/lib/events";

// /pricelist is intentionally absent — it is noindexed and shared privately.
//
// No lastModified / changeFrequency / priority on purpose. Google ignores the
// last two outright, and only honours lastmod when it is truthful; `new Date()`
// runs at build time, so every deploy would claim all 24 URLs just changed.
// A plain URL list is what Google asks for.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/harga-sewa-photobooth",
    "/galeri",
    ...EVENTS.map((e) => `/photobooth/${e.slug}`),
    ...AREAS.map((a) => `/sewa-photobooth/${a.slug}`),
  ];
  return paths.map((path) => ({ url: `https://tetraphoto.com${path}` }));
}
