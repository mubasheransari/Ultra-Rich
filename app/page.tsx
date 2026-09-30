import Hero from "@/components/Hero";
import BornInHighlands from "@/components/BornInHighlands";
import DailyRitual from "@/components/DailyRitual";
import TeaShades from "@/components/TeaShades";
import LeafCanvas from "@/components/LeafCanvas";
import ProductCarousel from "@/components/ProductCarousel";

export default function Home() {
  return (
    <>
      <Hero />
      <BornInHighlands />
      <DailyRitual />
      <TeaShades />
      <LeafCanvas />
      <ProductCarousel heading="Our Range" />
    </>
  );
}
