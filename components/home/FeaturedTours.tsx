import TourCard from "@/components/TourCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import type { TourList } from "@/lib/api";

export default function FeaturedTours({
  locale,
  tours,
}: {
  locale: Locale;
  tours: TourList[];
}) {
  const t = dict(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <SectionHeading
        badge={t.featuredToursBadge}
        title={t.featuredTours}
        lede={t.featuredToursLede}
        action={{ href: `/${locale}/tours/`, label: t.allTours }}
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, i) => (
          <Reveal key={tour.slug} delay={Math.min(i, 5) * 70} className="h-full">
            <TourCard tour={tour} locale={locale} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
