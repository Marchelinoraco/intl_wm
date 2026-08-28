import type { Metadata } from "next";
import Image from "next/image";
import RichText from "@/components/RichText";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getAbout } from "@/lib/api";
import { pageAlternates } from "@/lib/seo";

export async function generateStaticParams() {
  return (await localesWith("about")).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { story } = await getAbout(params.locale);
  const description = story
    ? story.paragraph_one.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160)
    : undefined;
  return {
    title: dict(params.locale).aboutHeading,
    description,
    alternates: pageAlternates(params.locale, "about/", await localesWith("about")),
  };
}

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const { story, team } = await getAbout(locale);

  // localesWith("about") menjamin story != null di sini, tapi tetap dijaga.
  if (!story) {
    throw new Error(`about.story null di ${locale} padahal locale ini lolos gerbang about`);
  }

  const highlights = [
    { value: story.experience_value, label: story.experience_label },
    { value: story.travelers_value, label: story.travelers_label },
  ].filter((h) => h.value);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
      <section>
        <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter text-slate-900 md:text-6xl">
          {story.title_lead} <span className="text-red-600">{story.title_accent}</span>
        </h1>

        {(story.since_text || story.pioneering_text) && (
          <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
            {[story.since_text, story.pioneering_text].filter(Boolean).join(" · ")}
          </p>
        )}

        <div className="mt-10 space-y-6">
          <RichText html={story.paragraph_one} className="text-lg font-medium leading-[1.85] text-slate-600" />
          <RichText html={story.paragraph_two} className="text-lg font-medium leading-[1.85] text-slate-600" />
        </div>

        {story.image_url && (
          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
            <Image src={story.image_url} alt="" fill sizes="100vw" className="object-cover" />
          </div>
        )}

        {highlights.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {highlights.map((h) => (
              <div key={h.label} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8">
                <p className="text-xl font-black uppercase tracking-tight text-slate-900">{h.value}</p>
                <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-slate-400">{h.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {team.length > 0 && (
        <section className="mt-24">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-1 w-12 rounded-full bg-red-600" />
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{t.teamHeading}</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full bg-slate-100">
                  {member.image_url && (
                    <Image src={member.image_url} alt={member.name} fill sizes="10rem" className="object-cover" />
                  )}
                </div>
                <p className="mt-5 text-base font-black uppercase tracking-tight text-slate-900">{member.name}</p>
                {member.position && (
                  <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-red-600">{member.position}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
