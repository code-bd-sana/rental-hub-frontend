'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import GlobalCard from '../../components/shared/GlobalCard';
import { countryApi } from '../../lib/api/countries';
import { listingApi } from '../../lib/api/listings';
import { paymentApi } from '../../lib/api/payment';

function DirectoryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCountry = searchParams.get('country') || 'All';
  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';

  const currentPage = Number(searchParams.get('page')) || 1;

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authRole, setAuthRole] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [availableCountries, setAvailableCountries] = useState<string[]>(['All']);
  const [searchQuery, setSearchQuery] = useState(currentSearch);

  const availableCategories = ['All', 'STAY', 'CAR', 'FOOD', 'Salon', 'Barber', 'Spa'];

  useEffect(() => {
    if (currentSearch !== searchQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchQuery(currentSearch);
    }
  }, [currentSearch, searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery !== currentSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (!searchQuery) {
          params.delete('search');
        } else {
          params.set('search', searchQuery);
        }
        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery, currentSearch, pathname, router, searchParams]);

  useEffect(() => {
    const authData = localStorage.getItem('roamly_auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed?.isAuthenticated) {
          const unlocked = parsed.role !== 'GUEST' || parsed.subscriptionStatus === true;
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setIsUnlocked(unlocked);
          setAuthRole(parsed.role);
        }
      } catch (e) {
        console.warn('Failed to parse auth data from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await countryApi.getAllCountries();
        if (res.success && res.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const names = res.data.map((c: any) => c.name);
          setAvailableCountries(['All', ...names]);
        }
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = { status: 'APPROVED', page: currentPage, limit: 12 };
        if (currentCountry !== 'All') query.country = currentCountry;
        if (currentCategory !== 'All') query.category = currentCategory;
        if (currentSearch) query.searchTerm = currentSearch;

        const res = await listingApi.getAllListings(query);
        if (res.success) {
          setListings(res.data);
          if (res.meta?.totalPages) {
            setTotalPages(res.meta.totalPages);
          } else {
            setTotalPages(1);
          }
        }
      } catch (err) {
        console.error('Failed to fetch listings:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, [currentPage, currentCountry, currentCategory, currentSearch]);

  const handleGuestSubscribe = async () => {
    try {
      const res = await paymentApi.createGuestSubscriptionSession();
      if (res.success && res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert('Failed to initialize payment.');
      }
    } catch (err) {
      console.error(err);
      alert('Error initializing payment.');
    }
  };

  // Filters are now applied on the backend
  const filteredListings = listings;

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'All' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    if (key !== 'page') {
      params.set('page', '1');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='min-h-screen bg-[#f8fafc] font-sans pb-16'>
      <div className='max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row sm:items-end justify-between mb-4'>
          <h2
            className='text-[28px] md:text-3xl font-bold text-[#15201f]'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Directory
          </h2>
          <span className='text-sm font-semibold text-[#6b7b79] mt-1 sm:mt-0 uppercase tracking-wide'>
            {currentCountry !== 'All' ? currentCountry : 'Global'}
          </span>
        </div>

        {/* Search Bar */}
        <div className='mb-6'>
          <div className='flex w-full md:w-1/2 relative'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search listings by title, city, or location...'
              className='w-full border border-[#e7e1d6] bg-white rounded-[30px] pl-5 pr-5 py-3 text-[15px] text-[#15201f] focus:outline-none focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af] transition-all'
            />
          </div>
        </div>

        {/* Country Filters */}
        <div className='flex gap-2 overflow-x-auto pb-3 mb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar'>
          {availableCountries.map((c) => (
            <button
              key={c}
              onClick={() => updateFilter('country', c)}
              className={`flex-none border rounded-[20px] px-4 py-2 text-[14px] font-semibold transition-colors cursor-pointer ${
                c === currentCountry
                  ? 'bg-[#1e40af] text-white border-[#1e40af]'
                  : 'bg-white border-[#e7e1d6] text-[#15201f] hover:bg-[#dbeafe]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        {availableCategories.length > 1 && (
          <div className='flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar'>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateFilter('category', cat)}
                className={`flex-none border rounded-[20px] px-3.5 py-1.5 text-[13px] font-bold transition-colors cursor-pointer uppercase tracking-[0.5px] ${
                  cat === currentCategory
                    ? 'bg-[#1e9e72] text-white border-[#1e9e72]'
                    : 'bg-white border-[#e7e1d6] text-[#6b7b79] hover:bg-[#dff3ec] hover:text-[#1e9e72]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Lock Note */}
        {!isUnlocked && (
          <div className='bg-[#dbeafe] text-[#1e40af] rounded-xl p-4 text-[13px] font-medium mb-6 border border-[#bfdbfe]'>
            Visitor view. Showing preview photos only. Unlock to see full host names, hours, contact
            details, and to book instantly!
          </div>
        )}

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {isLoading ? (
            // Loading Skeletons
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className='animate-pulse bg-white border border-[#e7e1d6] rounded-[18px] overflow-hidden shadow-sm'
              >
                <div className='aspect-4/3 bg-[#e2e8f0]'></div>
                <div className='p-4 space-y-3'>
                  <div className='h-4 bg-[#e2e8f0] rounded-sm w-1/4'></div>
                  <div className='h-5 bg-[#e2e8f0] rounded-sm w-3/4'></div>
                  <div className='h-3 bg-[#e2e8f0] rounded-sm w-1/2'></div>
                </div>
              </div>
            ))
          ) : filteredListings.length > 0 ? (
            filteredListings.map((listing) => {
              return (
                <GlobalCard
                  key={listing.id}
                  title={listing.title}
                  category={
                    listing.category === 'SERVICE' && listing.serviceDetails?.serviceType
                      ? listing.serviceDetails.serviceType
                      : listing.category
                  }
                  imageUrl={listing.images?.[0]?.url || ''}
                  status={'CLAIMED'}
                  hours={undefined}
                  phone={undefined}
                  locked={!isUnlocked}
                  seed={listing.id}
                />
              );
            })
          ) : (
            <div className='col-span-full bg-white border border-[#e7e1d6] rounded-2xl p-10 text-center text-[#6b7b79]'>
              No listings found for the selected filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-4 mt-10'>
            <button
              onClick={() => updateFilter('page', String(currentPage - 1))}
              disabled={currentPage <= 1 || isLoading}
              className='px-4 py-2 border border-[#e7e1d6] bg-white rounded-xl font-semibold text-[#15201f] disabled:opacity-50 hover:bg-gray-50 transition-colors cursor-pointer'
            >
              Previous
            </button>
            <span className='text-[14px] font-semibold text-[#6b7b79]'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => updateFilter('page', String(currentPage + 1))}
              disabled={currentPage >= totalPages || isLoading}
              className='px-4 py-2 border border-[#e7e1d6] bg-white rounded-xl font-semibold text-[#15201f] disabled:opacity-50 hover:bg-gray-50 transition-colors cursor-pointer'
            >
              Next
            </button>
          </div>
        )}

        {/* Paywall */}
        {!isUnlocked && (
          <div className='bg-[#172554] text-white rounded-[18px] p-6 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-[0_15px_40px_rgba(23,37,84,0.15)]'>
            <div>
              <h3
                className='text-[22px] mb-1.5 font-bold'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                You are seeing a preview
              </h3>
              <p className='opacity-90 text-[14px] max-w-107.5'>
                Unlock every host in every country and book your whole trip securely in one place.
              </p>
            </div>
            <div className='text-left md:text-right w-full md:w-auto shrink-0'>
              <div className='text-[28px] font-extrabold'>
                $9.99 <small className='text-[13px] font-semibold opacity-80'>/ month</small>
              </div>
              {authRole === 'GUEST' ? (
                <button
                  onClick={handleGuestSubscribe}
                  className='inline-block mt-3 w-full sm:w-auto bg-[#2563eb] text-white text-center rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm cursor-pointer'
                >
                  Unlock now
                </button>
              ) : (
                <Link
                  href='/signup'
                  className='inline-block mt-3 w-full sm:w-auto bg-[#2563eb] text-white text-center rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm'
                >
                  Unlock now (Sign up)
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-[#f8fafc] flex items-center justify-center font-bold text-[#6b7b79]'>
          Loading directory...
        </div>
      }
    >
      <DirectoryContent />
    </Suspense>
  );
}
