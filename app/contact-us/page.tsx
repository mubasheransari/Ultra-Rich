import ContactForm from "@/components/ContactForm";

export default function ContactUsPage() {
  return (
    <section className="min-h-[calc(100vh-101px)] bg-red-textured">
      {/* Contact Hero */}
      <div className="bg-red-textured px-6 py-16 text-center text-white sm:py-20 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">
          We&apos;re here to help
        </p>

        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
          Contact Us
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
          Have a question about Ultra Rich, our products, or your tea
          experience? Send us a message and our team will be happy to help.
        </p>
      </div>

      {/* Contact Content */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-20">
        {/* Contact Information */}
        <div className="rounded-3xl bg-[#9e0d11] p-8 text-white shadow-xl sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Get in touch
          </p>

          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Let&apos;s talk tea.
          </h2>

          <p className="mt-5 text-base leading-8 text-white/85">
            Our customer support team is ready to assist with product
            questions, feedback, orders, and general enquiries.
          </p>

          <div className="mt-10 space-y-6 text-base">
            <div>
              <p className="font-semibold text-brand-gold">Phone</p>
              <p className="mt-1 text-white/90">+92 337 1046238</p>
            </div>

            <div>
              <p className="font-semibold text-brand-gold">Email</p>
              <p className="mt-1 break-all text-white/90">
                customersupport@mezangrp.com
              </p>
            </div>

            <div>
              <p className="font-semibold text-brand-gold">Address</p>
              <p className="mt-1 leading-7 text-white/90">
                Mezan Tea Pvt ltd
                <br />
                Plot No. A-22, (Portion-II),
                <br />
                Mauripur Road, S.I.T.E, Karachi, Pakistan
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-3xl bg-white p-7 shadow-lg ring-1 ring-black/5 sm:p-10">
          <h2 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">
            Send us a message
          </h2>

          <p className="mb-8 mt-3 text-base leading-7 text-black/60">
            Fill in the form below and share what you need help with.
          </p>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}