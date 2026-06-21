"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
            <button className="bg-[rgba(255,255,255,0.14)] text-white text-left px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-100 flex justify-between items-center transition-colors">
              Overview
            </button>
            {role === "Host" && (
              <>
                <button className="bg-transparent text-white text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors">
                  My listings{" "}
                  <span className="bg-[#2563eb] text-white text-[11px] font-bold rounded-[20px] px-2 py-px">
                    2
                  </span>
                </button>
                <button className="bg-transparent text-white text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors">
                  Bookings{" "}
                  <span className="bg-[#2563eb] text-white text-[11px] font-bold rounded-[20px] px-2 py-px">
                    3
                  </span>
                </button>
                <button className="bg-transparent text-white text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors">
                  Payouts
                </button>
              </>
            )}
            {role === "Agent" && (
              <button className="bg-transparent text-white text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors">
                My Clients
              </button>
            )}
            {role === "Super Admin" && (
              <button className="bg-transparent text-white text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors">
                Directory
              </button>
            )}
            <button className="bg-transparent text-white text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors">
              Settings
            </button>
          </div>

          <div className="mt-auto border-t border-[rgba(255,255,255,0.1)] pt-4">
            <button
              onClick={() => {
                localStorage.removeItem("roamly_auth");
                router.push("/login");
              }}
              className="bg-transparent text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-[22px_26px] min-w-0">{children}</main>
    </div>
  );
}
