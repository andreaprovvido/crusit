"use client";

import { useEffect, useMemo, useState } from "react";
import LocationPickerSection from "@/app/components/map/LocationPickerSection";
import { DEFAULT_SPOT_TYPE, SPOT_TYPES } from "@/lib/spotTypes";

type NewSpotFormProps = {
  action: (formData: FormData) => void | Promise<void>;
};

type AddressSuggestion = {
  id: string;
  label: string;
  streetAddress: string;
  city: string;
  province: string;
  region: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
};

type MapTilerFeature = {
  id?: string | number;
  place_name?: string;
  text?: string;
  address?: string;
  place_type?: string[];
  center?: [number, number];
  properties?: Record<string, unknown> & {
    place_designation?: string;
    country_code?: string;
  };
  context?: Array<{
    id?: string;
    text?: string;
    short_code?: string;
    place_type?: string[];
    place_designation?: string;
    kind?: string;
  }>;
};

const DEFAULT_LATITUDE = 41.9;
const DEFAULT_LONGITUDE = 12.5;

function getContextValue(feature: MapTilerFeature, ...prefixes: string[]) {
  return (
    feature.context?.find((item) =>
      prefixes.some((prefix) => item.id?.startsWith(prefix) || item.place_type?.includes(prefix)),
    )?.text ?? ""
  );
}

function getCountryValue(feature: MapTilerFeature) {
  const country = feature.context?.find(
    (item) => item.id?.startsWith("country") || item.place_type?.includes("country"),
  );
  return country?.text ?? "";
}

function getPostalCodeValue(feature: MapTilerFeature) {
  return getContextValue(feature, "postcode", "postal_code");
}

function getCityValue(feature: MapTilerFeature) {
  const mainType = feature.place_type?.[0];

  if (mainType === "municipality") {
    return feature.text?.trim() ?? "";
  }

  const municipalityContext = feature.context?.find((item) =>
    item.id?.startsWith("municipality."),
  );
  if (municipalityContext?.text) {
    return municipalityContext.text.trim();
  }

  const designation = feature.properties?.place_designation;
  if (designation === "city" || designation === "town" || designation === "village") {
    return feature.text?.trim() ?? "";
  }

  if (mainType === "place" || mainType === "locality") {
    return feature.text?.trim() ?? "";
  }

  return "";
}

function getStreetAddress(feature: MapTilerFeature, options?: { includeRoad?: boolean }) {
  const mainType = feature.place_type?.[0];
  const streetText = feature.text?.trim() ?? "";
  const houseNumber = String(feature.address ?? "").trim();

  if (mainType === "address") {
    return [streetText, houseNumber].filter(Boolean).join(" ").trim();
  }

  if (mainType === "road" && options?.includeRoad !== false) {
    return streetText;
  }

  return "";
}

function extractAdminFields(feature: MapTilerFeature) {
  return {
    city: getCityValue(feature),
    province: getContextValue(feature, "county"),
    region: getContextValue(feature, "region"),
    postalCode: getPostalCodeValue(feature),
    country: getCountryValue(feature),
  };
}

function buildSuggestionFromFeatures(
  features: MapTilerFeature[],
  latitude: number,
  longitude: number,
  options?: { includeRoadAsStreet?: boolean },
): AddressSuggestion | null {
  if (features.length === 0) return null;

  const streetOptions = { includeRoad: options?.includeRoadAsStreet !== false };
  const streetFeature = features.find(
    (feature) => getStreetAddress(feature, streetOptions).length > 0,
  );
  const adminFeature =
    features.find((feature) => {
      const admin = extractAdminFields(feature);
      return Boolean(admin.city || admin.country || admin.region || admin.province);
    }) ?? features[0];

  const streetAddress = streetFeature
    ? getStreetAddress(streetFeature, streetOptions)
    : "";
  const admin = extractAdminFields(adminFeature);
  const label =
    adminFeature.place_name?.trim() ||
    [streetAddress, admin.city, admin.region, admin.country].filter(Boolean).join(", ") ||
    "Selected location";

  return {
    id: String(
      adminFeature.id ??
        streetFeature?.id ??
        `${latitude}-${longitude}`,
    ),
    label,
    streetAddress,
    city: admin.city,
    province: admin.province,
    region: admin.region,
    postalCode: admin.postalCode,
    country: admin.country,
    latitude,
    longitude,
  };
}

function normalizeSuggestion(feature: MapTilerFeature): AddressSuggestion | null {
  if (!feature.center || feature.center.length < 2) return null;
  return buildSuggestionFromFeatures([feature], feature.center[1], feature.center[0]);
}

export default function NewSpotForm({ action }: NewSpotFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [spotType, setSpotType] = useState<string>(DEFAULT_SPOT_TYPE);
  const [search, setSearch] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(DEFAULT_LATITUDE);
  const [longitude, setLongitude] = useState(DEFAULT_LONGITUDE);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReverseLoading, setIsReverseLoading] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY ?? "";
  const canSearch = apiKey.length > 0;

  useEffect(() => {
    if (!canSearch || search.trim().length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          key: apiKey,
          language: "it,en",
          limit: "8",
          autocomplete: "true",
          types: "address,road,place,postal_code",
          proximity: `${longitude},${latitude}`,
        });

        const response = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(search)}.json?${params.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          setSuggestions([]);
          return;
        }

        const data = (await response.json()) as { features?: MapTilerFeature[] };
        const nextSuggestions =
          data.features?.map(normalizeSuggestion).filter(Boolean) as AddressSuggestion[] | undefined;

        setSuggestions(nextSuggestions ?? []);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setSuggestions([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [apiKey, canSearch, search]);

  const selectedAddressPreview = useMemo(() => {
    return [streetAddress, city, province, region, postalCode, country]
      .map((part) => part.trim())
      .filter(Boolean)
      .join(", ");
  }, [streetAddress, city, province, region, postalCode, country]);

  function applySuggestion(suggestion: AddressSuggestion) {
    setSearch(suggestion.label);
    setSelectedLabel(suggestion.label);
    setStreetAddress(suggestion.streetAddress);
    setCity(suggestion.city);
    setProvince(suggestion.province);
    setRegion(suggestion.region);
    setPostalCode(suggestion.postalCode);
    setCountry(suggestion.country);
    setLatitude(suggestion.latitude);
    setLongitude(suggestion.longitude);
    setSuggestions([]);
  }

  async function reverseGeocode(nextLatitude: number, nextLongitude: number) {
    if (!canSearch) return;

    setIsReverseLoading(true);

    try {
      const params = new URLSearchParams({
        key: apiKey,
        language: "it,en",
      });

      const response = await fetch(
        `https://api.maptiler.com/geocoding/${nextLongitude},${nextLatitude}.json?${params.toString()}`,
      );

      if (!response.ok) return;

      const data = (await response.json()) as { features?: MapTilerFeature[] };
      const suggestion = buildSuggestionFromFeatures(
        data.features ?? [],
        nextLatitude,
        nextLongitude,
        { includeRoadAsStreet: false },
      );

      if (suggestion) {
        applySuggestion(suggestion);
      }
    } finally {
      setIsReverseLoading(false);
    }
  }

  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block text-sm text-zinc-300">
        Name
        <input
          name="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>

      <label className="block text-sm text-zinc-300">
        Type of spot
        <select
          name="spotType"
          value={spotType}
          onChange={(event) => setSpotType(event.target.value)}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        >
          {SPOT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm text-zinc-300">
        Description
        <textarea
          name="description"
          required
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <label className="block text-sm font-medium text-zinc-200">
          Search address
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={
              canSearch
                ? "Start typing a real address, street, city or postcode"
                : "Add NEXT_PUBLIC_MAPTILER_API_KEY to enable autocomplete"
            }
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>

        {canSearch ? (
          <p className="mt-2 text-xs text-zinc-500">
            Search for an address or click the map. Street is optional for natural areas like forests, parks, or trails.
          </p>
        ) : (
          <p className="mt-2 text-xs text-amber-300">
            Autocomplete is disabled until you add `NEXT_PUBLIC_MAPTILER_API_KEY` to your environment.
          </p>
        )}

        {isLoading ? (
          <p className="mt-3 text-sm text-zinc-400">Searching addresses...</p>
        ) : null}
        {isReverseLoading ? (
          <p className="mt-3 text-sm text-zinc-400">Resolving map position...</p>
        ) : null}

        {suggestions.length > 0 ? (
          <ul className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="border-b border-zinc-800 last:border-b-0">
                <button
                  type="button"
                  onClick={() => applySuggestion(suggestion)}
                  className="w-full px-4 py-3 text-left text-sm text-zinc-200 transition hover:bg-zinc-900"
                >
                  {suggestion.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <label className="block text-sm text-zinc-300">
        Street address <span className="text-zinc-500">(optional)</span>
        <input
          name="streetAddress"
          placeholder="Via Roma 12 — leave empty for spots without a street"
          value={streetAddress}
          onChange={(event) => setStreetAddress(event.target.value)}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-zinc-300">
          Region
          <input
            name="region"
            required
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm text-zinc-300">
          Province
          <input
            name="province"
            required
            value={province}
            onChange={(event) => setProvince(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm text-zinc-300">
          City
          <input
            name="city"
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm text-zinc-300">
          Postal code
          <input
            name="postalCode"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm text-zinc-300">
          Country
          <input
            name="country"
            required
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Map preview</h2>
          <p className="mt-1 text-sm text-zinc-400">
            {selectedAddressPreview || selectedLabel || "Click the map to place your spot. City and region will fill automatically when available."}
          </p>
        </div>

        <LocationPickerSection
          latitude={latitude}
          longitude={longitude}
          label={name || streetAddress || "New spot"}
          onLatitudeChange={setLatitude}
          onLongitudeChange={setLongitude}
          onMapClick={({ latitude: nextLatitude, longitude: nextLongitude }) => {
            void reverseGeocode(nextLatitude, nextLongitude);
          }}
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
      >
        Publish spot
      </button>
    </form>
  );
}
