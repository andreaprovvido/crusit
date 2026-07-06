"use client";

import { useEffect, useState } from "react";
import SpotMap from "./SpotMap";
import type { ComponentProps } from "react";

export default function SpotMapSection(props: ComponentProps<typeof SpotMap>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-400">
        Loading map...
      </div>
    );
  }

  return <SpotMap {...props} />;
}
