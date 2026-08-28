import type { Metadata } from "next";
import Image from "next/image";
import RichText from "@/components/RichText";
import JsonLd from "@/components/JsonLd";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { dict } from "@/lib/dictionary";
import { HREFLANG, SITE_URL, type Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getHotel, getHotels } from "@/lib/api";
import { prettifyCategory } from "@/lib/format";

export async function generateStaticParams() {
  const locales = await localesWith("hotels");
  const lists = await Promise.all(locales.map((locale) => getHotels(locale)));
  return locales.flatMap((locale, i) => lists[i].map((h) => ({ locale, slug: h.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const hotel = await getHotel(params.locale, params.slug);
  if (!hotel) return {};
  const description = (hotel.description ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  const locales = await localesWith("hotels");
  const present = await Promise.all(locales.map((l) => getHotel(l, params.slug)));
  const languages: Record<string, string> = {};
  locales.forEach((l, i) => {
    if (present[i]) languages[HREFLANG[l]] = `${SITE_URL}/${l}/hotels/${params.slug}/`;
  });
  return {
    title: hotel.name,
    description,
    alternates: { canonical: `${SITE_URL}/${params.locale}/hotels/${params.slug}/`, languages },
    openGraph: { title: hotel.name, images: hotel.primary_image ? [hotel.primary_image] : [], type: "website" },
  };
}

export default async function HotelDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const hotel = await getHotel(params.locale, params.slug);
  // Slug berasal dari getHotels(locale) sendiri — null di sini berarti daftar &
  // detail tidak konsisten. Build harus gagal, bukan diam-diam menampilkan 404.
  if (!hotel) {
    throw new Error(`Inkonsistensi data: /hotels/${params.slug} 404 di ${params.locale} padahal ada di daftar`);
  }

  const t = dict(params.locale);
  const locales = await localesWith("hotels");
  const present = await Promise.all(locales.map((l) => getHotel(l, params.slug)));
  const availableIn = locales.filter((_, i) => present[i]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: hotel.name,
    address: hotel.location,
    // ratingValue: 0 tidak sah di schema.org — hanya sertakan bila ada bintang.
    ...(hotel.stars > 0 ? { starRating: { "@type": "Rating", ratingValue: hotel.stars } } : {}),
    ...(hotel.primary_image ? { image: hotel.primary_image } : {}),
  };

  return (
    <article>
      <JsonLd data={jsonLd} />

      <header className="relative flex min-h-[52vh] items-end overflow-hidden bg-slate-900">
        {hotel.primary_image && (
          <Image src={hotel.primary_image} alt={hotel.name} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <span className="rounded-xl bg-red-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            {prettifyCategory(hotel.category)}
            {hotel.stars > 0 && ` · ${"★".repeat(hotel.stars)}`}
          </span>
          <h1 className="mt-6 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-5xl">
            {hotel.name}
          </h1>
          <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-white/70">{hotel.location}</p>
          <div className="mt-6">
            <LanguageSwitcher current={params.locale} availableIn={availableIn} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-8">
          {hotel.description && (
            <RichText html={hotel.description} className="text-lg font-medium leading-[1.8] text-slate-600" />
          )}
          {hotel.images.length > 0 && (
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {hotel.images.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <Image src={src} alt={hotel.name} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          {hotel.facilities.length > 0 && (
            <div className="sticky top-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-900/5">
              <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-slate-900">{t.facilities}</h2>
              <ul className="space-y-2">
                {hotel.facilities.map((f) => (
                  <li key={f} className="text-sm font-medium leading-relaxed text-slate-600">{f}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
