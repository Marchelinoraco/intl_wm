import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { getTours, type TourList } from "@/lib/api";
import { pageAlternates } from "@/lib/seo";

export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = dict(params.locale);
  return {
    title: t.allTours,
    description: t.heroSubtitle,
    alternates: pageAlternates(params.locale, "tours/", await publishedLocales()),
  };
}

type Cat = { slug: string; name: string; tours: TourList[] };

/** Kelompokkan paket per kategori, urut dari yang paketnya terbanyak. */
function groupByCategory(tours: TourList[]): Cat[] {
  const map = new Map<string, Cat>();
  for (const tour of tours) {
    const c = tour.category;
    if (!c) continue;
    if (!map.has(c.slug)) map.set(c.slug, { slug: c.slug, name: c.name, tours: [] });
    map.get(c.slug)!.tours.push(tour);
  }
  return Array.from(map.values()).sort((a, b) => b.tours.length - a.tours.length);
}

export default async function ToursPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const cats = groupByCategory(await getTours(locale));

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
      <SectionHeading
        badge={t.tagline}
        title={t.allTours}
        lede={t.exploreByCategory}
        headingLevel={1}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {cats.map((c, i) => {
          const cover = c.tours.find((x) => x.cover_image)?.cover_image ?? null;
          return (
            <Reveal key={c.slug} delay={Math.min(i, 4) * 70} className="h-full">
              <Link
                href={`/${locale}/tours/category/${c.slug}/`}
                className="group relative flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-[2rem] border border-line bg-surface-2"
              >
                {cover && (
                  <Image
                    src={cover}
                    alt={c.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="relative p-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">
                    {c.tours.length} {t.toursInCategory}
                  </p>
                  <h2 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tighter text-white md:text-3xl">
                    {c.name}
                  </h2>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white">
                    {t.viewCategory}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
