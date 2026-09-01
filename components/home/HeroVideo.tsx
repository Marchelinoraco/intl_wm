"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Latar hero video. Autoplay hanya bisa jika muted (kebijakan browser), jadi
 * mulai bisu + tombol 🔊 untuk menyalakan suara setelah klik. Saat
 * `prefers-reduced-motion` atau video gagal dimuat → tampilkan poster / foto
 * hero dari API sebagai gambar diam.
 */
export default function HeroVideo({
  src,
  poster,
  fallback,
}: {
  src: string;
  poster: string;
  fallback: string | null;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const [staticOnly, setStaticOnly] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setStaticOnly(true);
    }
  }, []);

  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) {
      v.volume = 1;
      void v.play();
    }
    setMuted(next);
  }

  if (staticOnly || failed) {
    const img = failed ? fallback ?? poster : poster;
    return (
      <div className="absolute inset-0 z-0 bg-slate-950">
        <Image src={img} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
    );
  }

  return (
    <>
      <div className="absolute inset-0 z-0 bg-slate-950">
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          preload="metadata"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        aria-pressed={!muted}
        className="absolute bottom-6 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 lg:right-8"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </>
  );
}
