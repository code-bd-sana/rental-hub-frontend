"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navClass = (isActive: boolean) =>
    `px-3.5 py-2.25 rounded-2.5 font-semibold text-[1.05rem] transition-colors duration-200 cursor-pointer bg-transparent border-none text-left font-inherit ${isActive ? "text-(--purple)" : "text-(--ink) hover:bg-[#f1eaf9] hover:text-(--purple)"}`;

  const mobileNavClass =
    "block px-4 py-3.75 rounded-2.75 font-semibold text-[1.05rem] text-(--ink) w-full text-left bg-transparent border-none cursor-pointer transition-colors active:bg-[#f1eaf9] active:text-(--purple) border-t border-(--line) first:border-t-0";

  return (
    <>
      <header className="sticky top-0 z-50 bg-[rgba(251,248,255,.86)] backdrop-blur-[14px] border-b border-(--line)">
        <div className="max-w-7xl mx-auto flex items-center gap-8 h-20">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
            <Image
              src="/logo/logo.png"
              alt="Rentals Hub"
              width={140}
              height={48}
              className="w-auto h-12 object-contain block"
            />
          </Link>
          <nav className="flex gap-3 ml-auto max-[900px]:hidden">
            <Link href="/" className={navClass(pathname === "/")}>
              Home
            </Link>
            <Link
              href="/countries"
              className={navClass(pathname.startsWith("/countries"))}
            >
              Countries
            </Link>
            <Link
              href="/browse"
              className={navClass(pathname.startsWith("/browse"))}
            >
              Browse
            </Link>
            {/* <Link
              href="/cars"
              className={navClass(pathname.startsWith("/cars"))}
            >
              Discover
            </Link>
            <button
              onClick={() => openModal("list")}
              className={navClass(false)}
            >
              List Your Business
            </button> */}
          </nav>
          <Link
            href="/login"
            className="max-[900px]:hidden rounded-xl font-bold text-[.92rem] px-4.5 py-2.5 transition-all duration-200 whitespace-nowrap bg-white border-[1.5px] border-(--line) text-(--ink) hover:border-(--purple) hover:text-(--purple) shadow-custom-sm"
          >
            Sign In
          </Link>
          <button
            className="hidden max-[900px]:flex w-11.5 h-11.5 rounded-2.75 border-[1.5px] border-(--line) bg-white items-center justify-center ml-auto active:bg-[#f1eaf9]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-(--ink)"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed top-18 left-0 right-0 z-49 bg-white border-b border-(--line) shadow-custom p-[10px_14px] block">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavClass.replace("border-t border-(--line) ", "")}
          >
            Home
          </Link>
          <Link
            href="/countries"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavClass}
          >
            Countries
          </Link>
          <Link
            href="/browse"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavClass}
          >
            Browse
          </Link>
          {/* <button
            onClick={() => {
              setMobileMenuOpen(false);
              openModal("list");
            }}
            className={mobileNavClass}
          >
            List Your Business
          </button> */}
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavClass}
          >
            Sign In
          </Link>
        </div>
      )}
    </>
  );
}
