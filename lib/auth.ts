const PRODUCTION_SITE_URL = "https://www.crusit.com";

/** Public site URL (may be localhost in local dev). */
export function getPublicSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL;
}

/**
 * Base URL for auth email links (confirm signup, password reset).
 * Always production so confirmation emails work for real users even when
 * signup is triggered from a local dev server or Supabase Site URL was localhost.
 */
export function getAuthSiteUrl() {
  const configured = getPublicSiteUrl();
  if (configured.includes("localhost") || configured.includes("127.0.0.1")) {
    return PRODUCTION_SITE_URL;
  }
  return configured;
}

/** Safe internal path for post-auth redirects (blocks open redirects). */
export function sanitizeAuthNext(next: string | null | undefined, fallback = "/spots") {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return fallback;
  }
  return next;
}

export function buildAuthCallbackUrl(next = "/spots") {
  const safeNext = sanitizeAuthNext(next);
  const url = new URL("/auth/callback", getAuthSiteUrl());
  url.searchParams.set("next", safeNext);
  return url.toString();
}
