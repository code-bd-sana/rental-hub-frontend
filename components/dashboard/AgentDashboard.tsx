"use client";

import React from "react";

export function AgentOverview() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Agent workspace
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        You can load and update the directory for the countries assigned to you. You do not see claims, guests, revenue or team settings.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2">
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">1</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Countries assigned</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">11</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Hosts you loaded</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">150</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Target per country</div>
        </div>
      </div>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Your countries
          </h3>
          <button className="border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold transition-colors hover:bg-[#1e40af]">
            Open the loader
          </button>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">11 of 150</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] w-40">
                <div className="bg-[#e7e1d6] h-1.5 rounded-sm overflow-hidden"><div className="bg-[#1e9e72] h-full" style={{ width: "7.3%" }}></div></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
