import Image from "next/image";
import Link from "next/link";
import TourCard from "@/components/TourCard";
import { dict } from "@/lib/dictionary";
import { PUBLISHED_LOCALES, type Locale } from "@/lib/locales";
import { getTours } from "@/lib/sample-data";

export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((locale) => ({ locale }));
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const featured = getTours(locale).filter((tour) => tour.is_featured);

  return (
    <>
      <section className="relative flex min-h-[78vh] items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=70"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/45 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-red-400">
            {t.tagline}
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-6xl lg:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mt-7 max-w-2xl text-base font-medium leading-relaxed text-white/75 md:text-lg">
            {t.heroSubtitle}
          </p>
          <Link
            href={`/${locale}/tours/`}
            className="mt-10 inline-block rounded-xl bg-red-600 px-9 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-red-600/25 transition-transform hover:scale-105"
          >
            {t.exploreTours}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="h-1 w-12 rounded-full bg-red-600" />
          <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
            {t.allTours}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((tour) => (
            <TourCard key={tour.slug} tour={tour} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
