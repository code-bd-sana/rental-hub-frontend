"use client";

import Link from "next/link";
import { useModal } from "./ModalProvider";

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer>
      <div className="wrap">
        <div className="f-top">
          <div className="f-about">
            <div className="f-logo-chip">
              <span className="font-bold text-lg">Rentals Hub</span>
            </div>
            <p>For all your rental needs. Homes, cars, food, and services across Suriname, all in one place.</p>
            <div className="f-loc">
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M12 22c4-4 7-7.5 7-11a7 7 0 0 0-14 0c0 3.5 3 7 7 11Z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              Meerzorg, Commewijne, Suriname
            </div>
          </div>
          <div className="f-cols">
            <div>
              <h4>Browse</h4>
              <Link href="/stays">Stays</Link>
              <Link href="/services">Food</Link>
              <Link href="/cars">Cars</Link>
              <Link href="/discover">Discover</Link>
            </div>
            <div>
              <h4>Company</h4>
              <Link href="/about">About us</Link>
              <Link href="/how">How it works</Link>
              <Link href="/stars">How the 5 stars work</Link>
              <Link href="/hosts">How hosts are chosen</Link>
              <Link href="/guest/profile">My profile</Link>
              <button onClick={() => openModal("list")} className="text-left">List your business</button>
              <Link href="/host/dashboard">Host back office</Link>
              <Link href="/discover">Discover</Link>
              <button onClick={() => openModal("signin")} className="text-left">Sign in</button>
            </div>
            <div>
              <h4>Policies</h4>
              <button onClick={() => openModal("info", { title: "Terms of Service", text: "Our full terms of service will be published here before launch." })} className="text-left">Terms of service</button>
              <button onClick={() => openModal("info", { title: "Privacy Policy", text: "Our privacy policy will explain what data we collect, how it is used, and how it is protected." })} className="text-left">Privacy policy</button>
              <button onClick={() => openModal("info", { title: "Cancellation Policy", text: "Cancellation and refund rules for stays, cars, food orders, and service reservations will be detailed here before launch." })} className="text-left">Cancellation policy</button>
              <button onClick={() => openModal("info", { title: "Cookie Policy", text: "How Rentals Hub uses cookies and similar technologies." })} className="text-left">Cookie policy</button>
            </div>
            <div>
              <h4>Contact</h4>
              <a href="https://rentalshubb.com">rentalshubb.com</a>
              <a href="mailto:info@rentalshubb.com">info@rentalshubb.com</a>
              <a href="tel:+5977451260">+597 745 1260</a>
              <button onClick={() => alert("Open Chat")} className="text-left">Request to chat</button>
            </div>
          </div>
        </div>
        <div className="f-bot">
          <span>© 2026 Rentals Hub n.v. Concept prototype.</span>
          <span>Purple #4B2882 · Orange #E87722</span>
        </div>
      </div>
    </footer>
  );
}
