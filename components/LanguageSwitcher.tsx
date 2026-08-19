"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_LABELS, PUBLISHED_LOCALES, type Locale } from "@/lib/locales";

/**
 * Menautkan ke halaman PADANANNYA di bahasa lain, bukan ke beranda — menukar
 * segmen locale dan mempertahankan sisa path. Hanya bahasa yang sudah terbit
 * yang muncul, sehingga pengunjung tidak pernah diarahkan ke halaman kosong.
 */
export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}/`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-1">
      {PUBLISHED_LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}/${rest}`}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-white"
                : "rounded-lg px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            }
          >
            {LOCALE_LABELS[locale]}
          </Link>
        );
      })}
    </div>
  );
}
