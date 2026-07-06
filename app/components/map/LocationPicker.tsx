"use client";

import { useEffect, useRef } from "react";
import Map, { Marker, NavigationControl, type MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

type LocationPickerProps = {
  latitude: number;
  longitude: number;
  label?: string;
  onLatitudeChange: (value: number) => void;
  onLongitudeChange: (value: number) => void;
  onMapClick?: (coords: { latitude: number; longitude: number }) => void;
};

const MAP_STYLE =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ??
  "https://tiles.openfreemap.org/styles/liberty";

export default function LocationPicker({
  latitude,
  longitude,
  label,
  onLatitudeChange,
  onLongitudeChange,
  onMapClick,
}: LocationPickerProps) {
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.easeTo({
      center: [longitude, latitude],
      duration: 600,
    });
  }, [latitude, longitude]);

  return (
    <div className="space-y-3">
      <div className="h-[320px] overflow-hidden rounded-2xl border border-zinc-800">
        <Map
          ref={mapRef}
          initialViewState={{
            latitude,
            longitude,
            zoom: 11,
          }}
          mapStyle={MAP_STYLE}
          style={{ width: "100%", height: "100%" }}
          onClick={(event) => {
            onLatitudeChange(event.lngLat.lat);
            onLongitudeChange(event.lngLat.lng);
            onMapClick?.({
              latitude: event.lngLat.lat,
              longitude: event.lngLat.lng,
            });
          }}
        >
          <NavigationControl position="top-right" />
          <Marker latitude={latitude} longitude={longitude} anchor="bottom">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full border border-emerald-300 bg-zinc-950/90 px-3 py-1 text-xs font-medium text-white shadow-lg">
                {label?.trim() || "New spot"}
              </div>
              <div className="size-4 rounded-full border-2 border-white bg-emerald-500 shadow-lg" />
            </div>
          </Marker>
        </Map>
      </div>

      <p className="text-sm text-zinc-400">
        Click the map to place your spot. A street is not required for forests, parks, or remote areas.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-zinc-300">
          Latitude
          <input
            name="latitude"
            type="number"
            step="any"
            required
            value={latitude}
            onChange={(event) => onLatitudeChange(Number(event.target.value))}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm text-zinc-300">
          Longitude
          <input
            name="longitude"
            type="number"
            step="any"
            required
            value={longitude}
            onChange={(event) => onLongitudeChange(Number(event.target.value))}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
      </div>
    </div>
  );
}
