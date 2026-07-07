"use client";

import { useRef, useState } from "react";
import type { Spot } from "@/lib/types";
import SpotCard from "./SpotCard";

export default function SpotCarousel({ spots }: { spots: Spot[] }) {
  const [showAll, setShowAll] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  if (spots.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 p-8 text-center">
        <h3 className="text-lg font-semibold text-white">No spots found</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Try different filters or be the first to add a spot in this area.
        </p>
      </div>
    );
  }

  const scrollBy = (direction: number) => {
    trackRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-2">
        {!showAll ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="flex size-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="flex size-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          {showAll ? "Show carousel" : "Show all"}
        </button>
      </div>

      {showAll ? (
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spots.map((spot) => (
            <li key={spot.id}>
              <SpotCard spot={spot} />
            </li>
          ))}
        </ol>
      ) : (
        <div className="relative">
          <div
            ref={trackRef}
            className="grid grid-flow-col grid-rows-3 auto-cols-[minmax(280px,320px)] gap-4 overflow-x-auto scroll-smooth pb-3 [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollbarWidth: "none" }}
          >
            {spots.map((spot) => (
              <div key={spot.id} className="snap-start">
                <SpotCard spot={spot} />
              </div>
            ))}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-zinc-950 to-transparent"
          />
        </div>
      )}
    </div>
  );
}
