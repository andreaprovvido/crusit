import type { Metadata } from "next";
import type { Spot } from "@/lib/types";
import { spotTypeLabel } from "@/lib/spotTypes";

export const SITE_NAME = "Crusit";
const SITE_URL_FALLBACK = "https://www.crusit.com";

export const DEFAULT_TITLE = "Crusit — Discover Gay Cruising Spots Worldwide";
export const DEFAULT_DESCRIPTION =
  "Crusit is the community-powered map for discovering, reviewing, and sharing LGBTQ+ gay cruising spots worldwide, with precise addresses, ratings, and real reviews.";

const MAX_DESCRIPTION_LENGTH = 160;

// Shared robots directives so every page opts into the same crawl policy.
export const INDEX_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const NOINDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_FALLBACK;
}

function normalizePath(path: string) {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function absoluteUrl(path: string) {
  return `${getSiteUrl()}${normalizePath(path)}`;
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function truncate(text: string, max = MAX_DESCRIPTION_LENGTH) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

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

type PageMetadataInput = {
  /** Full, human-readable title. Rendered as-is (bypasses the layout template). */
  title: string;
  description: string;
  /** Canonical path, e.g. "/spots/some-slug". */
  path: string;
  /** Whether search engines may index the page. Defaults to true. */
  index?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Single source of truth for page-level metadata. Produces a fully-formed
 * Metadata object with title, description, canonical, alternates, robots,
 * Open Graph, and Twitter Card fields. Open Graph / Twitter images are
 * supplied by the `opengraph-image` / `twitter-image` file conventions and
 * therefore intentionally omitted here.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  index = true,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const canonical = normalizePath(path);
  const cleanDescription = truncate(description);

  return {
    title: { absolute: title },
    description: cleanDescription,
    robots: index ? INDEX_ROBOTS : NOINDEX_ROBOTS,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: cleanDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: ogType,
      locale: "en_US",
      ...(ogType === "article" && publishedTime ? { publishedTime } : {}),
      ...(ogType === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cleanDescription,
    },
  };
}

/** Home page metadata. */
export function buildHomeMetadata(): Metadata {
  return buildPageMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  });
}

/** Spots directory / index page metadata. */
export function buildSpotsIndexMetadata(): Metadata {
  return buildPageMetadata({
    title: `Explore Gay Cruising Spots Worldwide | ${SITE_NAME}`,
    description:
      "Browse every gay cruising spot on Crusit. Filter by country, type, and rating, explore the interactive map, and read honest community reviews.",
    path: "/spots",
  });
}

/**
 * Spot detail page metadata.
 * Pattern: "{Spot Name} | Gay Cruising Spot in {City} | Crusit"
 */
export function buildSpotMetadata(spot: Spot): Metadata {
  const title = `${spot.name} | Gay Cruising Spot in ${spot.city} | ${SITE_NAME}`;
  const lead = `${spot.name} — gay cruising spot in ${spot.city}, ${spot.country}. `;
  const description = truncate(`${lead}${spot.description}`);

  return buildPageMetadata({
    title,
    description,
    path: `/spots/${spot.slug}`,
  });
}

/**
 * City page metadata.
 * Pattern: "Cruising in {City} | Best Cruising Spots | Crusit"
 */
export function buildCityMetadata({
  city,
  country,
  spotCount,
  path,
}: {
  city: string;
  country?: string;
  spotCount?: number;
  path?: string;
}): Metadata {
  const title = `Cruising in ${city} | Best Cruising Spots | ${SITE_NAME}`;
  const where = country ? `${city}, ${country}` : city;
  const count =
    typeof spotCount === "number"
      ? `${spotCount} community-reviewed location${spotCount === 1 ? "" : "s"}, with`
      : "Browse";
  const description = `Find the best gay cruising spots in ${where}. ${count} maps, ratings, and honest reviews on Crusit.`;

  return buildPageMetadata({
    title,
    description,
    path: path ?? `/cruising/city/${slugify(city)}`,
  });
}

/**
 * Country page metadata.
 * Pattern: "Cruising in {Country} | Gay Cruising Guide | Crusit"
 */
export function buildCountryMetadata({
  country,
  spotCount,
  path,
}: {
  country: string;
  spotCount?: number;
  path?: string;
}): Metadata {
  const title = `Cruising in ${country} | Gay Cruising Guide | ${SITE_NAME}`;
  const count =
    typeof spotCount === "number"
      ? ` across ${spotCount} community-reviewed location${spotCount === 1 ? "" : "s"}`
      : "";
  const description = `Your guide to gay cruising in ${country}. Discover top-rated cruising spots, maps, and honest community reviews${count} on Crusit.`;

  return buildPageMetadata({
    title,
    description,
    path: path ?? `/cruising/country/${slugify(country)}`,
  });
}

/**
 * Category (spot type) page metadata.
 * Pattern: "{Category} Cruising Spots | Crusit"
 */
export function buildCategoryMetadata({
  categoryValue,
  categoryLabel,
  path,
}: {
  /** Raw spot_type value, e.g. "beach". */
  categoryValue?: string;
  /** Pre-resolved label, e.g. "Beach". Takes precedence over categoryValue. */
  categoryLabel?: string;
  path?: string;
}): Metadata {
  const label = categoryLabel ?? spotTypeLabel(categoryValue);
  const title = `${label} Cruising Spots | ${SITE_NAME}`;
  const lowered = label.toLowerCase();
  const description = `Explore ${lowered} gay cruising spots worldwide. Browse ratings, reviews, and maps for ${lowered} cruising locations on Crusit.`;

  return buildPageMetadata({
    title,
    description,
    path: path ?? `/cruising/type/${slugify(categoryValue ?? label)}`,
  });
}

/** Blog index page metadata. */
export function buildBlogIndexMetadata(): Metadata {
  return buildPageMetadata({
    title: `Cruising Guides & Community Blog | ${SITE_NAME}`,
    description:
      "Guides, safety tips, and stories from the Crusit community on gay cruising spots, etiquette, and discovering new locations worldwide.",
    path: "/blog",
  });
}

/** Individual blog post metadata (Open Graph article). */
export function buildBlogPostMetadata({
  title,
  description,
  slug,
  path,
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  slug: string;
  path?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  return buildPageMetadata({
    title: `${title} | ${SITE_NAME} Blog`,
    description,
    path: path ?? `/blog/${slug}`,
    ogType: "article",
    publishedTime,
    modifiedTime,
  });
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

/** Generic breadcrumb JSON-LD from an ordered list of {name, path} items. */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  siteUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${normalizePath(item.path)}`,
    })),
  };
}

/** BlogPosting JSON-LD for a blog article. */
export function blogPostingJsonLd(
  post: {
    slug: string;
    title: string;
    description: string;
    publishedTime: string;
    modifiedTime?: string;
    author: string;
  },
  siteUrl: string,
) {
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedTime,
    dateModified: post.modifiedTime ?? post.publishedTime,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: SITE_NAME, url: siteUrl },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
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

export { absoluteUrl };
