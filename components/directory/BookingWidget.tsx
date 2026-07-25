'use client';

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, differenceInDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { bookingApi } from '@/lib/api/booking';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function BookingWidget({ listing }: { listing: any }) {
  const router = useRouter();
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate pricing based on category
  let pricePerUnit = 0;
  if (listing.category === 'STAY') pricePerUnit = listing.stayDetails?.pricePerNight || 0;
  if (listing.category === 'CAR') pricePerUnit = listing.carDetails?.dailyRate || 0;
  
  const numberOfDays = (dateRange.from && dateRange.to) 
    ? Math.max(1, differenceInDays(dateRange.to, dateRange.from)) 
    : 0;
  
  const basePrice = numberOfDays * pricePerUnit * guests;
  const vat = Math.round(basePrice * 0.10);
  const total = basePrice + vat;

  const handleRequestToBook = async () => {
    if (!dateRange.from || !dateRange.to) {
      toast.error('Please select check-in and check-out dates.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        listingId: listing.id,
        totalAmount: total,
        depositAmount: 0,
        bookingData: {
          checkIn: dateRange.from.toISOString(),
          checkOut: dateRange.to.toISOString(),
          guests,
          numberOfDays,
          basePrice,
          vat
        }
      };

      const res = await bookingApi.createBooking(payload);
      if (res.success) {
        toast.success('Booking request sent!');
        router.push(`/bookings/${res.data.id}/confirmation`);
      } else {
        toast.error(res.message || 'Failed to create booking');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error creating booking');
      setIsSubmitting(false);
    }
  };

  return (
    <div className='sticky top-28 bg-white border border-gray-200 rounded-2xl shadow-xl p-6'>
      <div className='mb-6 flex items-baseline gap-2'>
        <span className='text-2xl font-bold text-[#1e293b]'>
          ${pricePerUnit}
        </span>
        <span className='text-gray-500 text-sm font-medium'>
          {listing.category === 'CAR' ? 'per day' : 'per night'}
        </span>
      </div>

      <div className='border border-gray-300 rounded-xl mb-4 overflow-visible divide-y divide-gray-300 relative'>
        <div className='flex divide-x divide-gray-300 relative'>
          <div 
            className='flex-1 p-3 cursor-pointer hover:bg-gray-50 transition-colors'
            onClick={() => {
              setShowCheckOutCalendar(false);
              setShowCheckInCalendar(!showCheckInCalendar);
            }}
          >
            <div className='text-[10px] uppercase font-bold text-gray-700 tracking-wider mb-1'>
              Check-in
            </div>
            <div className='text-sm text-gray-500'>
              {dateRange.from ? format(dateRange.from, 'dd-MM-yyyy') : 'Add date'}
            </div>
          </div>
          <div 
            className='flex-1 p-3 cursor-pointer hover:bg-gray-50 transition-colors'
            onClick={() => {
              setShowCheckInCalendar(false);
              setShowCheckOutCalendar(!showCheckOutCalendar);
            }}
          >
            <div className='text-[10px] uppercase font-bold text-gray-700 tracking-wider mb-1'>
              Check-out
            </div>
            <div className='text-sm text-gray-500'>
              {dateRange.to ? format(dateRange.to, 'dd-MM-yyyy') : 'Add date'}
            </div>
          </div>
          
          {/* Check-in Calendar Popup */}
          {showCheckInCalendar && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 z-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700">Select Check-in Date</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowCheckInCalendar(false); }}
                  className="text-gray-400 hover:text-gray-700 text-xl leading-none"
                >
                  &times;
                </button>
              </div>
              <DayPicker
                mode="single"
                selected={dateRange.from}
                onSelect={(date) => {
                  setDateRange({ ...dateRange, from: date });
                  setShowCheckInCalendar(false);
                  setShowCheckOutCalendar(true); // Auto-open check-out
                }}
                disabled={{ before: new Date() }}
                className="font-sans"
              />
            </div>
          )}
          
          {/* Check-out Calendar Popup */}
          {showCheckOutCalendar && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 z-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700">Select Check-out Date</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowCheckOutCalendar(false); }}
                  className="text-gray-400 hover:text-gray-700 text-xl leading-none"
                >
                  &times;
                </button>
              </div>
              <DayPicker
                mode="single"
                selected={dateRange.to}
                onSelect={(date) => {
                  setDateRange({ ...dateRange, to: date });
                  setShowCheckOutCalendar(false);
                }}
                disabled={{ before: dateRange.from || new Date() }}
                className="font-sans"
              />
            </div>
          )}
        </div>
        
        <div className='p-3 flex justify-between items-center'>
          <div>
            <div className='text-[10px] uppercase font-bold text-gray-700 tracking-wider mb-1'>
              Guests
            </div>
            <input 
              type="number" 
              min={1} 
              max={10} 
              value={guests} 
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="text-sm text-gray-700 font-medium outline-none w-16"
            />
          </div>
        </div>
      </div>

      {numberOfDays > 0 && (
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex justify-between text-gray-600 mb-2">
            <span>${pricePerUnit} x {numberOfDays} {listing.category === 'CAR' ? 'days' : 'nights'} x {guests} guests</span>
            <span>${basePrice}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>VAT (10%)</span>
            <span>${vat}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}

      <button 
        onClick={handleRequestToBook}
        disabled={isSubmitting || numberOfDays === 0}
        className='w-full bg-[#2563eb] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#1d4ed8] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md mb-4 flex items-center justify-center'
      >
        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Request to book'}
      </button>

      <p className='text-center text-gray-500 text-sm mt-4'>
        You won&apos;t be charged yet. Payments are made directly to the host on arrival.
      </p>
    </div>
  );
}
