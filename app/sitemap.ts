import type { MetadataRoute } from "next";
import { HREFLANG, SITE_URL, type Locale } from "@/lib/locales";
import { localesWith, publishedLocales } from "@/lib/availability";
import { getBlogPosts, getHotels, getTours } from "@/lib/api";

export const dynamic = "force-static";

/** Satu entri per (locale × halaman) yang BENAR-BENAR dibangun — dipetik dari
 *  Availability yang sama, jadi sitemap tidak pernah menunjuk halaman yang di-skip. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const published = await publishedLocales();
  const hotelLocales = await localesWith("hotels");
  const galleryLocales = await localesWith("gallery");
  const blogLocales = await localesWith("blog");
  const aboutLocales = await localesWith("about");

  const entries: MetadataRoute.Sitemap = [];
  const push = (locales: Locale[], path: (l: Locale) => string) => {
    for (const l of locales) {
      const url = `${SITE_URL}/${l}/${path(l)}`.replace(/\/+$/, "/");
      const languages: Record<string, string> = {};
      for (const alt of locales) languages[HREFLANG[alt]] = `${SITE_URL}/${alt}/${path(alt)}`.replace(/\/+$/, "/");
      entries.push({ url, alternates: { languages } });
    }
  };

  // Halaman statis
  push(published, () => "");
  push(published, () => "tours/");
  push(published, () => "tours/shore-excursions/");
  push(published, () => "contact/");
  push(hotelLocales, () => "hotels/");
  push(galleryLocales, () => "gallery/");
  push(blogLocales, () => "blog/");
  push(aboutLocales, () => "about/");

  // Detail — hreflang hanya untuk locale yang punya slug itu
  const tourLists = await Promise.all(published.map((l) => getTours(l)));
  const tourSlugLocales = new Map<string, Locale[]>();
  published.forEach((l, i) => {
    for (const t of tourLists[i]) tourSlugLocales.set(t.slug, [...(tourSlugLocales.get(t.slug) ?? []), l]);
  });
  // forEach (bukan for..of Map) supaya lolos tanpa flag downlevelIteration
  tourSlugLocales.forEach((locales, slug) => push(locales, () => `tours/${slug}/`));

  const hotelLists = await Promise.all(hotelLocales.map((l) => getHotels(l)));
  const hotelSlugLocales = new Map<string, Locale[]>();
  hotelLocales.forEach((l, i) => {
    for (const h of hotelLists[i]) hotelSlugLocales.set(h.slug, [...(hotelSlugLocales.get(h.slug) ?? []), l]);
  });
  hotelSlugLocales.forEach((locales, slug) => push(locales, () => `hotels/${slug}/`));

  const blogLists = await Promise.all(blogLocales.map((l) => getBlogPosts(l)));
  const blogSlugLocales = new Map<string, Locale[]>();
  blogLocales.forEach((l, i) => {
    for (const p of blogLists[i]) blogSlugLocales.set(p.slug, [...(blogSlugLocales.get(p.slug) ?? []), l]);
  });
  blogSlugLocales.forEach((locales, slug) => push(locales, () => `blog/${slug}/`));

  return entries;
}
