export default function Hero() {
  return (
    <section className="relative isolate -mt-[96px] flex min-h-[100vh] items-end overflow-hidden text-white sm:min-h-[105vh] lg:min-h-[110vh]">
      {/* Background Video */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/video.mp4"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>

      {/* Readability overlay: dark at edges, red wash toward the bottom */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-transparent to-brand-red/80"
        aria-hidden
      />

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-red-dark/90 via-transparent to-transparent"
        aria-hidden
      />

      {/* Hero Content */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 pb-12 pt-32 md:grid-cols-2 md:px-10 md:pb-16">
        <h1 className="font-display font-black text-4xl leading-tight drop-shadow-lg sm:text-5xl md:text-6xl">
          Your Taste is
          <br />
          Ultra Rich
        </h1>

        <div className="space-y-4 text-sm leading-relaxed drop-shadow-md md:text-base">
          <p>
            The fact that you&apos;re here means you&apos;re tired of the ordinary and
            mundane. Because even everyday choices say something about who you are.
          </p>

          <p>
            Mezan Ultra Rich brings together richness, depth, and satisfaction in a tea
            experience worthy of the moments that matter most.
          </p>

          <p className="font-medium">
            Jin Ka Taste Ultra Rich, Unki Choice Ultra Rich.
          </p>
        </div>
      </div>
    </section>
  );
}