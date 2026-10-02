import Image from "next/image";
import Link from "next/link";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Mezan-UltraRich/61592985491801/?rdid=n2ZFIutaR8HTrDaT&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F198mbvxGjV%2F",
    path: "M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mezanultrarich?igsi=bmcyNTBiNzIwZWY2",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.5 6a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 17.5 6Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@MezanUltraRich",
    path: "M23 12s0-3.6-.5-5.2a2.9 2.9 0 0 0-2-2C18.8 4.3 12 4.3 12 4.3s-6.8 0-8.5.5a2.9 2.9 0 0 0-2 2C1 8.4 1 12 1 12s0 3.6.5 5.2a2.9 2.9 0 0 0 2 2c1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5a2.9 2.9 0 0 0 2-2C23 15.6 23 12 23 12ZM10 15.5v-7l6 3.5-6 3.5Z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@mezan.ultra.rich?_r=1&_t=ZS-97rCPle1iIT",
    path: "M19.5 7.2a5.8 5.8 0 0 1-3.4-1.1v7.1a5.8 5.8 0 1 1-5-5.7v3a2.8 2.8 0 1 0 2 2.7V2h3a5.8 5.8 0 0 0 3.4 2.8v2.4Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mezan-tea/",
    path: "M5 3.5A2.5 2.5 0 1 1 5 8.5 2.5 2.5 0 0 1 5 3.5ZM2.8 10h4.4v11H2.8V10Zm7 0h4.2v1.5h.1c.6-1 1.9-2 4-2 4.3 0 5.1 2.8 5.1 6.4V21h-4.4v-4.5c0-1.1 0-2.5-1.6-2.5s-1.9 1.2-1.9 2.4V21H9.8V10Z",
  },
];

const FEATURE_ITEMS = [
  {
    image: "/1-free-delivery.webp",
    alt: "Free Delivery",
    title: "Free Delivery",
    subtitle: "Nationwide - All Orders",
  },
  {
    image: "/2-freshness-seal.webp",
    alt: "Freshness Seal",
    title: "Freshness Seal",
    subtitle: "Packed in Aseptic Material",
  },
  {
    image: "/3-single-estate.webp",
    alt: "Single Estate",
    title: "Single Estate",
    subtitle: "Nandi Hills, Kenya",
  },
  {
    image: "/4-returns.webp",
    alt: "Returns",
    title: "Returns",
    subtitle: "7-Day Satisfaction Promise",
  },
];

const FOOTER_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Return & Refund Policy",
  "Shipping policy",
  "Contact Information",
  "Legal Notice",
  "Contact Us",
];

export default function Footer() {
  return (
    <footer className="bg-red-textured text-white">
      {/* Feature Bar */}
      <div className="grid grid-cols-1 gap-6 bg-brand-gold px-6 py-10 text-center text-brand-black sm:grid-cols-2 md:grid-cols-4 md:px-16">
        {FEATURE_ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-2"
          >
            {/* Feature Icon */}
            <div className="flex h-20 w-58 items-center justify-center">
              <Image
                src={item.image}
                alt={item.alt}
                width={110}
                height={110}
                className="h-24 w-24 object-contain"
              />
            </div>

            {/* Heading */}
            <p className="font-display text-lg font-bold leading-tight">
              {item.title}
            </p>

            {/* Subheading */}
            <p className="-mt-1 text-sm font-normal leading-tight text-black/75">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3 md:px-16">
        {/* Address */}
        <div>
          <h4 className="font-display text-lg font-bold">
            Address
          </h4>

          <p className="mt-3 text-sm font-normal leading-relaxed text-white/70">
            Mezan Tea Pvt ltd
            <br />
            Plot No. A-22, (Portion-II),
            <br />
            Mauripur Road, S.I.T.E, Karachi, Pakistan
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg font-bold">
            Contact Us
          </h4>

          <p className="mt-3 text-sm font-normal text-white/70">
            +92 337 1046238
          </p>

          <p className="text-sm font-normal text-white/70">
            customersupport@mezangrp.com
          </p>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-display text-lg font-bold">
            Follow Us
          </h4>

          <div className="mt-4 flex flex-wrap gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-red transition-all duration-300 hover:-translate-y-1 hover:bg-brand-gold"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright / Legal */}
      <div className="border-t border-white/15 px-6 py-6 text-center text-xs font-normal text-white/60 md:px-16">
        <p>
          © 2026 Ultra Rich. All rights reserved.
        </p>

        <p className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1">
          {FOOTER_LINKS.map((item, index, array) => (
            <span key={item}>
              <Link
                href={item === "Contact Us" ? "/contact-us" : "#"}
                className="underline underline-offset-2 transition hover:text-white"
              >
                {item}
              </Link>

              {index < array.length - 1 && (
                <span className="mx-1">I</span>
              )}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}