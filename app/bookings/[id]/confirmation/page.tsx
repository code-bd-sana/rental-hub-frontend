'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { bookingApi } from '@/lib/api/booking';
import Link from 'next/link';
import { Clock, Calendar, Users, Hash, ShieldCheck, CalendarPlus, Settings, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default function BookingConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (params?.id) {
        try {
          const res = await bookingApi.getBookingById(params.id as string);
          if (res.success) {
            setBooking(res.data);
          } else {
            router.push('/dashboard/booking-history');
          }
        } catch (err) {
          router.push('/dashboard/booking-history');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBooking();
  }, [params?.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#e85d04] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!booking) return null;

  const data = booking.bookingData || {};
  const checkIn = data.checkIn ? new Date(data.checkIn) : null;
  const checkOut = data.checkOut ? new Date(data.checkOut) : null;

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-100 text-[#e85d04] rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Request sent to host</h1>
          <p className="text-gray-500 mb-4">We&apos;ve sent your request to the host. You&apos;ll get an email once they respond.</p>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-[#e85d04] text-white">
            {booking.status || 'Pending'}
          </span>
        </div>

        {/* Listing Info & Dates */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-1">{booking.listing?.title}</h2>
          <p className="text-gray-500 text-sm mb-8 flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {booking.listing?.location || booking.listing?.address || 'Location unknown'}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-4">
              <div className="text-[11px] uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Check-in
              </div>
              <div className="font-semibold">{checkIn ? format(checkIn, 'yyyy-MM-dd') : '-'}</div>
              <div className="text-sm text-gray-500">10:00-12:00</div>
            </div>
            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-4">
              <div className="text-[11px] uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Check-out
              </div>
              <div className="font-semibold">{checkOut ? format(checkOut, 'yyyy-MM-dd') : '-'}</div>
              <div className="text-sm text-gray-500">10:00-12:00</div>
            </div>
            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-4">
              <div className="text-[11px] uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Guests
              </div>
              <div className="font-semibold">{data.guests || 1}</div>
            </div>
            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-4">
              <div className="text-[11px] uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" /> Code
              </div>
              <div className="font-semibold text-gray-900">{booking.otpCode || '-'}</div>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <h3 className="text-lg font-bold mb-6">Price details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>{booking.listing?.category === 'CAR' ? 'Days' : 'Nights'}</span>
              <span>${data.basePrice?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between text-gray-600 pb-4 border-b border-gray-100">
              <span>VAT (10%)</span>
              <span>${data.vat?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>${booking.totalAmount?.toFixed(2) || '0.00'}</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Payments are made directly to the host on arrival.
            </p>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#7c3aed] flex-none" />
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Cancellation: Flexible</h4>
              <p className="text-gray-500 text-sm">Free cancellation up to 24 hours before check-in.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="bg-[#581c87] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#4c1d95] transition-colors flex items-center gap-2">
            <CalendarPlus className="w-4 h-4" />
            Add to calendar
          </button>
          <Link 
            href="/dashboard/booking-history"
            className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Settings className="w-4 h-4" />
            Manage booking
          </Link>
          <Link 
            href={`/directory/${booking.listingId}`}
            className="text-gray-500 px-4 py-3 rounded-xl font-medium text-sm hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View listing
          </Link>
        </div>

      </div>
    </div>
  );
}
