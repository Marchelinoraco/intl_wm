import { Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ReviewScroller from "./ReviewScroller";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { HOME_REVIEWS, GOOGLE_RATING } from "@/lib/home-reviews";

const GOOGLE_URL = "https://www.google.com/search?q=welcomemanado";
const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g297721-d34101092-Reviews-Welcome_Manado-Manado_North_Sulawesi_Sulawesi.html";

export default function Reviews({ locale }: { locale: Locale }) {
  const t = dict(locale);

  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading badge={t.reviewsBadge} title={t.reviewsHeading} />

        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-4 rounded-[1.5rem] border border-line bg-surface p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-baseline gap-0.5 text-3xl font-bold">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-4xl font-black text-ink">{GOOGLE_RATING.value}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-ink-3">
                ({GOOGLE_RATING.count} {t.reviewsRatings})
              </p>
            </div>
            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-xl border border-line px-6 py-3 text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              Google
            </a>
          </div>

          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-line bg-surface p-8 text-center transition-colors hover:border-[#00AA6C]"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-3">
              {t.reviewsBadge}
            </span>
            <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="15" fill="#00AA6C" />
              <circle cx="11" cy="16" r="4.6" fill="#fff" />
              <circle cx="21" cy="16" r="4.6" fill="#fff" />
              <circle cx="11" cy="16" r="1.9" fill="#1a1a1a" />
              <circle cx="21" cy="16" r="1.9" fill="#1a1a1a" />
            </svg>
            <span className="text-lg font-black uppercase tracking-tighter text-ink">
              Tripadvisor
            </span>
          </a>
        </div>

        <ReviewScroller
          reviews={HOME_REVIEWS}
          readMore={t.readMore}
          showLess={t.showLess}
        />
      </div>
    </section>
  );
}
