import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import SpotMapSection from "@/app/components/map/SpotMapSection";
import ReviewForm from "@/app/components/reviews/ReviewForm";
import ReviewList from "@/app/components/reviews/ReviewList";
import { createClient } from "@/lib/supabase/server";
import { getReviewsForSpot, getUserReviewForSpot } from "@/lib/reviews";
import { formatRating, formatSpotAddress, getSiteUrl, spotBreadcrumbJsonLd, spotJsonLd, buildPageMetadata } from "@/lib/seo";
import { spotTypeLabel } from "@/lib/spotTypes";
import { getSpotBySlug } from "@/lib/spots";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; error?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const spot = await getSpotBySlug(slug);
    if (!spot) return { title: "Spot not found" };

    const title = `${spot.name} — ${spot.city}, ${spot.country}`;
    const description = `${spot.description.slice(0, 155)}${spot.description.length > 155 ? "…" : ""}`;

    return {
      title,
      ...buildPageMetadata({
        title,
        description,
        path: `/spots/${spot.slug}`,
      }),
    };
  } catch {
    return { title: "Spot" };
  }
}

export default async function SpotDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const page = Number(query.page ?? "1");

  let spot = null;
  try {
    spot = await getSpotBySlug(slug);
  } catch {
    notFound();
  }

  if (!spot) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const reviewsResult = await getReviewsForSpot(spot.id, Number.isNaN(page) ? 1 : page);
  const existingReview = user ? await getUserReviewForSpot(spot.id, user.id) : null;
  const siteUrl = getSiteUrl();

  return (
    <div className="relative overflow-hidden">
      <RainbowMeshBackground variant="spots" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(spotJsonLd(spot, siteUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(spotBreadcrumbJsonLd(spot, siteUrl)),
        }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-zinc-400">
        <Link href="/spots" className="hover:text-white">
          Spots
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-zinc-300">{spot.name}</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          {spotTypeLabel(spot.spot_type)}
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">{spot.name}</h1>
        <p className="mt-2 text-emerald-400">{formatRating(spot.rating_avg, spot.rating_count)}</p>
        <p className="mt-2 text-zinc-400">{formatSpotAddress(spot)}</p>
        <p className="mt-6 text-base leading-relaxed text-zinc-300">{spot.description}</p>
      </header>

      <section aria-label="Location map" className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-white">Location</h2>
        <SpotMapSection
          spots={[spot]}
          selectedSlug={spot.slug}
          center={{ latitude: spot.latitude, longitude: spot.longitude }}
          zoom={13}
        />
        <p className="mt-2 text-sm text-zinc-500">
          Coordinates: {spot.latitude.toFixed(5)}, {spot.longitude.toFixed(5)}
        </p>
      </section>

      <section aria-label="Reviews" className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h2 className="text-2xl font-semibold text-white">Reviews</h2>
          {query.error ? (
            <p className="mt-3 rounded-lg border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-300">
              {query.error}
            </p>
          ) : null}
          <div className="mt-4">
            <ReviewList reviews={reviewsResult.reviews} />
          </div>

          {reviewsResult.totalPages > 1 ? (
            <nav aria-label="Review pagination" className="mt-6 flex items-center gap-4">
              {reviewsResult.page > 1 ? (
                <Link
                  href={`/spots/${spot.slug}?page=${reviewsResult.page - 1}`}
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  Previous reviews
                </Link>
              ) : null}
              <span className="text-sm text-zinc-400">
                Page {reviewsResult.page} of {reviewsResult.totalPages}
              </span>
              {reviewsResult.page < reviewsResult.totalPages ? (
                <Link
                  href={`/spots/${spot.slug}?page=${reviewsResult.page + 1}`}
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  More reviews
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>

        <ReviewForm
          spotId={spot.id}
          spotSlug={spot.slug}
          existingReview={existingReview}
          isAuthenticated={Boolean(user)}
        />
      </section>
      </div>
    </div>
  );
}
