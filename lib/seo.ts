import type { Spot } from "@/lib/types";

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

export function spotJsonLd(spot: Spot, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: spot.name,
    description: spot.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: spot.street_address,
      addressLocality: spot.city,
      addressRegion: [spot.province, spot.region].filter(Boolean).join(", "),
      postalCode: spot.postal_code,
      addressCountry: spot.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: spot.latitude,
      longitude: spot.longitude,
    },
    url: `${siteUrl}/spots/${spot.slug}`,
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

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.crusit.com";
}
