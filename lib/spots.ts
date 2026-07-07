import type { Spot, SpotSearchParams } from "./types";
import { createClient } from "./supabase/server";

const PAGE_SIZE = 20;

type SpotRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  street_address: string;
  city: string;
  province: string;
  region: string;
  postal_code: string;
  country: string;
  created_by: string | null;
  created_at: string;
  status: "published" | "hidden";
  spot_type: string;
  rating_avg: number;
  rating_count: number;
  latitude: number;
  longitude: number;
};

function mapSpot(row: SpotRow): Spot {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    street_address: row.street_address,
    city: row.city,
    province: row.province,
    region: row.region,
    postal_code: row.postal_code,
    country: row.country,
    latitude: row.latitude,
    longitude: row.longitude,
    created_by: row.created_by,
    created_at: row.created_at,
    status: row.status,
    spot_type: row.spot_type ?? "other",
    rating_avg: Number(row.rating_avg),
    rating_count: row.rating_count,
  };
}

export async function getSpots(params: SpotSearchParams = {}) {
  const supabase = await createClient();
  const page = Math.max(1, params.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("spots_public")
    .select(
      "id, slug, name, description, street_address, city, province, region, postal_code, country, created_by, created_at, status, spot_type, rating_avg, rating_count, latitude, longitude",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (params.q) {
    const term = `%${params.q.trim()}%`;
    query = query.or(
      `name.ilike.${term},description.ilike.${term},street_address.ilike.${term},city.ilike.${term},province.ilike.${term},region.ilike.${term},country.ilike.${term}`,
    );
  }

  if (params.province) {
    query = query.ilike("province", `%${params.province.trim()}%`);
  }

  if (params.region) {
    query = query.ilike("region", `%${params.region.trim()}%`);
  }

  if (params.city) {
    query = query.ilike("city", `%${params.city.trim()}%`);
  }

  if (params.country) {
    query = query.eq("country", params.country.trim());
  }

  if (params.spotType) {
    query = query.eq("spot_type", params.spotType.trim());
  }

  if (params.minRating) {
    query = query.gte("rating_avg", params.minRating);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    spots: (data as SpotRow[] | null)?.map(mapSpot) ?? [],
    total: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
  };
}

const SPOT_SELECT =
  "id, slug, name, description, street_address, city, province, region, postal_code, country, created_by, created_at, status, spot_type, rating_avg, rating_count, latitude, longitude";

export type CityFacet = { city: string; country: string; count: number };
export type CountryFacet = { country: string; count: number };
export type SpotTypeFacet = { spotType: string; count: number };

/** Distinct cities (with their country and spot count), most spots first. */
export async function getCityFacets(): Promise<CityFacet[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("spots_public")
    .select("city, country");

  if (error) {
    throw new Error(error.message);
  }

  const map = new Map<string, CityFacet>();
  for (const row of (data ?? []) as { city: string; country: string }[]) {
    const city = (row.city ?? "").trim();
    const country = (row.country ?? "").trim();
    if (!city) continue;
    const key = `${city.toLowerCase()}||${country.toLowerCase()}`;
    const entry = map.get(key) ?? { city, country, count: 0 };
    entry.count += 1;
    map.set(key, entry);
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}

/** Distinct countries (with spot count), most spots first. */
export async function getCountryFacets(): Promise<CountryFacet[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("spots_public").select("country");

  if (error) {
    throw new Error(error.message);
  }

  const map = new Map<string, CountryFacet>();
  for (const row of (data ?? []) as { country: string }[]) {
    const country = (row.country ?? "").trim();
    if (!country) continue;
    const key = country.toLowerCase();
    const entry = map.get(key) ?? { country, count: 0 };
    entry.count += 1;
    map.set(key, entry);
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}

/** Distinct spot types (with spot count), most spots first. */
export async function getSpotTypeFacets(): Promise<SpotTypeFacet[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("spots_public").select("spot_type");

  if (error) {
    throw new Error(error.message);
  }

  const map = new Map<string, SpotTypeFacet>();
  for (const row of (data ?? []) as { spot_type: string }[]) {
    const spotType = (row.spot_type ?? "other").trim() || "other";
    const entry = map.get(spotType) ?? { spotType, count: 0 };
    entry.count += 1;
    map.set(spotType, entry);
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}

/** Exact-match spots for a city (optionally scoped to a country). */
export async function getSpotsByCity({
  city,
  country,
  page = 1,
}: {
  city: string;
  country?: string;
  page?: number;
}) {
  const supabase = await createClient();
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("spots_public")
    .select(SPOT_SELECT, { count: "exact" })
    .eq("city", city)
    .order("rating_avg", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (country) {
    query = query.eq("country", country);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    spots: (data as SpotRow[] | null)?.map(mapSpot) ?? [],
    total: count ?? 0,
    page: safePage,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
  };
}

export async function getSpotBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("spots_public")
    .select(
      "id, slug, name, description, street_address, city, province, region, postal_code, country, created_by, created_at, status, spot_type, rating_avg, rating_count, latitude, longitude",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
  return mapSpot(data as SpotRow);
}

export async function getAllSpotSlugs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("spots_public")
    .select("slug");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => row.slug as string);
}

export async function getSitemapSpots() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("spots_public")
    .select("slug, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => ({
    slug: row.slug as string,
    createdAt: row.created_at as string,
  }));
}
