"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useModal } from "./ModalProvider";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useModal();

  const navClass = (isActive: boolean) => 
    `px-[14px] py-[9px] rounded-[10px] font-semibold text-[.92rem] transition-colors duration-[180ms] cursor-pointer bg-transparent border-none text-left font-inherit ${isActive ? "text-[var(--purple)]" : "text-[var(--ink)] hover:bg-[#f1eaf9] hover:text-[var(--purple)]"}`;

  const mobileNavClass = "block px-[16px] py-[15px] rounded-[11px] font-semibold text-[1.05rem] text-[var(--ink)] w-full text-left bg-transparent border-none cursor-pointer transition-colors active:bg-[#f1eaf9] active:text-[var(--purple)] border-t border-[var(--line)] first:border-t-0";

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
          <nav className="flex gap-1.5 ml-auto max-[900px]:hidden">
            <Link href="/" className={navClass(pathname === "/")}>Home</Link>
            <Link href="/stays" className={navClass(pathname.startsWith("/stays"))}>Stays</Link>
            <Link href="/cars" className={navClass(pathname.startsWith("/cars"))}>Cars</Link>
            <Link href="/services" className={navClass(pathname.startsWith("/services") || pathname.startsWith("/food"))}>Services</Link>
            <button onClick={() => openModal("list")} className={navClass(false)}>List Your Business</button>
            <Link href="/host/dashboard" className={navClass(pathname.startsWith("/host"))}>Host</Link>
          </nav>
          <button className="max-[900px]:hidden rounded-[11px] font-bold text-[.92rem] px-4.5 py-2.5 transition-all duration-180 whitespace-nowrap bg-white border-[1.5px] border-(--line) text-(--ink) hover:border-(--purple) hover:text-(--purple)" onClick={() => openModal("signin")}>Sign In</button>
          <button className="hidden max-[900px]:flex w-11.5 h-11.5 rounded-[11px] border-[1.5px] border-(--line) bg-white items-center justify-center ml-auto active:bg-[#f1eaf9]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16111d" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed top-18 left-0 right-0 z-49 bg-white border-b border-(--line) shadow-(--shadow) p-[10px_14px] block">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className={mobileNavClass.replace("border-t border-(--line) ", "")}>Home</Link>
          <Link href="/stays" onClick={() => setMobileMenuOpen(false)} className={mobileNavClass}>Stays</Link>
          <Link href="/cars" onClick={() => setMobileMenuOpen(false)} className={mobileNavClass}>Cars</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className={mobileNavClass}>Services</Link>
          <button onClick={() => { setMobileMenuOpen(false); openModal("list"); }} className={mobileNavClass}>List Your Business</button>
          <Link href="/host/dashboard" onClick={() => setMobileMenuOpen(false)} className={mobileNavClass}>Host</Link>
          <button onClick={() => { setMobileMenuOpen(false); openModal("signin"); }} className={mobileNavClass}>Sign In</button>
        </div>
      )}
    </>
  );
}
