"use client";
import { useState } from "react";

type Category = "stays" | "food" | "cars" | "salon" | "spa" | "barber";

export default function SearchWidget() {
  const [activeTab, setActiveCategory] = useState<Category>("stays");

  const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    {
      id: "stays",
      label: "Stays",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-4.25 h-4.25">
          <path d="M3 11 12 4l9 7M5 10v9h14v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "food",
      label: "Food",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-4.25 h-4.25">
          <path d="M5 3v8m0 0a2 2 0 0 0 2-2V3M9 3v18M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4m0 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "cars",
      label: "Cars",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-4.25 h-4.25">
          <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14m-14 0v6h2v-2h10v2h2v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "salon",
      label: "Salon",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-4.25 h-4.25">
          <path d="M8 8a3 3 0 1 0-3-3m3 3 8 8m-8-8 3 3m5 5a3 3 0 1 0 3 3m-3-3-8-8m8 8-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "spa",
      label: "Spa",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-4.25 h-4.25">
          <path d="M12 22c4-3 7-7 7-11a7 7 0 0 0-14 0c0 4 3 8 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "barber",
      label: "Barber",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-4.25 h-4.25">
          <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="2" />
          <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="m20 4-12 12m12 4L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const fieldClassBase = "p-[12px_16px] rounded-[12px] cursor-pointer transition-colors duration-[150ms] relative hover:bg-[#f8f4fd]";
  const labelClass = "block text-[0.72rem] font-bold tracking-[0.04em] uppercase text-[#9690a0] mb-[3px]";

  return (
    <div className="relative -mt-18 mx-auto max-w-245 z-5 px-6">
      <div className="bg-white rounded-[20px] shadow-custom p-2.5 border border-line">
        <div className="flex gap-1 p-[4px_6px_12px] flex-wrap border-b border-line mb-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`flex items-center gap-1.75 px-3.75 py-2.25 rounded-[11px] font-semibold text-[0.9rem] transition-colors duration-180 ${
                activeTab === cat.id
                  ? "text-white"
                  : "text-muted hover:bg-[#f6f1fc] hover:text-ink"
              }`}
              style={activeTab === cat.id ? { backgroundColor: "#1d1726" } : undefined}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 max-[900px]:grid-cols-2 min-[900px]:grid-cols-[1.5fr_1fr_1fr_auto] gap-0 items-stretch">
          <div className={fieldClassBase}>
            <label className={labelClass} id="loc-label">Destination</label>
            <div className="font-semibold text-[0.96rem] text-ink">Anywhere</div>
          </div>
          <div className={`${fieldClassBase} border-l border-line max-[900px]:border-l-0`} id="ciField">
            <label className={labelClass}>Check in</label>
            <div className="font-medium text-[0.96rem] text-[#a99bbd]">Add date</div>
          </div>
          <div className={`${fieldClassBase} border-l border-line max-[900px]:border-t max-[900px]:border-l-0`}>
            <label className={labelClass}>Check out</label>
            <div className="font-medium text-[0.96rem] text-[#a99bbd]">Add date</div>
          </div>
          <div className="p-1.5 rounded-xl cursor-pointer transition-colors duration-150 relative hover:bg-[#f8f4fd] border-l border-(--color-line) max-[900px]:col-span-2 max-[900px]:border-l-0 max-[900px]:border-t">
            <button className="h-full w-full min-h-12 flex items-center justify-center gap-2 bg-(--color-ink) text-white shadow-[0_8px_18px_-8px_rgba(20,16,26,.4)] rounded-[11px] font-bold text-[0.92rem] px-4.5 py-2.5 transition-all duration-180 whitespace-nowrap hover:bg-orange-d hover:-translate-y-px">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
