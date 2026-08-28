import { getAbout, getBlogPosts, getGallery, getHotels, getTours } from "./api";
import { ALL_LOCALES, type Locale } from "./locales";

/**
 * Ketersediaan dihitung per (jenis konten × bahasa), BUKAN satu status global.
 * Paket tour menentukan bahasa mana yang situsnya hidup sama sekali; menu
 * Hotels/Gallery/Blog/About hanya muncul di bahasa yang jenis itu berisi.
 *
 * 40 panggilan ringan (8 bahasa × 5 jenis), paralel, sekali di awal build.
 * Hasilnya di-memoize dalam proses (bukan disk).
 */

export type Section = "tours" | "hotels" | "gallery" | "blog" | "about";
export const SECTIONS: Section[] = ["tours", "hotels", "gallery", "blog", "about"];

export type Availability = Record<Locale, Record<Section, boolean>>;

async function probe(locale: Locale, section: Section): Promise<boolean> {
  switch (section) {
    case "tours":
      return (await getTours(locale)).length > 0;
    case "hotels":
      return (await getHotels(locale)).length > 0;
    case "gallery":
      // Item video (image_path null) tidak dihitung — halaman galeri hanya
      // merender gambar, jadi ketersediaan harus mengikuti gambar yang ada.
      return (await getGallery(locale)).some((g) => g.image_path);
    case "blog":
      return (await getBlogPosts(locale)).length > 0;
    case "about":
      return (await getAbout(locale)).story !== null;
  }
}

async function build(): Promise<Availability> {
  const entries = await Promise.all(
    ALL_LOCALES.map(async (locale) => {
      const flags = await Promise.all(SECTIONS.map((s) => probe(locale, s)));
      const record = Object.fromEntries(SECTIONS.map((s, i) => [s, flags[i]])) as Record<Section, boolean>;
      return [locale, record] as const;
    })
  );
  return Object.fromEntries(entries) as Availability;
}

let cached: Promise<Availability> | null = null;

export function getAvailability(): Promise<Availability> {
  if (!cached) cached = build();
  return cached;
}

/** Bahasa yang situsnya hidup sama sekali = punya paket tour. Urut ALL_LOCALES. */
export async function publishedLocales(): Promise<Locale[]> {
  const a = await getAvailability();
  return ALL_LOCALES.filter((l) => a[l].tours);
}

export async function localesWith(section: Section): Promise<Locale[]> {
  const a = await getAvailability();
  // Halaman jenis konten tidak pernah dibangun untuk bahasa yang situsnya
  // belum terbit (tours:false) — kalau tidak, layout dynamicParams=false
  // menolak param locale yang tak ada di generateStaticParams-nya.
  return ALL_LOCALES.filter((l) => a[l][section] && a[l].tours);
}
