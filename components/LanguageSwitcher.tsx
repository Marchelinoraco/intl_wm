"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_LABELS, type Locale } from "@/lib/locales";

/**
 * Menautkan ke halaman PADANANNYA di bahasa lain — menukar segmen locale,
 * mempertahankan sisa path. `availableIn` = bahasa yang halaman ini benar-benar
 * ada; bahasa di luar itu tidak ditampilkan supaya pengunjung tak pernah
 * diarahkan ke halaman yang tidak dibangun.
 */
export default function LanguageSwitcher({
  current,
  availableIn,
}: {
  current: Locale;
  availableIn: Locale[];
}) {
  const pathname = usePathname() || `/${current}/`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-1">
      {availableIn.map((locale) => {
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
