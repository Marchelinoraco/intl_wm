import Hero from "@/components/home/Hero";
import FeaturedTours from "@/components/home/FeaturedTours";
import type { Locale } from "@/lib/locales";
import { getAvailability, publishedLocales } from "@/lib/availability";
import { getHome, getAbout, getGallery, getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

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
        <FeaturedTours locale={locale} tours={featured_tours} />
      )}
    </>
  );
}
