import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { getAvailability, publishedLocales } from "@/lib/availability";
import HeaderShell from "./HeaderShell";

/**
 * Server: hitung menu (bergerbang per bahasa lewat Availability) + daftar
 * bahasa terbit, lalu serahkan ke <HeaderShell> (client) yang menangani
 * bentuk pill, status transparan/solid, dan menu mobile.
 */
export default async function Header({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const a = (await getAvailability())[locale];
  const published = await publishedLocales();

  // Tours & Contact selalu ada di setiap bahasa terbit. Sisanya menyusul
  // ketika jenis kontennya diterjemahkan — muncul sendiri, tanpa kode baru.
  const nav = [
    { href: `/${locale}/tours/`, label: t.allTours, show: true },
    { href: `/${locale}/hotels/`, label: t.navHotels, show: a.hotels },
    { href: `/${locale}/gallery/`, label: t.navGallery, show: a.gallery },
    { href: `/${locale}/blog/`, label: t.navBlog, show: a.blog },
    { href: `/${locale}/about/`, label: t.navAbout, show: a.about },
    { href: `/${locale}/contact/`, label: t.navContact, show: true },
  ]
    .filter((i) => i.show)
    .map(({ href, label }) => ({ href, label }));

  return <HeaderShell locale={locale} nav={nav} published={published} />;
}
