"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlobalCard from "../shared/GlobalCard";
import { DIR_DATA } from "../../lib/data/directoryData";

export default function DirectorySection() {
  const availableCountries = Object.keys(DIR_DATA);
  const [currentCountry, setCurrentCountry] = useState(availableCountries[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("roamly_auth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed?.isAuthenticated) {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.warn("Failed to parse auth data from localStorage", e);
      }
    }
  }, []);

  const items = DIR_DATA[currentCountry] || [];

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#15201f]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
          Browse the directory
        </h2>
        <Link
          href="/countries"
          className="text-[#1e40af] font-bold text-[14px] hover:underline cursor-pointer"
        >
          See all countries
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
        {availableCountries.map((c) => (
          <button
            key={c}
            onClick={() => setCurrentCountry(c)}
            className={`flex-none border rounded-3xl px-3.5 py-2 text-[14px] font-semibold transition-colors ${
              c === currentCountry
                ? "bg-[#1e40af] text-white border-[#1e40af]"
                : "bg-white border-[#e7e1d6] text-[#15201f] hover:bg-[#dbeafe]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {!isLoggedIn && (
        <div className="bg-[#dbeafe] text-[#1e40af] rounded-xl p-4 text-[13px] font-medium mb-6">
          You are browsing as a visitor. You can see photos only. Become a guest and unlock names, hours, contacts and booking for every host in every country.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <GlobalCard
            key={item.seed}
            title={item.name}
            category={item.cat}
            hours={item.hours}
            phone={item.phone}
            locked={!isLoggedIn}
            seed={item.seed}
          />
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-[#6b7b79] py-8">No hosts found for {currentCountry}.</div>
        )}
      </div>

      {!isLoggedIn && (
        <div className="bg-[#172554] text-white rounded-[18px] p-6 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h3 className="text-[22px] mb-1.5" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Unlock the full directory</h3>
            <p className="opacity-90 text-[14px] max-w-107.5">
              See every host in every country, get contacts and hours, and book your full trip from one place.
            </p>
          </div>
          <div className="text-left md:text-right w-full md:w-auto shrink-0">
            <div className="text-[28px] font-extrabold">$9.99 <small className="text-[13px] font-semibold opacity-80">/ month</small></div>
            <Link href="/signup" className="inline-block mt-3 w-full sm:w-auto bg-[#2563eb] text-white text-center rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm">
              Start now
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
