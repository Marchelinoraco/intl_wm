"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carousel foto paket tur: satu foto per tampilan, track scroll-snap (swipe di
 * layar sentuh), tombol panah, dan titik indikator. Tanpa autoplay — pengunjung
 * yang sedang membaca detail tak diganggu gerakan otomatis.
 */
export default function TourGallery({ images, title }: { images: string[]; title: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const target = Math.max(0, Math.min(images.length - 1, i));
    el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <div className="relative overflow-hidden rounded-[2rem] bg-surface-2">
        <div
          ref={track}
          onScroll={onScroll}
          className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          {images.map((src) => (
            <div
              key={src}
              className="relative aspect-[16/10] w-full shrink-0 snap-start md:aspect-[21/9]"
            >
              <Image
                src={src}
                alt={title}
                fill
                sizes="(min-width: 1024px) 80rem, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-lg backdrop-blur transition-colors hover:text-accent disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === images.length - 1}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-lg backdrop-blur transition-colors hover:text-accent disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === active || undefined}
                  className={`h-1.5 rounded-full bg-white shadow transition-all ${
                    i === active ? "w-6" : "w-1.5 opacity-50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
