import Image from "next/image";
import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import type { TourList } from "@/lib/api";
import { excerptFromHtml } from "@/lib/format";

export default function TourCard({ tour, locale }: { tour: TourList; locale: Locale }) {
  const t = dict(locale);
  const duration =
    tour.duration_nights > 0
      ? `${tour.duration_days} ${t.days} / ${tour.duration_nights} ${t.nights}`
      : `${tour.duration_days} ${t.days}`;

  return (
    <Link
      href={`/${locale}/tours/${tour.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        {tour.cover_image && (
          <Image
            src={tour.cover_image}
            alt={tour.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {tour.featured_badge && (
          <span className="absolute left-5 top-5 rounded-lg bg-accent px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            {tour.featured_badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        {tour.category && (
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">
            {tour.category.name}
          </p>
        )}
        <h3 className="mt-3 text-xl font-black uppercase leading-tight tracking-tighter text-ink">
          {tour.title}
        </h3>
        <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-ink-3">
          {duration} · {tour.location}
        </p>
        <p className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-ink-2">
          {excerptFromHtml(tour.description)}
        </p>

        <span className="mt-auto pt-7 text-[11px] font-black uppercase tracking-widest text-accent">
          {t.viewDetails} →
        </span>
      </div>
    </Link>
  );
}
