import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { getAvailability } from "@/lib/availability";
import { chatHref, chatLabelKey } from "@/lib/contact";

export default async function Footer({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const a = (await getAvailability())[locale];

  const nav = [
    { href: `/${locale}/tours/`, label: t.allTours, show: true },
    { href: `/${locale}/hotels/`, label: t.navHotels, show: a.hotels },
    { href: `/${locale}/gallery/`, label: t.navGallery, show: a.gallery },
    { href: `/${locale}/blog/`, label: t.navBlog, show: a.blog },
    { href: `/${locale}/about/`, label: t.navAbout, show: a.about },
    { href: `/${locale}/contact/`, label: t.navContact, show: true },
  ].filter((i) => i.show);

  return (
    <footer className="mt-32 border-t border-line bg-surface-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.6fr_1fr_1fr] lg:px-10">
        <div>
          <p className="text-xl font-black uppercase tracking-tighter text-ink">
            manado<span className="text-accent">.tours</span>
          </p>
          <p className="mt-3 max-w-xs text-sm font-medium text-ink-2">{t.tagline}</p>
          {/* Tautan balik ke situs induk: memperkuat kedua domain di mata Google, menegaskan ini perusahaan yang sama. Sengaja buka di tab yang sama. */}
          <a
            href="https://welcomemanado.com"
            className="mt-6 inline-block text-[11px] font-black uppercase tracking-widest text-ink-3 transition-colors hover:text-accent"
          >
            {t.partOf} →
          </a>
        </div>

        <nav className="flex flex-col gap-3">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:text-accent"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <a
            href={chatHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:text-accent"
          >
            {t[chatLabelKey(locale)]} →
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-6 py-6 text-[11px] font-black uppercase tracking-widest text-ink-3 lg:px-10">
          © {new Date().getFullYear()} Welcome Manado
        </p>
      </div>
    </footer>
  );
}
