"use client";

import { HostSettings } from "@/components/dashboard/HostDashboard";

export default function DashboardSettingsPage() {
  const authData = typeof window !== "undefined" ? localStorage.getItem("roamly_auth") : null;
  const role = authData ? JSON.parse(authData).role : null;

  if (role === "Host") {
    return <HostSettings />;
  }

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Settings
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">Manage your settings.</p>
      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] p-6">
        <p className="text-[#6b7b79]">{role} settings will go here.</p>
      </div>
    </div>
  );
}
