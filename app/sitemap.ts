import type { MetadataRoute } from "next";

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
  ];
}
