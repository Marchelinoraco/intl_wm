import Hero from "@/components/home/Hero";
import TourCard from "@/components/TourCard";
import Reveal from "@/components/Reveal";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { getAvailability, publishedLocales } from "@/lib/availability";
import { getHome, getAbout, getGallery, getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);

  const [{ hero_images, featured_tours }, about, gallery, posts, availability] =
    await Promise.all([
      getHome(locale),
      getAbout(locale),
      getGallery(locale),
      getBlogPosts(locale),
      getAvailability(),
    ]);

  // Referensi dipakai task-task bagian berikutnya (WhyUs, GalleryStrip, dst.).
  void about;
  void gallery;
  void posts;
  void availability;

  return (
    <>
      <Hero locale={locale} images={hero_images} />

      {featured_tours.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal className="mb-12 flex items-center gap-4">
            <span className="h-1 w-12 rounded-full bg-accent" />
            <h2 className="text-2xl font-black uppercase tracking-tighter text-ink">
              {t.featuredTours}
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured_tours.map((tour, i) => (
              <Reveal key={tour.slug} delay={Math.min(i, 5) * 70} className="h-full">
                <TourCard tour={tour} locale={locale} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
