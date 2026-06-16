"use client";

import Link from "next/link";
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
        <div className="wrap bar">
          <Link href="/" className="logo">
            <div className="mark">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 12H5V20H19V12H22L12 2Z" fill="white" />
              </svg>
            </div>
            <b>Rentals <span>Hub</span></b>
          </Link>
          <nav>
            <Link href="/" className={pathname === "/" ? "live" : ""}>Home</Link>
            <Link href="/stays" className={pathname.startsWith("/stays") ? "live" : ""}>Stays</Link>
            <Link href="/cars" className={pathname.startsWith("/cars") ? "live" : ""}>Cars</Link>
            <Link href="/services" className={pathname.startsWith("/services") || pathname.startsWith("/food") ? "live" : ""}>Services</Link>
            <button onClick={() => openModal("list")}>List Your Business</button>
            <Link href="/host/dashboard" className={pathname.startsWith("/host") ? "live" : ""}>Host</Link>
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
