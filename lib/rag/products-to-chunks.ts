import { products } from "../products";
import type { KnowledgeChunk } from "./types";

/**
 * Turns the live product catalog (lib/products.ts) into knowledge chunks, so the
 * chat assistant always quotes the same prices/sizes shown on the actual site —
 * there is no separate copy of this data to keep in sync.
 */
export function productsToChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  const overview = products
    .map((p) => `- ${p.name} (from Rs ${p.price}) — sizes: ${p.sizes.map((s) => s.label).join(", ")}`)
    .join("\n");
  chunks.push({
    id: "product:overview",
    source: "lib/products.ts",
    title: "Product Range — All Products at a Glance",
    text: `Product Range — All Products at a Glance\n\nMezan Ultra Rich currently sells these products:\n\n${overview}`,
  });

  for (const p of products) {
    const sizeLines = p.sizes.map((s) => `  - ${s.label}: Rs ${s.price.toFixed(2)}`).join("\n");
    const text = [
      `${p.name} — Product Details`,
      "",
      `Description: ${p.description}`,
      "",
      `Available sizes and prices:`,
      sizeLines,
      "",
      `Starting price: Rs ${p.price.toFixed(2)}`,
      `Product page: /products/${p.slug}`,
    ].join("\n");

    chunks.push({
      id: `product:${p.slug}`,
      source: "lib/products.ts",
      title: `${p.name} — Product Details`,
      text,
    });
  }

  return chunks;
}
