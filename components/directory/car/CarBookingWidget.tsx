'use client';

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, differenceInDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { bookingApi } from '@/lib/api/booking';
import { toast } from 'sonner';
import { Loader2, Calendar as CalendarIcon, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export function CarBookingWidget({ 
  listing, 
  activeProtection, 
  extrasCost, 
  fuelMode 
}: { 
  listing: any;
  activeProtection: any;
  extrasCost: number;
  fuelMode: string;
}) {
  const router = useRouter();
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<any>(undefined);
  const [pickUpTime, setPickUpTime] = useState('10:00');
  const [returnTime, setReturnTime] = useState('10:00');
  
  const [showPriceDetails, setShowPriceDetails] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const car = listing.carDetails || {};
  const dailyRate = car.dailyRate || 0;
  // Use protection deposit, fallback to default 500
  const securityDeposit = activeProtection?.id === 'premium' ? 0 : 500; 

  const numberOfDays = (dateRange?.from && dateRange?.to) 
    ? Math.max(1, differenceInDays(dateRange.to, dateRange.from)) 
    : 0;

  const baseCost = numberOfDays * dailyRate;
  const protectionCost = numberOfDays * (activeProtection?.price || 0);
  const extraItemsCost = numberOfDays * (extrasCost || 0);
  
  const subtotal = baseCost + protectionCost + extraItemsCost;
  const vat = Math.round(subtotal * 0.10);
  const totalDueAtPickup = subtotal + vat;

  const handleRequestToBook = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error('Please select pick-up and return dates.');
      return;
    }
    if (!pickUpTime || !returnTime) {
      toast.error('Please select pick-up and return times.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        listingId: listing.id,
        totalAmount: totalDueAtPickup,
        depositAmount: securityDeposit,
        bookingData: {
          checkIn: dateRange.from.toISOString(),
          checkOut: dateRange.to.toISOString(),
          pickUpTime,
          returnTime,
          numberOfDays,
          basePrice: baseCost,
          protectionCost,
          extraItemsCost,
          fuelMode,
          vat,
          securityDeposit
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
    <div className='sticky top-28 bg-[#fcfcfb] border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-6'>
      
      {/* Header Pricing */}
      <div className='flex justify-between items-start mb-4'>
        <div className='flex items-baseline gap-1.5'>
          <span className='text-3xl font-extrabold text-[#111827]'>
            ${dailyRate}
          </span>
          <span className='text-gray-500 font-medium'>
            / day
          </span>
        </div>
        <div className='text-right leading-tight'>
          <div className='text-[13px] text-gray-500 font-medium'>Deposit</div>
          <div className='text-base font-extrabold text-[#111827]'>${securityDeposit}</div>
          <div className='text-[11px] text-gray-400'>refundable</div>
        </div>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap gap-2 mb-6'>
        <span className='flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium shadow-sm'>
          <svg className='w-3.5 h-3.5' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Age 25+
        </span>
        <span className='flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium shadow-sm'>
          <svg className='w-3.5 h-3.5' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          Card on file
        </span>
        <span className='flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium shadow-sm'>
          <Clock className='w-3 h-3' />
          Min 3d
        </span>
      </div>

      {/* Booking Form */}
      <div className='space-y-3 mb-6'>
        {/* Date Range Picker */}
        <div className='relative'>
          <div 
            onClick={() => setShowCalendar(!showCalendar)}
            className='w-full bg-white border border-gray-200 hover:border-gray-300 transition-colors rounded-xl p-3 cursor-pointer flex items-center shadow-sm'
          >
            <CalendarIcon className='w-4 h-4 text-gray-400 mr-3' />
            <div className='flex-1'>
              <div className='text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-0.5'>Pick-up. Return</div>
              <div className='text-[14px] font-bold text-[#111827]'>
                {dateRange?.from ? format(dateRange.from, 'dd-MM-yyyy') : 'Add date'} 
                {' - '} 
                {dateRange?.to ? format(dateRange.to, 'dd-MM-yyyy') : 'Add date'}
              </div>
            </div>
          </div>

          {showCalendar && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-2xl p-4 z-50 w-full sm:w-[320px]">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700">Select Dates</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowCalendar(false); }}
                  className="text-gray-400 hover:text-gray-700 text-xl leading-none"
                >
                  &times;
                </button>
              </div>
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={(range: any) => {
                  if (!range) {
                    setDateRange(undefined);
                    return;
                  }
                  setDateRange(range);
                  
                  // Only close the calendar if we ALREADY had a 'from' date selected in the previous state.
                  // This ensures the calendar doesn't close on the first click, even if DayPicker sets 'to'.
                  if (range.from && range.to && dateRange?.from) {
                    setShowCalendar(false);
                  }
                }}
                disabled={{ before: new Date() }}
                className="font-sans"
              />
            </div>
          )}
        </div>

        {/* Time Pickers */}
        <div className='flex gap-3'>
          <div className='flex-1 bg-white border border-gray-200 hover:border-gray-300 transition-colors rounded-xl p-3 shadow-sm'>
            <div className='text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-0.5'>Pick-up Time</div>
            <div className='flex items-center gap-2'>
              <Clock className='w-3.5 h-3.5 text-gray-400' />
              <input 
                type="time" 
                value={pickUpTime}
                onChange={(e) => setPickUpTime(e.target.value)}
                className='w-full text-sm font-bold text-[#111827] outline-none bg-transparent'
              />
            </div>
          </div>
          <div className='flex-1 bg-white border border-gray-200 hover:border-gray-300 transition-colors rounded-xl p-3 shadow-sm'>
            <div className='text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-0.5'>Return Time</div>
            <div className='flex items-center gap-2'>
              <Clock className='w-3.5 h-3.5 text-gray-400' />
              <input 
                type="time" 
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className='w-full text-sm font-bold text-[#111827] outline-none bg-transparent'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Price Details */}
      {numberOfDays > 0 && (
        <div className='mb-6 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm'>
          <button 
            onClick={() => setShowPriceDetails(!showPriceDetails)}
            className='w-full flex justify-between items-center p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors border-b border-gray-100'
          >
            <span className='font-bold text-[#111827]'>Price details</span>
            <div className='flex items-center gap-2'>
              <span className='font-bold text-[#111827]'>${totalDueAtPickup}</span>
              {showPriceDetails ? <ChevronUp className='w-4 h-4 text-gray-400' /> : <ChevronDown className='w-4 h-4 text-gray-400' />}
            </div>
          </button>
          
          {showPriceDetails && (
            <div className='p-4 space-y-3 text-sm'>
              <div className='flex justify-between text-gray-600'>
                <span>{numberOfDays} days × ${dailyRate}</span>
                <span className='font-medium text-[#111827]'>${baseCost}</span>
              </div>
              {protectionCost > 0 && (
                <div className='flex justify-between text-gray-600'>
                  <span>Protection ({activeProtection.name})</span>
                  <span className='font-medium text-[#111827]'>${protectionCost}</span>
                </div>
              )}
              {extraItemsCost > 0 && (
                <div className='flex justify-between text-gray-600'>
                  <span>Extras</span>
                  <span className='font-medium text-[#111827]'>${extraItemsCost}</span>
                </div>
              )}
              <div className='flex justify-between text-gray-600'>
                <span>Taxes (BTW 10%)</span>
                <span className='font-medium text-[#111827]'>${vat}</span>
              </div>
              
              <div className='pt-3 mt-3 border-t border-gray-100'>
                <div className='flex justify-between font-bold text-base text-[#111827] mb-2'>
                  <span>Total due at pickup</span>
                  <span>${totalDueAtPickup}</span>
                </div>
                <div className='flex justify-between items-center text-gray-500 text-xs'>
                  <span className='flex items-center gap-1.5'>
                    + Refundable security deposit 
                    <span className='bg-green-100 text-green-700 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded'>Held Only</span>
                  </span>
                  <span>${securityDeposit}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className='space-y-3'>
        <button 
          onClick={handleRequestToBook}
          disabled={isSubmitting || numberOfDays === 0}
          className='w-full bg-[#8261e6] hover:bg-[#6c48d4] disabled:bg-[#a68ff0] disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-[15px] transition-colors shadow-md flex items-center justify-center'
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (numberOfDays > 0 ? `Request to book • $${totalDueAtPickup}` : 'Request to book')}
        </button>
        <button className='w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2'>
          <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          Ask the host a question
        </button>
        <button className='w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2'>
          <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M21.9 12c-1.9 4.3-5.9 7-9.9 7s-8-2.7-9.9-7c1.9-4.3 5.9-7 9.9-7s8 2.7 9.9 7Z"/></svg>
          Request to see this car
        </button>
      </div>

      <div className='mt-6 text-[11px] text-gray-400 leading-relaxed text-center flex flex-col gap-2'>
        <p className='flex items-start gap-1.5 text-left'>
          <CalendarIcon className='w-3.5 h-3.5 flex-none mt-0.5' />
          Payments are made directly to the host on arrival. Rentals Hub does not collect or process payments. Please keep all communication on the platform for your protection.
        </p>
        <p className='flex items-center gap-1.5 justify-center'>
          <svg className='w-3.5 h-3.5' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Verified host · Secure messaging
        </p>
      </div>
    </div>
  );
}
