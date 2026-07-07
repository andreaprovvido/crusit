import Link from "next/link";
import type { Spot } from "@/lib/types";
import { formatRating, formatSpotAddress } from "@/lib/seo";
import { spotTypeLabel } from "@/lib/spotTypes";

export default function SpotCard({ spot }: { spot: Spot }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-emerald-500/30">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
          {spotTypeLabel(spot.spot_type)}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-white">
        <Link href={`/spots/${spot.slug}`} className="hover:text-emerald-300">
          {spot.name}
        </Link>
      </h2>
      <p className="mt-1 text-sm text-emerald-400">{formatRating(spot.rating_avg, spot.rating_count)}</p>
      <p className="mt-2 text-sm text-zinc-400">{formatSpotAddress(spot)}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-300">
        {spot.description}
      </p>
      <Link
        href={`/spots/${spot.slug}`}
        className="mt-4 inline-flex text-sm font-medium text-emerald-400 hover:text-emerald-300"
      >
        View details
      </Link>
    </article>
  );
}
