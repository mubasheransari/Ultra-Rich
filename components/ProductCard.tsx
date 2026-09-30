import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="
        group
        block
        text-center
      "
    >
      {/* =====================================================
          PRODUCT IMAGE
      ===================================================== */}
      <div
        className="
          relative
          flex
          h-[390px]
          w-full
          items-center
          justify-center
          overflow-hidden
          sm:h-[430px]
          lg:h-[470px]
        "
      >
        {/* Subtle editorial glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-64
            w-64
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-black/10
            opacity-0
            blur-3xl
            transition-all
            duration-500
            group-hover:opacity-100
          "
        />

        <Image
          src={product.image}
          alt={product.name}
          width={420}
          height={560}
          className="
            relative
            z-10
            h-[340px]
            w-auto
            max-w-full
            object-contain
            drop-shadow-[0_25px_30px_rgba(0,0,0,0.28)]
            transition-all
            duration-700
            ease-out
            group-hover:-translate-y-3
            group-hover:scale-[1.04]
            sm:h-[380px]
            lg:h-[420px]
          "
        />

        {/* View product */}
        <div
          className="
            absolute
            bottom-5
            left-1/2
            z-20
            -translate-x-1/2
            translate-y-4
            whitespace-nowrap
            border
            border-brand-gold
            bg-brand-red/95
            px-5
            py-2.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-brand-gold
            opacity-0
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          View Product
        </div>
      </div>

      {/* =====================================================
          PRODUCT NAME
      ===================================================== */}
      <div className="mt-5">
        <p
          className="
            font-display
            text-lg
            font-semibold
            leading-tight
            text-white
            transition-colors
            duration-300
            group-hover:text-brand-gold
            sm:text-xl
          "
        >
          {product.name}
        </p>

        {/* Decorative line */}
        <div
          className="
            mx-auto
            mt-3
            h-px
            w-8
            bg-brand-gold/60
            transition-all
            duration-300
            group-hover:w-14
          "
        />
      </div>
    </Link>
  );
}