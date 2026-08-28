import type { Metadata } from "next";
import { DEFAULT_LOCALE, HREFLANG, SITE_URL, type Locale } from "./locales";

/**
 * `alternates` (canonical + hreflang) untuk satu halaman yang ada di banyak
 * bahasa. TANPA ini, halaman daftar (tours/, hotels/, dst.) mewarisi
 * `alternates` dari root layout — yang canonical-nya `/{locale}/` — sehingga
 * halaman menyatakan dirinya duplikat beranda dan Google membuangnya dari indeks.
 *
 * @param locale  bahasa halaman ini
 * @param path    segmen setelah locale, diakhiri "/", mis. "tours/" (atau "" untuk beranda)
 * @param locales bahasa yang halaman ini BENAR-BENAR dibangun (publishedLocales()
 *                atau localesWith(section)) — hreflang hanya menunjuk ke situ.
 */
export function pageAlternates(
  locale: Locale,
  path: string,
  locales: Locale[],
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[HREFLANG[l]] = `${SITE_URL}/${l}/${path}`;
  if (locales.includes(DEFAULT_LOCALE)) {
    languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}/${path}`;
  }
  return { canonical: `${SITE_URL}/${locale}/${path}`, languages };
}
