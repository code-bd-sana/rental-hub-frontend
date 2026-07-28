/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { MessageSquare, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { bookingApi } from '@/lib/api/booking';
import { toast } from 'sonner';

export function ServiceDetailsView({ listing }: { listing: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>(
    listing.images?.find((img: any) => img.isHero)?.url || listing.images?.[0]?.url,
  );

  const images = listing.images || [];

  const formatTime = (hourString: string) => {
    const hour = parseInt(hourString, 10);
    if (isNaN(hour)) return hourString;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour.toString().padStart(2, '0')}:00 ${ampm}`;
  };

  const availableSlots = listing.serviceDetails?.availableTimeSlots || [];
  const displayTimeSlots =
    availableSlots.length > 0
      ? availableSlots.map(formatTime)
      : [
          '09:00 AM',
          '10:00 AM',
          '11:00 AM',
          '12:00 PM',
          '01:00 PM',
          '02:00 PM',
          '03:00 PM',
          '04:00 PM',
        ];

  const today = new Date();
  const dateString = `Today, ${today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`;

  const handleRequestToBook = async () => {
    if (!selectedService) {
      toast.error('Please select a service package.');
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
        totalAmount: selectedService.price,
        depositAmount: 0,
        bookingData: {
          packageId: selectedService.id,
          packageName: selectedService.name,
          date: today.toISOString(),
          time: selectedTime,
          basePrice: selectedService.price,
          vat: 0,
        }
      };

      const res = await bookingApi.createBooking(payload);
      if (res.success) {
        toast.success('Reservation confirmed!');
        router.push(`/dashboard/booking-history`);
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
    <div className='min-h-screen bg-white pb-20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumbs */}
        <div className='text-sm text-gray-500 mb-6 flex items-center gap-2'>
          <Link href='/' className='hover:text-gray-900 transition-colors'>
            Home
          </Link>
          <span>›</span>
          <Link href='/directory' className='hover:text-gray-900 transition-colors'>
            Directory
          </Link>
          <span>›</span>
          <Link
            href={`/directory?category=${listing.serviceDetails?.serviceType || 'SERVICE'}`}
            className='hover:text-gray-900 transition-colors capitalize'
          >
            {listing.serviceDetails?.serviceType?.toLowerCase() || 'Service'}
          </Link>
          <span>›</span>
          <span className='font-medium text-gray-900 truncate'>{listing.title}</span>
        </div>

        {/* Header */}
        <div className='mb-8 border-b border-gray-100 pb-8'>
          <div className='text-sm font-bold text-[#e85d04] uppercase tracking-wider mb-2'>
            Reserve and confirm
          </div>
          <h2 className='text-3xl sm:text-4xl font-bold text-[#1e293b] mb-3'>Book a session</h2>
          <p className='text-gray-500 text-[15px] max-w-2xl'>
            Pick a service, choose a time, and confirm your booking with the host.
          </p>
        </div>

        {/* Split Layout */}
        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Left Column */}
          <div className='flex-1'>
            {/* Hero Image */}
            <div className='relative w-full aspect-video sm:aspect-21/9 rounded-2xl overflow-hidden mb-4 bg-gray-100'>
              {activeImage ? (
                <Image
                  src={activeImage}
                  alt={listing.title}
                  fill
                  priority
                  sizes='(max-width: 1024px) 100vw, 66vw'
                  className='object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                  No image available
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className='flex gap-3 overflow-x-auto pb-4 mb-4 no-scrollbar'>
                {images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img.url)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-none transition-all ${activeImage === img.url ? 'ring-2 ring-[#2563eb] ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <Image
                      src={img.url}
                      alt={`Gallery ${idx}`}
                      fill
                      sizes='80px'
                      className='object-cover'
                    />
                  </button>
                ))}
              </div>
            )}

            <h3 className='text-2xl font-bold text-[#1e293b] mb-6'>
              {listing.title}{' '}
              <span className='text-gray-400 text-lg font-medium'>· {listing.city}</span>
            </h3>

            {/* Service List */}
            <div className='flex flex-col gap-3 mb-10'>
              {listing.serviceDetails?.packages?.map((item: any) => (
                <label
                  key={item.id}
                  className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors ${selectedService?.id === item.id ? 'border-[#2563eb] bg-[#eff6ff]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <div className='flex items-center gap-4'>
                    {item.imageUrl && (
                      <div className='relative w-13.5 h-13.5 rounded-xl overflow-hidden bg-gray-100 flex-none'>
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes='54px'
                          className='object-cover'
                        />
                      </div>
                    )}
                    <div className='flex items-center gap-3'>
                      <input
                        type='radio'
                        name='service_selection'
                        className='w-4.5 h-4.5 accent-[#2563eb] cursor-pointer'
                        checked={selectedService?.id === item.id}
                        onChange={() => setSelectedService(item)}
                      />
                      <div className='font-bold text-[#1e293b]'>{item.name}</div>
                    </div>
                  </div>
                  <div className='font-extrabold text-[#1e293b] ml-4'>${item.price}</div>
                </label>
              ))}
              {(!listing.serviceDetails?.packages ||
                listing.serviceDetails.packages.length === 0) && (
                <div className='text-center text-gray-500 py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300'>
                  No services listed yet.
                </div>
              )}
            </div>

            {/* Time Slots */}
            <h3 className='text-2xl font-bold text-[#1e293b] mb-2'>Pick a time</h3>
            <p className='text-gray-500 text-[15px] mb-4'>{dateString}</p>
            <div className='flex flex-wrap gap-2.5 mb-10'>
              {displayTimeSlots.map((time: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2.5 border-2 rounded-xl font-bold text-[14px] transition-colors ${selectedTime === time ? 'bg-[#e85d04] border-[#e85d04] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Sticky Reservation Panel */}
          <div className='w-full lg:w-95 flex-none'>
            <div className='sticky top-28 bg-white border border-gray-200 rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden mb-6'>
              <div className='bg-[#fcfbf9] px-6 py-5 border-b border-gray-200'>
                <h3 className='font-bold text-xl text-[#1e293b]'>Your reservation</h3>
              </div>

              <div className='p-6'>
                {!selectedService && !selectedTime ? (
                  <div className='text-gray-500 text-[15px] mb-6'>
                    Select a service and a time to continue.
                  </div>
                ) : (
                  <div className='flex flex-col gap-4 mb-8'>
                    <div className='flex justify-between items-center pb-4 border-b border-gray-100'>
                      <span className='text-gray-600 font-medium'>
                        {selectedService?.name || 'Pick a service'}
                      </span>
                      <span className='font-bold text-[#1e293b]'>
                        {selectedService ? `$${selectedService.price}` : 'Reserve'}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-600 font-medium'>Time slot</span>
                      <span
                        className={`font-bold ${selectedTime ? 'text-[#e85d04]' : 'text-gray-400'}`}
                      >
                        {selectedTime || 'Pick a slot'}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  disabled={isSubmitting || !selectedService || !selectedTime}
                  onClick={handleRequestToBook}
                  className='w-full bg-[#2563eb] disabled:bg-[#93c5fd] disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-[15px] hover:bg-[#1d4ed8] transition-colors shadow-sm mb-3 flex items-center justify-center'
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
                </button>

                <button className='w-full bg-white text-gray-800 border border-gray-300 py-3.5 rounded-xl font-bold text-[15px] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2'>
                  <MessageSquare className='w-4 h-4' />
                  Request to chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}