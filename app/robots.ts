import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/spots/new"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
