"use client";

import React from "react";

export function AdminOverview() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Platform overview
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Load progress and revenue at a glance.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2">
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">2</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Countries</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">17</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Listings loaded</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">3</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Claims pending</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">214</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Paid guests</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">9</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Paid listing owners</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">$2,491</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Monthly revenue</div>
        </div>
      </div>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Load progress by country
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">12 of 150</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] w-40">
                <div className="bg-[#e7e1d6] h-1.5 rounded-sm overflow-hidden"><div className="bg-[#1e9e72] h-full" style={{ width: "8%" }}></div></div>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Barbados</td>
              <td className="p-[12px_16px] text-[#6b7b79]">5 of 150</td>
              <td className="p-[12px_16px] w-40">
                <div className="bg-[#e7e1d6] h-1.5 rounded-sm overflow-hidden"><div className="bg-[#1e9e72] h-full" style={{ width: "3.3%" }}></div></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminClaims() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Ownership claims
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Approve or reject hosts who claim a listing before their booking page activates.
      </p>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Pending claims
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Business</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Claimed by</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Country</th>
              <th className="p-[10px_16px] border-b border-[#e7e1d6]"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Ocho Rios Grill</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Owner one</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-right space-x-2">
                <button className="border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#1e40af]">Approve</button>
                <button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">Reject</button>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">The Cliff Hotel</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Owner two</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-right space-x-2">
                <button className="border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#1e40af]">Approve</button>
                <button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">Reject</button>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Oistins Fish Fry</td>
              <td className="p-[12px_16px] text-[#6b7b79]">Owner three</td>
              <td className="p-[12px_16px] text-[#6b7b79]">Barbados</td>
              <td className="p-[12px_16px] text-right space-x-2">
                <button className="border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#1e40af]">Approve</button>
                <button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminListings() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        All listings
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Every listing across countries, with status and quick actions.
      </p>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Listings
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Listing</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Category</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Country</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">State</th>
              <th className="p-[10px_16px] border-b border-[#e7e1d6]"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Ocho Rios Grill</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Restaurant</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]"><span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Live</span></td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-right"><button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">View</button></td>
            </tr>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">The Cliff Hotel</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Stay</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]"><span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Live</span></td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-right"><button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">View</button></td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Oistins Fish Fry</td>
              <td className="p-[12px_16px] text-[#6b7b79]">Restaurant</td>
              <td className="p-[12px_16px] text-[#6b7b79]">Barbados</td>
              <td className="p-[12px_16px]"><span className="bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Pending</span></td>
              <td className="p-[12px_16px] text-right"><button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminCountries() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Countries and loading
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Add countries and load hosts. Open the full director loader for photo uploads.
      </p>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Countries
          </h3>
          <button className="border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold transition-colors hover:bg-[#1e40af]">
            Open director loader
          </button>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Country</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Loaded</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Target</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">12</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">150</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] w-40">
                <div className="bg-[#e7e1d6] h-1.5 rounded-sm overflow-hidden"><div className="bg-[#1e9e72] h-full" style={{ width: "8%" }}></div></div>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Barbados</td>
              <td className="p-[12px_16px] text-[#6b7b79]">5</td>
              <td className="p-[12px_16px] text-[#6b7b79]">150</td>
              <td className="p-[12px_16px] w-40">
                <div className="bg-[#e7e1d6] h-1.5 rounded-sm overflow-hidden"><div className="bg-[#1e9e72] h-full" style={{ width: "3.3%" }}></div></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminGuests() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Guests
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Guest accounts and subscription status.
      </p>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Recent guests
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Name</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Countries of interest</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Aisha</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Jamaica, Barbados</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]">
                <span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Subscribed</span>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Marco</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">United States</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]">
                <span className="bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Free</span>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Priya</td>
              <td className="p-[12px_16px] text-[#6b7b79]">Bahamas</td>
              <td className="p-[12px_16px]">
                <span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Subscribed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
