import type { Metadata } from "next";
import Image from "next/image";
import { dict } from "@/lib/dictionary";
import { PUBLISHED_LOCALES, type Locale } from "@/lib/locales";
import { getStory, getTeam } from "@/lib/sample-content";

export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const story = getStory(params.locale);
  return {
    title: dict(params.locale).aboutHeading,
    description: story?.paragraph_one.slice(0, 160),
  };
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const story = getStory(locale);
  const team = getTeam(locale);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
      {/* Cerita hanya tampil bila memang ada terjemahannya — tidak pernah
          jatuh ke bahasa Indonesia, sama seperti aturan di /api/intl/about. */}
      {story && (
        <section>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter text-slate-900 md:text-6xl">
            {story.title_lead} <span className="text-red-600">{story.title_accent}</span>
          </h1>

          <div className="mt-10 space-y-6">
            <p className="text-lg font-medium leading-[1.85] text-slate-600">{story.paragraph_one}</p>
            <p className="text-lg font-medium leading-[1.85] text-slate-600">{story.paragraph_two}</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8">
              <p className="text-4xl font-black tracking-tighter text-slate-900">
                {story.experience_value}
              </p>
              <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
                {story.experience_label}
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8">
              <p className="text-4xl font-black tracking-tighter text-slate-900">
                {story.travelers_value}
              </p>
              <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
                {story.travelers_label}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mt-24">
        <div className="mb-10 flex items-center gap-4">
          <span className="h-1 w-12 rounded-full bg-red-600" />
          <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
            {t.teamHeading}
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full bg-slate-100">
                <Image src={member.image_url} alt={member.name} fill sizes="10rem" className="object-cover" />
              </div>
              <p className="mt-5 text-base font-black uppercase tracking-tight text-slate-900">
                {member.name}
              </p>
              {member.position && (
                <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-red-600">
                  {member.position}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
