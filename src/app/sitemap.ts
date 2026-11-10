import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  if (!base) return [];
  return [{ url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
