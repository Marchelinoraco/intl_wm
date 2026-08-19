import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";

export default function Footer({ locale }: { locale: Locale }) {
  const t = dict(locale);

  return (
    <footer className="mt-32 border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <p className="text-xl font-black uppercase tracking-tighter text-slate-900">
          manado<span className="text-red-600">.tours</span>
        </p>
        <p className="mt-2 text-sm font-medium text-slate-500">{t.tagline}</p>

        {/* Tautan balik ke situs induk: memperkuat kedua domain di mata Google
            dan menegaskan ini perusahaan yang sama, bukan pihak lain. */}
        <a
          href="https://welcomemanado.com"
          className="mt-6 inline-block text-[11px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-red-600"
        >
          {t.partOf} →
        </a>
      </div>
    </footer>
  );
}
