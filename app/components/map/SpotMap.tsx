"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  type MapRef,
} from "react-map-gl/maplibre";
import type { Spot } from "@/lib/types";
import { spotTypeLabel } from "@/lib/spotTypes";
import "maplibre-gl/dist/maplibre-gl.css";

type SpotMapProps = {
  spots: Spot[];
  selectedSlug?: string;
  interactive?: boolean;
  onSelect?: (spot: Spot) => void;
  center?: { latitude: number; longitude: number };
  zoom?: number;
};

const DEFAULT_CENTER = { latitude: 41.9, longitude: 12.5 };
const MAP_STYLE =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ??
  "https://tiles.openfreemap.org/styles/liberty";

export default function SpotMap({
  spots,
  selectedSlug,
  interactive = true,
  onSelect,
  center,
  zoom = 5,
}: SpotMapProps) {
  const mapRef = useRef<MapRef | null>(null);
  const [popupSpot, setPopupSpot] = useState<Spot | null>(null);

  const initialView = useMemo(() => {
    if (center) return { ...center, zoom };
    if (spots.length > 0) {
      return {
        latitude: spots[0].latitude,
        longitude: spots[0].longitude,
        zoom: spots.length === 1 ? Math.max(zoom, 13) : zoom,
      };
    }
    return { ...DEFAULT_CENTER, zoom };
  }, [center, spots, zoom]);

  useEffect(() => {
    if (!selectedSlug) return;
    const spot = spots.find((item) => item.slug === selectedSlug);
    if (spot) setPopupSpot(spot);
  }, [selectedSlug, spots]);

  useEffect(() => {
    if (!mapRef.current || center || spots.length < 2) return;

    const bounds = spots.reduce(
      (acc, spot) => ({
        minLng: Math.min(acc.minLng, spot.longitude),
        minLat: Math.min(acc.minLat, spot.latitude),
        maxLng: Math.max(acc.maxLng, spot.longitude),
        maxLat: Math.max(acc.maxLat, spot.latitude),
      }),
      {
        minLng: spots[0].longitude,
        minLat: spots[0].latitude,
        maxLng: spots[0].longitude,
        maxLat: spots[0].latitude,
      },
    );

    mapRef.current.fitBounds(
      [
        [bounds.minLng, bounds.minLat],
        [bounds.maxLng, bounds.maxLat],
      ],
      {
        padding: 60,
        maxZoom: 14,
        duration: 0,
      },
    );
  }, [center, spots]);

  function handleMarkerClick(event: { originalEvent: MouseEvent }, spot: Spot) {
    event.originalEvent.stopPropagation();
    setPopupSpot(spot);
    onSelect?.(spot);
  }

  return (
    <div className="h-[420px] overflow-hidden rounded-2xl border border-zinc-800">
      <Map
        ref={mapRef}
        initialViewState={initialView}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
        reuseMaps
        onClick={() => setPopupSpot(null)}
      >
        <NavigationControl position="top-right" showCompass={interactive} />
        {spots.map((spot) => {
          const isSelected =
            selectedSlug === spot.slug || popupSpot?.id === spot.id;

          return (
            <Marker
              key={spot.id}
              latitude={spot.latitude}
              longitude={spot.longitude}
              anchor="center"
              onClick={(event) => handleMarkerClick(event, spot)}
            >
              <button
                type="button"
                aria-label={`${spot.name}, ${spot.city}`}
                aria-pressed={isSelected}
                className={`block rounded-full border-2 shadow-lg transition-transform hover:scale-110 ${
                  isSelected
                    ? "size-5 border-white bg-emerald-400"
                    : "size-4 border-emerald-200 bg-emerald-500"
                }`}
              />
            </Marker>
          );
        })}

        {popupSpot ? (
          <Popup
            longitude={popupSpot.longitude}
            latitude={popupSpot.latitude}
            anchor="bottom"
            offset={14}
            closeButton
            closeOnClick={false}
            className="spot-map-popup"
            onClose={() => setPopupSpot(null)}
          >
            <div className="space-y-3">
              <div>
                <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                  {spotTypeLabel(popupSpot.spot_type)}
                </span>
                <h3 className="mt-1.5 text-sm font-semibold text-white">{popupSpot.name}</h3>
                <p className="mt-1 line-clamp-4 text-sm leading-relaxed text-zinc-300">
                  {popupSpot.description}
                </p>
              </div>
              <Link
                href={`/spots/${popupSpot.slug}`}
                className="inline-flex rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-black hover:bg-emerald-400"
              >
                Open spot
              </Link>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}
