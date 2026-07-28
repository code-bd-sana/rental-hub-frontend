"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { countryApi } from "../../lib/api/countries";

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [countries, setCountries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await countryApi.getAllCountries();
        if (response?.data) {
          setCountries(response.data);
        }
      } catch (err) {
        console.error("Failed to load countries:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filtered = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-16">
      <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <h2 className="text-[28px] md:text-3xl font-bold text-[#15201f]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Where do you want to go?
          </h2>
          {!isLoading && (
            <span className="text-sm font-semibold text-[#6b7b79] mt-2 sm:mt-0 uppercase tracking-wide">
              {countries.length} countries
            </span>
          )}
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

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e9e72]"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filtered.map(c => {
                const isAvail = c.loaded > 0;
                if (isAvail) {
                  return (
                    <Link
                      key={c.id}
                      href={`/directory?country=${encodeURIComponent(c.name)}`}
                      className="bg-white rounded-[18px] p-4 shadow-[0_10px_30px_rgba(11,79,74,0.06)] block cursor-pointer hover:shadow-[0_10px_30px_rgba(11,79,74,0.12)] hover:-translate-y-0.5 transition-all"
                    >
                      <div className="text-[32px] mb-2 leading-none">🌍</div>
                      <h3 className="font-bold text-[#15201f] text-[16px] mb-1 line-clamp-1">{c.name}</h3>
                      <div className="text-[13px] text-[#6b7b79] mb-3">{c.loaded} hosts listed</div>
                      <div>
                        <span className="text-[10px] font-bold text-[#1e9e72] border border-[#1e9e72] px-2 py-0.5 rounded-full uppercase tracking-wider inline-block bg-[#f0fdf4]">Available</span>
                      </div>
                    </Link>
                  );
                }

                return (
                  <div
                    key={c.id}
                    className="bg-white rounded-[18px] p-4 shadow-[0_10px_30px_rgba(11,79,74,0.06)] block cursor-default opacity-90"
                  >
                    <div className="text-[32px] mb-2 leading-none">🌍</div>
                    <h3 className="font-bold text-[#15201f] text-[16px] mb-1 line-clamp-1">{c.name}</h3>
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
          </>
        )}

        <div className="text-center text-[#6b7b79] text-[12px] font-semibold pt-16 uppercase tracking-wider">
          Roamly is loading up to 150 hosts in each country.
        </div>
      </div>
    </div>
  );
}
