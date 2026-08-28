import type { Metadata } from "next";
import Image from "next/image";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getGallery } from "@/lib/api";
import { pageAlternates } from "@/lib/seo";

export async function generateStaticParams() {
  return (await localesWith("gallery")).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return {
    title: dict(params.locale).galleryHeading,
    alternates: pageAlternates(params.locale, "gallery/", await localesWith("gallery")),
  };
}

export default async function GalleryPage({ params }: { params: { locale: Locale } }) {
  const t = dict(params.locale);
  // Entri video (image_path null) disaring — halaman ini hanya merender gambar.
  const items = (await getGallery(params.locale)).filter((i) => i.image_path);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-12 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{t.galleryHeading}</h1>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure key={item.id} className="group overflow-hidden rounded-[1.5rem] bg-slate-100">
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image_path as string}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {item.title && (
              <figcaption className="bg-white px-5 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 line-clamp-2">
                {item.title}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
