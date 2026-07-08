import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SpotCollectionView from "@/app/components/spots/SpotCollectionView";
import { SPOT_TYPES, spotTypeLabel } from "@/lib/spotTypes";
import { getSpots, getSpotsForMap } from "@/lib/spots";
import {
  breadcrumbJsonLd,
  buildCategoryMetadata,
  getSiteUrl,
  slugify,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ page?: string }>;
};

function resolveType(slug: string): string | null {
  const match = SPOT_TYPES.find((type) => slugify(type.value) === slug);
  return match?.value ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type: slug } = await params;
  const value = resolveType(slug);
  if (!value) {
    return { title: "Category not found", robots: { index: false, follow: false } };
  }

  return buildCategoryMetadata({
    categoryValue: value,
    path: `/cruising/type/${slug}`,
  });
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { type: slug } = await params;
  const { page } = await searchParams;

  const value = resolveType(slug);
  if (!value) notFound();

  const label = spotTypeLabel(value);
  const pageNumber = Number(page ?? "1");
  const [{ spots, total, totalPages, page: currentPage }, mapSpots] =
    await Promise.all([
      getSpots({
        spotType: value,
        page: Number.isNaN(pageNumber) ? 1 : pageNumber,
      }),
      getSpotsForMap({ spotType: value }),
    ]);

  if (total === 0) notFound();

  const siteUrl = getSiteUrl();
  const basePath = `/cruising/type/${slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(
              [
                { name: "Home", path: "/" },
                { name: "Explore", path: "/spots" },
                { name: `${label} spots`, path: basePath },
              ],
              siteUrl,
            ),
          ),
        }}
      />
      <SpotCollectionView
        eyebrow="Category"
        title={`${label} Cruising Spots`}
        description={`Explore ${total} ${label.toLowerCase()} gay cruising spot${total === 1 ? "" : "s"} worldwide. Browse the map, read reviews, and discover new locations.`}
        spots={spots}
        mapSpots={mapSpots}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        pageHref={(p) => (p === 1 ? basePath : `${basePath}?page=${p}`)}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Explore", href: "/spots" },
          { name: `${label} spots`, href: basePath },
        ]}
      />
    </>
  );
}
