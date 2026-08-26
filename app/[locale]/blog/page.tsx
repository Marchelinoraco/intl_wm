import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { dict } from "@/lib/dictionary";
import { PUBLISHED_LOCALES, type Locale } from "@/lib/locales";
import { getPosts } from "@/lib/sample-content";

export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: dict(params.locale).blogHeading };
}

export default function BlogPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const posts = getPosts(locale);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
      <div className="mb-12 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
          {t.blogHeading}
        </h1>
      </div>

      <div className="space-y-10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}/`}
            className="group grid gap-7 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl sm:grid-cols-[16rem_1fr]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-slate-100">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                sizes="(min-width: 640px) 16rem, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                {post.category?.name} · {post.published_at}
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tighter text-slate-900">
                {post.title}
              </h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                {post.excerpt}
              </p>
              <span className="mt-5 text-[11px] font-black uppercase tracking-widest text-red-600">
                {t.readMore} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
