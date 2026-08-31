import Link from "next/link";
import { Compass, MessageCircle, Palmtree } from "lucide-react";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { chatHref, chatLabelKey } from "@/lib/contact";

export default function HomeCta({ locale }: { locale: Locale }) {
  const t = dict(locale);

  return (
    <section className="px-6 pb-24 pt-10 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-accent p-12 text-center text-white md:rounded-[3rem] lg:p-20">
        <div className="relative z-10">
          <h2 className="text-3xl font-black uppercase leading-tight tracking-tighter md:text-5xl">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg">
            {t.ctaText}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/contact/`}
              className="rounded-xl bg-white px-9 py-4 text-[11px] font-black uppercase tracking-widest text-accent transition-colors hover:bg-slate-900 hover:text-white"
            >
              {t.navContact}
            </Link>
            <a
              href={chatHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-9 py-4 text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:bg-red-800"
            >
              <MessageCircle className="h-4 w-4" />
              {t[chatLabelKey(locale)]}
            </a>
          </div>
        </div>
        <Palmtree
          className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rotate-12 text-white/10"
          aria-hidden="true"
        />
        <Compass
          className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 -rotate-12 text-white/5"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
