"use client";

import { useState } from "react";

type Store = {
  name: string;
  address: string;
};

const STORES: Store[] = [
  { name: "Kifayah Supermarket - Metroville", address: "Metroville, S.I.T.E Area, Karachi, Sindh, 75700, Pakistan" },
  { name: "Kifayah Supermarket - Clifton", address: "Clifton, Karachi, Sindh, 75600, Pakistan" },
  { name: "Kifayah Supermarket - Khalid Bin Waleed Road", address: "Khalid Bin Waleed Road, PECHS, Karachi, Sindh, 75400, Pakistan" },
  { name: "Lala's Super Market - Sariab Road", address: "Sariab Road, Quetta, Balochistan, 87300, Pakistan" },
  { name: "MDS Supermarket - Toghi Road", address: "Toghi Road, Quetta, Balochistan, 87300, Pakistan" },
  { name: "National Mart - Hala Naka", address: "Hala Naka, near Solangi Petrol Pump, Hyderabad, Sindh, 71000, Pakistan" },
  { name: "Al-Fatah - Gilgit", address: "River View Road, Gilgit, Gilgit-Baltistan, 15100, Pakistan" },
  { name: "AGS Super Mart - Gilgit", address: "Jutial, Shahrah-e-Quaid-e-Azam, Gilgit, Gilgit-Baltistan, 15100, Pakistan" },
  { name: "Italian Express - Abbottabad", address: "Supply Bazaar, Mansehra Road, Abbottabad, Khyber Pakhtunkhwa, 22010, Pakistan" },
];

const RADII = ["5 kilometers", "10 kilometers", "20 kilometers", "50 kilometers"];

const SEARCH_TYPES = ["Location", "Store name"];

export default function StoreLocator() {
  const [radius, setRadius] = useState(RADII[2]);
  const [radiusOpen, setRadiusOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState(SEARCH_TYPES[0]);
  const [typeOpen, setTypeOpen] = useState(false);

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
      <div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setTypeOpen((v) => !v)}
              className="flex h-full items-center gap-1 rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm"
            >
              {searchType}
              <span className="text-xs">▾</span>
            </button>
            {typeOpen && (
              <div className="absolute z-10 mt-1 w-36 rounded-md bg-white text-brand-black shadow-lg">
                {SEARCH_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSearchType(t);
                      setTypeOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-brand-red/10"
                  >
                    {t}
                    {t === searchType && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchType === "Location" ? "City or area" : "Store name"}
            className="w-full rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-brand-gold focus:outline-none"
          />
        </div>
        <button className="mt-2 text-xs font-medium text-brand-gold underline underline-offset-2">
          Use my location
        </button>

        <div className="relative mt-5">
          <label className="text-xs font-semibold uppercase tracking-wide text-white/70">
            Radius: {radius}
          </label>
          <button
            onClick={() => setRadiusOpen((v) => !v)}
            className="mt-2 flex w-full items-center justify-between rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm"
          >
            {radius}
            <span className="text-xs">▾</span>
          </button>
          {radiusOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md bg-white text-brand-black shadow-lg">
              {RADII.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRadius(r);
                    setRadiusOpen(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-brand-red/10"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button className="rounded-md bg-brand-gold px-6 py-2 text-sm font-semibold text-brand-black transition hover:bg-brand-gold-dark">
            Search
          </button>
          <button
            aria-label="Reset"
            className="rounded-md border border-white/40 px-3 py-2 text-sm"
            onClick={() => setQuery("")}
          >
            ↺
          </button>
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/70">
          Store list ({STORES.length} results)
        </p>
        <div className="mt-2 max-h-96 divide-y divide-white/15 overflow-y-auto pr-2">
          {STORES.map((s) => (
            <div key={s.name} className="py-4">
              <p className="text-sm font-semibold">{s.name}</p>
              <p className="mt-1 text-xs text-white/80">{s.address}</p>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  s.address
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-xs font-semibold text-brand-gold underline underline-offset-2"
              >
                Directions
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-[420px] overflow-hidden rounded-md">
        <iframe
          title="Store locator map"
          className="h-full min-h-[420px] w-full border-0"
          src="https://maps.google.com/maps?q=Pakistan&z=5&output=embed"
          loading="lazy"
        />
      </div>
    </div>
  );
}
