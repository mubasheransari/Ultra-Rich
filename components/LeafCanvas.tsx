import Image from "next/image";
import Link from "next/link";

export default function LeafCanvas() {
  return (
    <section className="relative overflow-hidden py-24 text-center text-white">
      <Image
        src="/backgrounds/tea-leaves.jpg"
        alt="Tea leaves on a dark background"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-6">
        <h2 className="font-display font-black text-3xl leading-snug sm:text-4xl">
          The leaf is the canvas
          <br />
          The cup is the gallery
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-white/90 sm:text-base">
          Every detail matters when creating something memorable. Smooth, full-bodied,
          and quietly indulgent, Ultra Rich brings a feel that is both comforting and
          refined. From the first pour to the last sip, it doesn&apos;t just create a
          cup of tea; it lingers like an experience worth remembering.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-md bg-brand-red px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-red-light"
        >
          Shop the Selection
        </Link>
      </div>
    </section>
  );
}
