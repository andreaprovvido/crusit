import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import type { Metadata } from "next";
import Link from "next/link";
import SpotMapSection from "@/app/components/map/SpotMapSection";
import SpotList from "@/app/components/spots/SpotList";
import { COUNTRIES } from "@/lib/countries";
import { SPOT_TYPES } from "@/lib/spotTypes";
import { getSpots } from "@/lib/spots";

export const metadata: Metadata = {
  title: "Explore cruising spots",
  description:
    "Browse cruising spots worldwide with ratings, reviews, and an interactive map.",
  alternates: {
    canonical: "/spots",
  },
};

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

  try {
    spotsResult = await getSpots({
      q: params.q,
      country: params.country,
      spotType: params.spotType,
      minRating: Number.isNaN(minRating) ? undefined : minRating,
      page: Number.isNaN(page) ? 1 : page,
    });
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Unable to load spots. Run supabase/spots.sql in your Supabase project.";
  }

  const { spots, total, totalPages } = spotsResult;
  const currentPage = spotsResult.page;

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

      <form method="get" className="mt-8 grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:grid-cols-[1fr_auto_auto_auto]">
        <label className="block text-sm text-zinc-300">
          Search
          <input
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Search by name, address, or location"
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm text-zinc-300">
          Type
          <select
            name="spotType"
            defaultValue={params.spotType ?? ""}
            className="mt-2 w-full min-w-40 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          >
            <option value="">All types</option>
            {SPOT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-zinc-300">
          Country
          <select
            name="country"
            defaultValue={params.country ?? ""}
            className="mt-2 w-full min-w-44 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          >
            <option value="">All countries</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-zinc-300">
          Min rating
          <select
            name="minRating"
            defaultValue={params.minRating ?? ""}
            className="mt-2 w-full min-w-36 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          >
            <option value="">Any</option>
            <option value="3">3+ stars</option>
            <option value="4">4+ stars</option>
            <option value="5">5 stars</option>
          </select>
        </label>
        <div className="md:col-span-4">
          <button
            type="submit"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
          >
            Apply filters
          </button>
        </div>
      </form>

      {loadError ? (
        <p className="mt-6 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
          {loadError}
        </p>
      ) : null}

      <section aria-label="Map view" className="mt-8">
        <h2 className="sr-only">Map</h2>
        <SpotMapSection spots={spots} />
      </section>

      <section aria-label="Spot results" className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Spots</h2>
          <p className="text-sm text-zinc-400">{total} result{total === 1 ? "" : "s"}</p>
        </div>
        <SpotList spots={spots} />
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
      </div>
    </div>
  );
}
