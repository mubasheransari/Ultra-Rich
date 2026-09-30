export default function BornInHighlands() {
  return (
    <section className="relative overflow-hidden py-24 text-center text-white">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/highlands.mp4"
        poster="/backgrounds/tea-field.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 -z-10 bg-black/25" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-6">
        <h2 className="font-display font-black text-3xl sm:text-4xl">Born in highlands</h2>
        <p className="mt-6 text-sm leading-relaxed text-white/95 sm:text-base">
          Since you deserve an Ultra Rich experience, we have endeavored to provide you
          with it. In Kenya&apos;s celebrated highlands, nature patiently nurtures the
          depth and character that make every cup of Ultra Rich so distinctive. When the
          leaves reach their finest expression, they are carefully selected and expertly
          crafted to preserve all that the land has given them. What arrives in your cup
          is more than tea. It is the result of a place, a process, and a commitment to
          creating something that feels unmistakably Ultra Rich.
        </p>
      </div>
    </section>
  );
}
