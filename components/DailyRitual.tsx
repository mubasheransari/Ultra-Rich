"use client";

import { useState } from "react";

const MOMENTS = [
  {
    time: "07:30",
    title: "The Quiet Cup",
    copy: "Begin your day with a single cup brewed strong, with milk simmered gently. Sip Ultra Rich and find the perfect, grounding start to seize the day.",
  },
  {
    time: "10:30",
    title: "The Power Cup",
    copy: "Whether at home or at the office, this hour demands a cup of Ultra Rich; a blend brilliant enough to help you power through. Achieve what you must and settle only for the best.",
  },
  {
    time: "14:30",
    title: "The Thinking Cup",
    copy: "Your best ideas deserve a moment of quiet focus. Pour a cup of Ultra Rich, clear the noise, and let the rich flavor fuel your afternoon inspiration.",
  },
  {
    time: "18:45",
    title: "The Golden Hour",
    copy: "The best hour of the day deserves the finest blend. When the light turns golden, take a step back, put the kettle on, and elevate the evening wind-down with a cup of Ultra Rich.",
  },
  {
    time: "21:30",
    title: "Lights Out",
    copy: "Melt away the day's hustle and step into absolute comfort. Pour a cup of deep, full-bodied warmth, because an exceptional day deserves an Ultra Rich end.",
  },
];

export default function DailyRitual() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + MOMENTS.length) % MOMENTS.length);
  const next = () => setActive((i) => (i + 1) % MOMENTS.length);
  const moment = MOMENTS[active];

  return (
    <section className="bg-red-textured py-16 text-white">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-display font-black text-3xl sm:text-4xl">
          A cup for every chapter of your day
        </h2>
        <p className="mt-3 text-sm text-white/85 sm:text-base">
          Ultra Rich narrates your story fluently, at every hour, in every mood. Everywhere.
        </p>

        <div className="mt-10 flex justify-between border-b border-white/25 pb-3">
          {MOMENTS.map((m, i) => (
            <button
              key={m.time}
              onClick={() => setActive(i)}
              className={`font-display text-sm font-semibold transition sm:text-base ${
                i === active ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              {m.time}
            </button>
          ))}
        </div>

        <div
          key={active}
          className="animate-fade-in relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#8a4a3a]/60 to-brand-red-dark px-6 py-16 sm:px-10"
        >
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white/10"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white/10"
          >
            ›
          </button>

          <p className="font-display font-black text-3xl font-semibold">{moment.time}</p>
          <h3 className="font-display font-black mt-2 text-2xl">{moment.title}</h3>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90">
            {moment.copy}
          </p>
        </div>
      </div>
    </section>
  );
}
