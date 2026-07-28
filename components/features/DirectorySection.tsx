'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { countryApi } from '../../lib/api/countries';
import { listingApi } from '../../lib/api/listings';
import GlobalCard from '../shared/GlobalCard';

export default function DirectorySection() {
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [currentCountry, setCurrentCountry] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listings, setListings] = useState<any[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem('roamly_auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed?.isAuthenticated) {
          const unlocked = parsed.role !== 'GUEST' || parsed.subscriptionStatus === true;
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setIsUnlocked(unlocked);
        }
      } catch (e) {
        console.warn('Failed to parse auth data from localStorage', e);
      }
    }

    const fetchCountries = async () => {
      try {
        const res = await countryApi.getAllCountries();
        if (res?.data) {
          const loadedCountries = res.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((c: any) => c.loaded > 0)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((c: any) => c.name);
          setAvailableCountries(loadedCountries);
          if (loadedCountries.length > 0) {
            setCurrentCountry(loadedCountries[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load countries', err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!currentCountry) return;

    const fetchListings = async () => {
      setIsLoadingListings(true);
      try {
        const res = await listingApi.getAllListings({
          country: currentCountry,
          page: 1,
          limit: 12,
        });
        if (res?.data) {
          setListings(res.data);
        } else {
          setListings([]);
        }
      } catch (err) {
        console.error('Failed to load listings', err);
        setListings([]);
      } finally {
        setIsLoadingListings(false);
      }
    };

    fetchListings();
  }, [currentCountry]);

  const parseDescription = (desc: string): { hours: string; phone: string } => {
    let hours = '';
    let phone = '';
    if (desc) {
      const hMatch = desc.match(/Hours:\s*([^,]+)/);
      if (hMatch) hours = hMatch[1].trim();
      const pMatch = desc.match(/Phone:\s*(.+)/);
      if (pMatch) phone = pMatch[1].trim();
    }
    return { hours, phone };
  };

  return (
    <section className='py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between mb-4'>
        <h2
          className='text-[28px] md:text-[32px] font-bold text-[#15201f]'
          style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
        >
          Browse the directory
        </h2>
        <Link
          href='/countries'
          className='text-[#1e40af] font-bold text-[14px] hover:underline cursor-pointer'
        >
          See all countries
        </Link>
      </div>

      <div className='flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar'>
        {availableCountries.length === 0 && (
          <div className='text-sm text-gray-500'>Loading countries...</div>
        )}
        {availableCountries.map((c) => (
          <button
            key={c}
            onClick={() => setCurrentCountry(c)}
            className={`flex-none border rounded-3xl px-3.5 py-2 text-[14px] font-semibold transition-colors ${
              c === currentCountry
                ? 'bg-[#1e40af] text-white border-[#1e40af]'
                : 'bg-white border-[#e7e1d6] text-[#15201f] hover:bg-[#dbeafe]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {!isUnlocked && (
        <div className='bg-[#dbeafe] text-[#1e40af] rounded-xl p-4 text-[13px] font-medium mb-6'>
          You are browsing as a visitor. You can see photos only. Become a guest and unlock names,
          hours, contacts and booking for every host in every country.
        </div>
      )}

      {isLoadingListings ? (
        <div className='flex justify-center py-10'>
          <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1e40af]'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {listings.map((item) => {
            const { hours, phone } = parseDescription(item.description || '');
            const heroImage =
              item.images?.find((img: { isHero?: boolean; url?: string }) => img.isHero)?.url ||
              item.images?.[0]?.url;

            return (
              <GlobalCard
                key={item.id}
                title={item.title}
                category={item.category}
                hours={hours}
                phone={phone}
                locked={!isUnlocked}
                seed={item.id}
                imageUrl={heroImage}
                status={item.approvalStatus === 'UNCLAIMED' ? 'UNCLAIMED' : undefined}
              />
            );
          })}
          {listings.length === 0 && currentCountry && (
            <div className='col-span-full text-[#6b7b79] py-8'>
              No hosts found for {currentCountry}.
            </div>
          )}
        </div>
      )}

      {!isUnlocked && (
        <div className='bg-[#172554] text-white rounded-[18px] p-6 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5'>
          <div>
            <h3
              className='text-[22px] mb-1.5'
              style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
            >
              Unlock the full directory
            </h3>
            <p className='opacity-90 text-[14px] max-w-107.5'>
              See every host in every country, get contacts and hours, and book your full trip from
              one place.
            </p>
          </div>
          <div className='text-left md:text-right w-full md:w-auto shrink-0'>
            <div className='text-[28px] font-extrabold'>
              $9.99 <small className='text-[13px] font-semibold opacity-80'>/ month</small>
            </div>
            <Link
              href='/signup'
              className='inline-block mt-3 w-full sm:w-auto bg-[#2563eb] text-white text-center rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm'
            >
              Start now
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
