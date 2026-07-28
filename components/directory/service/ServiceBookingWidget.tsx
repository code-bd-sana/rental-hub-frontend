'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { bookingApi } from '@/lib/api/booking';
import { toast } from 'sonner';
import { Loader2, MessageSquare } from 'lucide-react';

export function ServiceBookingWidget({ 
  listing, 
  selectedPackage, 
  selectedDate,
  selectedTime
}: { 
  listing: any;
  selectedPackage: any;
  selectedDate: Date | undefined;
  selectedTime: string | null;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const price = selectedPackage?.price || 0;
  const vat = Math.round(price * 0.10);
  const totalAmount = price + vat;

  const handleRequestToBook = async () => {
    if (!selectedPackage) {
      toast.error('Please select a service package.');
      return;
    }
    if (!selectedDate) {
      toast.error('Please select a date.');
      return;
    }
    if (!selectedTime) {
      toast.error('Please select a time.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        listingId: listing.id,
        totalAmount: totalAmount,
        depositAmount: 0,
        bookingData: {
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          date: selectedDate.toISOString(),
          time: selectedTime,
          basePrice: price,
          vat,
        }
      };

      const res = await bookingApi.createBooking(payload);
      if (res.success) {
        toast.success('Reservation confirmed!');
        router.push(`/bookings/${res.data.id}/confirmation`);
      } else {
        toast.error(res.message || 'Failed to create reservation');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error creating reservation');
      setIsSubmitting(false);
    }
  };

  return (
    <div className='sticky top-28 bg-white border border-[#e7e1d6] shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden'>
      <div className='p-5 border-b border-[#e7e1d6]'>
        <h3 className='text-lg font-bold text-[#111827]'>Your reservation</h3>
      </div>
      
      <div className='p-5 space-y-4'>
        {selectedPackage ? (
          <div className='flex justify-between items-center text-[15px]'>
            <span className='text-gray-600'>{selectedPackage.name}</span>
            <span className='font-medium text-[#111827]'>USD {price}</span>
          </div>
        ) : (
          <div className='text-sm text-gray-400 italic'>No service selected</div>
        )}

        <div className='flex justify-between items-center text-[15px]'>
          <span className='text-gray-600'>Time</span>
          <span className='font-medium text-[#111827]'>
            {selectedTime ? selectedTime : <span className='text-gray-400 italic font-normal'>Select time</span>}
          </span>
        </div>

        {selectedPackage && (
          <div className='pt-4 mt-4 border-t border-[#e7e1d6]'>
            <div className='flex justify-between items-center font-bold text-[#111827]'>
              <span>Total (incl. VAT)</span>
              <span>USD {totalAmount}</span>
            </div>
          </div>
        )}

        <div className='pt-4 space-y-3'>
          <button 
            onClick={handleRequestToBook}
            disabled={isSubmitting || !selectedPackage || !selectedDate || !selectedTime}
            className='w-full bg-[#111827] hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-[15px] transition-colors flex items-center justify-center'
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm with payment'}
          </button>
          
          <button className='w-full bg-white border border-[#e7e1d6] hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2'>
            <MessageSquare className='w-4 h-4' />
            Request to chat
          </button>
        </div>
      </div>
    </div>
  );
}
