import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";

export default function CinematicBand({
  locale,
  image,
}: {
  locale: Locale;
  image: string;
}) {
  const t = dict(locale);

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-28 text-white lg:py-36">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center lg:bg-fixed"
        style={{ backgroundImage: `url("${encodeURI(image)}")` }}
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/70" />
      <div className="pointer-events-none absolute -right-32 top-0 -z-10 h-[36rem] w-[36rem] rounded-full bg-accent/15 blur-[140px]" />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl">
          {t.bandTitle}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/80">
          {t.bandText}
        </p>
        <Link
          href={`/${locale}/tours/`}
          className="mt-9 inline-block rounded-xl bg-white px-9 py-4 text-[11px] font-black uppercase tracking-widest text-slate-900 transition-colors hover:bg-accent hover:text-white"
        >
          {t.exploreTours}
        </Link>
      </div>
    </section>
  );
}
