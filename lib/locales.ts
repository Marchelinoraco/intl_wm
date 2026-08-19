/**
 * Delapan bahasa sasaran manado.tours. Bahasa Indonesia sengaja tidak ada —
 * pasar itu dilayani welcomemanado.com dengan katalog yang berbeda.
 */
export const ALL_LOCALES = ["en", "ko", "zh", "fr", "de", "it", "es", "nl"] as const;

export type Locale = (typeof ALL_LOCALES)[number];

/**
 * Bahasa yang benar-benar punya konten dan karena itu dibangun.
 *
 * KERANGKA: daftar ini nanti datang dari `GET /api/intl/locales`, supaya sitemap,
 * hreflang, dan pengalih bahasa memakai satu sumber kebenaran dan mustahil
 * menunjuk ke bahasa yang halamannya belum ada.
 */
export const PUBLISHED_LOCALES: Locale[] = ["en", "ko", "zh"];

export const DEFAULT_LOCALE: Locale = "en";

/** Nama bahasa dalam bahasanya sendiri, untuk pengalih bahasa. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  zh: "中文",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  es: "Español",
  nl: "Nederlands",
};

/** Kode hreflang lengkap dengan wilayah, sesuai anjuran Google. */
export const HREFLANG: Record<Locale, string> = {
  en: "en",
  ko: "ko-KR",
  zh: "zh-Hans",
  fr: "fr",
  de: "de",
  it: "it",
  es: "es",
  nl: "nl",
};

export const SITE_URL = "https://manado.tours";

export function isPublished(locale: string): locale is Locale {
  return (PUBLISHED_LOCALES as string[]).includes(locale);
}
