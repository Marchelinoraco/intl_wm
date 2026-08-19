import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { dict } from "@/lib/dictionary";
import { HREFLANG, PUBLISHED_LOCALES, SITE_URL, type Locale } from "@/lib/locales";
import { getTour, getTours } from "@/lib/sample-data";

/**
 * Satu halaman statis per (bahasa × paket) — tapi HANYA untuk paket yang
 * memang punya terjemahan di bahasa itu. Paket yang belum diterjemahkan tidak
 * menghasilkan halaman sama sekali, bukan halaman berbahasa campur.
 */
export function generateStaticParams() {
  return PUBLISHED_LOCALES.flatMap((locale) =>
    getTours(locale).map((tour) => ({ locale, slug: tour.slug }))
  );
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Metadata {
  const tour = getTour(params.locale, params.slug);
  if (!tour) return {};

  // Padanan lintas bahasa ditentukan slug yang sama, dan hanya dicantumkan
  // bila paketnya memang terbit di bahasa itu.
  const languages: Record<string, string> = {};
  for (const l of PUBLISHED_LOCALES) {
    if (getTour(l, params.slug)) {
      languages[HREFLANG[l]] = `${SITE_URL}/${l}/tours/${params.slug}/`;
    }
  }

  return {
    title: tour.title,
    description: tour.description.slice(0, 160),
    alternates: {
      canonical: `${SITE_URL}/${params.locale}/tours/${params.slug}/`,
      languages,
    },
    openGraph: {
      title: tour.title,
      description: tour.description.slice(0, 160),
      images: [tour.cover_image],
      type: "article",
    },
  };
}

function Bullets({ text }: { text: string }) {
  return (
    <ul className="space-y-2">
      {text.split("\n").filter(Boolean).map((line) => (
        <li key={line} className="text-sm font-medium leading-relaxed text-slate-600">
          {line}
        </li>
      ))}
    </ul>
  );
}

export default function TourDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const tour = getTour(params.locale, params.slug);
  if (!tour) notFound();

  const t = dict(params.locale);
  const duration =
    tour.duration_nights > 0
      ? `${tour.duration_days} ${t.days} / ${tour.duration_nights} ${t.nights}`
      : `${tour.duration_days} ${t.days}`;

  return (
    <article>
      <header className="relative flex min-h-[62vh] items-end overflow-hidden">
        <Image src={tour.cover_image} alt={tour.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-xl bg-red-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              {tour.category.name}
            </span>
            <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
              {duration}
            </span>
          </div>
          <h1 className="mt-7 max-w-4xl text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-5xl lg:text-6xl">
            {tour.title}
          </h1>
          <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-white/70">
            {tour.location}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-12 lg:px-10">
        <div className="space-y-20 lg:col-span-8">
          <section>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-1 w-12 rounded-full bg-red-600" />
              <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                {t.experienceDetails}
              </h2>
            </div>
            <p className="text-lg font-medium leading-[1.8] text-slate-600">{tour.description}</p>
          </section>

          <section>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-1 w-12 rounded-full bg-red-600" />
              <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                {t.plannedItinerary}
              </h2>
            </div>

            <ol className="space-y-6">
              {tour.itineraries.map((day) => (
                <li key={day.day_number} className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
                  <div className="flex items-baseline gap-4">
                    <span className="rounded-xl bg-slate-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
                      {t.days} {day.day_number}
                    </span>
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      {day.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">
                    {day.description}
                  </p>
                  {(day.hotel_info || day.meals_info) && (
                    <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                      {[day.hotel_info, day.meals_info].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-8">
              <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-emerald-800">
                {t.inclusions}
              </h2>
              <Bullets text={tour.inclusions} />
            </div>
            <div className="rounded-[2rem] border border-red-100 bg-red-50 p-8">
              <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-red-800">
                {t.exclusions}
              </h2>
              <Bullets text={tour.exclusions} />
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-900/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {t.from}
            </p>
            <p className="mt-1 text-4xl font-black tracking-tighter text-slate-900">
              {tour.price_usd ? `$${tour.price_usd}` : "—"}
            </p>
            <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-red-600">
              {t.bestPrice}
            </p>

            {/* Kanal mengikuti bahasa: turis Korea tidak memakai WhatsApp. */}
            <a
              href="#"
              className="mt-8 block rounded-xl bg-red-600 px-6 py-4 text-center text-[11px] font-black uppercase tracking-widest text-white transition-transform hover:scale-105"
            >
              {params.locale === "ko"
                ? t.askOnKakao
                : params.locale === "zh"
                  ? t.askOnWechat
                  : t.askOnWhatsapp}
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
