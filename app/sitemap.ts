import type { MetadataRoute } from "next";
import { getSiteUrl, slugify } from "@/lib/seo";
import {
  getCityFacets,
  getCountryFacets,
  getSitemapSpots,
  getSpotTypeFacets,
} from "@/lib/spots";
import { getAllBlogPosts } from "@/lib/blog";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/spots`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedTime ?? post.publishedTime),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  try {
    const [spots, countries, cities, types] = await Promise.all([
      getSitemapSpots(),
      getCountryFacets(),
      getCityFacets(),
      getSpotTypeFacets(),
    ]);

    if (spots[0]?.createdAt) {
      staticRoutes[0].lastModified = new Date(spots[0].createdAt);
      staticRoutes[1].lastModified = new Date(spots[0].createdAt);
    }

    const spotRoutes: MetadataRoute.Sitemap = spots.map((spot) => ({
      url: `${siteUrl}/spots/${spot.slug}`,
      lastModified: new Date(spot.createdAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const uniqueUrls = (slugs: string[], prefix: string, priority: number) => {
      const seen = new Set<string>();
      const routes: MetadataRoute.Sitemap = [];
      for (const slug of slugs) {
        if (!slug || seen.has(slug)) continue;
        seen.add(slug);
        routes.push({
          url: `${siteUrl}${prefix}${slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority,
        });
      }
      return routes;
    };

    const countryRoutes = uniqueUrls(
      countries.map((facet) => slugify(facet.country)),
      "/cruising/country/",
      0.7,
    );
    const cityRoutes = uniqueUrls(
      cities.map((facet) => slugify(facet.city)),
      "/cruising/city/",
      0.6,
    );
    const typeRoutes = uniqueUrls(
      types.map((facet) => slugify(facet.spotType)),
      "/cruising/type/",
      0.5,
    );

    return [
      ...staticRoutes,
      ...blogRoutes,
      ...spotRoutes,
      ...countryRoutes,
      ...cityRoutes,
      ...typeRoutes,
    ];
  } catch {
    return [...staticRoutes, ...blogRoutes];
  }
}
