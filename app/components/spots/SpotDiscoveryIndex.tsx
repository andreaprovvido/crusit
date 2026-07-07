import Link from "next/link";
import type { CityFacet, CountryFacet, SpotTypeFacet } from "@/lib/spots";
import { SPOT_TYPES, spotTypeLabel } from "@/lib/spotTypes";
import { slugify } from "@/lib/seo";

export default function SpotDiscoveryIndex({
  countries,
  cities,
  types,
  maxCities = 40,
}: {
  countries: CountryFacet[];
  cities: CityFacet[];
  types: SpotTypeFacet[];
  maxCities?: number;
}) {
  const topCities = cities.slice(0, maxCities);
  const typeCounts = new Map(types.map((t) => [t.spotType, t.count]));

  return (
    <div className="space-y-12">
      <section aria-labelledby="countries-heading">
        <h2 id="countries-heading" className="text-2xl font-semibold text-white">
          Discover by country
        </h2>
        {countries.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-400">No countries yet.</p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {countries.map((facet) => (
              <li key={facet.country}>
                <Link
                  href={`/cruising/country/${slugify(facet.country)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-sm text-zinc-300 hover:border-emerald-500/30 hover:text-white"
                >
                  {facet.country}
                  <span className="text-xs text-zinc-500">{facet.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="cities-heading">
        <h2 id="cities-heading" className="text-2xl font-semibold text-white">
          Discover by city
        </h2>
        {topCities.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-400">No cities yet.</p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {topCities.map((facet) => (
              <li key={`${facet.city}-${facet.country}`}>
                <Link
                  href={`/cruising/city/${slugify(facet.city)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-sm text-zinc-300 hover:border-emerald-500/30 hover:text-white"
                >
                  {facet.city}
                  <span className="text-xs text-zinc-500">{facet.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="types-heading">
        <h2 id="types-heading" className="text-2xl font-semibold text-white">
          Discover by category
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SPOT_TYPES.map((type) => (
            <li key={type.value}>
              <Link
                href={`/cruising/type/${slugify(type.value)}`}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 transition hover:border-emerald-500/30 hover:text-white"
              >
                <span>{spotTypeLabel(type.value)}</span>
                <span className="text-xs text-zinc-500">
                  {typeCounts.get(type.value) ?? 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
