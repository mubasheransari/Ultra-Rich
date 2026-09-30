import FeaturedThisMonth from "@/components/FeaturedThisMonth";

const STEPS = [
  { n: 1, title: "Purchase Ultra Rich products" },
  { n: 2, title: "Earn entries based on your shopping value" },
  { n: 3, title: "Enter the monthly draw for the prize" },
];

const ENTRY_TABLE = [
  { amount: "Rs 1,000/-", entries: "5 Entries" },
  { amount: "Rs 2,000/-", entries: "10 Entries" },
  { amount: "Rs 3,000/-", entries: "15 Entries" },
  { amount: "Rs 5,000/-", entries: "25 Entries" },
  { amount: "Rs 10,000/-", entries: "50 Entries" },
];

const WHY_PARTICIPATE = [
  { icon: "🎁", text: "Exclusive Ultra Rich rewards every month" },
  { icon: "🎟️", text: "More purchases unlock more chances to win" },
  { icon: "🛒", text: "Automatic entry through qualifying purchases" },
];

export default function UltraRichWorldPage() {
  return (
    <section className="bg-red-textured pb-16 pt-12 text-white">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <h1 className="font-display font-black text-3xl sm:text-4xl">
          Ode to Your Ultra Rich Taste
        </h1>
        <p className="mt-3 text-sm text-white/85 sm:text-base">
          Get ready to win Ultra Rich prizes with every purchase
        </p>

        <h2 className="font-display font-black mt-14 text-2xl">Featured This Month</h2>
        <FeaturedThisMonth />

        <h2 className="font-display font-black mt-16 text-2xl">How to Participate</h2>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-2">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-2 px-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white font-display text-lg">
                  {s.n}
                </div>
                <p className="max-w-[10rem] text-sm">{s.title}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span className="hidden text-xl text-white/60 sm:inline">→</span>
              )}
            </div>
          ))}
        </div>
        <button className="mt-8 rounded-md bg-brand-gold px-8 py-3 text-sm font-semibold text-brand-black transition hover:bg-brand-gold-dark">
          Participate Now
        </button>

        <h2 className="font-display font-black mt-16 text-2xl">Entry Points System</h2>
        <div className="mx-auto mt-8 max-w-xl overflow-hidden rounded-md border border-white/25">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-red-dark">
                <th className="px-4 py-3 text-left font-semibold">Purchase Amount</th>
                <th className="px-4 py-3 text-left font-semibold">Entries</th>
              </tr>
            </thead>
            <tbody>
              {ENTRY_TABLE.map((row, i) => (
                <tr
                  key={row.amount}
                  className={i % 2 === 0 ? "bg-white/0" : "bg-white/5"}
                >
                  <td className="border-t border-white/15 px-4 py-3 text-left">
                    {row.amount}
                  </td>
                  <td className="border-t border-white/15 px-4 py-3 text-left">
                    {row.entries}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-white/70">
          For every Rs. 1,000 spent, you will receive 5 entries.
        </p>

        <h2 className="font-display font-black mt-16 text-2xl">Why Participate?</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {WHY_PARTICIPATE.map((p) => (
            <div
              key={p.text}
              className="flex flex-col items-center gap-3 rounded-md border border-white/25 px-5 py-8 text-sm font-medium"
            >
              <span className="text-2xl">{p.icon}</span>
              {p.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
