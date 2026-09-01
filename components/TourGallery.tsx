"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carousel foto paket tur: 4 foto tampak sekaligus di layar lebar, bergeser
 * otomatis dari kanan ke kiri tiap beberapa detik dan kembali ke awal saat
 * sampai ujung. Jeda saat kursor di atasnya, saat disentuh, atau saat tombol
 * panah difokus. Mati total saat `prefers-reduced-motion` → jadi strip yang
 * bisa di-scroll manual.
 */
export default function TourGallery({ images, title }: { images: string[]; title: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const step = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const delta = first ? first.offsetWidth + 16 : el.clientWidth * 0.8;
    if (dir > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * delta, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (paused || images.length < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => step(1), 3200);
    return () => clearInterval(id);
  }, [paused, images.length]);

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <div
        ref={track}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
        {images.map((src) => (
          <div
            key={src}
            className="relative aspect-[4/3] w-[78%] shrink-0 snap-start overflow-hidden rounded-[1.5rem] bg-surface-2 sm:w-[46%] md:w-[31%] lg:w-[calc(25%-0.75rem)]"
          >
            <Image
              src={src}
              alt={title}
              fill
              sizes="(min-width: 1024px) 20rem, 80vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photos"
            className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-lg backdrop-blur transition-colors hover:text-accent md:flex lg:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photos"
            className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-lg backdrop-blur transition-colors hover:text-accent md:flex lg:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
