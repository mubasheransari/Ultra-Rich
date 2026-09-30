import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import ChatWidget from "@/components/ChatWidget";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  style: ["normal"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mezan Ultra Rich | Your Taste is Ultra Rich",
  description:
    "Mezan Ultra Rich brings together richness, depth, and satisfaction in a tea experience worthy of the moments that matter most.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning={true}
        className="min-h-full bg-white font-body"
      >
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 pt-[72px] sm:pt-[82px] lg:pt-[101px]">
              {children}
            </main>

            <Footer />
          </div>

          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}