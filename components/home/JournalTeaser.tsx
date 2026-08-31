import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { dict } from "@/lib/dictionary";
import { HREFLANG, type Locale } from "@/lib/locales";
import type { BlogList } from "@/lib/api";

function formatDate(iso: string | null, locale: Locale): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(HREFLANG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export default function JournalTeaser({
  locale,
  posts,
}: {
  locale: Locale;
  posts: BlogList[];
}) {
  const t = dict(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <SectionHeading
        badge={t.journalBadge}
        title={t.blogHeading}
        action={{ href: `/${locale}/blog/`, label: t.viewAllArticles }}
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={Math.min(i, 3) * 70} className="h-full">
            <Link
              href={`/${locale}/blog/${post.slug}/`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                {post.featured_image && (
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {post.category && (
                  <span className="absolute left-4 top-4 rounded-lg bg-accent px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    {post.category.name}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                {post.published_at && (
                  <p className="text-[11px] font-black uppercase tracking-widest text-ink-3">
                    {formatDate(post.published_at, locale)}
                  </p>
                )}
                <h3 className="mt-2 line-clamp-2 text-lg font-black uppercase leading-tight tracking-tight text-ink">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-ink-2">
                    {post.excerpt}
                  </p>
                )}
                <span className="mt-auto pt-6 text-[11px] font-black uppercase tracking-widest text-accent">
                  {t.readMore} →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
