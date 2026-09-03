import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import TourCard from "@/components/TourCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { dict } from "@/lib/dictionary";
import { SITE_URL, type Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { getTours, type TourList } from "@/lib/api";
import { pageAlternates } from "@/lib/seo";
import { chatHref, chatLabelKey } from "@/lib/contact";
import { SHORE_EXCURSIONS, SHORE_EXCURSION_SLUGS } from "@/lib/content/shore-excursions";

/** Halaman statis — dibangun untuk setiap bahasa yang situsnya terbit. */
export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const c = SHORE_EXCURSIONS[params.locale];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: pageAlternates(params.locale, "tours/shore-excursions/", await publishedLocales()),
    openGraph: { title: c.metaTitle, description: c.metaDescription, type: "website" },
  };
}

export default async function ShoreExcursionsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const t = dict(locale);
  const c = SHORE_EXCURSIONS[locale];

  // Paket day-tour yang cocok untuk sekali sandar — dipetik dari katalog nyata,
  // urut sesuai SHORE_EXCURSION_SLUGS; slug yang tak ada dilewati.
  const bySlug = new Map((await getTours(locale)).map((x) => [x.slug, x]));
  const picks = SHORE_EXCURSION_SLUGS.map((s) => bySlug.get(s)).filter(
    (x): x is TourList => Boolean(x),
  );

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Welcome Manado", item: `${SITE_URL}/${locale}/` },
      { "@type": "ListItem", position: 2, name: t.allTours, item: `${SITE_URL}/${locale}/tours/` },
      {
        "@type": "ListItem",
        position: 3,
        name: c.title,
        item: `${SITE_URL}/${locale}/tours/shore-excursions/`,
      },
    ],
  };

  const chatLabel = t[chatLabelKey(locale)];

  return (
    <article>
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <header className="relative flex min-h-[64vh] items-end overflow-hidden bg-slate-950">
        <Image
          src="/hero/luminosa-poster.jpg"
          alt="Cruise ship berthed at Bitung port, North Sulawesi"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/25" />
        <div className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-[130px]" />

        <div className="relative mx-auto w-full max-w-5xl animate-reveal-up px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-accent" />
            <span className="text-[11px] font-black uppercase tracking-[0.35em] text-accent">
              {c.badge}
            </span>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-6xl">
            {c.title}
          </h1>
          <div className="mt-7 max-w-2xl space-y-4 text-base font-medium leading-relaxed text-white/80 md:text-lg">
            {c.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={chatHref(locale, c.chatSubject)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-red-600/25 transition-transform hover:scale-105"
            >
              {c.ctaTitle}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#excursions"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white hover:text-slate-900"
            >
              {c.pickTitle}
            </a>
          </div>
        </div>
      </header>

      {/* ── Why book direct ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-ink md:text-3xl">
          {c.whyTitle}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.why.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i, 4) * 60} className="h-full">
              <div className="flex h-full flex-col rounded-[1.75rem] border border-line bg-surface p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-sm font-black uppercase tracking-widest text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink-2">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Recommended excursions ─────────────────────────────── */}
      {picks.length > 0 && (
        <section id="excursions" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16 lg:px-10 lg:pb-20">
          <SectionHeading badge={t.tagline} title={c.pickTitle} lede={c.pickLede} />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {picks.map((tour, i) => (
              <Reveal key={tour.slug} delay={Math.min(i, 5) * 60} className="h-full">
                <TourCard tour={tour} locale={locale} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Before you book ───────────────────────────────────── */}
      <section className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-ink md:text-3xl">
            {c.infoTitle}
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {c.info.map((item) => (
              <div key={item.title} className="border-l-2 border-accent pl-5">
                <h3 className="text-sm font-black uppercase tracking-widest text-ink">{item.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-20">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-ink md:text-3xl">
          {c.faqTitle}
        </h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {c.faq.map((f) => (
            <details key={f.q} className="group py-5 [&_summary]:list-none">
              <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-black uppercase tracking-tight text-ink">
                {f.q}
                <ArrowRight
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-open:rotate-90"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm font-medium leading-relaxed text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-4xl">
            {c.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-white/70">
            {c.ctaText}
          </p>
          <a
            href={chatHref(locale, c.chatSubject)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-accent px-9 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-red-600/25 transition-transform hover:scale-105"
          >
            {chatLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <Link
          href={`/${locale}/tours/`}
          className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t.allTours}
        </Link>
      </div>
    </article>
  );
}
