import type { MetadataRoute } from "next";
import { taller } from "@/data/taller";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${taller.url}/sitemap.xml`,
  };
}
