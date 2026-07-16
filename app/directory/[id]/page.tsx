/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { listingApi } from '@/lib/api/listings';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ListingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (!params.id) return;
        const data = await listingApi.getListingById(params.id as string);
        if (data.success) {
          setListing(data.data);
        } else {
          setListing(data); // Fallback if structure varies
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.id]);

  if (loading) {
    return (
      <div className='min-h-[80vh] flex items-center justify-center bg-white'>
        <div className='w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  }

  // Handle case where API response wraps data
  const listingData = listing?.data || listing;

  if (!listingData) {
    return (
      <div className='min-h-[80vh] flex flex-col items-center justify-center bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Listing not found</h2>
        <button onClick={() => router.back()} className='text-[#2563eb] hover:underline'>
          Go back
        </button>
      </div>
    );
  }

  // Handle Stay category
  if (listingData.category === 'STAY') {
    return <StayDetailsView listing={listingData} />;
  }

  // Handle Food category
  if (listingData.category === 'FOOD') {
    return <FoodDetailsView listing={listingData} />;
  }

  // Handle Car category
  if (listingData.category === 'CAR') {
    return <CarDetailsView listing={listingData} />;
  }

  // Placeholder for other categories
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center bg-white text-center p-6'>
      <h2 className='text-2xl font-bold mb-4'>Unsupported Category</h2>
      <p className='text-gray-500 mb-6'>
        Details view for {listingData.category} is not yet implemented.
      </p>
      <button onClick={() => router.back()} className='text-[#2563eb] hover:underline'>
        Go back
      </button>
    </div>
  );
}

function StayDetailsView({ listing }: { listing: any }) {
  const images = listing.images || [];
  const heroImage = images.find((img: any) => img.isHero) || images[0];
  const secondaryImages = images.filter((img: any) => img.id !== heroImage?.id).slice(0, 4);

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
          <span className='font-medium text-gray-900 truncate'>{listing.title}</span>
        </div>

        {/* Title Row */}
        <h1 className='text-3xl sm:text-[2.2rem] font-bold text-[#1e293b] leading-tight mb-2'>
          {listing.title}
        </h1>
        <div className='flex flex-wrap items-center gap-4 text-gray-600 font-semibold mb-6'>
          <span className='flex items-center gap-1'>
            <svg className='w-5 h-5 text-yellow-500' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z' />
            </svg>
            {listing.rating || 'New'}{' '}
            {listing.reviewCount ? `(${listing.reviewCount} reviews)` : ''}
          </span>
          <span className='hidden sm:inline'>·</span>
          <span>
            {listing.city}, {listing.country}
          </span>
        </div>

        {/* Gallery */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 rounded-2xl overflow-hidden mb-10 h-75 md:h-115 relative'>
          {heroImage ? (
            <div className='relative w-full h-full cursor-pointer group'>
              <Image
                src={heroImage.url}
                alt='Hero'
                fill
                priority
                sizes='(max-width: 768px) 100vw, 50vw'
                className='object-cover group-hover:scale-[1.02] transition-transform duration-500'
              />
            </div>
          ) : (
            <div className='bg-gray-200 w-full h-full' />
          )}

          <div className='hidden md:grid grid-cols-2 grid-rows-2 gap-2'>
            {secondaryImages.map((img: any, i: number) => (
              <div
                key={img.id}
                className='relative w-full h-full cursor-pointer group overflow-hidden'
              >
                <Image
                  src={img.url}
                  alt={`Gallery ${i}`}
                  fill
                  sizes='(max-width: 768px) 0vw, 25vw'
                  className='object-cover group-hover:scale-[1.05] transition-transform duration-500'
                />
              </div>
            ))}
            {/* Fill empty spots if less than 4 secondary images */}
            {Array.from({ length: Math.max(0, 4 - secondaryImages.length) }).map((_, i) => (
              <div key={`empty-${i}`} className='bg-gray-100 w-full h-full' />
            ))}
          </div>

          <button className='absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm shadow-md border border-gray-200 hover:bg-gray-50 transition-colors'>
            Show all photos
          </button>
        </div>

        {/* Split Layout */}
        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Left Column */}
          <div className='flex-1'>
            <div className='mb-10 pb-10 border-b border-gray-200'>
              <h3 className='text-2xl font-bold mb-4 text-[#1e293b]'>About this stay</h3>
              <p className='text-gray-600 leading-relaxed whitespace-pre-wrap'>
                {listing.description}
              </p>
            </div>

            <div className='mb-10 pb-10 border-b border-gray-200'>
              <h3 className='text-2xl font-bold mb-6 text-[#1e293b]'>What this place offers</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8'>
                {listing.stayDetails?.amenities?.map((amenity: string, idx: number) => (
                  <div key={idx} className='flex items-center gap-3 text-gray-700 font-medium'>
                    <svg
                      className='w-6 h-6 text-gray-400'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M5 12.5 9 16l10-9' />
                    </svg>
                    {amenity}
                  </div>
                )) || <p className='text-gray-500'>No amenities listed.</p>}
              </div>
            </div>

            {/* Host Section */}
            <div className='mb-10'>
              <h3 className='text-2xl font-bold mb-4 text-[#1e293b]'>
                Hosted by {listing.host?.user?.name || 'User'}
              </h3>
              <p className='text-gray-500'>
                To protect your payment, never transfer money or communicate outside of the Roamly
                website.
              </p>
            </div>
          </div>

          {/* Right Column - Reservation Sticky Card */}
          <div className='w-full lg:w-95 flex-none'>
            <div className='sticky top-28 bg-white border border-gray-200 rounded-2xl shadow-xl p-6'>
              <div className='mb-6 flex items-baseline gap-2'>
                <span className='text-2xl font-bold text-[#1e293b]'>
                  ${listing.stayDetails?.pricePerNight || 0}
                </span>
                <span className='text-gray-500 text-sm font-medium'>per night</span>
              </div>

              <div className='border border-gray-300 rounded-xl mb-4 overflow-hidden divide-y divide-gray-300'>
                <div className='flex divide-x divide-gray-300'>
                  <div className='flex-1 p-3 cursor-pointer hover:bg-gray-50 transition-colors'>
                    <div className='text-[10px] uppercase font-bold text-gray-700 tracking-wider mb-1'>
                      Check-in
                    </div>
                    <div className='text-sm text-gray-500'>Add date</div>
                  </div>
                  <div className='flex-1 p-3 cursor-pointer hover:bg-gray-50 transition-colors'>
                    <div className='text-[10px] uppercase font-bold text-gray-700 tracking-wider mb-1'>
                      Check-out
                    </div>
                    <div className='text-sm text-gray-500'>Add date</div>
                  </div>
                </div>
                <div className='p-3 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center'>
                  <div>
                    <div className='text-[10px] uppercase font-bold text-gray-700 tracking-wider mb-1'>
                      Guests
                    </div>
                    <div className='text-sm text-gray-700 font-medium'>1 guest</div>
                  </div>
                  <svg
                    className='w-5 h-5 text-gray-400'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polyline points='6 9 12 15 18 9'></polyline>
                  </svg>
                </div>
              </div>

              <button className='w-full bg-[#2563eb] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#1d4ed8] transition-colors shadow-md mb-4 flex items-center justify-center'>
                Reserve
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
                Request to chat
              </button>

              <p className='text-center text-gray-500 text-sm mt-4'>
                You won&apos;t be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodDetailsView({ listing }: { listing: any }) {
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

function CarDetailsView({ listing }: { listing: any }) {
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
