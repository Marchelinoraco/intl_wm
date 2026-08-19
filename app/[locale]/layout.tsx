import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  DEFAULT_LOCALE,
  HREFLANG,
  PUBLISHED_LOCALES,
  SITE_URL,
  isPublished,
  type Locale,
} from "@/lib/locales";
import { dict } from "@/lib/dictionary";

/** Hanya bahasa yang sudah punya konten yang dibangun. */
export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((locale) => ({ locale }));
}

/** Locale di luar daftar terbit menghasilkan 404, bukan halaman kosong. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isPublished(params.locale)) return {};
  const locale = params.locale as Locale;
  const t = dict(locale);

  // hreflang hanya menunjuk bahasa yang benar-benar terbit; menunjuk halaman
  // yang tidak ada adalah error yang dilaporkan Search Console.
  const languages: Record<string, string> = {};
  for (const l of PUBLISHED_LOCALES) {
    languages[HREFLANG[l]] = `${SITE_URL}/${l}/`;
  }
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}/`;

  return {
    title: {
      default: `Welcome Manado — ${t.tagline}`,
      template: `%s | manado.tours`,
    },
    description: t.heroSubtitle,
    alternates: { canonical: `${SITE_URL}/${locale}/`, languages },
    openGraph: {
      siteName: "Welcome Manado",
      locale: HREFLANG[locale],
      type: "website",
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isPublished(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <html lang={HREFLANG[locale]}>
      <body>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
