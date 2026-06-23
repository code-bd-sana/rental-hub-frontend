"use client";

import { useState } from "react";
import Link from "next/link";

const COUNTRIES_ALL = [
  "Guyana", "Trinidad and Tobago", "Barbados", "Jamaica", "Saint Lucia", 
  "Grenada", "Dominica", "Antigua and Barbuda", "Saint Vincent and the Grenadines", 
  "Saint Kitts and Nevis", "Bahamas", "Dominican Republic", "Haiti", "Cuba", 
  "Belize", "Curacao", "Aruba", "Bermuda", "Cayman Islands", "Puerto Rico", 
  "Brazil", "Argentina", "Chile", "Peru", "Colombia", "Venezuela", "Ecuador", 
  "Bolivia", "Paraguay", "Uruguay", "Mexico", "Panama", "Costa Rica", "Nicaragua", 
  "Honduras", "Guatemala", "El Salvador", "United States", "Canada", "Greenland", 
  "United Kingdom", "Ireland", "France", "Germany", "Netherlands"
];

const AVAILABLE_COUNTRIES = [
  "Jamaica", "Guyana", "Trinidad and Tobago", "Barbados", "Bahamas", "United States"
];

export default function CountriesPage() {
  const [search, setSearch] = useState("");

  const filtered = COUNTRIES_ALL.filter(c => 
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-16">
      <div className="max-w-7xl mx-auto pt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <h2 className="text-[28px] md:text-3xl font-bold text-[#15201f]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Where do you want to go?
          </h2>
          <span className="text-sm font-semibold text-[#6b7b79] mt-2 sm:mt-0 uppercase tracking-wide">
            {COUNTRIES_ALL.length} countries
          </span>
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Search a country"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79] shadow-sm"
          />
        </div>

        <div className="bg-[#dbeafe] text-[#1e40af] rounded-xl p-4 text-[13px] font-medium mb-8">
          Countries marked available are live now. The rest are being loaded during our rollout. Tap an available country to browse its directory.
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(c => {
            const isAvail = AVAILABLE_COUNTRIES.includes(c);
            if (isAvail) {
              return (
                <Link
                  key={c}
                  href={`/directory?country=${encodeURIComponent(c)}`}
                  className={`bg-white rounded-[18px] p-4 shadow-[0_10px_30px_rgba(11,79,74,0.06)] block cursor-pointer hover:shadow-[0_10px_30px_rgba(11,79,74,0.12)] hover:-translate-y-0.5 transition-all`}
                >
                  <div className="text-[32px] mb-2 leading-none">🌍</div>
                  <h3 className="font-bold text-[#15201f] text-[16px] mb-1 line-clamp-1">{c}</h3>
                  <div className="text-[13px] text-[#6b7b79] mb-3">10 hosts listed</div>
                  <div>
                    <span className="text-[10px] font-bold text-[#1e9e72] border border-[#1e9e72] px-2 py-0.5 rounded-full uppercase tracking-wider inline-block bg-[#f0fdf4]">Available</span>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={c}
                className={`bg-white rounded-[18px] p-4 shadow-[0_10px_30px_rgba(11,79,74,0.06)] block cursor-default opacity-90`}
              >
                <div className="text-[32px] mb-2 leading-none">🌍</div>
                <h3 className="font-bold text-[#15201f] text-[16px] mb-1 line-clamp-1">{c}</h3>
                <div className="text-[13px] text-[#6b7b79] mb-3">Being loaded</div>
                <div>
                  <span className="text-[10px] font-bold text-[#6b7b79] border border-[#e7e1d6] px-2 py-0.5 rounded-full uppercase tracking-wider inline-block bg-[#f8fafc]">Coming soon</span>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#6b7b79]">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-[15px] font-medium">No countries found matching {search}</p>
          </div>
        )}

        <div className="text-center text-[#6b7b79] text-[12px] font-semibold pt-16 uppercase tracking-wider">
          Roamly is loading up to 150 hosts in each country.
        </div>
      </div>
    </div>
  );
}
