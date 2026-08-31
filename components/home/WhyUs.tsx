import RichText from "@/components/RichText";
import Reveal from "@/components/Reveal";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import type { AboutStory } from "@/lib/api";

export default function WhyUs({
  locale,
  story,
}: {
  locale: Locale;
  story: AboutStory;
}) {
  const t = dict(locale);
  const stats = [
    { value: story.experience_value, label: story.experience_label },
    { value: story.travelers_value, label: story.travelers_label },
  ].filter((s) => s.value);
  const meta = [story.since_text, story.pioneering_text].filter(Boolean).join(" · ");

  return (
    <section className="bg-surface-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-28">
        <div className="lg:col-span-5">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
            {t.whyUsBadge}
          </span>
          <h2 className="mt-6 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-ink md:text-5xl">
            {story.title_lead} <span className="text-accent">{story.title_accent}</span>
          </h2>
          <RichText
            html={story.paragraph_one}
            className="mt-6 line-clamp-6 text-base font-medium leading-[1.8] text-ink-2"
          />
          {meta && (
            <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-ink-3">
              {meta}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className="rounded-[1.5rem] border border-line bg-surface p-7"
            >
              <p className="text-3xl font-black uppercase tracking-tight text-ink md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-ink-3">
                {s.label}
              </p>
            </Reveal>
          ))}
          <Reveal
            delay={stats.length * 80}
            className="rounded-[1.5rem] bg-gradient-to-br from-red-600 to-red-800 p-8 text-white sm:col-span-2"
          >
            <p className="text-lg font-black uppercase leading-tight tracking-tight md:text-xl">
              {t.whyUsPitch}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
