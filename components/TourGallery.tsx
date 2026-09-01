"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/**
 * Carousel foto paket tur: ~3 foto besar tampak sekaligus, bergulir mulus dan
 * terus-menerus dari kanan ke kiri (marquee, loop mulus lewat track ganda).
 * Berhenti saat kursor di atasnya. Klik foto → lightbox modal (foto besar,
 * panah ‹ ›, tutup dengan tombol / klik latar / Esc). Mati saat
 * `prefers-reduced-motion` → jadi strip yang bisa di-scroll/geser manual.
 */
export default function TourGallery({ images, title }: { images: string[]; title: string }) {
  const [mounted, setMounted] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, images.length]);

  // Track digandakan agar transisi translateX(-50%) menyambung mulus.
  const loop = images.length > 1 ? [...images, ...images] : images;
  const duration = `${Math.max(images.length, 2) * 7}s`;

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden px-6 py-10 motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none] lg:px-10">
      <div
        className="flex w-max gap-4 motion-safe:animate-marquee motion-safe:hover:[animation-play-state:paused]"
        style={{ animationDuration: duration }}
      >
        {loop.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(i % images.length)}
            aria-label={`${title} — ${(i % images.length) + 1}/${images.length}`}
            className="group relative aspect-[3/2] w-[82vw] shrink-0 overflow-hidden rounded-[1.5rem] bg-surface-2 sm:w-[56vw] md:w-[42vw] lg:w-[30rem]"
          >
            <Image
              src={src}
              alt={title}
              fill
              sizes="(min-width: 1024px) 30rem, 82vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {mounted &&
        lightbox !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((i) => (i === null ? i : (i + 1) % images.length));
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div
              className="relative h-[82vh] w-[92vw] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox]}
                alt={title}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </div>

            {images.length > 1 && (
              <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] font-black uppercase tracking-widest text-white/70">
                {lightbox + 1} / {images.length}
              </p>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
