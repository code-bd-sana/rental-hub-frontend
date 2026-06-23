"use client";

import React from "react";

export function HostOverview() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Welcome back, Sample Bistro
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Here is how your listings are doing this month.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2">
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">2</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Active listings</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">3</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">New bookings</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">28</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Page views</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">$420</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Earned this month</div>
        </div>
      </div>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Recent activity
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">New booking from a guest in Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Today</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]">
                <span className="bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">New</span>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Reservation confirmed for 2 guests</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Yesterday</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]">
                <span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Confirmed</span>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Booking completed</td>
              <td className="p-[12px_16px] text-[#6b7b79]">3 days ago</td>
              <td className="p-[12px_16px]">
                <span className="bg-[#eee] text-[#666] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Done</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function HostListings() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        My listings
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Manage your pages, edit details and add new listings.
      </p>
      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Listings
          </h3>
          <button className="border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold transition-colors hover:bg-[#1e40af]">
            Add a listing
          </button>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Listing</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Category</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Country</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Status</th>
              <th className="p-[10px_16px] border-b border-[#e7e1d6]"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Ocho Rios Grill</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Restaurant</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]">
                <span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Live</span>
              </td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-right">
                <button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">Edit</button>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Ocho Rios Grill Catering</td>
              <td className="p-[12px_16px] text-[#6b7b79]">Restaurant</td>
              <td className="p-[12px_16px] text-[#6b7b79]">Jamaica</td>
              <td className="p-[12px_16px]">
                <span className="bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Pending review</span>
              </td>
              <td className="p-[12px_16px] text-right">
                <button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function HostBookings() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Bookings and requests
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Accept or decline incoming bookings and reservation requests.
      </p>
      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Incoming
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Guest</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Type</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Date</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Status</th>
              <th className="p-[10px_16px] border-b border-[#e7e1d6]"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="p-8 text-center text-[#6b7b79]">No new bookings to display.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function HostPayouts() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Payouts
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Earnings from bookings that took payment online. Service reservations are paid to you directly.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2">
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">$420</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">This month</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">$1,180</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Last 90 days</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">$95</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Pending</div>
        </div>
      </div>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Payout history
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Date</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Reference</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Amount</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">June 1</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">PO-1042</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">$420.00</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]">
                <span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Paid</span>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">May 1</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">PO-0991</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">$385.00</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]">
                <span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Paid</span>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Next cycle</td>
              <td className="p-[12px_16px] text-[#6b7b79]">PO-1077</td>
              <td className="p-[12px_16px] text-[#15201f]">$95.00</td>
              <td className="p-[12px_16px]">
                <span className="bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Pending</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function HostSettings() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Settings
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Your subscription, payout account and contact details.
      </p>
      
      <div className="bg-white border border-[#e7e1d6] rounded-2xl p-6 max-w-2xl">
        <div className="space-y-5">
          <div>
            <label className="block text-[#15201f] text-[13px] font-bold mb-1.5">Plan</label>
            <input 
              value="Listing owner, $39.99 per month" 
              readOnly 
              className="w-full border border-[#e7e1d6] rounded-xl bg-[#f8fafc] px-4 py-3 text-[15px] text-[#6b7b79] focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-[#15201f] text-[13px] font-bold mb-1.5">Payout account</label>
            <input 
              placeholder="Bank or account for payouts" 
              className="w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[15px] text-[#15201f] focus:outline-none focus:ring-2 focus:ring-[#2563eb]" 
            />
          </div>
          <div>
            <label className="block text-[#15201f] text-[13px] font-bold mb-1.5">Booking email</label>
            <input 
              defaultValue="bookings@business.com" 
              className="w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[15px] text-[#15201f] focus:outline-none focus:ring-2 focus:ring-[#2563eb]" 
            />
          </div>
          <div className="pt-2">
            <button className="bg-[#2563eb] text-white rounded-[30px] px-6 py-3.5 text-[16px] font-bold shadow-sm transition-colors hover:bg-[#1e40af]">
              Save settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
