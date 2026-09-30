import StoreLocator from "@/components/StoreLocator";

export default function WhereToFindUsPage() {
  return (
    <section className="bg-red-textured pb-16 pt-12 text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h1 className="font-display font-black text-center text-3xl sm:text-4xl">
          Where to Find Us
        </h1>
        <StoreLocator />
      </div>
    </section>
  );
}
