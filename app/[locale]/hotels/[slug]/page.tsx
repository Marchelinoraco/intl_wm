import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { dict } from "@/lib/dictionary";
import { HREFLANG, PUBLISHED_LOCALES, SITE_URL, type Locale } from "@/lib/locales";
import { getHotel, getHotels } from "@/lib/sample-hotels";

export function generateStaticParams() {
  return PUBLISHED_LOCALES.flatMap((locale) =>
    getHotels(locale).map((hotel) => ({ locale, slug: hotel.slug }))
  );
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Metadata {
  const hotel = getHotel(params.locale, params.slug);
  if (!hotel) return {};

  const languages: Record<string, string> = {};
  for (const l of PUBLISHED_LOCALES) {
    if (getHotel(l, params.slug)) {
      languages[HREFLANG[l]] = `${SITE_URL}/${l}/hotels/${params.slug}/`;
    }
  }

  return {
    title: hotel.name,
    description: hotel.description?.slice(0, 160),
    alternates: {
      canonical: `${SITE_URL}/${params.locale}/hotels/${params.slug}/`,
      languages,
    },
    openGraph: { title: hotel.name, images: [hotel.primary_image], type: "website" },
  };
}

export default function HotelDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const hotel = getHotel(params.locale, params.slug);
  if (!hotel) notFound();

  const t = dict(params.locale);

  return (
    <article>
      <header className="relative flex min-h-[52vh] items-end overflow-hidden">
        <Image src={hotel.primary_image} alt={hotel.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <span className="rounded-xl bg-red-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            {hotel.category} · {"★".repeat(hotel.stars)}
          </span>
          <h1 className="mt-6 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-5xl">
            {hotel.name}
          </h1>
          <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-white/70">
            {hotel.location}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-8">
          <p className="text-lg font-medium leading-[1.8] text-slate-600">{hotel.description}</p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {hotel.images.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100">
                <Image src={src} alt={hotel.name} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-900/5">
            <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-slate-900">
              {t.facilities}
            </h2>
            <ul className="space-y-2">
              {hotel.facilities.split("\n").filter(Boolean).map((line) => (
                <li key={line} className="text-sm font-medium leading-relaxed text-slate-600">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
