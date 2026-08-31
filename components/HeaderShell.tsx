"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Membungkus isi header. Di beranda ({locale} atau {locale}/) dan sebelum
 * pengguna scroll, header transparan di atas hero gelap; setelah scroll —
 * atau di halaman lain — kembali solid (surface + blur).
 */
export default function HeaderShell({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const transparent = onHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-transparent={transparent || undefined}
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-surface/80 backdrop-blur-md"
      }`}
    >
      {children}
    </header>
  );
}
