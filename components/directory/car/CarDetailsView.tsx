/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function CarDetailsView({ listing }: { listing: any }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [protection, setProtection] = useState('basic');
  const [fuel, setFuel] = useState('full-to-full');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const heroImage = listing.images?.find((img: any) => img.isHero) || listing.images?.[0];
  const car = listing.carDetails || {};

  const protectionPlans = [
    {
      id: 'basic',
      name: 'Basic Cover',
      price: 0,
      desc: 'Standard deposit hold. Basic coverage included.',
    },
    {
      id: 'standard',
      name: 'Standard Cover',
      price: 15,
      desc: 'Reduced deposit hold. Includes window & tire protection.',
    },
    {
      id: 'premium',
      name: 'Premium Cover',
      price: 30,
      desc: 'Zero deposit hold. Full peace of mind.',
    },
  ];

  const extraOptions = [
    { id: 'gps', name: 'GPS Navigation', price: 5, desc: 'Keep on track.' },
    { id: 'child-seat', name: 'Child Seat', price: 10, desc: 'For kids up to 4 years.' },
    { id: 'additional-driver', name: 'Additional Driver', price: 8, desc: 'Share the drive.' },
  ];

  const activeProtection = protectionPlans.find((p) => p.id === protection) || protectionPlans[0];
  const extrasCost = selectedExtras.reduce((sum, extId) => {
    const opt = extraOptions.find((o) => o.id === extId);
    return sum + (opt ? opt.price : 0);
  }, 0);

  // Mock calculation
  const days = 3;
  const dailyRate = car.dailyRate || 0;
  const carCost = dailyRate * days;
  const totalCost = carCost + activeProtection.price * days + extrasCost * days;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  };

  return (
    <div className='min-h-screen bg-[#f8fafc] pb-20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumbs & Stepper */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4'>
          <div className='text-sm text-gray-500 flex items-center gap-2'>
            <Link href='/' className='hover:text-gray-900 transition-colors'>
              Home
            </Link>
            <span>›</span>
            <Link href='/directory' className='hover:text-gray-900 transition-colors'>
              Directory
            </Link>
            <span>›</span>
            <Link href='/directory?category=CAR' className='hover:text-gray-900 transition-colors'>
              Cars
            </Link>
            <span>›</span>
            <span className='font-medium text-gray-900 truncate'>{listing.title}</span>
          </div>

          <div className='flex items-center gap-3 text-sm font-bold'>
            <div
              className={`flex items-center gap-2 ${step === 1 ? 'text-[#1e293b]' : 'text-[#10b981]'}`}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs text-white ${step === 1 ? 'bg-[#1e293b]' : 'bg-[#10b981]'}`}
              >
                {step === 1 ? '1' : '✓'}
              </span>
              <span className='hidden sm:inline'>Your car</span>
            </div>
            <div className='w-8 h-0.5 bg-gray-200'></div>
            <div
              className={`flex items-center gap-2 ${step === 2 ? 'text-[#1e293b]' : 'text-gray-400'}`}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs text-white ${step === 2 ? 'bg-[#1e293b]' : 'bg-gray-300'}`}
              >
                2
              </span>
              <span className='hidden sm:inline'>Extras</span>
            </div>
            <div className='w-8 h-0.5 bg-gray-200'></div>
            <div className='flex items-center gap-2 text-gray-400'>
              <span className='w-6 h-6 flex items-center justify-center rounded-full text-xs text-white bg-gray-300'>
                3
              </span>
              <span className='hidden sm:inline'>Pay</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Left Column */}
          <div className='flex-1'>
            {step === 1 && (
              <div className='animate-in fade-in slide-in-from-bottom-4 duration-500'>
                {/* Hero */}
                <div className='relative w-full aspect-video rounded-[18px] overflow-hidden mb-6 bg-gray-100 shadow-sm'>
                  {heroImage ? (
                    <Image
                      src={heroImage.url}
                      alt='Car'
                      fill
                      priority
                      sizes='(max-width: 1024px) 100vw, 66vw'
                      className='object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-400'>
                      No image
                    </div>
                  )}
                  <div className='absolute top-4 left-4 bg-white/90 backdrop-blur text-[13px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm'>
                    <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none'>
                      <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
                      <path
                        d='M12 8v5m0 3h.01'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                    Example photo
                  </div>
                </div>

                <h1 className='text-3xl sm:text-[2rem] font-bold text-[#1e293b] mb-2'>
                  {listing.title}
                </h1>
                <div className='text-[#e85d04] font-bold mb-4'>
                  Or similar • {car.carType || 'Car category'}
                </div>

                {/* Specs Row */}
                <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-[#6b7b79] text-[15px] font-medium mb-6 pb-6 border-b border-gray-200'>
                  <span className='flex items-center gap-2'>
                    <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                    {car.seats || 4} Seats
                  </span>
                  <span className='flex items-center gap-2'>
                    <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                      />
                    </svg>
                    {car.transmission || 'Automatic'}
                  </span>
                  <span className='flex items-center gap-2'>
                    <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 6h16M4 10h16M4 14h16M4 18h16'
                      />
                    </svg>
                    {car.doors || 4} Doors
                  </span>
                  {car.bags?.large > 0 && (
                    <span className='flex items-center gap-2'>👜 {car.bags.large} Large bag</span>
                  )}
                </div>

                <div className='bg-[#eff6ff] text-[#1e40af] p-4 rounded-xl text-[14px] leading-relaxed mb-8 border border-[#bfdbfe] flex gap-3'>
                  <svg className='w-6 h-6 flex-none mt-0.5' viewBox='0 0 24 24' fill='none'>
                    <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
                    <path
                      d='M12 8v5m0 3h.01'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                  <div>
                    <b>This is a category, not one exact car.</b> The photo is an example. Your host
                    will provide this car or a similar vehicle in the same category.
                  </div>
                </div>

                {car.features && car.features.length > 0 && (
                  <div className='mb-8 pb-8 border-b border-gray-200'>
                    <h3 className='text-xl font-bold text-[#1e293b] mb-4'>What this car offers</h3>
                    <div className='grid grid-cols-2 gap-y-3 gap-x-6'>
                      {car.features.map((feat: string, i: number) => (
                        <div key={i} className='flex items-center gap-2 text-gray-700 font-medium'>
                          <svg
                            className='w-5 h-5 text-gray-400'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M5 12.5 9 16l10-9' />
                          </svg>
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {car.includedItems && car.includedItems.length > 0 && (
                  <div className='mb-8 pb-8 border-b border-gray-200'>
                    <h3 className='text-xl font-bold text-[#1e293b] mb-4'>What is included</h3>
                    <div className='flex flex-col gap-3'>
                      {car.includedItems.map((inc: string, i: number) => (
                        <div key={i} className='flex items-start gap-3'>
                          <svg
                            className='w-5 h-5 text-green-500 flex-none mt-0.5'
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <path
                              d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z'
                              stroke='currentColor'
                              strokeWidth='2'
                            />
                            <path
                              d='M8 12l3 3 5-5'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                            />
                          </svg>
                          <span className='text-gray-700 font-medium'>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className='mb-8'>
                  <h3 className='text-xl font-bold text-[#1e293b] mb-4'>
                    Bring this to your pickup
                  </h3>
                  <div className='flex flex-col gap-3 bg-gray-50 p-5 rounded-2xl border border-gray-100'>
                    <div className='flex items-center gap-3 text-gray-700 font-medium'>
                      <svg className='w-5 h-5 text-gray-500' viewBox='0 0 24 24' fill='none'>
                        <rect
                          x='3'
                          y='5'
                          width='18'
                          height='14'
                          rx='2'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <path
                          d='M7 9h4M7 13h7'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                      </svg>
                      A valid driver licence
                    </div>
                    <div className='flex items-center gap-3 text-gray-700 font-medium'>
                      <svg className='w-5 h-5 text-gray-500' viewBox='0 0 24 24' fill='none'>
                        <rect
                          x='4'
                          y='3'
                          width='16'
                          height='18'
                          rx='2'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <circle cx='12' cy='10' r='2.5' stroke='currentColor' strokeWidth='2' />
                        <path
                          d='M8 17c.7-2 7.3-2 8 0'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                      </svg>
                      A valid ID card or passport
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className='animate-in fade-in slide-in-from-right-8 duration-500'>
                <div className='bg-[#eff6ff] p-4 rounded-xl border border-[#bfdbfe] mb-8 flex justify-between items-center'>
                  <div>
                    <b className='text-[#1e40af]'>{listing.title}</b>{' '}
                    <span className='text-gray-500 text-sm'>· 3 Days rental</span>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className='text-[#2563eb] font-bold text-sm hover:underline'
                  >
                    Edit
                  </button>
                </div>

                <div className='mb-10'>
                  <h3 className='text-2xl font-bold text-[#1e293b] mb-2'>Fuel</h3>
                  <p className='text-gray-500 text-[15px] mb-4'>
                    Choose how you would like to handle fuel.
                  </p>
                  <div className='grid sm:grid-cols-2 gap-4'>
                    <div
                      onClick={() => setFuel('full-to-full')}
                      className={`cursor-pointer border-2 rounded-xl p-4 transition-colors ${fuel === 'full-to-full' ? 'border-[#2563eb] bg-[#eff6ff]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    >
                      <div className='font-bold text-[#1e293b] mb-1 flex justify-between'>
                        Full to Full
                        {fuel === 'full-to-full' && (
                          <svg
                            className='w-5 h-5 text-[#2563eb]'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M5 12.5 9 16l10-9' />
                          </svg>
                        )}
                      </div>
                      <div className='text-sm text-gray-500'>
                        Return the car with a full tank. No extra upfront charges.
                      </div>
                    </div>
                    <div
                      onClick={() => setFuel('prepaid')}
                      className={`cursor-pointer border-2 rounded-xl p-4 transition-colors ${fuel === 'prepaid' ? 'border-[#2563eb] bg-[#eff6ff]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    >
                      <div className='font-bold text-[#1e293b] mb-1 flex justify-between'>
                        Prepaid Fuel
                        {fuel === 'prepaid' && (
                          <svg
                            className='w-5 h-5 text-[#2563eb]'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M5 12.5 9 16l10-9' />
                          </svg>
                        )}
                      </div>
                      <div className='text-sm text-gray-500'>
                        Pay for a full tank now and return empty.
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mb-10'>
                  <h3 className='text-2xl font-bold text-[#1e293b] mb-2'>Choose your protection</h3>
                  <p className='text-gray-500 text-[15px] mb-4'>
                    Pick the cover that suits your trip.
                  </p>
                  <div className='flex flex-col gap-3'>
                    {protectionPlans.map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => setProtection(plan.id)}
                        className={`cursor-pointer border-2 rounded-xl p-4 transition-colors flex items-center justify-between ${protection === plan.id ? 'border-[#2563eb] bg-[#eff6ff]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                      >
                        <div>
                          <div className='font-bold text-[#1e293b] text-lg'>{plan.name}</div>
                          <div className='text-sm text-gray-500'>{plan.desc}</div>
                        </div>
                        <div className='text-right'>
                          <div className='font-extrabold text-[#1e293b]'>+${plan.price}/day</div>
                          {protection === plan.id && (
                            <svg
                              className='w-6 h-6 text-[#2563eb] ml-auto mt-1'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <path d='M5 12.5 9 16l10-9' />
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='mb-10'>
                  <h3 className='text-2xl font-bold text-[#1e293b] mb-2'>Add extras</h3>
                  <p className='text-gray-500 text-[15px] mb-4'>
                    Optional add ons for a smoother trip.
                  </p>
                  <div className='flex flex-col gap-3'>
                    {extraOptions.map((extra) => (
                      <div
                        key={extra.id}
                        className='bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between'
                      >
                        <div>
                          <div className='font-bold text-[#1e293b]'>{extra.name}</div>
                          <div className='text-sm text-gray-500'>{extra.desc}</div>
                        </div>
                        <div className='flex items-center gap-4'>
                          <div className='font-bold text-gray-600'>+${extra.price}/day</div>
                          <button
                            onClick={() => toggleExtra(extra.id)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${selectedExtras.includes(extra.id) ? 'bg-[#ef4444] text-white hover:bg-[#dc2626]' : 'bg-[#f1f5f9] text-[#1e293b] border border-gray-300 hover:bg-gray-200'}`}
                          >
                            {selectedExtras.includes(extra.id) ? 'Remove' : 'Add'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sticky Cards */}
          <div className='w-full lg:w-95 flex-none'>
            {step === 1 && (
              <div className='sticky top-28 bg-white border border-gray-200 rounded-2xl shadow-xl p-6'>
                <div className='mb-6 flex items-baseline gap-2'>
                  <span className='text-2xl font-bold text-[#1e293b]'>${dailyRate.toFixed(2)}</span>
                  <span className='text-gray-500 text-sm font-medium'>per day</span>
                </div>

                <div className='border border-gray-300 rounded-xl mb-4 overflow-hidden divide-y divide-gray-300'>
                  <div className='flex divide-x divide-gray-300'>
                    <div className='flex-1 p-3 cursor-pointer hover:bg-gray-50 transition-colors'>
                      <div className='text-[10px] uppercase font-bold text-gray-700 tracking-wider mb-1'>
                        Pickup
                      </div>
                      <div className='text-sm text-gray-500'>Add date</div>
                    </div>
                    <div className='flex-1 p-3 cursor-pointer hover:bg-gray-50 transition-colors'>
                      <div className='text-[10px] uppercase font-bold text-gray-700 tracking-wider mb-1'>
                        Return
                      </div>
                      <div className='text-sm text-gray-500'>Add date</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className='w-full bg-[#2563eb] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#1d4ed8] transition-colors shadow-md mb-4'
                >
                  Reserve car
                </button>

                <button className='w-full bg-white text-gray-800 border border-gray-300 py-3 rounded-xl font-bold text-[15px] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2'>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path d='M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z' />
                  </svg>
                  Message the host
                </button>

                <p className='text-gray-500 text-[13px] mt-4 leading-relaxed text-center'>
                  <b>How payment works.</b> You pay a small hold online to confirm. The rest is
                  settled with the host at pickup.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className='sticky top-28 bg-white border border-gray-200 rounded-2xl shadow-xl p-6'>
                <div className='p-head border-b border-gray-200 pb-4 mb-4'>
                  <h3 className='text-xl font-bold text-[#1e293b]'>Your booking</h3>
                </div>

                <div className='flex flex-col gap-3 mb-6'>
                  <div className='flex justify-between text-[15px] text-gray-700'>
                    <span>
                      ${dailyRate.toFixed(2)} × {days} days
                    </span>
                    <span className='font-medium'>${carCost.toFixed(2)}</span>
                  </div>
                  {activeProtection.price > 0 && (
                    <div className='flex justify-between text-[15px] text-gray-700'>
                      <span>Protection ({activeProtection.name})</span>
                      <span className='font-medium'>
                        ${(activeProtection.price * days).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {extrasCost > 0 && (
                    <div className='flex justify-between text-[15px] text-gray-700'>
                      <span>Extras</span>
                      <span className='font-medium'>${(extrasCost * days).toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className='flex justify-between items-center border-t border-gray-200 pt-4 mb-6'>
                  <span className='font-bold text-[#1e293b]'>Total</span>
                  <span className='font-extrabold text-2xl text-[#1e293b]'>
                    ${totalCost.toFixed(2)}
                  </span>
                </div>

                <button className='w-full bg-[#2563eb] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#1d4ed8] transition-colors shadow-md mb-3'>
                  Continue to payment
                </button>
                <button
                  onClick={() => setStep(1)}
                  className='w-full bg-white text-gray-800 border border-gray-300 py-3 rounded-xl font-bold text-[15px] hover:bg-gray-50 transition-colors'
                >
                  Back to car
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
