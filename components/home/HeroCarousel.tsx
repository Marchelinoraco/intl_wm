"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Carousel gambar hero: crossfade antar layer + Ken Burns pada layer aktif.
 * SSG merender semua layer; hanya layer 0 mulai `opacity-100`, jadi tanpa JS
 * gambar pertama tetap tampil. Auto-advance dimatikan saat prefers-reduced-motion.
 */
export default function HeroCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      6000,
    );
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="absolute inset-0 -z-10 bg-slate-950">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${
              i === index ? "motion-safe:animate-ken-burns" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
}
