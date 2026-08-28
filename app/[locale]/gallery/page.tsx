import type { Metadata } from "next";
import Image from "next/image";
import { dict } from "@/lib/dictionary";
import { PUBLISHED_LOCALES, type Locale } from "@/lib/locales";
import { getGallery } from "@/lib/sample-content";

export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: dict(params.locale).galleryHeading };
}

export default function GalleryPage({ params }: { params: { locale: Locale } }) {
  const t = dict(params.locale);
  const items = getGallery(params.locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-12 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
          {t.galleryHeading}
        </h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure key={item.id} className="group overflow-hidden rounded-[1.5rem] bg-slate-100">
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image_path}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <figcaption className="bg-white px-5 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
              {item.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
