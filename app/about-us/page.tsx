export default function AboutUsPage() {
  return (
    <section className="bg-red-textured py-16 text-center text-white">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-display font-black text-3xl sm:text-4xl">What is Ultra Rich?</h1>
        <p className="mt-3 text-sm text-white/85 sm:text-base">
          A standard of excellence. A lifestyle of intention.
        </p>

        <h2 className="font-display font-black mt-14 text-2xl sm:text-3xl">Our Ethos</h2>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/90 sm:text-base">
          <p>
            For most, being &quot;Ultra Rich&quot; means material wealth; a sleek
            sportscar, expensive jewelry, or luxury possessions.
          </p>
          <p>For Mezan, Ultra Rich is a standard of excellence in everything we do.</p>
          <div className="space-y-1 font-medium">
            <p>Our tea is Ultra Rich in Color, Taste, and Aroma.</p>
            <p>We savor Ultra Rich relationships.</p>
            <p>We celebrate Ultra Rich moments.</p>
            <p>We strive to uphold Ultra Rich values.</p>
          </div>
          <p>
            True richness isn&apos;t something you display, it is something you
            cultivate. It is found in the deliberate choices you make, the deep
            connections you protect, and the uncompromising quality you bring to every
            single day.
          </p>
          <p>
            That same philosophy guides every cup of Mezan Ultra Rich. Crafted for
            those who appreciate depth, character, and excellence in the details, it
            transforms an everyday ritual into a moment worth savoring.
          </p>
          <p className="font-display font-black text-lg">
            Jin Ka Taste Ultra Rich, Unki Choice Ultra Rich.
          </p>
        </div>

        <div className="mx-auto mt-12 aspect-video max-w-xl overflow-hidden rounded-lg bg-black/40">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed?listType=user_uploads&list=UltraRich"
            title="Mezan Ultra Rich"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="mt-2 text-xs text-white/60">
          Replace the embed src above with your channel&apos;s actual video ID.
        </p>
      </div>
    </section>
  );
}
