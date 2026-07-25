'use client';

import React, { useEffect, useState } from 'react';
import { bookingApi } from '@/lib/api/booking';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingApi.getMyBookings();
        if (res.success) {
          setBookings(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-orange-100 text-orange-700';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1e293b]">Booking History</h1>
        <p className="text-gray-500 mt-2">Manage your upcoming and past bookings.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">No bookings found</h3>
          <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
          <Link 
            href="/directory"
            className="bg-[#2563eb] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1d4ed8] transition-colors"
          >
            Explore Directory
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const data = booking.bookingData || {};
            const checkIn = data.checkIn ? new Date(data.checkIn) : null;
            const checkOut = data.checkOut ? new Date(data.checkOut) : null;
            const heroImage = booking.listing?.images?.[0]?.url;

            return (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="w-full md:w-48 h-32 bg-gray-100 rounded-xl overflow-hidden flex-none relative">
                  {heroImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={heroImage} alt="Listing" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.listing?.title || 'Unknown Listing'}
                      </h3>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                      {booking.listing?.category} • {data.guests || 1} Guests
                    </p>
                  </div>

                  {booking.listing?.category === 'FOOD' || data.orderType === 'FOOD_ORDER' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl">
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Items</div>
                        <div className="font-semibold text-gray-900">{data.cart ? data.cart.reduce((sum: number, item: any) => sum + item.qty, 0) : 0}</div>
                      </div>
                      <div className="col-span-1"></div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total</div>
                        <div className="font-semibold text-gray-900">${booking.totalAmount?.toFixed(2) || '0.00'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order Code</div>
                        <div className="font-bold text-[#e85d04]">{booking.otpCode || '-'}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl">
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Check-in</div>
                        <div className="font-semibold text-gray-900">{checkIn ? format(checkIn, 'MMM d, yyyy') : '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Check-out</div>
                        <div className="font-semibold text-gray-900">{checkOut ? format(checkOut, 'MMM d, yyyy') : '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total</div>
                        <div className="font-semibold text-gray-900">${booking.totalAmount?.toFixed(2) || '0.00'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">OTP Code</div>
                        <div className="font-bold text-[#e85d04]">{booking.otpCode || '-'}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                  <Link 
                    href={`/bookings/${booking.id}/confirmation`}
                    className="w-full md:w-32 bg-[#2563eb] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1d4ed8] transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <Link 
                    href={`/directory/${booking.listingId}`}
                    className="w-full md:w-32 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors text-center"
                  >
                    Listing
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
