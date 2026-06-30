'use client';

import React, { useState } from 'react';
import GlobalCard from '../shared/GlobalCard';

export function HostOverview() {
  return (
    <div className='animate-in fade-in duration-300'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Welcome back, Sample Bistro
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        Here is how your listings are doing this month.
      </p>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2'>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>2</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Active listings
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>3</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            New bookings
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>28</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Page views
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>$420</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Earned this month
          </div>
        </div>
      </div>

      <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4'>
        <div className='flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]'>
          <h3
            className='text-[18px] text-[#15201f] font-bold'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Recent activity
          </h3>
        </div>
        <table className='w-full border-collapse text-[14px]'>
          <tbody>
            <tr>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>
                New booking from a guest in Jamaica
              </td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>Today</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                <span className='bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  New
                </span>
              </td>
            </tr>
            <tr>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>
                Reservation confirmed for 2 guests
              </td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>Yesterday</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  Confirmed
                </span>
              </td>
            </tr>
            <tr>
              <td className='p-[12px_16px] text-[#15201f]'>Booking completed</td>
              <td className='p-[12px_16px] text-[#6b7b79]'>3 days ago</td>
              <td className='p-[12px_16px]'>
                <span className='bg-[#eee] text-[#666] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  Done
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function HostListings() {
  const [listings, setListings] = useState([
    {
      id: 'LST-1',
      title: 'Ocho Rios Grill',
      category: 'Restaurant',
      country: 'Jamaica',
      status: 'Live',
      hours: 'Daily 12pm to 11pm',
      phone: '+1 876 000 0004',
    },
    {
      id: 'LST-2',
      title: 'Ocho Rios Grill Catering',
      category: 'Restaurant',
      country: 'Jamaica',
      status: 'Pending review',
      hours: 'Mon to Fri 9am to 5pm',
      phone: '+1 876 000 0004',
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editListing, setEditListing] = useState<any>(null);
  const [viewListing, setViewListing] = useState<any>(null);
  const [deleteListingId, setDeleteListingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Stay',
    country: 'Jamaica',
    hours: '',
    phone: '',
    status: 'Pending review',
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'Stay',
      country: 'Jamaica',
      hours: '',
      phone: '',
      status: 'Pending review',
    });
    setIsAdding(true);
  };

  const handleOpenEdit = (lst: any) => {
    setFormData({ ...lst });
    setEditListing(lst);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editListing) {
      setListings(
        listings.map((l) => (l.id === editListing.id ? { ...formData, id: editListing.id } : l)),
      );
      setEditListing(null);
    } else {
      setListings([...listings, { ...formData, id: `LST-${Date.now()}` }]);
      setIsAdding(false);
    }
  };

  const confirmDelete = () => {
    if (deleteListingId) {
      setListings(listings.filter((l) => l.id !== deleteListingId));
      setDeleteListingId(null);
    }
  };

  const isFormOpen = isAdding || !!editListing;

  return (
    <div className='animate-in fade-in duration-300 relative'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        My listings
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        Manage your pages, edit details and add new listings.
      </p>

      <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4'>
        <div className='flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]'>
          <h3
            className='text-[18px] text-[#15201f] font-bold'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Listings
          </h3>
          <button
            onClick={handleOpenAdd}
            className='border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-3.5 py-1.75 text-[13px] font-semibold transition-colors hover:bg-[#1e40af] shadow-sm cursor-pointer'
          >
            Add a listing
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-[14px] whitespace-nowrap'>
            <thead>
              <tr>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Listing
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Location
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Hours & Contact
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Status
                </th>
                <th className='text-center text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {listings.map((lst) => (
                <tr key={lst.id} className='hover:bg-[#f8fafc] transition-colors'>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='font-semibold text-[#15201f]'>{lst.title}</div>
                    <div className='text-[12px] text-[#6b7b79]'>{lst.category}</div>
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>
                    {lst.country}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='text-[#15201f]'>{lst.hours}</div>
                    <div className='text-[12px] text-[#6b7b79]'>{lst.phone}</div>
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    {lst.status === 'Live' && (
                      <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Live
                      </span>
                    )}
                    {lst.status === 'Pending review' && (
                      <span className='bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Pending review
                      </span>
                    )}
                    {lst.status === 'Draft' && (
                      <span className='bg-[#f1f5f9] text-[#64748b] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Draft
                      </span>
                    )}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='flex items-center justify-center gap-3'>
                      <button
                        onClick={() => setViewListing(lst)}
                        className='text-[#6b7b79] hover:text-[#2563eb] transition-colors cursor-pointer'
                        title='View Preview'
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
                        onClick={() => handleOpenEdit(lst)}
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
                        onClick={() => setDeleteListingId(lst.id)}
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
              {listings.length === 0 && (
                <tr>
                  <td colSpan={5} className='p-8 text-center text-[#6b7b79]'>
                    No listings found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-lg w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                {editListing ? 'Edit Listing' : 'Add New Listing'}
              </h3>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditListing(null);
                }}
                className='text-[#6b7b79] hover:text-[#15201f] text-2xl leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className='p-6 space-y-4 text-[14px] max-h-[70vh] overflow-y-auto'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='col-span-2 sm:col-span-1'>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Listing Title
                    </label>
                    <input
                      required
                      value={formData.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      placeholder='e.g. Blue Mountain Villa'
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleFormChange('category', e.target.value)}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] bg-white focus:outline-none focus:border-[#2563eb] transition-colors'
                    >
                      <option value='Stay'>Stay</option>
                      <option value='Car rental'>Car rental</option>
                      <option value='Restaurant'>Restaurant</option>
                      <option value='Spa'>Spa</option>
                      <option value='Barbershop'>Barbershop</option>
                      <option value='Tour guide'>Tour guide</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleFormChange('country', e.target.value)}
                    className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] bg-white focus:outline-none focus:border-[#2563eb] transition-colors'
                  >
                    <option value='Jamaica'>Jamaica</option>
                    <option value='Barbados'>Barbados</option>
                    <option value='Bahamas'>Bahamas</option>
                    <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                    <option value='United States'>United States</option>
                  </select>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Hours / Check-in
                    </label>
                    <input
                      required
                      value={formData.hours}
                      onChange={(e) => handleFormChange('hours', e.target.value)}
                      placeholder='e.g. Daily 9am to 5pm'
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                    />
                  </div>
                  <div>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Phone Number
                    </label>
                    <input
                      required
                      value={formData.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      placeholder='+1 800 000 0000'
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleFormChange('status', e.target.value)}
                    className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] bg-white focus:outline-none focus:border-[#2563eb] transition-colors'
                  >
                    <option value='Live'>Live</option>
                    <option value='Pending review'>Pending review</option>
                    <option value='Draft'>Draft</option>
                  </select>
                </div>
              </div>
              <div className='p-5 border-t border-[#e7e1d6] bg-[#f8fafc] flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setIsAdding(false);
                    setEditListing(null);
                  }}
                  className='px-5 py-2.5 rounded-xl font-bold text-[14px] text-[#6b7b79] hover:bg-[#e7e1d6] transition-colors cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-[#2563eb] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#1e40af] transition-colors shadow-sm cursor-pointer'
                >
                  Save Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Preview Modal */}
      {viewListing && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Preview
              </h3>
              <button
                onClick={() => setViewListing(null)}
                className='text-[#6b7b79] hover:text-[#15201f] text-2xl leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>
            <div className='p-6 bg-[#f8fafc] flex justify-center'>
              <div className='w-full max-w-70'>
                <GlobalCard
                  title={viewListing.title}
                  category={viewListing.category}
                  hours={viewListing.hours}
                  phone={viewListing.phone}
                  locked={false}
                  seed={viewListing.id}
                />
              </div>
            </div>
            <div className='p-5 border-t border-[#e7e1d6] bg-white text-right'>
              <button
                onClick={() => setViewListing(null)}
                className='bg-[#172554] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#0f172a] transition-colors cursor-pointer shadow-sm'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteListingId && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-6 text-center'>
              <div className='w-14 h-14 rounded-full bg-[#fee2e2] flex items-center justify-center mx-auto mb-4 text-[#ef4444]'>
                <svg
                  width='24'
                  height='24'
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
              </div>
              <h3
                className='font-bold text-[20px] text-[#15201f] mb-2'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Delete Listing
              </h3>
              <p className='text-[14px] text-[#6b7b79] leading-relaxed'>
                Are you sure you want to delete this listing? This action cannot be undone and will
                remove it from the directory immediately.
              </p>
            </div>
            <div className='p-5 border-t border-[#e7e1d6] bg-[#f8fafc] flex justify-center gap-3'>
              <button
                onClick={() => setDeleteListingId(null)}
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

export function HostBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 'REQ-001',
      guest: 'John Doe',
      item: 'Ocho Rios Grill',
      type: 'Restaurant',
      date: 'Oct 15, 2026',
      amount: '$120',
      status: 'Pending',
      rejectionReason: '',
    },
    {
      id: 'REQ-002',
      guest: 'Sarah Smith',
      item: 'Blue Mountain Villa',
      type: 'Stay',
      date: 'Nov 02 - Nov 05, 2026',
      amount: '$850',
      status: 'Accepted',
      rejectionReason: '',
    },
    {
      id: 'REQ-003',
      guest: 'Mike Johnson',
      item: 'Ocho Rios Grill Catering',
      type: 'Restaurant',
      date: 'Sep 10, 2026',
      amount: '$400',
      status: 'Declined',
      rejectionReason: 'Fully booked on this date.',
    },
  ]);

  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [viewBooking, setViewBooking] = useState<any>(null);

  const handleAccept = (id: string) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'Accepted' } : b)));
  };

  const handleOpenReject = (id: string) => {
    setRejectingId(id);
    setRejectReason('');
  };

  const submitReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (rejectingId) {
      setBookings(
        bookings.map((b) =>
          b.id === rejectingId ? { ...b, status: 'Declined', rejectionReason: rejectReason } : b,
        ),
      );
      setRejectingId(null);
    }
  };

  return (
    <div className='animate-in fade-in duration-300 relative'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Bookings and requests
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        Accept or decline incoming bookings and reservation requests.
      </p>

      <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4'>
        <div className='flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]'>
          <h3
            className='text-[18px] text-[#15201f] font-bold'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Incoming
          </h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-[14px] whitespace-nowrap'>
            <thead>
              <tr>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Guest
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Listing Details
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Date & Amount
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Status
                </th>
                <th className='text-center text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((bkg) => (
                <tr key={bkg.id} className='hover:bg-[#f8fafc] transition-colors'>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='font-semibold text-[#15201f]'>{bkg.guest}</div>
                    <div className='text-[12px] text-[#6b7b79]'>{bkg.id}</div>
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='text-[#15201f]'>{bkg.item}</div>
                    <div className='text-[12px] text-[#6b7b79]'>{bkg.type}</div>
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='text-[#15201f]'>{bkg.date}</div>
                    <div className='text-[12px] font-medium text-[#6b7b79]'>{bkg.amount}</div>
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    {bkg.status === 'Accepted' && (
                      <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Accepted
                      </span>
                    )}
                    {bkg.status === 'Pending' && (
                      <span className='bg-[#fef9c3] text-[#ca8a04] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Pending
                      </span>
                    )}
                    {bkg.status === 'Declined' && (
                      <div>
                        <span className='bg-[#fee2e2] text-[#ef4444] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                          Declined
                        </span>
                        {bkg.rejectionReason && (
                          <div
                            className='text-[11px] text-[#ef4444] mt-1 max-w-37.5 truncate'
                            title={bkg.rejectionReason}
                          >
                            {bkg.rejectionReason}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='flex items-center justify-center gap-3'>
                      <button
                        onClick={() => setViewBooking(bkg)}
                        className='text-[#6b7b79] hover:text-[#2563eb] transition-colors cursor-pointer'
                        title='View Details'
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
                      {bkg.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleAccept(bkg.id)}
                            className='text-[#6b7b79] hover:text-[#1e9e72] transition-colors cursor-pointer'
                            title='Accept'
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
                              <path d='M20 6 9 17l-5-5' />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleOpenReject(bkg.id)}
                            className='text-[#6b7b79] hover:text-[#ef4444] transition-colors cursor-pointer'
                            title='Decline'
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
                              <path d='M18 6 6 18' />
                              <path d='m6 6 12 12' />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className='p-8 text-center text-[#6b7b79]'>
                    No bookings to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectingId && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Decline Booking
              </h3>
              <button
                onClick={() => setRejectingId(null)}
                className='text-[#6b7b79] hover:text-[#15201f] text-2xl leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>
            <form onSubmit={submitReject}>
              <div className='p-6 text-[14px]'>
                <label className='block text-[12px] font-bold text-[#15201f] mb-2'>
                  Reason for declining (required)
                </label>
                <textarea
                  required
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                  placeholder='e.g. Fully booked on these dates.'
                  className='w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#ef4444] transition-colors resize-none'
                ></textarea>
              </div>
              <div className='p-5 border-t border-[#e7e1d6] bg-[#f8fafc] flex justify-center gap-3'>
                <button
                  type='button'
                  onClick={() => setRejectingId(null)}
                  className='px-6 py-2.5 rounded-xl font-bold text-[14px] text-[#6b7b79] hover:bg-[#e7e1d6] transition-colors cursor-pointer w-full'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-[#ef4444] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#dc2626] transition-colors shadow-sm cursor-pointer w-full'
                >
                  Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Booking Details Modal */}
      {viewBooking && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Booking Details
              </h3>
              <button
                onClick={() => setViewBooking(null)}
                className='text-[#6b7b79] hover:text-[#15201f] text-2xl leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>
            <div className='p-6 space-y-4 text-[14px]'>
              <div>
                <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                  Reference
                </div>
                <div className='font-semibold text-[#172554] text-[16px]'>{viewBooking.id}</div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Guest Name
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.guest}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Listing
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.item}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Date
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.date}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Amount
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.amount}</div>
                </div>
                <div className='col-span-2'>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Status
                  </div>
                  <div className='font-medium text-[#15201f] mt-1'>
                    {viewBooking.status === 'Accepted' && (
                      <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.5 py-1 rounded-[20px] uppercase tracking-[0.5px]'>
                        Accepted
                      </span>
                    )}
                    {viewBooking.status === 'Pending' && (
                      <span className='bg-[#fef9c3] text-[#ca8a04] text-[11px] font-bold px-2.5 py-1 rounded-[20px] uppercase tracking-[0.5px]'>
                        Pending
                      </span>
                    )}
                    {viewBooking.status === 'Declined' && (
                      <span className='bg-[#fee2e2] text-[#ef4444] text-[11px] font-bold px-2.5 py-1 rounded-[20px] uppercase tracking-[0.5px]'>
                        Declined
                      </span>
                    )}
                  </div>
                  {viewBooking.status === 'Declined' && viewBooking.rejectionReason && (
                    <div className='mt-3 p-3 bg-[#f8fafc] border border-[#e7e1d6] rounded-xl text-[13px] text-[#ef4444]'>
                      <span className='font-bold'>Reason:</span> {viewBooking.rejectionReason}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='p-5 border-t border-[#e7e1d6] bg-[#f8fafc] text-right'>
              <button
                onClick={() => setViewBooking(null)}
                className='bg-[#172554] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#0f172a] transition-colors cursor-pointer shadow-sm'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HostPayouts() {
  return (
    <div className='animate-in fade-in duration-300'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Payouts
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        Earnings from bookings that took payment online. Service reservations are paid to you
        directly.
      </p>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2'>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>$420</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            This month
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>$1,180</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Last 90 days
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>$95</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>Pending</div>
        </div>
      </div>

      <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4'>
        <div className='flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]'>
          <h3
            className='text-[18px] text-[#15201f] font-bold'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Payout history
          </h3>
        </div>
        <table className='w-full border-collapse text-[14px]'>
          <thead>
            <tr>
              <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                Date
              </th>
              <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                Reference
              </th>
              <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                Amount
              </th>
              <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>June 1</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>PO-1042</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>$420.00</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>May 1</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>PO-0991</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>$385.00</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className='p-[12px_16px] text-[#15201f]'>Next cycle</td>
              <td className='p-[12px_16px] text-[#6b7b79]'>PO-1077</td>
              <td className='p-[12px_16px] text-[#15201f]'>$95.00</td>
              <td className='p-[12px_16px]'>
                <span className='bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function HostSettings() {
  const [formData, setFormData] = useState({
    businessName: 'Sample Bistro',
    contactName: 'Jane Doe',
    email: 'bookings@business.com',
    phone: '+1 876 555 0199',
    address: '123 Ocean View Dr, Ocho Rios, Jamaica',
    payoutAccount: '**** **** **** 4892',
    currency: 'USD',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className='animate-in fade-in duration-300 max-w-4xl'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Settings
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-6'>
        Manage your profile, business details, financials, and subscription.
      </p>

      <form onSubmit={handleSave} className='space-y-6'>
        {/* Profile & Business Details */}
        <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] p-6'>
          <h3 className='text-[18px] font-bold text-[#15201f] mb-4' style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Business Profile
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Business Name</label>
              <input
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Primary Contact</label>
              <input
                value={formData.contactName}
                onChange={(e) => handleChange('contactName', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Booking Email</label>
              <input
                type='email'
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Contact Phone</label>
              <input
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Business Address</label>
              <input
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
          </div>
        </div>

        {/* Financials & Payouts */}
        <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] p-6'>
          <h3 className='text-[18px] font-bold text-[#15201f] mb-4' style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Financials & Payouts
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Payout Account (IBAN/Routing)</label>
              <input
                value={formData.payoutAccount}
                onChange={(e) => handleChange('payoutAccount', e.target.value)}
                placeholder='Bank or account for payouts'
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Billing Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              >
                <option value='USD'>USD ($)</option>
                <option value='EUR'>EUR (€)</option>
                <option value='GBP'>GBP (£)</option>
                <option value='JMD'>JMD ($)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subscription Plan */}
        <div className='bg-[#f8fafc] border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.05)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <div>
            <h3 className='text-[18px] font-bold text-[#15201f] mb-1' style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
              Current Subscription
            </h3>
            <p className='text-[13px] text-[#6b7b79]'>Listing owner, $39.99 per month. Next billing cycle: Nov 1, 2026.</p>
          </div>
          <button type='button' className='px-5 py-2.5 bg-white border border-[#2563eb] text-[#2563eb] rounded-xl font-bold text-[13px] hover:bg-[#e6eefb] transition-colors shrink-0'>
            Manage Plan
          </button>
        </div>

        {/* Actions */}
        <div className='flex items-center justify-end gap-4 pt-2'>
          {saveSuccess && <span className='text-[#1e9e72] font-bold text-[14px] animate-in fade-in'>Changes saved successfully!</span>}
          <button
            type='submit'
            disabled={isSaving}
            className='bg-[#2563eb] text-white rounded-[30px] px-8 py-3.5 text-[15px] font-bold shadow-sm transition-colors hover:bg-[#1e40af] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {isSaving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
