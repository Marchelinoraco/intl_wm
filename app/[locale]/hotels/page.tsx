import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { dict } from "@/lib/dictionary";
import { PUBLISHED_LOCALES, type Locale } from "@/lib/locales";
import { getHotels } from "@/lib/sample-hotels";

export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = dict(params.locale);
  return { title: t.hotelsHeading, description: t.hotelsLede };
}

export default function HotelsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const hotels = getHotels(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-4 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
          {t.hotelsHeading}
        </h1>
      </div>
      <p className="mb-12 max-w-2xl text-base font-medium leading-relaxed text-slate-500">
        {t.hotelsLede}
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <Link
            key={hotel.slug}
            href={`/${locale}/hotels/${hotel.slug}/`}
            className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <Image
                src={hotel.primary_image}
                alt={hotel.name}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                {hotel.category} · {"★".repeat(hotel.stars)}
              </p>
              <h2 className="mt-3 text-xl font-black uppercase leading-tight tracking-tighter text-slate-900">
                {hotel.name}
              </h2>
              <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
                {hotel.location}
              </p>
              <p className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-slate-500">
                {hotel.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
