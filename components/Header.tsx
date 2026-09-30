"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LANGUAGES, useLanguage } from "./LanguageProvider";

const NAV_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/products" },
  { label: "Ultra Rich World", href: "/ultra-rich-world" },
  { label: "Grow With Us", href: "/grow-with-us" },
  { label: "Where to Find Us", href: "/where-to-find-us" },
  { label: "Contact Us", href: "/contact-us" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", open);
    return () => document.body.classList.remove("mobile-nav-open");
  }, [open]);

  const headerClass =
    isHomePage && !scrolled
      ? "bg-[#8f1420]/45 backdrop-blur-md"
      : "bg-[#8f1117]/96 backdrop-blur-md";

  const closeMenu = () => {
    setOpen(false);
    setLangOpen(false);
  };

  const selectLanguage = (code: string) => {
    setLanguage(code);
    setLangOpen(false);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] border-b border-white/10 transition-colors duration-300 ${headerClass}`}
    >
      <div className="mx-auto flex h-[72px] w-full items-center px-4 sm:h-[82px] sm:px-7 lg:h-[101px] lg:px-12 xl:px-20">
        <Link
          href="/"
          aria-label="Mezan Ultra Rich"
          onClick={closeMenu}
          className="notranslate relative z-[75] flex h-[54px] w-[86px] shrink-0 items-center sm:h-[62px] sm:w-[104px] lg:h-[70px] lg:w-[120px]"
          translate="no"
        >
          <Image
            src="/logo.avif"
            alt="Mezan Ultra Rich"
            width={150}
            height={54}
            priority
            unoptimized
            className="block h-auto max-h-[52px] w-auto max-w-full object-contain sm:max-h-[58px] lg:max-h-[68px]"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-8 2xl:gap-10" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[15px] font-semibold text-white/95 transition-colors duration-200 hover:text-brand-gold xl:text-[16px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((value) => !value)}
              className="flex min-h-10 items-center gap-2 text-[16px] font-semibold text-white/95 transition hover:text-brand-gold"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <span translate="no" className="notranslate">{language.nativeLabel}</span>
              <Chevron open={langOpen} />
            </button>

            {langOpen && (
              <div translate="no" className="notranslate absolute right-0 top-full mt-3 max-h-[70vh] w-60 overflow-y-auto rounded-2xl border border-black/10 bg-white p-2 text-brand-black shadow-2xl" role="listbox">
                {LANGUAGES.map((item) => (
                  <button
                    type="button"
                    key={item.code}
                    onClick={() => selectLanguage(item.code)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-[14px] transition ${item.code === language.code ? "bg-brand-red/10 text-brand-red" : "hover:bg-black/[0.04]"}`}
                    role="option"
                    aria-selected={item.code === language.code}
                  >
                    <span>{item.nativeLabel}</span>
                    <span className="text-xs text-black/45">{item.label}</span>
                    {item.code === language.code && <span className="text-brand-red">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="button" aria-label="Search" className="text-white/95 transition hover:text-brand-gold">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <button type="button" aria-label="Account" className="text-white/95 transition hover:text-brand-gold">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/15 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => {
            setOpen((value) => !value);
            setLangOpen(false);
          }}
        >
          {open ? (
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 top-[72px] bg-black/35 backdrop-blur-[2px] sm:top-[82px] lg:hidden"
            onClick={closeMenu}
          />

          <div
            id="mobile-navigation"
            ref={menuRef}
            className="relative max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-[#74131b]/98 px-4 pb-7 pt-3 shadow-2xl sm:max-h-[calc(100dvh-82px)] sm:px-7 lg:hidden"
          >
            <nav className="mx-auto max-w-xl" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-[50px] items-center justify-between border-b border-white/10 py-3 text-[15px] font-semibold text-white/95 transition hover:text-brand-gold"
                  onClick={closeMenu}
                >
                  <span>{link.label}</span>
                  <span className="text-white/35">→</span>
                </Link>
              ))}

              <div translate="no" className="notranslate pt-5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3.5 text-left text-white"
                  onClick={() => setLangOpen((value) => !value)}
                  aria-expanded={langOpen}
                >
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">Language</span>
                    <span className="mt-1 block text-[15px] font-semibold">{language.nativeLabel}</span>
                  </span>
                  <Chevron open={langOpen} />
                </button>

                {langOpen && (
                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/10 p-2 sm:grid-cols-3">
                    {LANGUAGES.map((item) => (
                      <button
                        type="button"
                        key={item.code}
                        onClick={() => selectLanguage(item.code)}
                        className={`min-h-11 rounded-xl border px-3 py-2 text-left text-sm transition ${item.code === language.code ? "border-brand-gold bg-brand-gold/10 text-brand-gold" : "border-white/10 text-white/85 hover:border-white/25 hover:bg-white/5"}`}
                      >
                        {item.nativeLabel}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
