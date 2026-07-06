export type Spot = {
  id: string;
  slug: string;
  name: string;
  description: string;
  street_address: string;
  city: string;
  province: string;
  region: string;
  postal_code: string;
  country: string;
  latitude: number;
  longitude: number;
  created_by: string | null;
  created_at: string;
  status: "published" | "hidden";
  rating_avg: number;
  rating_count: number;
};

export type Review = {
  id: string;
  spot_id: string;
  user_id: string;
  rating: number;
  body: string;
  created_at: string;
  updated_at: string;
  author_label: string;
};

export type SpotSearchParams = {
  q?: string;
  province?: string;
  region?: string;
  city?: string;
  country?: string;
  minRating?: number;
  bbox?: string;
  page?: number;
};
