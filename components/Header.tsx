import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
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
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-6 py-4 lg:px-10">
        <Link href={`/${locale}/`} className="flex items-baseline gap-2">
          <span className="text-xl font-black uppercase tracking-tighter text-slate-900">
            manado<span className="text-red-600">.tours</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] font-black uppercase tracking-widest text-slate-500 transition-colors hover:text-red-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher current={locale} availableIn={published} />
        </div>
      </div>
    </header>
  );
}
