import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getSitemapSpots } from "@/lib/spots";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  try {
    const spots = await getSitemapSpots();
    const latestSpotUpdate = spots[0]?.createdAt
      ? new Date(spots[0].createdAt)
      : now;

    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: siteUrl,
        lastModified: latestSpotUpdate,
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${siteUrl}/spots`,
        lastModified: latestSpotUpdate,
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];

    const spotRoutes: MetadataRoute.Sitemap = spots.map((spot) => ({
      url: `${siteUrl}/spots/${spot.slug}`,
      lastModified: new Date(spot.createdAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...spotRoutes];
  } catch {
    return [
      {
        url: siteUrl,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${siteUrl}/spots`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];
  }
}
