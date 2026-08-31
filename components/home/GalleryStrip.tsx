import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import type { GalleryItem } from "@/lib/api";

export default function GalleryStrip({
  locale,
  items,
}: {
  locale: Locale;
  items: (GalleryItem & { image_path: string })[];
}) {
  const t = dict(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <SectionHeading
        badge={t.galleryBadge}
        title={t.galleryHeading}
        action={{ href: `/${locale}/gallery/`, label: t.viewFullGallery }}
      />
      <div className="grid auto-rows-[170px] grid-cols-2 gap-4 md:auto-rows-[210px] md:grid-cols-4">
        {items.map((item, i) => (
          <Link
            key={item.id}
            href={`/${locale}/gallery/`}
            className={`group relative overflow-hidden rounded-[1.5rem] bg-surface-2 ${
              i === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <Image
              src={item.image_path}
              alt={item.title}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
            {item.title && (
              <p className="absolute inset-x-0 bottom-0 line-clamp-2 p-4 text-sm font-black leading-tight text-white">
                {item.title}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
