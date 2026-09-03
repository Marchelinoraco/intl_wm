import type { Metadata } from "next";
import "../globals.css";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import FloatingChat from "@/components/FloatingChat";
import { ChatWidgetProvider } from "@/components/ChatWidget";
import { DEFAULT_LOCALE, HREFLANG, SITE_URL, isLocale, type Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { dict } from "@/lib/dictionary";
import { EMAILS, MAPS_URL, PHONE_TEL, SOCIAL_LINKS, chatHref } from "@/lib/contact";

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

const ORG_ID = `${SITE_URL}/#organization`;

// Profil publik yang benar-benar milik perusahaan (bukan tautan kontak seperti
// wa.me) — dipetik dari SOCIAL_LINKS + situs induk, untuk `sameAs`.
const SAME_AS = [
  ...SOCIAL_LINKS.filter((s) => s.icon !== "whatsapp").map((s) => s.href),
  "https://welcomemanado.com",
];

const TRAVEL_AGENCY_LD = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": ORG_ID,
  name: "Welcome Manado Tours",
  alternateName: "Welcome Manado",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  areaServed: "North Sulawesi, Indonesia",
  sameAs: SAME_AS,
  // Uraian berkomponen dari `OFFICE_ADDRESS` di lib/contact.ts. Schema.org
  // menuntut bagian-bagiannya terpisah; kalau alamat itu berubah, ubah di sini juga.
  address: {
    "@type": "PostalAddress",
    streetAddress: "Grha Merdeka, Jl. A. A. Maramis No. 17, Kairagi Dua",
    addressLocality: "Manado",
    addressRegion: "North Sulawesi",
    addressCountry: "ID",
  },
  telephone: PHONE_TEL,
  email: EMAILS[0],
  hasMap: MAPS_URL,
  parentOrganization: { "@type": "Organization", name: "Welcome Manado", url: "https://welcomemanado.com" },
};

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Welcome Manado Tours",
  inLanguage: ["en", "ko", "zh", "fr", "de", "it", "es", "nl"],
  publisher: { "@id": ORG_ID },
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
  const t = dict(locale);

  // Widget obrolan berjalan di klien, sedangkan kamus dibaca di server —
  // jadi teksnya diterjemahkan di sini lalu dioper sebagai prop.
  const chatStrings = {
    menuTitle: t.chatMenuTitle,
    close: t.chatClose,
    wechat: {
      title: t.wechatTitle,
      scan: t.wechatScan,
      description: t.wechatDescription,
      copy: t.wechatCopy,
      copied: t.wechatCopied,
    },
    kakao: {
      title: t.kakaoTitle,
      scan: t.kakaoScan,
      description: t.kakaoDescription,
      copy: t.kakaoCopy,
      copied: t.kakaoCopied,
    },
  };

  return (
    <html lang={HREFLANG[locale]}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <JsonLd data={TRAVEL_AGENCY_LD} />
        <JsonLd data={WEBSITE_LD} />
        {/* Footer dan tombol mengambang berbagi satu status: ikon WeChat/Kakao
            di footer memunculkan kartu QR milik <FloatingChat>. */}
        <ChatWidgetProvider>
          <Header locale={locale} />
          {/* Header adalah pill `fixed` yang melayang; beri ruang di atas. Hero
              beranda menetralkannya dengan `-mt` yang sepadan agar tetap full-bleed. */}
          <main className="pt-20 lg:pt-24">{children}</main>
          <Footer locale={locale} />
          <FloatingChat strings={chatStrings} whatsappHref={chatHref(locale)} />
        </ChatWidgetProvider>
      </body>
    </html>
  );
}
