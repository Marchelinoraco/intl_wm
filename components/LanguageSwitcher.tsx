"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALE_LABELS, type Locale } from "@/lib/locales";

/**
 * Dropdown pemilih bahasa. Menautkan ke halaman PADANANNYA di bahasa lain —
 * menukar segmen locale, mempertahankan sisa path. `availableIn` = bahasa yang
 * halaman ini benar-benar dibangun; bahasa lain tidak muncul supaya pengunjung
 * tak diarahkan ke halaman yang tidak ada.
 */
export default function LanguageSwitcher({
  current,
  availableIn,
  onDark = false,
  align = "right",
}: {
  current: Locale;
  availableIn: Locale[];
  onDark?: boolean;
  /**
   * Sisi tombol tempat panel disandarkan. Di header desktop tombolnya menempel
   * kanan, jadi `right` benar. Di menu mobile tombolnya di pojok KIRI panel —
   * disandarkan ke kanan, panel melebar ke kiri dan terpotong keluar layar.
   */
  align?: "left" | "right";
}) {
  const pathname = usePathname() || `/${current}/`;
  const rest = pathname.split("/").slice(2).join("/");

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-black uppercase tracking-widest transition-colors ${
          onDark
            ? "text-white hover:bg-white/10"
            : "text-ink-2 hover:bg-surface-2 hover:text-ink"
        }`}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
        {current}
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          /* `max-h` + gulir: delapan bahasa lebih tinggi dari layar HP kecil
             saat menu mobile sudah memakai ruang di atasnya. */
          className={`absolute z-50 mt-2 max-h-[min(20rem,55vh)] min-w-[10rem] animate-menu-in overflow-y-auto overflow-x-hidden rounded-xl border border-line bg-surface p-1 shadow-xl shadow-slate-900/10 dark:shadow-black/50 ${
            align === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right"
          }`}
        >
          {availableIn.map((locale) => {
            const active = locale === current;
            return (
              <Link
                key={locale}
                href={`/${locale}/${rest}`}
                hrefLang={locale}
                role="menuitem"
                aria-current={active ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                  active
                    ? "bg-accent text-white"
                    : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                }`}
              >
                {LOCALE_LABELS[locale]}
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                  {locale}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
