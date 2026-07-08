import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import type { Metadata } from "next";
import Link from "next/link";
import SpotMapSection from "@/app/components/map/SpotMapSection";
import SpotCarousel from "@/app/components/spots/SpotCarousel";
import SpotDiscoveryIndex from "@/app/components/spots/SpotDiscoveryIndex";
import { COUNTRIES } from "@/lib/countries";
import { SPOT_TYPES } from "@/lib/spotTypes";
import {
  getAllSpotsForMap,
  getCityFacets,
  getCountryFacets,
  getSpotTypeFacets,
  getSpots,
} from "@/lib/spots";

import { buildSpotsIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSpotsIndexMetadata();

type PageProps = {
  searchParams: Promise<{
    q?: string;
    country?: string;
    spotType?: string;
    minRating?: string;
    page?: string;
  }>;
};

function buildFilterQuery(params: {
  q?: string;
  country?: string;
  spotType?: string;
  minRating?: string;
  page?: string;
}) {
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.country) query.set("country", params.country);
  if (params.spotType) query.set("spotType", params.spotType);
  if (params.minRating) query.set("minRating", params.minRating);
  if (params.page) query.set("page", params.page);
  return query;
}

export default async function SpotsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const minRating = params.minRating ? Number(params.minRating) : undefined;

  let spotsResult = {
    spots: [] as Awaited<ReturnType<typeof getSpots>>["spots"],
    total: 0,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  };
  let loadError: string | null = null;
  let mapSpots: Awaited<ReturnType<typeof getAllSpotsForMap>> = [];

  try {
    [spotsResult, mapSpots] = await Promise.all([
      getSpots({
        q: params.q,
        country: params.country,
        spotType: params.spotType,
        minRating: Number.isNaN(minRating) ? undefined : minRating,
        page: Number.isNaN(page) ? 1 : page,
      }),
      getAllSpotsForMap(),
    ]);
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Unable to load spots. Run supabase/spots.sql in your Supabase project.";
  }

  const { spots, total, totalPages } = spotsResult;
  const currentPage = spotsResult.page;

  let countries: Awaited<ReturnType<typeof getCountryFacets>> = [];
  let cities: Awaited<ReturnType<typeof getCityFacets>> = [];
  let types: Awaited<ReturnType<typeof getSpotTypeFacets>> = [];
  try {
    [countries, cities, types] = await Promise.all([
      getCountryFacets(),
      getCityFacets(),
      getSpotTypeFacets(),
    ]);
  } catch {
    // Discovery index is best-effort; ignore facet load failures.
  }

  return (
    <div className="relative overflow-hidden">
      <RainbowMeshBackground variant="spots" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-white">Explore spots</h1>
        <p className="mt-3 text-zinc-400">
          Discover community-reviewed cruising locations. Browse the list below or use the map to explore.
        </p>
      </div>

      <form method="get" className="mt-8 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <label className="block text-sm text-zinc-300">
          Search
          <input
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Search by name, address, or location"
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>

        <div className="relative">
          <div className="flex items-end gap-3 overflow-x-auto pb-1 pr-8">
            <label className="flex shrink-0 flex-col text-sm text-zinc-300">
              Type
              <select
                name="spotType"
                defaultValue={params.spotType ?? ""}
                className="mt-1.5 block w-28 rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-2 text-white"
              >
                <option value="">All types</option>
                {SPOT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex shrink-0 flex-col text-sm text-zinc-300">
              Country
              <select
                name="country"
                defaultValue={params.country ?? ""}
                className="mt-1.5 block w-32 rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-2 text-white"
              >
                <option value="">All countries</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex shrink-0 flex-col text-sm text-zinc-300">
              Rating
              <select
                name="minRating"
                defaultValue={params.minRating ?? ""}
                className="mt-1.5 block w-20 rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-2 text-white"
              >
                <option value="">Any</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5</option>
              </select>
            </label>
            <button
              type="submit"
              className="shrink-0 whitespace-nowrap rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-400"
            >
              Apply filters
            </button>
            <Link
              href="/spots"
              className="shrink-0 whitespace-nowrap rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-white"
            >
              Reset filters
            </Link>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-900 to-transparent"
          />
        </div>
      </form>

      {loadError ? (
        <p className="mt-6 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
          {loadError}
        </p>
      ) : null}

      <section aria-label="Map view" className="mt-8">
        <h2 className="sr-only">Map</h2>
        <SpotMapSection spots={mapSpots} worldView />
      </section>

      <section aria-label="Spot results" className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Spots</h2>
          <p className="text-sm text-zinc-400">{total} result{total === 1 ? "" : "s"}</p>
        </div>
        <SpotCarousel spots={spots} />
      </section>

      {totalPages > 1 ? (
        <nav aria-label="Pagination" className="mt-8 flex items-center gap-4">
          {currentPage > 1 ? (
            <Link
              href={`/spots?${buildFilterQuery({ ...params, page: String(currentPage - 1) }).toString()}`}
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Previous page
            </Link>
          ) : null}
          <span className="text-sm text-zinc-400">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link
              href={`/spots?${buildFilterQuery({ ...params, page: String(currentPage + 1) }).toString()}`}
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Next page
            </Link>
          ) : null}
        </nav>
      ) : null}

      <section aria-label="Browse by place and category" className="mt-16 border-t border-zinc-800 pt-12">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-400">
            Cruising guides
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Explore spots by place & category
          </h2>
          <p className="mt-3 text-zinc-400">
            Jump into curated guides built from real community reviews.
          </p>
        </div>
        <div className="mt-8">
          <SpotDiscoveryIndex countries={countries} cities={cities} types={types} />
        </div>
      </section>
      </div>
    </div>
  );
}
