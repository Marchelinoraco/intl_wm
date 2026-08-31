import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  badge?: string;
  title: string;
  accent?: string;
  lede?: string;
  action?: { href: string; label: string };
  tone?: "light" | "dark";
  headingLevel?: 1 | 2;
};

/**
 * Pola judul bagian yang berulang di seluruh situs: garis aksen + label
 * ter-track kecil, judul tebal uppercase (kata aksen opsional diwarnai),
 * lede opsional, dan tombol aksi opsional di kanan (pada lg).
 */
export default function SectionHeading({
  badge,
  title,
  accent,
  lede,
  action,
  tone = "light",
  headingLevel = 2,
}: Props) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const ledeColor = tone === "dark" ? "text-white/70" : "text-ink-2";

  return (
    <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        {badge && (
          <div className="flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-accent" />
            <span className="text-[11px] font-black uppercase tracking-[0.35em] text-accent">
              {badge}
            </span>
          </div>
        )}
        <Heading
          className={`text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl ${
            badge ? "mt-4" : ""
          } ${titleColor}`}
        >
          {title}
          {accent && <span className="text-accent"> {accent}</span>}
        </Heading>
        {lede && (
          <p className={`mt-4 text-base font-medium leading-relaxed ${ledeColor}`}>
            {lede}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-ink px-7 py-3.5 text-[11px] font-black uppercase tracking-widest text-canvas transition-colors hover:bg-accent hover:text-white lg:self-auto"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
