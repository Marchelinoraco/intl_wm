import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";

export default function Header({ locale }: { locale: Locale }) {
  const t = dict(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href={`/${locale}/`} className="flex items-baseline gap-2">
          <span className="text-xl font-black uppercase tracking-tighter text-slate-900">
            manado<span className="text-red-600">.tours</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href={`/${locale}/tours/`}
            className="text-[11px] font-black uppercase tracking-widest text-slate-500 transition-colors hover:text-red-600"
          >
            {t.allTours}
          </Link>
          <LanguageSwitcher current={locale} />
        </nav>
      </div>
    </header>
  );
}
