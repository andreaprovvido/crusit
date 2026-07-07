import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Crusit — Discover gay cruising spots worldwide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Community cruising map",
    title: "Discover gay cruising spots worldwide",
    subtitle: "Maps, ratings, and reviews from the Crusit community.",
  });
}
