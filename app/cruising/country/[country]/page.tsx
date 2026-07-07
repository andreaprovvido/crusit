import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SpotCollectionView from "@/app/components/spots/SpotCollectionView";
import { COUNTRIES } from "@/lib/countries";
import { getSpots } from "@/lib/spots";
import {
  breadcrumbJsonLd,
  buildCountryMetadata,
  getSiteUrl,
  slugify,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ page?: string }>;
};

function resolveCountry(slug: string): string | null {
  return COUNTRIES.find((country) => slugify(country) === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: slug } = await params;
  const country = resolveCountry(slug);
  if (!country) {
    return { title: "Country not found", robots: { index: false, follow: false } };
  }

  try {
    const { total } = await getSpots({ country });
    if (total === 0) {
      return { title: country, robots: { index: false, follow: false } };
    }
    return buildCountryMetadata({
      country,
      spotCount: total,
      path: `/cruising/country/${slug}`,
    });
  } catch {
    return buildCountryMetadata({ country, path: `/cruising/country/${slug}` });
  }
}

export default async function CountryPage({ params, searchParams }: PageProps) {
  const { country: slug } = await params;
  const { page } = await searchParams;
  const country = resolveCountry(slug);
  if (!country) notFound();

  const pageNumber = Number(page ?? "1");
  const { spots, total, totalPages, page: currentPage } = await getSpots({
    country,
    page: Number.isNaN(pageNumber) ? 1 : pageNumber,
  });

  if (total === 0) notFound();

  const siteUrl = getSiteUrl();
  const basePath = `/cruising/country/${slug}`;

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
                { name: country, path: basePath },
              ],
              siteUrl,
            ),
          ),
        }}
      />
      <SpotCollectionView
        eyebrow="Country guide"
        title={`Cruising in ${country}`}
        description={`Discover ${total} community-reviewed gay cruising spot${total === 1 ? "" : "s"} across ${country}. Explore the map, read reviews, and find your next spot.`}
        spots={spots}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        pageHref={(p) => (p === 1 ? basePath : `${basePath}?page=${p}`)}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Explore", href: "/spots" },
          { name: country, href: basePath },
        ]}
      />
    </>
  );
}
