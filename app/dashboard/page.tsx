"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HostDashboard } from "@/components/dashboard/HostDashboard";

export default function DashboardPage() {
  // Initialize role from localStorage to avoid setting state synchronously inside an effect
  const [role] = useState<string | null>(() => {
    try {
      const authData = typeof window !== "undefined" ? localStorage.getItem("roamly_auth") : null;
      if (!authData) return null;
      const parsed = JSON.parse(authData);
      return parsed?.role ?? null;
    } catch (e) {
      console.warn("Failed to parse auth data:", e);
      return null;
    }
  });

  const router = useRouter();

  // Only handle navigation (side-effect) here; do not call setState inside the effect
  useEffect(() => {
    if (!role) {
      router.push("/login");
    }
  }, [role, router]);

  if (!role) return null; // loading state

  if (role === "Host") {
    return <HostDashboard />;
  }

  // Fallbacks for other roles
  return (
    <div className="animate-in fade-in duration-300">
      <h2 
        className="text-[26px] font-bold mb-1 text-[#172554]"
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Welcome back, {role}
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Here is how your account is doing this month.
      </p>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] p-6">
        <p className="text-[#6b7b79]">{role} dashboard components will go here.</p>
      </div>
    </div>
  );
}