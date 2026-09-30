import Image from "next/image";

const SHADES = [
  {
    name: "Light Golden Amber",
    icon: "/icons/teacup-1.png",
    strength: "Light/Bright",
    notes: "Honey, Peach, Orange Zest, Light Malt",
  },
  {
    name: "Copper Orange",
    icon: "/icons/teacup-2.png",
    strength: "Balanced",
    notes: "Toffee, Apricot, Biscuit, Raisin",
  },
  {
    name: "Rich Red-Orange",
    icon: "/icons/teacup-3.png",
    strength: "Classic Bold",
    notes: "Blackberry, Caramel, Almond",
  },
  {
    name: "Deep Ruby Red",
    icon: "/icons/teacup-4.png",
    strength: "Robust",
    notes: "Plum, Dark Chocolate, Roasted Nuts",
  },
  {
    name: "Mahogany Brown",
    icon: "/icons/teacup-5.png",
    strength: "Intense/Strong",
    notes: "Leather, Oak, Molasses, Clove",
  },
];

export default function TeaShades() {
  return (
    <section className="bg-red-textured py-16 text-center text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <h2 className="font-display text-3xl font-black sm:text-4xl">
          Black Tea Shades
        </h2>

        <p className="mt-3 text-sm text-white/85">
          How tea color reveals flavor.
          <br />
          Simplified guide for tasting.
        </p>

        {/* Tea Shades */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {SHADES.map((s) => (
            <div
              key={s.name}
              className="flex min-w-0 flex-col items-center"
            >
              {/* Cup */}
              <div className="relative flex h-48 w-full items-center justify-center sm:h-52">
                <Image
                  src={s.icon}
                  alt={`${s.name} tea cup`}
                  width={240}
                  height={240}
                  className="
                    h-48
                    w-48
                    object-contain
                    sm:h-52
                    sm:w-52
                  "
                />
              </div>

              {/* Name */}
              <p className="mt-3 px-1 font-display text-sm font-black sm:text-base">
                {s.name}
              </p>

              {/* Strength */}
              <p className="mt-1 text-xs font-semibold text-brand-gold sm:text-sm">
                {s.strength}
              </p>

              {/* Notes */}
              <p className="mt-1 max-w-[180px] text-[11px] leading-relaxed text-white/80 sm:text-xs">
                {s.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}