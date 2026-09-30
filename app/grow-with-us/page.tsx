import CareerAccordion from "@/components/CareerAccordion";

const VALUES = [
  {
    title: "Excellence",
    icon: "🏅",
    description: "A commitment to quality in everything we do",
  },
  {
    title: "Connection",
    icon: "🔗",
    description: "Celebrating relationships, conversations, and togetherness",
  },
  {
    title: "Appreciation",
    icon: "🙌",
    description: "Finding richness in everyday moments",
  },
  {
    title: "Distinction",
    icon: "🏆",
    description: "Choosing a higher standard and refusing to settle for ordinary",
  },
];

export default function GrowWithUsPage() {
  return (
    <section className="bg-red-textured pb-16 pt-12 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <h1 className="font-display font-black text-3xl sm:text-4xl">
          Join the Ultra Rich Family
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
          We believe great brands are built by great people. We are passionate about
          quality, innovation, and excellence in everything we do.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
          Whether you are an established professional or a rising talent looking to
          define your career, we offer the space to cultivate your craft, challenge
          conventions, and lead with distinction.
        </p>

        <h2 className="font-display font-black mt-14 text-2xl">Our Values</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="flex flex-col items-center gap-3 rounded-md border border-white/25 px-4 py-8 text-sm"
            >
              <span className="text-2xl">{v.icon}</span>
              <span className="font-display font-black text-base font-semibold not-italic">
                {v.title}
              </span>
              <span className="text-xs text-white/80">{v.description}</span>
            </div>
          ))}
        </div>

        <h2 className="font-display font-black mt-16 text-2xl">Current Opportunities</h2>
        <CareerAccordion />
      </div>
    </section>
  );
}
