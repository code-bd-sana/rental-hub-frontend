"use client";

import { HostPayouts } from "@/components/dashboard/HostDashboard";

export default function DashboardPayoutsPage() {
  const authData = typeof window !== "undefined" ? localStorage.getItem("roamly_auth") : null;
  const role = authData ? JSON.parse(authData).role : null;

  if (role === "Host") {
    return <HostPayouts />;
  }

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]">Payouts</h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">You do not have access to payouts.</p>
    </div>
  );
}
