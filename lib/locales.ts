/**
 * Delapan bahasa sasaran manado.tours. Bahasa Indonesia sengaja tidak ada —
 * pasar itu dilayani welcomemanado.com dengan katalog yang berbeda.
 *
 * Bahasa mana yang benar-benar DIBANGUN dihitung saat build dari
 * /api/intl/* — lihat lib/availability.ts. Tidak ada daftar hardcoded lagi.
 */
export const ALL_LOCALES = ["en", "ko", "zh", "fr", "de", "it", "es", "nl"] as const;

export type Locale = (typeof ALL_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Nama bahasa dalam bahasanya sendiri, untuk pengalih bahasa. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English", ko: "한국어", zh: "中文", fr: "Français",
  de: "Deutsch", it: "Italiano", es: "Español", nl: "Nederlands",
};

/** Kode hreflang lengkap dengan wilayah, sesuai anjuran Google. */
export const HREFLANG: Record<Locale, string> = {
  en: "en", ko: "ko-KR", zh: "zh-Hans", fr: "fr",
  de: "de", it: "it", es: "es", nl: "nl",
};

export const SITE_URL = "https://manado.tours";

export function isLocale(value: string): value is Locale {
  return (ALL_LOCALES as readonly string[]).includes(value);
}
