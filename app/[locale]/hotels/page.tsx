import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getHotels } from "@/lib/api";
import { excerptFromHtml, prettifyCategory } from "@/lib/format";
import { pageAlternates } from "@/lib/seo";

export async function generateStaticParams() {
  return (await localesWith("hotels")).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = dict(params.locale);
  return {
    title: t.hotelsHeading,
    description: t.hotelsLede,
    alternates: pageAlternates(params.locale, "hotels/", await localesWith("hotels")),
  };
}

export default async function HotelsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const hotels = await getHotels(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-4 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{t.hotelsHeading}</h1>
      </div>
      <p className="mb-12 max-w-2xl text-base font-medium leading-relaxed text-slate-500">{t.hotelsLede}</p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <Link
            key={hotel.slug}
            href={`/${locale}/hotels/${hotel.slug}/`}
            className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              {hotel.primary_image && (
                <Image
                  src={hotel.primary_image}
                  alt={hotel.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                {prettifyCategory(hotel.category)}
                {hotel.stars > 0 && ` · ${"★".repeat(hotel.stars)}`}
              </p>
              <h2 className="mt-3 text-xl font-black uppercase leading-tight tracking-tighter text-slate-900">
                {hotel.name}
              </h2>
              <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-slate-400">{hotel.location}</p>
              {hotel.description && (
                <p className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-slate-500">
                  {excerptFromHtml(hotel.description)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
