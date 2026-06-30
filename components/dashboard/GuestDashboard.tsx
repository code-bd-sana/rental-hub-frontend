'use client';

import Link from 'next/link';
import { useState } from 'react';

export function GuestOverview() {
  return (
    <div className='animate-in fade-in duration-300'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Welcome back, Guest
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        Here is an overview of your account and recent activities.
      </p>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2'>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>1</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Upcoming Trip
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>4</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Past Bookings
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>Active</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Subscription
          </div>
        </div>
      </div>

      <div className='bg-[#172554] text-white rounded-[18px] p-6 mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-custom-sm'>
        <div>
          <h3
            className='text-[20px] mb-1.5'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Ready for your next adventure?
          </h3>
          <p className='opacity-90 text-[14px] max-w-107.5'>
            Explore new countries, find the best stays, cars, and services all in one place.
          </p>
        </div>
        <div className='text-left md:text-right w-full md:w-auto shrink-0'>
          <Link
            href='/directory'
            className='inline-block w-full sm:w-auto bg-[#2563eb] text-white text-center rounded-[30px] py-3 px-6 font-bold text-[15px] hover:bg-[#1e40af] transition-colors shadow-sm'
          >
            Browse Directory
          </Link>
        </div>
      </div>
    </div>
  );
}

export function GuestBookingHistory() {
  const [bookings, setBookings] = useState([
    {
      id: 'BKG-9382',
      item: 'Blue Mountain Villa',
      location: 'Jamaica',
      type: 'Stay',
      dates: 'Oct 12 - Oct 18, 2026',
      status: 'Upcoming',
      amount: '$1,250',
    },
    {
      id: 'BKG-7741',
      item: 'Kingston Car Hire',
      location: 'Jamaica',
      type: 'Car rental',
      dates: 'Oct 12 - Oct 18, 2026',
      status: 'Upcoming',
      amount: '$350',
    },
    {
      id: 'BKG-4492',
      item: 'Ocean Drive Day Spa',
      location: 'United States',
      type: 'Spa',
      dates: 'Sep 05, 2026',
      status: 'Completed',
      amount: '$120',
    },
    {
      id: 'BKG-1029',
      item: 'Maracas Bay Lodge',
      location: 'Trinidad and Tobago',
      type: 'Stay',
      dates: 'Aug 14 - Aug 20, 2026',
      status: 'Completed',
      amount: '$890',
    },
  ]);

  const [viewBkg, setViewBkg] = useState<any>(null);
  const [editBkg, setEditBkg] = useState<any>(null);
  const [deleteBkgId, setDeleteBkgId] = useState<string | null>(null);

  const confirmDelete = () => {
    if (deleteBkgId) {
      setBookings(bookings.filter((b) => b.id !== deleteBkgId));
      setDeleteBkgId(null);
    }
  };

  const handleEditChange = (field: string, value: string) => {
    setEditBkg({ ...editBkg, [field]: value });
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    setBookings(bookings.map((b) => (b.id === editBkg.id ? editBkg : b)));
    setEditBkg(null);
  };

  return (
    <div className='animate-in fade-in duration-300 relative'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Booking History
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        View and manage your past and upcoming reservations.
      </p>

      <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4'>
        <div className='flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]'>
          <h3
            className='text-[18px] text-[#15201f] font-bold'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            All Bookings
          </h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-[14px] whitespace-nowrap'>
            {/* Table Header */}
            <thead>
              <tr>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Reference
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Item
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Dates
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Amount
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Status
                </th>
                <th className='text-center text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Actions
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {bookings.map((bkg) => (
                <tr key={bkg.id} className='hover:bg-[#f8fafc] transition-colors'>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6] font-semibold text-[#172554]'>
                    {bkg.id}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='text-[#15201f] font-medium'>{bkg.item}</div>
                    <div className='text-[12px] text-[#6b7b79]'>
                      {bkg.type} · {bkg.location}
                    </div>
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>
                    {bkg.dates}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f] font-medium'>
                    {bkg.amount}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    {bkg.status === 'Upcoming' && (
                      <span className='bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Upcoming
                      </span>
                    )}
                    {bkg.status === 'Completed' && (
                      <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Completed
                      </span>
                    )}
                    {bkg.status === 'Cancelled' && (
                      <span className='bg-[#fee2e2] text-[#ef4444] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Cancelled
                      </span>
                    )}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='flex items-center justify-center gap-3'>
                      <button
                        onClick={() => setViewBkg(bkg)}
                        className='text-[#6b7b79] hover:text-[#2563eb] transition-colors cursor-pointer'
                        title='View'
                      >
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
                          <circle cx='12' cy='12' r='3' />
                        </svg>
                      </button>
                      <button
                        onClick={() => setEditBkg(bkg)}
                        className='text-[#6b7b79] hover:text-[#1e9e72] transition-colors cursor-pointer'
                        title='Edit'
                      >
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M12 20h9' />
                          <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteBkgId(bkg.id)}
                        className='text-[#6b7b79] hover:text-[#dc2626] transition-colors cursor-pointer'
                        title='Delete'
                      >
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M3 6h18' />
                          <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                          <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className='p-8 text-center text-[#6b7b79]'>
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewBkg && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-[100] flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-md w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Booking Details
              </h3>
              <button
                onClick={() => setViewBkg(null)}
                className='text-[#6b7b79] hover:text-[#15201f] text-2xl leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>
            <div className='p-6 space-y-5 text-[14px]'>
              <div>
                <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                  Reference
                </div>
                <div className='font-semibold text-[#172554] text-[18px]'>{viewBkg.id}</div>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Item
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBkg.item}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Type
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBkg.type}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Location
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBkg.location}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Dates
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBkg.dates}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Amount
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBkg.amount}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Status
                  </div>
                  <div className='font-medium text-[#15201f]'>
                    {viewBkg.status === 'Upcoming' && (
                      <span className='bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2 py-0.5 rounded-[20px] uppercase tracking-[0.5px]'>
                        {viewBkg.status}
                      </span>
                    )}
                    {viewBkg.status === 'Completed' && (
                      <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2 py-0.5 rounded-[20px] uppercase tracking-[0.5px]'>
                        {viewBkg.status}
                      </span>
                    )}
                    {viewBkg.status === 'Cancelled' && (
                      <span className='bg-[#fee2e2] text-[#ef4444] text-[11px] font-bold px-2 py-0.5 rounded-[20px] uppercase tracking-[0.5px]'>
                        {viewBkg.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='p-5 border-t border-[#e7e1d6] bg-[#f8fafc] text-right'>
              <button
                onClick={() => setViewBkg(null)}
                className='bg-[#172554] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#0f172a] transition-colors cursor-pointer shadow-sm'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editBkg && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-[100] flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-md w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Edit Booking
              </h3>
              <button
                onClick={() => setEditBkg(null)}
                className='text-[#6b7b79] hover:text-[#15201f] text-2xl leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleEditSave}>
              <div className='p-6 space-y-4 text-[14px]'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Item Name
                    </label>
                    <input
                      required
                      value={editBkg.item}
                      onChange={(e) => handleEditChange('item', e.target.value)}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                    />
                  </div>
                  <div>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Location
                    </label>
                    <input
                      required
                      value={editBkg.location}
                      onChange={(e) => handleEditChange('location', e.target.value)}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Dates
                    </label>
                    <input
                      required
                      value={editBkg.dates}
                      onChange={(e) => handleEditChange('dates', e.target.value)}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                    />
                  </div>
                  <div>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Amount
                    </label>
                    <input
                      required
                      value={editBkg.amount}
                      onChange={(e) => handleEditChange('amount', e.target.value)}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                    Status
                  </label>
                  <select
                    value={editBkg.status}
                    onChange={(e) => handleEditChange('status', e.target.value)}
                    className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] bg-white focus:outline-none focus:border-[#2563eb] transition-colors'
                  >
                    <option value='Upcoming'>Upcoming</option>
                    <option value='Completed'>Completed</option>
                    <option value='Cancelled'>Cancelled</option>
                  </select>
                </div>
              </div>
              <div className='p-5 border-t border-[#e7e1d6] bg-[#f8fafc] flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => setEditBkg(null)}
                  className='px-5 py-2.5 rounded-xl font-bold text-[14px] text-[#6b7b79] hover:bg-[#e7e1d6] transition-colors cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-[#2563eb] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#1e40af] transition-colors shadow-sm cursor-pointer'
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteBkgId && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-[100] flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-6 text-center'>
              <div className='w-14 h-14 rounded-full bg-[#fee2e2] flex items-center justify-center mx-auto mb-4 text-[#ef4444]'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M3 6h18' />
                  <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                  <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                </svg>
              </div>
              <h3
                className='font-bold text-[20px] text-[#15201f] mb-2'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Delete Booking
              </h3>
              <p className='text-[14px] text-[#6b7b79] leading-relaxed'>
                Are you sure you want to delete this booking? This action cannot be undone.
              </p>
            </div>
            <div className='p-5 border-t border-[#e7e1d6] bg-[#f8fafc] flex justify-center gap-3'>
              <button
                onClick={() => setDeleteBkgId(null)}
                className='px-6 py-2.5 rounded-xl font-bold text-[14px] text-[#6b7b79] hover:bg-[#e7e1d6] transition-colors cursor-pointer w-full'
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className='bg-[#ef4444] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#dc2626] transition-colors shadow-sm cursor-pointer w-full'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
