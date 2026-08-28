import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HREFLANG, PUBLISHED_LOCALES, SITE_URL, type Locale } from "@/lib/locales";
import { getPost, getPosts } from "@/lib/sample-content";

export function generateStaticParams() {
  return PUBLISHED_LOCALES.flatMap((locale) =>
    getPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Metadata {
  const post = getPost(params.locale, params.slug);
  if (!post) return {};

  const languages: Record<string, string> = {};
  for (const l of PUBLISHED_LOCALES) {
    if (getPost(l, params.slug)) {
      languages[HREFLANG[l]] = `${SITE_URL}/${l}/blog/${params.slug}/`;
    }
  }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `${SITE_URL}/${params.locale}/blog/${params.slug}/`,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: [post.featured_image],
      type: "article",
      publishedTime: post.published_at,
    },
  };
}

export default function BlogDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const post = getPost(params.locale, params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
        {post.category?.name} · {post.published_at} · {post.author}
      </p>
      <h1 className="mt-5 text-3xl font-black uppercase leading-[1.05] tracking-tighter text-slate-900 md:text-5xl">
        {post.title}
      </h1>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
        <Image src={post.featured_image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
      </div>

      <div className="mt-12 space-y-6">
        {post.content.split("\n\n").filter(Boolean).map((para, i) => (
          <p key={i} className="text-lg font-medium leading-[1.85] text-slate-600">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
}
