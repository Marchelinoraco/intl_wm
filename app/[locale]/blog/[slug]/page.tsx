import type { Metadata } from "next";
import Image from "next/image";
import RichText from "@/components/RichText";
import JsonLd from "@/components/JsonLd";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { HREFLANG, SITE_URL, type Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getBlogPost, getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  const locales = await localesWith("blog");
  const lists = await Promise.all(locales.map((locale) => getBlogPosts(locale)));
  return locales.flatMap((locale, i) => lists[i].map((p) => ({ locale, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.locale, params.slug);
  if (!post) return {};
  const locales = await localesWith("blog");
  const present = await Promise.all(locales.map((l) => getBlogPost(l, params.slug)));
  const languages: Record<string, string> = {};
  locales.forEach((l, i) => {
    if (present[i]) languages[HREFLANG[l]] = `${SITE_URL}/${l}/blog/${params.slug}/`;
  });
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `${SITE_URL}/${params.locale}/blog/${params.slug}/`, languages },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.featured_image ? [post.featured_image] : [],
      type: "article",
      ...(post.published_at ? { publishedTime: post.published_at } : {}),
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const post = await getBlogPost(params.locale, params.slug);
  // Slug berasal dari getBlogPosts(locale) sendiri — null di sini berarti daftar &
  // detail tidak konsisten. Build harus gagal, bukan diam-diam menampilkan 404.
  if (!post) {
    throw new Error(`Inkonsistensi data: /blog/${params.slug} 404 di ${params.locale} padahal ada di daftar`);
  }

  const locales = await localesWith("blog");
  const present = await Promise.all(locales.map((l) => getBlogPost(l, params.slug)));
  const availableIn = locales.filter((_, i) => present[i]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.featured_image ? { image: post.featured_image } : {}),
    ...(post.published_at ? { datePublished: post.published_at } : {}),
    author: { "@type": "Organization", name: "Welcome Manado" },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <JsonLd data={jsonLd} />

      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">
        {[post.category?.name, post.published_at].filter(Boolean).join(" · ")}
      </p>
      <h1 className="mt-5 text-3xl font-black uppercase leading-[1.05] tracking-tighter text-ink md:text-5xl">
        {post.title}
      </h1>
      <div className="mt-6">
        <LanguageSwitcher current={params.locale} availableIn={availableIn} />
      </div>

      {post.featured_image && (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] bg-surface-2">
          <Image src={post.featured_image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        </div>
      )}

      <RichText html={post.content} className="mt-12 text-lg font-medium leading-[1.85] text-ink-2" />
    </article>
  );
}
