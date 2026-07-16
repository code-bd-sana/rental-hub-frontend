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
