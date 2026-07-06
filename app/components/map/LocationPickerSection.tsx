"use client";

import { useEffect, useState } from "react";
import LocationPicker from "./LocationPicker";
import type { ComponentProps } from "react";

export default function LocationPickerSection(props: ComponentProps<typeof LocationPicker>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-400">
        Loading map picker...
      </div>
    );
  }

  return <LocationPicker {...props} />;
}
