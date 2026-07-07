import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SpotCollectionView from "@/app/components/spots/SpotCollectionView";
import { getCityFacets, getSpotsByCity, type CityFacet } from "@/lib/spots";
import {
  breadcrumbJsonLd,
  buildCityMetadata,
  getSiteUrl,
  slugify,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ page?: string }>;
};

async function resolveCity(slug: string): Promise<CityFacet | null> {
  const facets = await getCityFacets();
  return facets.find((facet) => slugify(facet.city) === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;

  try {
    const facet = await resolveCity(slug);
    if (!facet) {
      return { title: "City not found", robots: { index: false, follow: false } };
    }
    return buildCityMetadata({
      city: facet.city,
      country: facet.country,
      spotCount: facet.count,
      path: `/cruising/city/${slug}`,
    });
  } catch {
    return { title: "City", robots: { index: false, follow: false } };
  }
}

export default async function CityPage({ params, searchParams }: PageProps) {
  const { city: slug } = await params;
  const { page } = await searchParams;

  const facet = await resolveCity(slug);
  if (!facet) notFound();

  const pageNumber = Number(page ?? "1");
  const { spots, total, totalPages, page: currentPage } = await getSpotsByCity({
    city: facet.city,
    country: facet.country,
    page: Number.isNaN(pageNumber) ? 1 : pageNumber,
  });

  if (total === 0) notFound();

  const siteUrl = getSiteUrl();
  const basePath = `/cruising/city/${slug}`;
  const where = facet.country ? `${facet.city}, ${facet.country}` : facet.city;

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
                ...(facet.country
                  ? [
                      {
                        name: facet.country,
                        path: `/cruising/country/${slugify(facet.country)}`,
                      },
                    ]
                  : []),
                { name: facet.city, path: basePath },
              ],
              siteUrl,
            ),
          ),
        }}
      />
      <SpotCollectionView
        eyebrow="City guide"
        title={`Cruising in ${facet.city}`}
        description={`Find the best gay cruising spots in ${where}. Browse ${total} community-reviewed location${total === 1 ? "" : "s"} with maps, ratings, and reviews.`}
        spots={spots}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        pageHref={(p) => (p === 1 ? basePath : `${basePath}?page=${p}`)}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Explore", href: "/spots" },
          ...(facet.country
            ? [
                {
                  name: facet.country,
                  href: `/cruising/country/${slugify(facet.country)}`,
                },
              ]
            : []),
          { name: facet.city, href: basePath },
        ]}
      />
    </>
  );
}
