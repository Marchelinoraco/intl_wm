import type { Metadata } from "next";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { chatHref, chatLabelKey } from "@/lib/contact";

export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = dict(params.locale);
  return { title: t.contactHeading, description: t.contactLede };
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const t = dict(params.locale);
  const label = t[chatLabelKey(params.locale)];

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <div className="mb-4 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{t.contactHeading}</h1>
      </div>
      <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-500">{t.contactLede}</p>

      <a
        href={chatHref(params.locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-red-600/20 transition-transform hover:scale-105"
      >
        {label}
      </a>
    </section>
  );
}
