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
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M3 11 12 4l9 7M5 10v9h14v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "food",
      label: "Food",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 3v8m0 0a2 2 0 0 0 2-2V3M9 3v18M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4m0 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "cars",
      label: "Cars",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14m-14 0v6h2v-2h10v2h2v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "salon",
      label: "Salon",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M8 8a3 3 0 1 0-3-3m3 3 8 8m-8-8 3 3m5 5a3 3 0 1 0 3 3m-3-3-8-8m8 8-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "spa",
      label: "Spa",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 22c4-3 7-7 7-11a7 7 0 0 0-14 0c0 4 3 8 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "barber",
      label: "Barber",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="2" />
          <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="m20 4-12 12m12 4L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="search-wrap wrap">
      <div className="search">
        <div className="tabs" id="searchTabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tab ${activeTab === cat.id ? "live" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
        <div className="fields">
          <div className="field">
            <label id="loc-label">Destination</label>
            <div className="val">Anywhere</div>
          </div>
          <div className="field" id="ciField">
            <label>Check in</label>
            <div className="val ph">Add date</div>
          </div>
          <div className="field">
            <label>Check out</label>
            <div className="val ph">Add date</div>
          </div>
          <div className="field go">
            <button className="btn primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2.2" />
                <path d="m20 20-3.5-3.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
