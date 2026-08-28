"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Membungkus konten yang muncul lembut saat masuk viewport (fade + naik).
 * Tanpa JS / dengan `prefers-reduced-motion` konten tetap terlihat penuh —
 * CSS `.reveal` di-override oleh media query di globals.css.
 *
 * `delay` (ms) untuk efek berjenjang pada grid: <Reveal delay={i * 60}>.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={["reveal", shown && "reveal-show", className].filter(Boolean).join(" ")}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
