import type { Metadata } from "next";
import "../globals.css";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { DEFAULT_LOCALE, HREFLANG, SITE_URL, isLocale, type Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { dict } from "@/lib/dictionary";

/**
 * INI root layout aplikasi — tidak ada app/layout.tsx di atasnya. Segmen
 * dinamis [locale] sebagai segmen teratas berarti layout inilah yang memegang
 * <html>/<body>, sehingga atribut `lang` bisa benar per bahasa.
 *
 * Root `/` sengaja tidak punya halaman: nginx yang mengalihkannya (302) sesuai
 * Accept-Language. Saat `npm run dev`, buka `/en/` langsung.
 */
export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale;
  const t = dict(locale);
  const published = await publishedLocales();

  const languages: Record<string, string> = {};
  for (const l of published) languages[HREFLANG[l]] = `${SITE_URL}/${l}/`;
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}/`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `Welcome Manado — ${t.tagline}`, template: `%s | manado.tours` },
    description: t.heroSubtitle,
    alternates: { canonical: `${SITE_URL}/${locale}/`, languages },
    openGraph: { siteName: "Welcome Manado", locale: HREFLANG[locale], type: "website" },
    verification: { google: "HNioFXY28AzfSQn6P0l2VOBu8oUO1lFslxOzKNKKDMw" },
  };
}

const TRAVEL_AGENCY_LD = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Welcome Manado",
  url: SITE_URL,
  areaServed: "North Sulawesi, Indonesia",
  parentOrganization: { "@type": "Organization", name: "Welcome Manado", url: "https://welcomemanado.com" },
};

/**
 * Set kelas tema SEBELUM paint pertama (hindari kedip). Dijalankan sinkron di
 * <head> — baca localStorage `theme`, jatuh ke preferensi sistem.
 */
const THEME_SCRIPT = `
(function(){try{
  var s=localStorage.getItem('theme');
  var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark',d);
}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  return (
    <html lang={HREFLANG[locale]}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <JsonLd data={TRAVEL_AGENCY_LD} />
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
