import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";

export default function Footer({ locale }: { locale: Locale }) {
  const t = dict(locale);

  return (
    <footer className="mt-32 border-t border-line bg-surface-2">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <p className="text-xl font-black uppercase tracking-tighter text-ink">
          manado<span className="text-accent">.tours</span>
        </p>
        <p className="mt-2 text-sm font-medium text-ink-2">{t.tagline}</p>

        {/* Tautan balik ke situs induk: memperkuat kedua domain di mata Google
            dan menegaskan ini perusahaan yang sama, bukan pihak lain. */}
        <a
          href="https://welcomemanado.com"
          className="mt-6 inline-block text-[11px] font-black uppercase tracking-widest text-ink-3 transition-colors hover:text-accent"
        >
          {t.partOf} →
        </a>
      </div>
    </footer>
  );
}
