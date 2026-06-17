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

  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto py-4 flex items-center justify-between gap-8">
          <Link href="/">
            <Image 
              src="/logo/logo.png" 
              alt="Rentals Hub" 
              width={90} 
              height={30} 
              className="logo-img object-contain"
            />
          </Link>
          <nav>
            <Link href="/" className=" text-3xl">Home</Link>
            <Link href="/stays" className="">Stays</Link>
            <Link href="/cars" className="">Cars</Link>
            <Link href="/services" className="">Services</Link>
            <button onClick={() => openModal("list")}>List Your Business</button>
            <Link href="/host/dashboard" className="">Host</Link>
          </nav>
          <button className="btn ghost" onClick={() => openModal("signin")}>Sign In</button>
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16111d" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-nav open">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/stays" onClick={() => setMobileMenuOpen(false)}>Stays</Link>
          <Link href="/cars" onClick={() => setMobileMenuOpen(false)}>Cars</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <button onClick={() => { setMobileMenuOpen(false); openModal("list"); }} className="text-left w-full">List Your Business</button>
          <Link href="/host/dashboard" onClick={() => setMobileMenuOpen(false)}>Host</Link>
          <button onClick={() => { setMobileMenuOpen(false); openModal("signin"); }} className="text-left w-full">Sign In</button>
        </div>
      )}
    </>
  );
}
