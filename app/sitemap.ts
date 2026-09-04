import type { MetadataRoute } from "next";
import { AREAS } from "@/lib/areas";

// /pricelist is intentionally absent — it is noindexed and shared privately.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tetraphoto.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://tetraphoto.com/galeri",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...AREAS.map((a) => ({
      url: `https://tetraphoto.com/sewa-photobooth/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
