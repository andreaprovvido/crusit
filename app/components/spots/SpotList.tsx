import type { Spot } from "@/lib/types";
import SpotCard from "./SpotCard";

export default function SpotList({ spots }: { spots: Spot[] }) {
  if (spots.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 p-8 text-center">
        <h2 className="text-lg font-semibold text-white">No spots found</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Try different filters or be the first to add a spot in this area.
        </p>
      </div>
    );
  }

  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {spots.map((spot) => (
        <li key={spot.id}>
          <SpotCard spot={spot} />
        </li>
      ))}
    </ol>
  );
}
