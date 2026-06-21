"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

function SidebarNav({ role, displayRole }: { role: string; displayRole: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const navClass = (path: string) => {
    const isActive = pathname === path;
    return `text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold flex justify-between items-center transition-colors ${
      isActive 
        ? "bg-[rgba(255,255,255,0.14)] text-white opacity-100" 
        : "bg-transparent text-white opacity-80 hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100"
    }`;
  };

  return (
    <aside className="flex flex-col flex-none w-55 bg-[#172554] text-white p-5 rounded-r-[22px]">
      <span
        className="block text-white text-[20px] mb-1 font-bold"
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Roam<b className="text-[#2563eb]">ly</b>
      </span>
      <div className="text-[12px] opacity-70 uppercase tracking-[1px] mb-4.5">
        {displayRole}
      </div>

      <nav className="flex flex-col flex-1">
        <div className="flex flex-col gap-1">
          <Link href="/dashboard" className={navClass("/dashboard")}>
            Overview
          </Link>
          {role === "Host" && (
            <>
              <Link href="/dashboard/listings" className={navClass("/dashboard/listings")}>
                My listings{" "}
                <span className="bg-[#2563eb] text-white text-[11px] font-bold rounded-[20px] px-2 py-px">
                  2
                </span>
              </Link>
              <Link href="/dashboard/bookings" className={navClass("/dashboard/bookings")}>
                Bookings{" "}
                <span className="bg-[#2563eb] text-white text-[11px] font-bold rounded-[20px] px-2 py-px">
                  3
                </span>
              </Link>
              <Link href="/dashboard/payouts" className={navClass("/dashboard/payouts")}>
                Payouts
              </Link>
            </>
          )}
          {role === "Agent" && (
            <Link href="/dashboard/clients" className={navClass("/dashboard/clients")}>
              My Clients
            </Link>
          )}
          {role === "Super Admin" && (
            <>
              <Link href="/dashboard/claims" className={navClass("/dashboard/claims")}>
                Claims{" "}
                <span className="bg-[#2563eb] text-white text-[11px] font-bold rounded-[20px] px-2 py-px">
                  3
                </span>
              </Link>
              <Link href="/dashboard/listings" className={navClass("/dashboard/listings")}>
                Listings
              </Link>
              <Link href="/dashboard/countries" className={navClass("/dashboard/countries")}>
                Countries
              </Link>
              <Link href="/dashboard/guests" className={navClass("/dashboard/guests")}>
                Guests
              </Link>
            </>
          )}
          <Link href="/dashboard/settings" className={navClass("/dashboard/settings")}>
            Settings
          </Link>
        </div>

        <div className="mt-auto border-t border-[rgba(255,255,255,0.1)] pt-4">
          <button
            onClick={() => {
              localStorage.removeItem("roamly_auth");
              router.push("/login");
            }}
            className="bg-transparent text-[#b9a8d4] text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:text-white hover:opacity-100 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem("roamly_auth");
    if (!authData) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(authData);
      if (!parsed?.isAuthenticated) {
        router.replace("/login");
        return;
      }
      setRole(parsed.role);
      setIsAuthChecking(false);
    } catch (e) {
      console.warn("Failed to parse auth data:", e);
      router.replace("/login");
    }
  }, [router]);

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const displayRole = role ? `${role} dashboard` : "Dashboard";

  return (
    <div className="flex gap-0 min-h-screen font-sans bg-[#f8fafc]">
      <Suspense fallback={<aside className="flex-none w-55 bg-[#172554] p-5 rounded-r-[22px]"></aside>}>
        <SidebarNav role={role!} displayRole={displayRole} />
      </Suspense>
      <main className="flex-1 p-6 md:p-[22px_26px] min-w-0">{children}</main>
    </div>
  );
}
