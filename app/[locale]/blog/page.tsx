import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getBlogPosts } from "@/lib/api";
import { pageAlternates } from "@/lib/seo";

export async function generateStaticParams() {
  return (await localesWith("blog")).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return {
    title: dict(params.locale).blogHeading,
    alternates: pageAlternates(params.locale, "blog/", await localesWith("blog")),
  };
}

export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const posts = await getBlogPosts(locale);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
      <div className="mb-12 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-accent" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-ink">{t.blogHeading}</h1>
      </div>

      <div className="space-y-10">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={Math.min(i, 6) * 50}>
          <Link
            href={`/${locale}/blog/${post.slug}/`}
            className="group grid gap-7 rounded-[2rem] border border-line bg-surface p-6 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[16rem_1fr]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-surface-2">
              {post.featured_image && (
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 640px) 16rem, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                {[post.category?.name, post.published_at].filter(Boolean).join(" · ")}
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tighter text-ink">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-3 text-sm font-medium leading-relaxed text-ink-2 line-clamp-3">{post.excerpt}</p>
              )}
              <span className="mt-5 text-[11px] font-black uppercase tracking-widest text-accent">{t.readMore} →</span>
            </div>
          </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
