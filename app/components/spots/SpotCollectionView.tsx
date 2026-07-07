import Link from "next/link";
import type { Spot } from "@/lib/types";
import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import SpotMapSection from "@/app/components/map/SpotMapSection";
import SpotList from "@/app/components/spots/SpotList";

type Crumb = { name: string; href: string };

export default function SpotCollectionView({
  eyebrow,
  title,
  description,
  spots,
  total,
  currentPage,
  totalPages,
  pageHref,
  breadcrumb = [],
}: {
  eyebrow?: string;
  title: string;
  description: string;
  spots: Spot[];
  total: number;
  currentPage: number;
  totalPages: number;
  pageHref: (page: number) => string;
  breadcrumb?: Crumb[];
}) {
  return (
    <div className="relative overflow-hidden">
      <RainbowMeshBackground variant="spots" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        {breadcrumb.length > 0 ? (
          <nav aria-label="Breadcrumb" className="text-sm text-zinc-400">
            {breadcrumb.map((crumb, index) => (
              <span key={crumb.href}>
                {index > 0 ? <span aria-hidden="true"> / </span> : null}
                {index === breadcrumb.length - 1 ? (
                  <span className="text-zinc-300">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="mt-4 max-w-3xl">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-400">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-3 text-zinc-400">{description}</p>
        </div>

        <section aria-label="Map view" className="mt-8">
          <h2 className="sr-only">Map</h2>
          <SpotMapSection spots={spots} worldView />
        </section>

        <section aria-label="Spot results" className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Spots</h2>
            <p className="text-sm text-zinc-400">
              {total} result{total === 1 ? "" : "s"}
            </p>
          </div>
          <SpotList spots={spots} />
        </section>

        {totalPages > 1 ? (
          <nav aria-label="Pagination" className="mt-8 flex items-center gap-4">
            {currentPage > 1 ? (
              <Link
                href={pageHref(currentPage - 1)}
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
                href={pageHref(currentPage + 1)}
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
