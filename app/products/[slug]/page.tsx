import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import ProductCarousel from "@/components/ProductCarousel";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <ProductDetail product={product} />
      <ProductCarousel exclude={product.slug} heading="You may also like" />
    </>
  );
}
