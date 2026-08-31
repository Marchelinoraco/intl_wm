import type { Metadata } from "next";
import TourCard from "@/components/TourCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { getTours } from "@/lib/api";
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

export default async function ToursPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const tours = await getTours(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading badge={t.tagline} title={t.allTours} headingLevel={1} />
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
