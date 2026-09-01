import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { chatHref, chatLabelKey } from "@/lib/contact";

export default function Hero({
  locale,
  images,
}: {
  locale: Locale;
  images: string[];
}) {
  const t = dict(locale);

  return (
    <section className="relative -mt-20 flex min-h-[100svh] items-center overflow-hidden bg-slate-950 lg:-mt-24">
      {images.length > 0 && <HeroCarousel images={images} />}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px] motion-safe:animate-float" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px] motion-safe:animate-float [animation-delay:3s]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl animate-reveal-up px-6 py-28 text-center">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
            {t.heroBadge}
          </span>
        </p>

        <h1 className="mt-8 text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-6xl lg:text-7xl">
          {t.heroTitle}
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base font-medium leading-relaxed text-white/80 md:text-xl">
          {t.heroSubtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}/tours/`}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-9 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-red-600/25 transition-transform hover:scale-105"
          >
            {t.exploreTours}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={chatHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/25 bg-white/10 px-9 py-4 text-[11px] font-black uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white hover:text-slate-900"
          >
            {t[chatLabelKey(locale)]}
          </a>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-float"
        aria-hidden="true"
      >
        <svg
          className="h-6 w-6 text-white/70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
