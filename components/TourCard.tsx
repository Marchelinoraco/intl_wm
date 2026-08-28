import Image from "next/image";
import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import type { TourList } from "@/lib/api";

/** Ambil teks polos singkat dari deskripsi HTML untuk ringkasan kartu. */
function excerptFromHtml(html: string, max = 140): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export default function TourCard({ tour, locale }: { tour: TourList; locale: Locale }) {
  const t = dict(locale);
  const duration =
    tour.duration_nights > 0
      ? `${tour.duration_days} ${t.days} / ${tour.duration_nights} ${t.nights}`
      : `${tour.duration_days} ${t.days}`;

  return (
    <Link
      href={`/${locale}/tours/${tour.slug}/`}
      className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
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
          <span className="absolute left-5 top-5 rounded-lg bg-red-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            {tour.featured_badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        {tour.category && (
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
            {tour.category.name}
          </p>
        )}
        <h3 className="mt-3 text-xl font-black uppercase leading-tight tracking-tighter text-slate-900">
          {tour.title}
        </h3>
        <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
          {duration} · {tour.location}
        </p>
        <p className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-slate-500">
          {excerptFromHtml(tour.description)}
        </p>

        <span className="mt-auto pt-7 text-[11px] font-black uppercase tracking-widest text-red-600">
          {t.viewDetails} →
        </span>
      </div>
    </Link>
  );
}
