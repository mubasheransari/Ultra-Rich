export type ProductSize = {
  label: string;
  price: number;
};

export type Product = {
  slug: string;
  name: string;
  image: string;
  price: number;
  sizes: ProductSize[];
  description: string;
};

export const products: Product[] = [
  {
    slug: "ultra-rich-pouch",
    name: "Mezan Ultra Rich - Pouch",
    image: "/products/pouch.jpg",
    price: 590,
    sizes: [
      { label: "275g", price: 590 },
      { label: "430g", price: 860 },
      { label: "900g", price: 1650 },
    ],
    description:
      "A rich, full-bodied black tea grown in the Nandi Hills of Kenya, crafted for the quiet and the loud moments of your day alike.",
  },
  {
    slug: "ultra-rich-jar",
    name: "Mezan Ultra Rich - Jar",
    image: "/products/jar.jpg",
    price: 480,
    sizes: [
      { label: "225g", price: 480 },
      { label: "440g", price: 890 },
    ],
    description:
      "The same single-estate Ultra Rich leaf, packed in a reusable jar built for the everyday kitchen counter.",
  },
  {
    slug: "ultra-rich-hard-pack",
    name: "Mezan Ultra Rich - Hard Pack",
    image: "/products/hardpack.jpg",
    price: 210,
    sizes: [
      { label: "85g", price: 210 },
      { label: "190g", price: 390 },
    ],
    description:
      "A compact, protective hard pack that keeps every leaf sealed fresh from harvest to your cup.",
  },
  {
    slug: "ultra-rich-tea-bags",
    name: "Mezan Ultra Rich - Tea Bags",
    image: "/products/teabags.jpg",
    price: 340,
    sizes: [
      { label: "25 Bags (50g)", price: 340 },
      { label: "50 Bags (100g)", price: 620 },
    ],
    description:
      "Individually sealed tea bags carrying the full Ultra Rich character, ready wherever your day takes you.",
  },
  {
    slug: "ultra-rich-green-tea-bags",
    name: "Mezan Ultra Rich - Green Tea Bags",
    image: "/products/greentea.jpg",
    price: 360,
    sizes: [
      { label: "Mint - 25 Bags (37.5g)", price: 360 },
      { label: "Lemon - 25 Bags (37.5g)", price: 360 },
    ],
    description:
      "Mint and lemon green tea from the Ultra Rich range, light, aromatic, and quietly indulgent.",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
