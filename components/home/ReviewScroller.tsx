"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Review } from "@/lib/home-reviews";

export default function ReviewScroller({
  reviews,
  readMore,
  showLess,
  label,
}: {
  reviews: Review[];
  readMore: string;
  showLess: string;
  label: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 400, behavior: "smooth" });

  return (
    <div className="relative">
      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label={label}
        className="hide-scrollbar flex snap-x snap-mandatory items-start gap-6 overflow-x-auto pb-4"
      >
        {reviews.map((r) => (
          <ReviewCard
            key={`${r.name}-${r.time}`}
            review={r}
            readMore={readMore}
            showLess={showLess}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous reviews"
        className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink-2 shadow-lg transition-colors hover:text-accent md:flex"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Next reviews"
        className="absolute right-0 top-1/2 hidden h-11 w-11 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink-2 shadow-lg transition-colors hover:text-accent md:flex"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

function ReviewCard({
  review,
  readMore,
  showLess,
}: {
  review: Review;
  readMore: string;
  showLess: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 150;
  const shown =
    expanded || !long ? review.text : `${review.text.slice(0, 150).trimEnd()}…`;

  return (
    <article className="flex min-w-[300px] max-w-[380px] snap-start flex-col rounded-[1.5rem] border border-line bg-surface p-7 md:min-w-[360px]">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
          style={{ background: review.color }}
        >
          {review.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold text-ink">{review.name}</p>
          <p className="truncate text-xs text-ink-3">
            {review.location ? `${review.location} · ` : ""}
            {review.time}
          </p>
        </div>
      </div>

      <div
        className="mb-3 flex items-center gap-1"
        role="img"
        aria-label={`${review.stars} / 5`}
      >
        {review.source === "tripadvisor"
          ? Array.from({ length: review.stars }).map((_, i) => (
              <span key={i} className="h-3.5 w-3.5 rounded-full bg-[#00AA6C]" />
            ))
          : Array.from({ length: review.stars }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                aria-hidden="true"
              />
            ))}
      </div>

      {review.title && (
        <p className="mb-2 font-bold leading-snug text-ink">{review.title}</p>
      )}

      <p className="flex-1 whitespace-pre-line text-sm leading-relaxed text-ink-2">
        {shown}
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-sm font-bold text-accent hover:underline"
        >
          {expanded ? showLess : readMore}
        </button>
      )}

      <p className="mt-6 border-t border-line pt-4 text-[11px] font-black uppercase tracking-widest text-ink-3">
        {review.source === "tripadvisor" ? "Posted on Tripadvisor" : "Posted on Google"}
      </p>
    </article>
  );
}
