import { spotTypeLabel } from "@/lib/spotTypes";
import { getSpotBySlug } from "@/lib/spots";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Gay cruising spot on Crusit";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const spot = await getSpotBySlug(slug);
    if (spot) {
      return renderOgImage({
        eyebrow: `${spotTypeLabel(spot.spot_type)} · Cruising spot`,
        title: spot.name,
        subtitle: [spot.city, spot.country].filter(Boolean).join(", "),
      });
    }
  } catch {
    // Fall through to the generic branded image below.
  }

  return renderOgImage({
    eyebrow: "Cruising spot",
    title: "Discover gay cruising spots worldwide",
    subtitle: "Maps, ratings, and reviews from the Crusit community.",
  });
}
