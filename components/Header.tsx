import Link from "next/link";
import HeaderShell from "./HeaderShell";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { getAvailability, publishedLocales } from "@/lib/availability";

export default async function Header({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const availability = await getAvailability();
  const published = await publishedLocales();
  const a = availability[locale];

  // Tours & Contact selalu ada di setiap bahasa terbit. Sisanya menyusul
  // ketika jenis kontennya diterjemahkan — muncul sendiri, tanpa kode baru.
  const nav = [
    { href: `/${locale}/tours/`, label: t.allTours, show: true },
    { href: `/${locale}/hotels/`, label: t.navHotels, show: a.hotels },
    { href: `/${locale}/gallery/`, label: t.navGallery, show: a.gallery },
    { href: `/${locale}/blog/`, label: t.navBlog, show: a.blog },
    { href: `/${locale}/about/`, label: t.navAbout, show: a.about },
    { href: `/${locale}/contact/`, label: t.navContact, show: true },
  ].filter((i) => i.show);

  return (
    <HeaderShell locale={locale}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-6 py-4 lg:px-10">
        <Link href={`/${locale}/`} className="flex items-baseline gap-2">
          <span className="text-xl font-black uppercase tracking-tighter text-ink brand-mark">
            manado<span className="text-accent">.tours</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-controls flex items-center gap-1">
            <ThemeToggle />
            <LanguageSwitcher current={locale} availableIn={published} />
          </div>
        </div>
      </div>
    </HeaderShell>
  );
}
