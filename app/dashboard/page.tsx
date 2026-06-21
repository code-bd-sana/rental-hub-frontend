export default function DashboardPage() {
  return (
    <div>
      <h2 
        className="text-[26px] font-bold mb-1 text-[#15201f]"
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Welcome to Dashboard
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Here is how your account is doing this month.
      </p>

      {/* Main part HTML placeholder */}
      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] p-6">
        <p className="text-[#6b7b79]">Main dashboard content goes here.</p>
      </div>
    </div>
  );
}
  