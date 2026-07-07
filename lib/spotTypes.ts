export const SPOT_TYPES = [
  { value: "beach", label: "Beach" },
  { value: "park", label: "Park" },
  { value: "forest", label: "Forest / woodland" },
  { value: "nature_trail", label: "Nature trail" },
  { value: "lake_river", label: "Lake / river" },
  { value: "public_restroom", label: "Public restroom" },
  { value: "rest_area", label: "Rest area / service station" },
  { value: "parking", label: "Parking lot" },
  { value: "sauna", label: "Sauna / bathhouse" },
  { value: "cruising_club", label: "Cruising club / bar" },
  { value: "gym", label: "Gym / locker room" },
  { value: "adult_cinema", label: "Adult cinema" },
  { value: "shopping_center", label: "Shopping center" },
  { value: "other", label: "Other" },
] as const;

export type SpotType = (typeof SPOT_TYPES)[number]["value"];

export const DEFAULT_SPOT_TYPE: SpotType = "other";

const LABELS = new Map<string, string>(SPOT_TYPES.map((type) => [type.value, type.label]));

export function isSpotType(value: string): value is SpotType {
  return LABELS.has(value);
}

export function spotTypeLabel(value: string | null | undefined): string {
  if (!value) return spotTypeLabel(DEFAULT_SPOT_TYPE);
  return LABELS.get(value) ?? "Other";
}
