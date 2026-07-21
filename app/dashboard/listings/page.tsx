"use client";

import { ROLES } from '@/constants/roles';

import { HostListings } from "@/components/dashboard/HostDashboard";
import { AdminListings } from "@/components/dashboard/AdminDashboard";

export default function DashboardListingsPage() {
  const authData = typeof window !== "undefined" ? localStorage.getItem("roamly_auth") : null;
  const role = authData ? JSON.parse(authData).role : null;

  if (role === ROLES.HOST || role === "Host") {
    return <HostListings />;
  }
  
  if (role === ROLES.SUPER_ADMIN ) {
    return <AdminListings />;
  }

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]">Listings</h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">You do not have access to listings.</p>
    </div>
  );
}
