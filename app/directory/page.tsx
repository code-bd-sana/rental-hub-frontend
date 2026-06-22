"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GlobalCard from "../../components/shared/GlobalCard";
import { DIR_DATA } from "../../lib/data/directoryData";

export default function DirectoryPage() {
  const searchParams = useSearchParams();
  const currentCountry = searchParams.get("country") || "Jamaica";
  const items = DIR_DATA[currentCountry] || [];
  const availableCountries = Object.keys(DIR_DATA);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("Visitor");

  useEffect(() => {
    const authData = localStorage.getItem("roamly_auth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed?.isAuthenticated) {
          setIsLoggedIn(true);
          setUserRole(parsed.role || "Guest");
        }
      } catch (e) {
        console.warn("Failed to parse auth data from localStorage", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-16">
      {/* Header Area */}
      <div className="bg-white border-b border-[#e7e1d6] py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-[22px] tracking-[0.5px] text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Roam<b className="text-[#2563eb]">ly</b>
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/countries" className="text-[#172554] text-[14px] font-semibold hover:underline">Countries</Link>
            <span className={`${isLoggedIn ? 'bg-[#1e9e72]' : 'bg-[#2563eb]'} text-white rounded-3xl px-4 py-2.25 font-semibold text-[14px]`}>
              {userRole}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4">
          <h2 className="text-[28px] md:text-3xl font-bold text-[#15201f]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Directory 
          </h2>
          <span className="text-sm font-semibold text-[#6b7b79] mt-1 sm:mt-0 uppercase tracking-wide">
            {currentCountry}
          </span>
        </div>

        {/* Country Select Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {availableCountries.map((c) => (
            <Link
              key={c}
              href={`/directory?country=${encodeURIComponent(c)}`}
              className={`flex-none border rounded-3xl px-3.5 py-2 text-[14px] font-semibold transition-colors ${
                c === currentCountry
                  ? "bg-[#1e40af] text-white! border-[#1e40af]"
                  : "bg-white border-[#e7e1d6] text-[#15201f] hover:bg-[#dbeafe]"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        {/* Lock Note */}
        {!isLoggedIn && (
          <div className="bg-[#dbeafe] text-[#1e40af] rounded-xl p-4 text-[13px] font-medium mb-6">
            Visitor view. Showing photos only, limited to 10 hosts per country. Unlock to see names, hours, contacts and to book.
          </div>
        )}

        {/* Grid */}
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

        {/* Paywall */}
        {!isLoggedIn && (
          <div className="bg-[#172554] text-white rounded-[18px] p-6 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <h3 className="text-[22px] mb-1.5" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>You are seeing a preview</h3>
              <p className="opacity-90 text-[14px] max-w-107.5">
                Unlock every host in every country and book your whole trip in one place.
              </p>
            </div>
            <div className="text-left md:text-right w-full md:w-auto shrink-0">
              <div className="text-[28px] font-extrabold">$9.99 <small className="text-[13px] font-semibold opacity-80">/ month</small></div>
              <Link href="/signup" className="inline-block mt-3 w-full sm:w-auto bg-[#2563eb] text-white text-center rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm">
                Unlock now (demo)
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
