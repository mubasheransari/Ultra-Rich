"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductDetail({
  product,
}: {
  product: Product;
}) {
  const [sizeIdx, setSizeIdx] = useState(0);

  const size = product.sizes[sizeIdx];

  return (
    <main className="bg-red-textured text-white">
      {/* =====================================================
          PRODUCT DETAIL
      ===================================================== */}
      <section className="relative overflow-hidden pb-24 pt-12 sm:pt-16 lg:pb-32">
        {/* Decorative circles */}
        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-20
            h-[500px]
            w-[500px]
            rounded-full
            border
            border-brand-gold/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            bottom-0
            h-[500px]
            w-[500px]
            rounded-full
            border
            border-brand-gold/10
          "
        />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 xl:px-20">
          {/* =================================================
              BREADCRUMB
          ================================================= */}
          <nav className="text-xs text-white/50">
            <Link
              href="/products"
              className="transition hover:text-brand-gold"
            >
              Products
            </Link>

            <span className="mx-3 text-brand-gold/70">
              /
            </span>

            <span className="text-white/75">
              {product.name}
            </span>
          </nav>

          {/* =================================================
              PRODUCT
          ================================================= */}
          <div
            className="
              mt-10
              grid
              grid-cols-1
              items-center
              gap-12
              lg:grid-cols-2
              lg:gap-20
          "
          >
            {/* =================================================
                IMAGE
            ================================================= */}
            <div
              className="
                relative
                flex
                min-h-[520px]
                items-center
                justify-center
                sm:min-h-[600px]
                lg:min-h-[680px]
              "
            >
              {/* Soft background */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[360px]
                  w-[360px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-black/10
                  blur-3xl
                "
              />

              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={750}
                priority
                className="
                  relative
                  z-10
                  max-h-[620px]
                  w-auto
                  max-w-full
                  object-contain
                  drop-shadow-[0_35px_40px_rgba(0,0,0,0.35)]
                "
              />
            </div>

            {/* =================================================
                INFORMATION
            ================================================= */}
            <div className="max-w-xl">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-brand-gold
                "
              >
                Mezan Ultra Rich
              </p>

              <h1
                className="
                  mt-4
                  font-display
                  text-4xl
                  font-black
                  leading-tight
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {product.name}
              </h1>

              <div className="mt-6 h-px w-16 bg-brand-gold" />

              <p
                className="
                  mt-7
                  text-2xl
                  font-semibold
                  text-brand-gold
                "
              >
                Rs {size.price.toFixed(2)}
              </p>

              <p
                className="
                  mt-7
                  max-w-lg
                  text-sm
                  leading-8
                  text-white/70
                  sm:text-base
                "
              >
                {product.description}
              </p>

              {/* =================================================
                  SIZE
              ================================================= */}
              <div className="mt-9">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  Select Size
                </p>

                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setSizeIdx(index)}
                      className={`
                        min-w-[90px]
                        border
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        transition-all
                        duration-300
                        ${
                          index === sizeIdx
                            ? "border-brand-gold bg-brand-gold text-brand-black"
                            : "border-white/30 text-white hover:border-brand-gold hover:text-brand-gold"
                        }
                      `}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* =================================================
                  ACTION
              ================================================= */}
              <div className="mt-10 flex flex-wrap gap-4">
                {/* <button
                  type="button"
                  className="
                    min-w-[190px]
                    border
                    border-brand-gold
                    bg-brand-gold
                    px-7
                    py-4
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-brand-black
                    transition
                    hover:bg-transparent
                    hover:text-brand-gold
                  "
                >
                  Add to Cart
                </button> */}

                <Link
                  href="/products"
                  className="
                    min-w-[150px]
                    border
                    border-white/30
                    px-7
                    py-4
                    text-center
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white
                    transition
                    hover:border-brand-gold
                    hover:text-brand-gold
                  "
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}