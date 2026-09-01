import type { Metadata } from "next";
import Image from "next/image";
import RichText from "@/components/RichText";
import JsonLd from "@/components/JsonLd";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { dict } from "@/lib/dictionary";
import { HREFLANG, SITE_URL, type Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { getTour, getTours } from "@/lib/api";
import { chatHref, chatLabelKey } from "@/lib/contact";

/** Satu halaman per (bahasa × paket) — hanya untuk paket yang ada di daftar bahasa itu. */
export async function generateStaticParams() {
  const locales = await publishedLocales();
  const lists = await Promise.all(locales.map((locale) => getTours(locale)));
  return locales.flatMap((locale, i) => lists[i].map((tour) => ({ locale, slug: tour.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const tour = await getTour(params.locale, params.slug);
  if (!tour) return {};

  const description = tour.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  const locales = await publishedLocales();
  const present = await Promise.all(locales.map((l) => getTour(l, params.slug)));
  const languages: Record<string, string> = {};
  locales.forEach((l, i) => {
    if (present[i]) languages[HREFLANG[l]] = `${SITE_URL}/${l}/tours/${params.slug}/`;
  });

  return {
    title: tour.title,
    description,
    alternates: { canonical: `${SITE_URL}/${params.locale}/tours/${params.slug}/`, languages },
    openGraph: {
      title: tour.title,
      description,
      images: tour.cover_image ? [tour.cover_image] : [],
      type: "article",
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const tour = await getTour(params.locale, params.slug);
  // Slug berasal dari getTours(locale) sendiri — null di sini berarti daftar &
  // detail tidak konsisten. Build harus gagal, bukan diam-diam menampilkan 404.
  if (!tour) {
    throw new Error(`Inkonsistensi data: /tours/${params.slug} 404 di ${params.locale} padahal ada di daftar`);
  }

  const t = dict(params.locale);
  const locales = await publishedLocales();
  const present = await Promise.all(locales.map((l) => getTour(l, params.slug)));
  const availableIn = locales.filter((_, i) => present[i]);

  const duration =
    tour.duration_nights > 0
      ? `${tour.duration_days} ${t.days} / ${tour.duration_nights} ${t.nights}`
      : `${tour.duration_days} ${t.days}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 300),
    ...(tour.cover_image ? { image: tour.cover_image } : {}),
    touristType: tour.category?.name,
    provider: { "@type": "TravelAgency", name: "Welcome Manado", url: SITE_URL },
    // Tidak ada Offer — API tidak mengembalikan harga untuk paket Manado.
  };

  const chatLabel = t[chatLabelKey(params.locale)];
  // Foto galeri paket, tanpa yang sudah tampil sebagai cover di hero.
  const gallery = tour.images.filter((src) => src !== tour.cover_image);

  return (
    <article>
      <JsonLd data={jsonLd} />

      <header className="relative flex min-h-[62vh] items-end overflow-hidden bg-slate-900">
        {tour.cover_image && (
          <Image src={tour.cover_image} alt={tour.title} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl animate-reveal-up px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="flex flex-wrap gap-3">
            {tour.category && (
              <span className="rounded-xl bg-accent px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                {tour.category.name}
              </span>
            )}
            <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
              {duration}
            </span>
          </div>
          <h1 className="mt-7 max-w-4xl text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-5xl lg:text-6xl">
            {tour.title}
          </h1>
          <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-white/70">{tour.location}</p>
          <div className="mt-6">
            <LanguageSwitcher current={params.locale} availableIn={availableIn} />
          </div>
        </div>
      </header>

      {gallery.length > 0 && (
        <div className="hide-scrollbar flex gap-3 overflow-x-auto px-6 py-8 lg:px-10">
          {gallery.map((src) => (
            <div
              key={src}
              className="relative aspect-[4/3] w-72 shrink-0 overflow-hidden rounded-[1.5rem] bg-surface-2 md:w-[26rem]"
            >
              <Image
                src={src}
                alt={tour.title}
                fill
                sizes="(min-width: 768px) 26rem, 18rem"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-12 lg:px-10">
        <div className="space-y-20 lg:col-span-8">
          <section>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-1 w-12 rounded-full bg-accent" />
              <h2 className="text-xl font-black uppercase tracking-tighter text-ink">
                {t.experienceDetails}
              </h2>
            </div>
            <RichText html={tour.description} className="text-lg font-medium leading-[1.8] text-ink-2" />
          </section>

          {tour.itineraries.length > 0 && (
            <section>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-1 w-12 rounded-full bg-accent" />
                <h2 className="text-xl font-black uppercase tracking-tighter text-ink">
                  {t.plannedItinerary}
                </h2>
              </div>
              <ol className="space-y-6">
                {tour.itineraries.map((day) => (
                  <li key={day.day_number} className="rounded-[2rem] border border-line bg-surface p-8 shadow-sm">
                    <div className="flex items-baseline gap-4">
                      <span className="rounded-xl bg-ink px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-canvas">
                        {t.days} {day.day_number}
                      </span>
                      {day.title && (
                        <h3 className="text-lg font-black uppercase tracking-tight text-ink">{day.title}</h3>
                      )}
                    </div>
                    {day.description && (
                      <RichText html={day.description} className="mt-4 text-sm font-medium leading-relaxed text-ink-2" />
                    )}
                    {(day.hotel_info || day.meals_info) && (
                      <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-ink-3">
                        {[day.hotel_info && `${t.accommodation}: ${day.hotel_info}`, day.meals_info].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {(tour.inclusions || tour.exclusions) && (
            <section className="grid gap-6 md:grid-cols-2">
              {tour.inclusions && (
                <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-8 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                  <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-300">{t.inclusions}</h2>
                  <RichText html={tour.inclusions} className="text-sm font-medium leading-relaxed text-emerald-900 dark:text-emerald-200" />
                </div>
              )}
              {tour.exclusions && (
                <div className="rounded-[2rem] border border-red-100 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/30">
                  <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-red-800 dark:text-red-300">{t.exclusions}</h2>
                  <RichText html={tour.exclusions} className="text-sm font-medium leading-relaxed text-red-900 dark:text-red-200" />
                </div>
              )}
            </section>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-[2rem] border border-line bg-surface p-8 shadow-xl shadow-slate-900/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-ink-3">{t.pricingInfo}</p>
            <p className="mt-2 text-xl font-black uppercase tracking-tight text-ink">{t.contactInquiry}</p>
            <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-accent">{t.bestPrice}</p>

            <a
              href={chatHref(params.locale, tour.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-xl bg-accent px-6 py-4 text-center text-[11px] font-black uppercase tracking-widest text-white transition-transform hover:scale-105"
            >
              {chatLabel}
            </a>

            {tour.itinerary_pdf_path && (
              <a
                href={tour.itinerary_pdf_path}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-xl border border-line px-6 py-3 text-center text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                PDF
              </a>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
