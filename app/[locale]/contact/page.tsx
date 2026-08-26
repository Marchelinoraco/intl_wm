import type { Metadata } from "next";
import { dict } from "@/lib/dictionary";
import { PUBLISHED_LOCALES, type Locale } from "@/lib/locales";

export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = dict(params.locale);
  return { title: t.contactHeading, description: t.contactLede };
}

/** Kanal mengikuti bahasa: turis Korea memakai KakaoTalk, pasar Mandarin WeChat. */
function channelFor(locale: Locale, t: ReturnType<typeof dict>) {
  if (locale === "ko") return { label: t.askOnKakao, href: "#" };
  if (locale === "zh") return { label: t.askOnWechat, href: "#" };
  return { label: t.askOnWhatsapp, href: "https://wa.me/6282173738822" };
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const t = dict(params.locale);
  const channel = channelFor(params.locale, t);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <div className="mb-4 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
          {t.contactHeading}
        </h1>
      </div>
      <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-500">
        {t.contactLede}
      </p>

      <a
        href={channel.href}
        className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-red-600/20 transition-transform hover:scale-105"
      >
        {channel.label}
      </a>

      {/* KERANGKA: belum tersambung. Nanti POST ke /api/intl/inquiries?locale=xx */}
      <form className="mt-14 space-y-5 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
        <div>
          <label htmlFor="name" className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            {t.formName}
          </label>
          <input id="name" name="name" type="text" disabled
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              {t.formEmail}
            </label>
            <input id="email" name="email" type="email" disabled
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
          </div>
          <div>
            <label htmlFor="pax" className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              {t.formPax}
            </label>
            <input id="pax" name="pax" type="number" min={1} disabled
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            {t.formMessage}
          </label>
          <textarea id="message" name="message" rows={5} disabled
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
        </div>

        <button type="button" disabled
          className="w-full cursor-not-allowed rounded-xl bg-slate-300 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-white">
          {t.formSend}
        </button>

        <p className="text-center text-[11px] font-medium text-slate-400">{t.formNote}</p>
      </form>
    </section>
  );
}
