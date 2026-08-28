import type { Metadata } from "next";
import TourCard from "@/components/TourCard";
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
      <div className="mb-12 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{t.allTours}</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour.slug} tour={tour} locale={locale} />
        ))}
      </div>
    </section>
  );
}
