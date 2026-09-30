"use client";

import { useState } from "react";

const THUMBS = [
  { locked: false, alt: "Featured prize model" },
  { locked: false, alt: "Featured prize model, alternate view" },
  { locked: false, alt: "Featured prize model, detail" },
  { locked: true, alt: "Next month's prize — locked" },
  { locked: true, alt: "Following month's prize — locked" },
];

export default function FeaturedThisMonth() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 text-left sm:grid-cols-[80px_1fr] sm:gap-8">
      <div className="flex gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
        {THUMBS.map((t, i) => (
          <button
            key={i}
            onClick={() => !t.locked && setActive(i)}
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-md border-2 bg-white/10 text-lg ${
              i === active ? "border-brand-gold" : "border-transparent"
            }`}
            aria-label={t.alt}
          >
            {t.locked ? "🔒" : "🖼️"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex aspect-square w-full max-w-xs shrink-0 items-center justify-center rounded-md bg-white/95 text-6xl sm:w-64">
          👜
        </div>
        <div>
          <h3 className="font-display font-black text-2xl sm:text-3xl">
            Official &apos;Warp Oxblood Accordion Bag&apos;
          </h3>
          <p className="mt-3 text-sm text-white/85">
            Be the lucky one to win the bag used by Meryl Streep from The Devil Wears
            Prada 2.
          </p>
          <p className="mt-2 text-sm text-white/85">
            A 1 of 1 piece for our Ultra Rich loyalists.
          </p>
        </div>
      </div>
    </div>
  );
}
