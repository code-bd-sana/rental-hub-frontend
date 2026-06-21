"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useModal } from "./ModalProvider";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  const { openModal } = useModal();

  const linkClass = "block py-1.25 text-[.9rem] text-[#b9a8d4] hover:text-white hover:translate-x-0.5 transition-all duration-200 cursor-pointer text-left w-full";
  const colTitleClass = "text-white text-[.95rem] mb-4 font-bold";

  return (
    <footer className="bg-(--dark) text-[#cdbfe0] pt-12.5 pb-7.5 mt-7.5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.25fr_2.4fr] gap-11 mb-10">
          <div className="max-w-[320px]">
            <div className="inline-flex items-center gap-1.5 bg-white p-[10px_14px] rounded-2xl mb-4">
              <Image 
                src="/logo/logo.png" 
                alt="Rentals Hub" 
                width={100}
                height={34} 
                className="object-contain"
              />
            </div>
            <p className="text-[.9rem] leading-[1.6] mb-4.5 max-w-75">For all your rental needs. Homes, cars, food, and services across Suriname, all in one place.</p>
            <div className="flex items-center gap-2 text-[.88rem] text-[#cdbfe0]">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#cdbfe0] flex-none">
                <path d="M12 22c4-4 7-7.5 7-11a7 7 0 0 0-14 0c0 3.5 3 7 7 11Z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              Meerzorg, Commewijne, Suriname
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h4 className={colTitleClass}>Browse</h4>
              <Link href="/stays" className={linkClass}>Stays</Link>
              <Link href="/services" className={linkClass}>Food</Link>
              <Link href="/cars" className={linkClass}>Cars</Link>
              <Link href="/discover" className={linkClass}>Discover</Link>
            </div>
            <div>
              <h4 className={colTitleClass}>Company</h4>
              <Link href="/about" className={linkClass}>About us</Link>
              <Link href="/how" className={linkClass}>How it works</Link>
              <Link href="/stars" className={linkClass}>How the 5 stars work</Link>
              <Link href="/hosts" className={linkClass}>How hosts are chosen</Link>
              <Link href="/guest/profile" className={linkClass}>My profile</Link>
              <button onClick={() => openModal("list")} className={linkClass}>List your business</button>
              <Link href="/host/dashboard" className={linkClass}>Host back office</Link>
              <Link href="/discover" className={linkClass}>Discover</Link>
              <button onClick={() => openModal("signin")} className={linkClass}>Sign in</button>
            </div>
            <div>
              <h4 className={colTitleClass}>Policies</h4>
              <button onClick={() => openModal("info", { title: "Terms of Service", text: "Our full terms of service will be published here before launch." })} className={linkClass}>Terms of service</button>
              <button onClick={() => openModal("info", { title: "Privacy Policy", text: "Our privacy policy will explain what data we collect, how it is used, and how it is protected." })} className={linkClass}>Privacy policy</button>
              <button onClick={() => openModal("info", { title: "Cancellation Policy", text: "Cancellation and refund rules for stays, cars, food orders, and service reservations will be detailed here before launch." })} className={linkClass}>Cancellation policy</button>
              <button onClick={() => openModal("info", { title: "Cookie Policy", text: "How Rentals Hub uses cookies and similar technologies." })} className={linkClass}>Cookie policy</button>
            </div>
            <div>
              <h4 className={colTitleClass}>Contact</h4>
              <a href="https://rentalshubb.com" className={linkClass}>rentalshubb.com</a>
              <a href="mailto:info@rentalshubb.com" className={linkClass}>info@rentalshubb.com</a>
              <a href="tel:+5977451260" className={linkClass}>+597 745 1260</a>
              <button onClick={() => alert("Open Chat")} className={linkClass}>Request to chat</button>
            </div>
          </div>
        </div>
        <div className="border-t border-[rgba(255,255,255,.1)] pt-5 text-center text-[.8rem] text-[#a99bbd] gap-3">
          <span>© 2026 Rentals Hub n.v. Concept prototype.</span>
        </div>
      </div>
    </footer>
  );
}
