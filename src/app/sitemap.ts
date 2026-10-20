import type { MetadataRoute } from "next";
import { taller } from "@/data/taller";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: taller.url, changeFrequency: "monthly", priority: 1 }];
}
