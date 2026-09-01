import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TourCard from "@/components/TourCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { getTours, type TourList } from "@/lib/api";
import { pageAlternates } from "@/lib/seo";

/** Paket satu kategori + nama kategori dalam bahasa itu (null bila kategori kosong). */
async function categoryTours(
  locale: Locale,
  slug: string,
): Promise<{ tours: TourList[]; name: string | null }> {
  const tours = (await getTours(locale)).filter((x) => x.category?.slug === slug);
  return { tours, name: tours[0]?.category?.name ?? null };
}

export async function generateStaticParams() {
  const locales = await publishedLocales();
  const lists = await Promise.all(locales.map((l) => getTours(l)));
  const out: { locale: string; slug: string }[] = [];
  locales.forEach((locale, i) => {
    const slugs = new Set<string>();
    lists[i].forEach((tour) => {
      if (tour.category) slugs.add(tour.category.slug);
    });
    slugs.forEach((slug) => out.push({ locale, slug }));
  });
  return out;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const t = dict(params.locale);
  const { name } = await categoryTours(params.locale, params.slug);
  const locales = await publishedLocales();
  const present = await Promise.all(locales.map((l) => getTours(l)));
  const catLocales = locales.filter((_, i) =>
    present[i].some((x) => x.category?.slug === params.slug),
  );

  return {
    title: name ?? t.allTours,
    description: t.heroSubtitle,
    alternates: pageAlternates(params.locale, `tours/category/${params.slug}/`, catLocales),
  };
}

export default async function TourCategoryPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const t = dict(locale);
  const { tours, name } = await categoryTours(locale, slug);

  // Slug berasal dari generateStaticParams sendiri — kategori kosong di sini
  // berarti data tak konsisten. Build harus gagal, bukan diam-diam 404.
  if (!name) {
    throw new Error(
      `Kategori tur /tours/category/${slug} kosong di ${locale} padahal ada di generateStaticParams`,
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
      <Link
        href={`/${locale}/tours/`}
        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t.allTours}
      </Link>

      <div className="mt-6">
        <SectionHeading
          badge={`${tours.length} ${t.toursInCategory}`}
          title={name}
          headingLevel={1}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, i) => (
          <Reveal key={tour.slug} delay={Math.min(i, 5) * 60} className="h-full">
            <TourCard tour={tour} locale={locale} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
