'use client';

import React, { useEffect, useState } from 'react';
import { bookingApi } from '@/lib/api/booking';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function HostBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'CONFIRMED' | 'CANCELLED'>('ALL');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await bookingApi.getHostBookings();
      if (res.success) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'CONFIRMED' | 'CANCELLED') => {
    const action = newStatus === 'CONFIRMED' ? 'accept' : 'reject';
    if (!confirm(`Are you sure you want to ${action} this booking?`)) return;
    
    try {
      setProcessingId(id);
      const res = await bookingApi.updateBookingStatus(id, newStatus);
      if (res.success) {
        toast.success(`Booking ${action}ed successfully`);
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
      } else {
        toast.error(res.message || `Failed to ${action} booking`);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || `Error trying to ${action} booking`);
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-4 h-4" />;
      case 'CONFIRMED':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'CANCELLED':
        return <XCircle className="w-4 h-4" />;
      case 'COMPLETED':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredBookings = filter === 'ALL' ? bookings : bookings.filter(b => b.status === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1e293b]">Booking Requests</h1>
        <p className="text-gray-500 mt-2">Manage booking requests for your listings.</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
              filter === f 
                ? 'bg-[#1e293b] text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f === 'ALL' ? 'All Bookings' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">No bookings found</h3>
          <p className="text-gray-500">You don't have any bookings matching this filter.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => {
            const isService = booking.listing?.category === 'SERVICE';
            const bd = booking.bookingData || {};
            
            let dateStr = '';
            let timeStr = '';
            
            if (isService) {
              dateStr = bd.date ? format(new Date(bd.date), 'MMM d, yyyy') : '-';
              timeStr = bd.time || '-';
            } else {
              dateStr = `${bd.checkIn ? format(new Date(bd.checkIn), 'MMM d, yyyy') : '-'} to ${bd.checkOut ? format(new Date(bd.checkOut), 'MMM d, yyyy') : '-'}`;
            }

            return (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                        {booking.listing?.category || 'Listing'}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">
                        {booking.listing?.title || 'Unknown Listing'}
                      </h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-1.5 ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 bg-gray-50 p-4 rounded-xl">
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Guest</div>
                      <div className="font-semibold text-gray-900 truncate" title={booking.guest?.user?.name}>
                        {booking.guest?.user?.name || 'Unknown'}
                      </div>
                      <div className="text-xs text-gray-500 truncate" title={booking.guest?.user?.phone || booking.guest?.user?.email}>
                        {booking.guest?.user?.phone || booking.guest?.user?.email}
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                        {isService ? 'Date & Time' : 'Dates'}
                      </div>
                      <div className="font-semibold text-gray-900">{dateStr}</div>
                      {isService && <div className="text-sm text-gray-600">{timeStr}</div>}
                      {isService && bd.packageName && (
                        <div className="text-xs font-medium text-[#2563eb] mt-0.5">{bd.packageName}</div>
                      )}
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Amount</div>
                      <div className="font-bold text-gray-900">${booking.totalAmount?.toFixed(2) || '0.00'}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 w-full md:w-40 flex-none">
                  <Link 
                    href={`/directory/${booking.listingId}`}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors text-center"
                  >
                    View Listing
                  </Link>
                  
                  {booking.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(booking.id, 'CONFIRMED')}
                        disabled={processingId === booking.id}
                        className="w-full bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 py-2.5 rounded-lg text-sm font-semibold transition-colors text-center disabled:opacity-50"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                        disabled={processingId === booking.id}
                        className="w-full bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 py-2.5 rounded-lg text-sm font-semibold transition-colors text-center disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
