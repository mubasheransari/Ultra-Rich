"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const SORTS = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Alphabetical",
];

export default function ProductsPage() {
  const [sort, setSort] = useState(SORTS[0]);
  const [sortOpen, setSortOpen] = useState(false);

  const sorted = [...products].sort((a, b) => {
    if (sort === "Price: Low to High") {
      return a.price - b.price;
    }

    if (sort === "Price: High to Low") {
      return b.price - a.price;
    }

    if (sort === "Alphabetical") {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  return (
    <main className="bg-red-textured text-white">
      {/* =====================================================
          HERO / INTRO
      ===================================================== */}
      <section className="relative overflow-hidden pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        {/* Decorative background */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.12]
          "
        >
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full border border-brand-gold/30" />
          <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full border border-brand-gold/20" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 text-center sm:px-10 lg:px-16">
          <p
            className="
              mb-5
              text-xs
              font-semibold
              uppercase
              tracking-[0.35em]
              text-brand-gold
              sm:text-sm
            "
          >
            Mezan Ultra Rich
          </p>

          <h1
            className="
              mx-auto
              max-w-4xl
              font-display
              text-4xl
              font-black
              leading-[1.05]
              sm:text-5xl
              lg:text-7xl
            "
          >
            The leaf is the canvas.
            <br />
            <span className="text-brand-gold">
              The cup is the gallery.
            </span>
          </h1>

          <div className="mx-auto mt-7 h-px w-20 bg-brand-gold/70" />

          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              text-sm
              leading-7
              text-white/75
              sm:text-base
              sm:leading-8
            "
          >
            Every detail matters when creating something memorable.
            Smooth, full-bodied and quietly indulgent, Ultra Rich brings
            together richness, depth and satisfaction in every cup.
          </p>

          <a
            href="#selection"
            className="
              mt-9
              inline-flex
              items-center
              gap-3
              border
              border-brand-gold
              px-7
              py-3.5
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-brand-gold
              transition-all
              duration-300
              hover:bg-brand-gold
              hover:text-brand-black
            "
          >
            Shop the Selection

            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* =====================================================
          PRODUCT COLLECTION
      ===================================================== */}
      <section
        id="selection"
        className="
          relative
          overflow-hidden
          border-t
          border-white/10
          pb-24
          pt-8
          sm:pb-28
        "
      >
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16 xl:px-20">
          {/* Collection header */}
          <div
            className="
              flex
              flex-col
              gap-5
              border-b
              border-white/15
              pb-6
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">
                The Collection
              </p>

              <h2 className="mt-2 font-display text-2xl font-black sm:text-3xl lg:text-4xl">
                Our Selection
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/60">
              Discover every expression of Mezan Ultra Rich, crafted for
              different moments, rituals and ways of enjoying your tea.
            </p>
          </div>

          {/* =================================================
              FILTER / SORT
          ================================================= */}
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
              border-b
              border-white/10
              py-5
            "
          >
            <div className="flex items-center gap-6">
              <button
                type="button"
                className="
                  text-sm
                  font-medium
                  text-white/75
                  transition
                  hover:text-brand-gold
                "
              >
                Availability
                <span className="ml-2 text-xs">⌄</span>
              </button>

              <button
                type="button"
                className="
                  text-sm
                  font-medium
                  text-white/75
                  transition
                  hover:text-brand-gold
                "
              >
                Price
                <span className="ml-2 text-xs">⌄</span>
              </button>
            </div>

            <div className="flex items-center gap-5">
              <span className="text-sm text-white/45">
                {products.length} items
              </span>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen((v) => !v)}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-white/80
                    transition
                    hover:text-brand-gold
                  "
                >
                  Sort
                  <span className="text-xs">⌄</span>
                </button>

                {sortOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      z-30
                      mt-3
                      w-56
                      overflow-hidden
                      border
                      border-black/10
                      bg-white
                      text-brand-black
                      shadow-2xl
                    "
                  >
                    {SORTS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSort(item);
                          setSortOpen(false);
                        }}
                        className={`
                          block
                          w-full
                          px-4
                          py-3
                          text-left
                          text-sm
                          transition
                          hover:bg-brand-red/10
                          ${
                            item === sort
                              ? "font-bold text-brand-red"
                              : ""
                          }
                        `}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              PRODUCTS
          ================================================= */}
          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-x-6
              gap-y-14
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-5
            "
          >
            {sorted.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}