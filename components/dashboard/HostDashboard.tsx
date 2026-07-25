'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Lock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { listingApi } from '../../lib/api/listings';
import { paymentApi } from '../../lib/api/payment';
import ListingFormModal from './ListingFormModal';
import ListingViewModal from './ListingViewModal';

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
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentRequired, setPaymentRequired] = useState(false);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      const res = await listingApi.getMyListings();
      if (res.success) {
        setListings(res.data);
      }
    } catch (error: any) {
      if (error?.message?.includes('Payment Required') || error?.status === 402) {
        setPaymentRequired(true);
      }
      console.error('Failed to fetch listings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const [isAdding, setIsAdding] = useState(false);
  const [editListing, setEditListing] = useState<Record<string, unknown> | null>(null);
  const [viewListing, setViewListing] = useState<Record<string, unknown> | null>(null);
  const [deleteListingId, setDeleteListingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteListingId) return;
    setIsDeleting(true);
    try {
      const res = await listingApi.deleteListing(deleteListingId);
      if (res.success) {
        await fetchListings();
      }
    } catch (error) {
      console.error('Failed to delete listing:', error);
      toast.error('Failed to delete listing. Please try again.');
    } finally {
      setIsDeleting(false);
      setDeleteListingId(null);
    }
  };

  const isFormOpen = isAdding || !!editListing;

  const handlePayNow = async () => {
    try {
      const res = await paymentApi.createHostPaymentSession();
      if (res.success && res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('Failed to initialize payment.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error initializing payment.');
    }
  };

  if (paymentRequired) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='bg-white p-8 rounded-2xl shadow-sm border border-[#e7e1d6] max-w-md text-center'>
          <div className='flex justify-center mb-4 text-[#6b7b79]'>
            <Lock size={48} strokeWidth={1.5} />
          </div>
          <h2 className='text-2xl font-bold text-[#15201f] mb-3'>Payment Required</h2>
          <p className='text-[#6b7b79] mb-6'>
            To access your dashboard and manage bookings, please purchase a 1-month access pass. You
            will need to renew this manually when it expires.
          </p>
          <button
            onClick={handlePayNow}
            className='bg-[#2563eb] text-white px-8 py-3 rounded-xl font-bold text-[16px] hover:bg-[#1e40af] transition-colors w-full'
          >
            Pay $39.99 for 1 Month
          </button>
        </div>
      </div>
    );
  }

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
            onClick={() => setIsAdding(true)}
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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className='p-8 text-center text-[#6b7b79]'>
                    Loading listings...
                  </td>
                </tr>
              ) : listings.length > 0 ? (
                listings.map((lst) => (
                  <tr key={lst.id} className='hover:bg-[#f8fafc] transition-colors'>
                    <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                      <div className='font-semibold text-[#15201f]'>{lst.title}</div>
                      <div className='text-[12px] text-[#6b7b79]'>
                        {lst.category === 'SERVICE'
                          ? lst.serviceDetails?.serviceType
                          : lst.category}
                      </div>
                    </td>
                    <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>
                      {lst.country || 'N/A'}
                    </td>
                    <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                      <div className='text-[#15201f] text-xs truncate max-w-50'>
                        {lst.description || 'N/A'}
                      </div>
                    </td>
                    <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                      {lst.approvalStatus === 'APPROVED' && (
                        <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                          Live
                        </span>
                      )}
                      {lst.approvalStatus === 'PENDING' && (
                        <span className='bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                          Pending review
                        </span>
                      )}
                      {lst.approvalStatus === 'REJECTED' && (
                        <span className='bg-[#fef2f2] text-[#ef4444] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                          Rejected
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
                          onClick={() => setEditListing(lst)}
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
                            <line x1='10' y1='11' x2='10' y2='17' />
                            <line x1='14' y1='11' x2='14' y2='17' />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
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

      <ListingFormModal
        isOpen={isAdding || !!editListing}
        onClose={() => {
          setIsAdding(false);
          setEditListing(null);
        }}
        listingToEdit={editListing}
        onSuccess={() => {
          fetchListings();
          setIsAdding(false);
          setEditListing(null);
        }}
      />

      {/* Delete Confirmation Modal */}
      {deleteListingId && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-100 w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-6'>
              <h3 className='font-bold text-[18px] text-[#15201f] mb-2'>Delete Listing</h3>
              <p className='text-[14px] text-[#6b7b79]'>
                Are you sure you want to delete this listing? This action cannot be undone.
              </p>
            </div>
            <div className='p-4 border-t border-[#e7e1d6] flex justify-end gap-3 bg-[#f8fafc]'>
              <button
                onClick={() => !isDeleting && setDeleteListingId(null)}
                disabled={isDeleting}
                className='px-4 py-2 text-[14px] font-semibold text-[#15201f] hover:bg-[#e7e1d6] rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className='px-4 py-2 text-[14px] font-semibold bg-[#ef4444] text-white hover:bg-[#dc2626] rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-17.5'
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ListingViewModal
        isOpen={!!viewListing}
        onClose={() => setViewListing(null)}
        listing={viewListing}
      />
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
  const [viewBooking, setViewBooking] = useState<Record<string, unknown> | null>(null);

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
                <div className='font-semibold text-[#172554] text-[16px]'>
                  {viewBooking.id as string}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Guest Name
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.guest as string}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Listing
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.item as string}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Date
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.date as string}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Amount
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.amount as string}</div>
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
                  {viewBooking.status === 'Declined' && !!viewBooking.rejectionReason && (
                    <div className='mt-2 p-3 bg-[#fee2e2] rounded-xl text-[12px] text-[#ef4444]'>
                      <span className='font-bold'>Reason:</span>{' '}
                      {viewBooking.rejectionReason as string}
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

export { HostSettings } from './HostSettings';
