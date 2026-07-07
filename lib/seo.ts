import type { Metadata } from "next";
import type { Spot } from "@/lib/types";
import { spotTypeLabel } from "@/lib/spotTypes";

const SITE_NAME = "Crusit";

export function formatRating(avg: number, count: number) {
  if (count === 0) return "No reviews yet";
  return `★ ${avg.toFixed(1)} · ${count} review${count === 1 ? "" : "s"}`;
}

export function formatSpotAddress(spot: Spot) {
  return [
    spot.street_address,
    spot.city,
    spot.province,
    spot.region,
    spot.postal_code,
    spot.country,
  ]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(", ");
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.crusit.com";
}

function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "description" | "alternates" | "openGraph" | "twitter"> {
  const url = absoluteUrl(path);

  return {
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function websiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
    description:
      "A global community map for discovering, sharing, and reviewing LGBTQI+ cruising locations.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/spots?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function spotBreadcrumbJsonLd(spot: Spot, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Explore spots",
        item: `${siteUrl}/spots`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: spot.name,
        item: `${siteUrl}/spots/${spot.slug}`,
      },
    ],
  };
}

export function spotJsonLd(spot: Spot, siteUrl: string) {
  const spotUrl = `${siteUrl}/spots/${spot.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": spotUrl,
    name: spot.name,
    description: spot.description,
    additionalType: spotTypeLabel(spot.spot_type),
    address: {
      "@type": "PostalAddress",
      streetAddress: spot.street_address || undefined,
      addressLocality: spot.city,
      addressRegion: [spot.province, spot.region].filter(Boolean).join(", ") || undefined,
      postalCode: spot.postal_code || undefined,
      addressCountry: spot.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: spot.latitude,
      longitude: spot.longitude,
    },
    url: spotUrl,
    isAccessibleForFree: true,
    ...(spot.rating_count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: spot.rating_avg,
            reviewCount: spot.rating_count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}
