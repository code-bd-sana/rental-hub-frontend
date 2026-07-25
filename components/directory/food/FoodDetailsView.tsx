/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function FoodDetailsView({ listing }: { listing: any }) {
  const [cart, setCart] = useState<any[]>([]);

  const heroImage = listing.images?.find((img: any) => img.isHero) || listing.images?.[0];

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className='min-h-screen bg-[#f8fafc] pb-20'>
      {/* Hero Section */}
      <div className='relative w-full h-[40vh] min-h-75'>
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt='Hero'
            fill
            priority
            sizes='100vw'
            className='object-cover brightness-[0.7]'
          />
        ) : (
          <div className='w-full h-full bg-gray-800' />
        )}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center px-4 max-w-4xl mx-auto'>
            <h1 className='text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg'>
              {listing.title}
            </h1>
            <div className='flex items-center justify-center gap-4 text-white font-medium text-lg drop-shadow-md'>
              <span className='flex items-center gap-1 text-yellow-400'>
                <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z' />
                </svg>
                {listing.rating || 'New'}
              </span>
              <span>·</span>
              <span>
                {listing.city}, {listing.country}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumbs */}
        <div className='text-sm text-gray-500 mb-8 flex items-center gap-2'>
          <Link href='/' className='hover:text-gray-900 transition-colors'>
            Home
          </Link>
          <span>›</span>
          <Link href='/directory' className='hover:text-gray-900 transition-colors'>
            Directory
          </Link>
          <span>›</span>
          <Link href='/directory?category=FOOD' className='hover:text-gray-900 transition-colors'>
            Food
          </Link>
          <span>›</span>
          <span className='font-medium text-gray-900 truncate'>{listing.title}</span>
        </div>

        {/* Split Layout */}
        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Left Column - Menu */}
          <div className='flex-1'>
            <h3 className='text-2xl font-bold mb-6 text-[#1e293b]'>Menu</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              {listing.foodDetails?.items?.map((item: any) => (
                <div
                  key={item.id}
                  className='flex gap-4 bg-white border border-[#e7e1d6] rounded-2xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                >
                  <div className='relative w-24.5 h-24.5 flex-none rounded-xl overflow-hidden bg-gray-100'>
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes='98px'
                        className='object-cover'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-gray-400'>
                        <svg
                          className='w-8 h-8'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col flex-1 min-w-0 py-1'>
                    <div className='font-bold text-[#15201f] text-[1.05rem] truncate'>
                      {item.name}
                    </div>
                    <div className='text-[0.82rem] text-[#6b7b79] mt-1 mb-auto line-clamp-2 leading-snug'>
                      {item.description || 'No description provided.'}
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                      <span className='font-extrabold text-[#15201f]'>${item.price}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className='bg-[#7b39ed] hover:bg-[#622dc2] text-white font-bold text-[0.84rem] py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-colors'
                      >
                        <svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='none'>
                          <path
                            d='M12 5v14M5 12h14'
                            stroke='currentColor'
                            strokeWidth='2.4'
                            strokeLinecap='round'
                          />
                        </svg>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {(!listing.foodDetails?.items || listing.foodDetails.items.length === 0) && (
                <div className='col-span-full text-center text-gray-500 py-10 bg-white border border-gray-200 rounded-2xl'>
                  No menu items found.
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Cart Sticky Card */}
          <div className='w-full lg:w-95 flex-none'>
            {/* Cart Panel */}
            <div className='sticky top-28 bg-white border border-[#e7e1d6] rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden mb-6'>
              <div className='bg-[#fcfbf9] px-5 py-4 border-b border-[#e7e1d6] flex justify-between items-center'>
                <h3 className='font-bold text-[#15201f] text-lg'>Your food cart</h3>
                <span className='text-[#e85d04] font-bold text-sm bg-[#fff0e6] px-2.5 py-1 rounded-full'>
                  {cart.reduce((s, i) => s + i.qty, 0)} items
                </span>
              </div>

              <div className='p-5'>
                {cart.length === 0 ? (
                  <div className='text-[#6b7b79] text-center text-[15px] py-4 bg-[#f8fafc] rounded-xl border border-dashed border-gray-300'>
                    Tap any dish to drop it in your cart.
                  </div>
                ) : (
                  <div className='flex flex-col gap-3 mb-4 max-h-75 overflow-y-auto no-scrollbar'>
                    {cart.map((item, idx) => (
                      <div key={idx} className='flex justify-between items-center text-[15px]'>
                        <span className='text-[#15201f] font-medium'>
                          <span className='text-[#6b7b79] mr-2'>{item.qty} ×</span>
                          {item.name}
                        </span>
                        <span className='font-bold text-[#15201f]'>
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <div className='flex justify-between items-center border-t border-gray-200 pt-4 mb-4'>
                    <span className='font-bold text-gray-600 uppercase text-xs tracking-wider'>
                      Total
                    </span>
                    <span className='font-extrabold text-xl text-[#15201f]'>
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                )}

                <button
                  disabled={cart.length === 0}
                  className='w-full bg-[#2563eb] disabled:bg-[#93c5fd] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#1d4ed8] transition-colors shadow-sm'
                >
                  Place order
                </button>
              </div>
            </div>

            {/* Talk to Kitchen Panel */}
            <div className='bg-white border border-[#e7e1d6] rounded-[20px] shadow-[0_4px_15px_rgba(0,0,0,0.04)] overflow-hidden'>
              <div className='bg-[#fcfbf9] px-5 py-3.5 border-b border-[#e7e1d6]'>
                <h3 className='font-bold text-[#15201f]'>Talk to the kitchen</h3>
              </div>
              <div className='p-5'>
                <p className='text-[0.88rem] text-[#6b7b79] mb-4 leading-relaxed'>
                  Have a question about an item or a custom order? Reach the host directly.
                </p>
                <div className='flex flex-col gap-2.5'>
                  <button className='w-full bg-[#15201f] text-white py-2.5 rounded-xl font-bold text-[14px] hover:bg-black transition-colors flex items-center justify-center gap-2'>
                    <svg viewBox='0 0 24 24' fill='none' className='w-4 h-4'>
                      <path
                        d='M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z'
                        stroke='#fff'
                        strokeWidth='2'
                        strokeLinejoin='round'
                      />
                    </svg>
                    Request to chat
                  </button>
                  <button className='w-full bg-white text-[#15201f] border border-[#e7e1d6] py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#f8fafc] transition-colors'>
                    Book a table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
