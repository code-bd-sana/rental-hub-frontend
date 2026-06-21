"use client";

import { HostBookings } from "@/components/dashboard/HostDashboard";

export default function DashboardBookingsPage() {
  const authData = typeof window !== "undefined" ? localStorage.getItem("roamly_auth") : null;
  const role = authData ? JSON.parse(authData).role : null;

  if (role === "Host") {
    return <HostBookings />;
  }

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]">Bookings</h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">You do not have access to bookings.</p>
    </div>
  );
}
