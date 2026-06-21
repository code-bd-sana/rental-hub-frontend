export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-0 min-h-screen font-sans bg-[#f8fafc]">
      <aside className="flex-none w-55 bg-[#172554] text-white p-5 rounded-r-[22px]">
        <span className="block text-white text-[20px] mb-1 font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
          Roam<b className="text-[#2563eb]">ly</b>
        </span>
        <div className="text-[12px] opacity-70 uppercase tracking-[1px] mb-4.5">
          Dashboard
        </div>
        
        <nav className="flex flex-col gap-1">
          <button className="bg-[rgba(255,255,255,0.14)] text-white text-left px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-100 flex justify-between items-center transition-colors">
            Overview
          </button>
          <button className="bg-transparent text-white text-left px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors">
            Listings <span className="bg-[#2563eb] text-white text-[11px] font-bold rounded-[20px] px-2 py-px">2</span>
          </button>
          <button className="bg-transparent text-white text-left px-3.25 py-2.75ounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors">
            Bookings <span className="bg-[#2563eb] text-white text-[11px] font-bold rounded-[20px] px-2 py-px">3</span>
          </button>
          <button className="bg-transparent text-white text-left px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors">
            Payouts
          </button>
          <button className="bg-transparent text-white text-left px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100 transition-colors">
            Settings
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-[22px_26px] min-w-0">
        {children}
      </main>
    </div>
  );
}
