import type { MetadataRoute } from "next";
import { getAllSpotSlugs } from "@/lib/spots";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/spots`,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const slugs = await getAllSpotSlugs();
    return [
      ...staticRoutes,
      ...slugs.map((slug) => ({
        url: `${siteUrl}/spots/${slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
