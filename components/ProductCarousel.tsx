"use client";

import { useRef } from "react";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductCarousel({
  exclude,
  heading = "You may also like",
}: {
  exclude?: string;
  heading?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const list = products.filter(
    (product) => product.slug !== exclude
  );

  const scroll = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 420,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-red-textured
        py-20
        sm:py-24
      "
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* ===================================================
            HEADER
        =================================================== */}
        <div className="text-center">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-brand-gold
            "
          >
            Explore More
          </p>

          <h2
            className="
              mt-3
              font-display
              text-3xl
              font-black
              text-white
              sm:text-4xl
            "
          >
            {heading}
          </h2>

          <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
        </div>

        {/* ===================================================
            CAROUSEL
        =================================================== */}
        <div className="relative mt-12">
          <div
            ref={scrollerRef}
            className="
              flex
              gap-5
              overflow-x-auto
              scroll-smooth
              px-1
              pb-5
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {list.map((product) => (
              <div
                key={product.slug}
                className="
                  w-[270px]
                  shrink-0
                  sm:w-[300px]
                  lg:w-[330px]
                "
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* =================================================
              PREVIOUS
          ================================================= */}
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous products"
            className="
              absolute
              -left-2
              top-[42%]
              z-20
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              border
              border-white/30
              bg-brand-red/90
              text-2xl
              text-white
              shadow-xl
              backdrop-blur-sm
              transition
              hover:border-brand-gold
              hover:text-brand-gold
              sm:-left-5
            "
          >
            ‹
          </button>

          {/* =================================================
              NEXT
          ================================================= */}
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next products"
            className="
              absolute
              -right-2
              top-[42%]
              z-20
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              border
              border-white/30
              bg-brand-red/90
              text-2xl
              text-white
              shadow-xl
              backdrop-blur-sm
              transition
              hover:border-brand-gold
              hover:text-brand-gold
              sm:-right-5
            "
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}