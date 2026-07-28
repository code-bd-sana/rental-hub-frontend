'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ServiceBookingWidget } from './ServiceBookingWidget';

export function ServiceDetailsView({ listing }: { listing: any }) {
  const serviceDetails = listing.serviceDetails || {};
  const packages = serviceDetails.packages || [];
  
  // Generate time slots from 10:00 to 20:30 with 90-min intervals
  const timeSlots = Array.from({ length: 8 }, (_, i) => {
    const totalMinutes = 10 * 60 + i * 90;
    const hour = Math.floor(totalMinutes / 60);
    const min = totalMinutes % 60 === 0 ? '00' : '30';
    return `${hour}:${min}`;
  });

  const images = listing.images || [];

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(packages[0]?.id || null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedPackage = packages.find((p: any) => p.id === selectedPackageId);

  return (
    <div className='min-h-screen bg-white'>
      {/* Breadcrumb */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center text-sm text-gray-500'>
          <Link href='/' className='hover:text-gray-900 transition-colors font-medium'>Home</Link>
          <ChevronRight className='w-4 h-4 mx-2 text-gray-400' />
          <span className='text-gray-900'>{listing.title}</span>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        
        {/* Header */}
        <div className='mb-8'>
          <div className='text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2'>Reserve and Confirm</div>
          <h1 className='text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4'>{listing.title}</h1>
          <p className='text-lg text-gray-500 max-w-2xl leading-relaxed'>
            {listing.description || 'Enjoy premium services delivered by our highly skilled professionals.'}
          </p>
        </div>

        <div className='flex flex-col lg:flex-row gap-12'>
          
          {/* Left Column - Details */}
          <div className='flex-1'>
            
            {/* Images Grid */}
            <div className='mb-8'>
              {images.length > 0 ? (
                <div className='rounded-2xl overflow-hidden mb-4 bg-gray-100 relative h-[400px] shadow-sm'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images[0].url} alt="Hero" className='w-full h-full object-cover' />
                </div>
              ) : (
                <div className='rounded-2xl overflow-hidden mb-4 bg-gray-100 h-[400px] flex items-center justify-center text-gray-400'>
                  No Image Available
                </div>
              )}
              
              {images.length > 1 && (
                <div className='grid grid-cols-4 gap-4'>
                  {images.slice(1, 5).map((img: any, idx: number) => (
                    <div key={idx} className='rounded-xl overflow-hidden bg-gray-100 relative h-24 shadow-sm'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={`Thumbnail ${idx + 1}`} className='w-full h-full object-cover' />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Host / Location Info */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-[#111827]'>
                {listing.host?.businessName || listing.host?.user?.name || 'Unknown Host'} · {listing.city || 'Unknown Location'}
              </h2>
            </div>

            {/* Service Packages */}
            <div className='mb-10'>
              <div className='space-y-4'>
                {packages.map((pkg: any) => (
                  <label 
                    key={pkg.id} 
                    className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${selectedPackageId === pkg.id ? 'border-[#111827] ring-1 ring-[#111827] shadow-sm bg-gray-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    {pkg.imageUrl && (
                      <div className='w-14 h-14 bg-gray-100 rounded-xl overflow-hidden mr-4 flex-none border border-gray-100'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pkg.imageUrl} alt={pkg.name} className='w-full h-full object-cover' />
                      </div>
                    )}
                    <div className='flex items-center flex-1'>
                      <input 
                        type="radio" 
                        name="service_package"
                        value={pkg.id}
                        checked={selectedPackageId === pkg.id}
                        onChange={() => setSelectedPackageId(pkg.id)}
                        className="w-5 h-5 text-[#111827] border-gray-300 focus:ring-[#111827]"
                      />
                      <span className='ml-4 font-semibold text-[#111827] text-[15px]'>{pkg.name}</span>
                    </div>
                    <div className='font-bold text-[#111827]'>
                      USD {pkg.price}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date and Time Picker */}
            <div className='mb-12'>
              <h3 className='text-2xl font-bold text-[#111827] mb-2'>Pick a date and time</h3>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-6'>
                {/* Date Picker */}
                <div className='bg-white border border-gray-200 rounded-2xl p-4 shadow-sm inline-block'>
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={{ before: new Date() }}
                    className="font-sans m-0"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <div className='text-sm text-gray-500 mb-4'>
                    {selectedDate ? format(selectedDate, 'EEEE, d MMMM') : 'Select a date first'}
                  </div>
                  <div className='grid grid-cols-4 gap-3'>
                    {timeSlots.map((time: string) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-1 text-[13px] sm:text-sm font-bold rounded-xl transition-colors border ${
                          selectedTime === time 
                            ? 'bg-[#111827] text-white border-[#111827] shadow-md' 
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Booking Widget */}
          <div className='w-full lg:w-[380px] flex-none'>
            <ServiceBookingWidget 
              listing={listing}
              selectedPackage={selectedPackage}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
