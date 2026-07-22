/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { apiClient } from '../../lib/api/client';

interface Listing {
  id: string;
  title: string;
  location?: string;
  category: string;
  images?: { url: string }[];
  country?: string;
  businessNumber?: string;
  address?: string;
}

export default function ClaimBusinessPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Form details
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  // Docs
  const [idCard, setIdCard] = useState<File | null>(null);
  const [proofOwnership, setProofOwnership] = useState<File | null>(null);
  const [businessRegistration, setBusinessRegistration] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch unclaimed directories
    const fetchDirectories = async () => {
      try {
        const res = await apiClient.get('/directory?status=UNCLAIMED');
        const data = res.data?.data || res.data || [];
        if (data.length > 0) {
          const mapped = data.map(
            (d: {
              id: string;
              businessName: string;
              address: string;
              country: string;
              businessNumber: string;
              primaryImage?: string;
            }) => ({
              id: d.id,
              title: d.businessName,
              location: d.address,
              category: 'BUSINESS',
              country: d.country,
              businessNumber: d.businessNumber,
              address: d.address,
              images: d.primaryImage
                ? [
                    {
                      url: `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${d.primaryImage.startsWith('/') ? '' : '/'}${d.primaryImage}`,
                    },
                  ]
                : [],
            }),
          );
          setListings(mapped);
        } else {
          setListings([]);
        }
      } catch (err) {
        console.error('Failed to load directories', err);
        setListings([]);
      }
    };
    fetchDirectories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredListings(listings);
    } else {
      const lower = searchQuery.toLowerCase();

      setFilteredListings(
        listings.filter(
          (l) => l.title.toLowerCase().includes(lower) || l.location?.toLowerCase().includes(lower),
        ),
      );
    }
  }, [searchQuery, listings]);

  const handleClaimSelect = (listing: Listing) => {
    setSelectedListing(listing);
    setStep(2);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (f: File | null) => void,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCard || !proofOwnership || !businessRegistration) {
      toast.error(
        'Please upload all 3 required documents (ID, Proof of Ownership, and Registration).',
      );
      return;
    }
    setLoading(true);
    // Mock API Call for demo frontend
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className='min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans pb-20'>
      <div className='max-w-7xl mx-auto'>
        {step === 1 && (
          <div className='bg-white p-8 shadow-[0_10px_30px_rgba(11,79,74,0.1)] rounded-[18px] animate-in fade-in duration-300'>
            <h2
              className='text-3xl font-bold text-[#1e293b] mb-2'
              style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
            >
              Claim your page
            </h2>
            <p className='text-gray-500 text-[15px] mb-8'>
              Find your business in the directory, prove it is yours, then take bookings straight to
              your page and email.
            </p>

            <div className='mb-8 max-w-3xl'>
              <label className='block text-[14px] font-bold text-[#1e293b] mb-2'>
                Search your business
              </label>
              <div className='relative'>
                <svg
                  className='absolute left-4 top-3.5 h-5 w-5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Type your business name...'
                  className='appearance-none block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    className='bg-white border border-[#f1f5f9] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col group'
                  >
                    <div className='relative h-48 w-full bg-gray-100 overflow-hidden'>
                      {listing.images?.[0] ? (
                        <img
                          src={listing.images[0].url}
                          alt={listing.title}
                          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center text-[#2563eb] bg-[#dbeafe]'>
                          <svg
                            className='w-8 h-8'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={1.5}
                              d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                            />
                          </svg>
                        </div>
                      )}
                      <div className='absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-[#1e40af] shadow-sm tracking-wide'>
                        {listing.country || listing.category}
                      </div>
                    </div>

                    <div className='p-5 flex flex-col grow'>
                      <h3
                        className='font-extrabold text-[#172554] text-lg leading-tight mb-4 truncate'
                        title={listing.title}
                      >
                        {listing.title}
                      </h3>

                      <div className='space-y-3 mb-6 text-sm text-[#6b7b79] grow'>
                        <div className='flex items-start gap-2.5'>
                          <svg
                            className='w-4.5 h-4.5 mt-0.5 shrink-0 text-gray-400'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={1.5}
                              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={1.5}
                              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                          </svg>
                          <span className='line-clamp-2 leading-relaxed'>
                            {listing.address || listing.location}
                          </span>
                        </div>

                        {listing.businessNumber && (
                          <div className='flex items-center gap-2.5'>
                            <svg
                              className='w-4.5 h-4.5 shrink-0 text-gray-400'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1.5}
                                d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                              />
                            </svg>
                            <span className='truncate'>{listing.businessNumber}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleClaimSelect(listing)}
                        className='w-full bg-[#172554] text-white py-2.5 rounded-xl font-bold text-[13px] hover:bg-[#2563eb] transition-colors mt-auto shadow-sm flex items-center justify-center gap-2'
                      >
                        Claim this business
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M14 5l7 7m0 0l-7 7m7-7H3'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className='col-span-full text-center py-8 text-gray-500'>
                  No businesses found matching &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && selectedListing && (
          <div className='bg-white p-8 shadow-[0_10px_30px_rgba(11,79,74,0.1)] rounded-[18px] animate-in fade-in slide-in-from-right-4 duration-300'>
            <button
              onClick={() => setStep(1)}
              className='text-gray-500 hover:text-gray-900 text-sm mb-4 font-semibold flex items-center transition-colors'
            >
              &larr; Back to search
            </button>
            <h2
              className='text-3xl font-bold text-[#1e293b] mb-2'
              style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
            >
              Claim {selectedListing.title}
            </h2>
            <p className='text-gray-500 text-[15px] mb-8'>
              Confirm ownership. We review claims before granting the booking page. Please provide
              the required documents below.
            </p>

            <form onSubmit={handleSubmit}>
              <div className='grid sm:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-[13px] font-bold text-[#1e293b] mb-1.5'>
                    Your full name
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    placeholder='Owner or manager'
                    className='appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400'
                  />
                </div>
                <div>
                  <label className='block text-[13px] font-bold text-[#1e293b] mb-1.5'>Role</label>
                  <input
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    type='text'
                    placeholder='e.g. Owner, Manager'
                    className='appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400'
                  />
                </div>
              </div>
              <div className='mb-8'>
                <label className='block text-[13px] font-bold text-[#1e293b] mb-1.5'>
                  Email to receive bookings
                </label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  placeholder='bookings@business.com'
                  className='appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400'
                />
              </div>

              <div className='mb-8'>
                <h3 className='font-bold text-[#1e293b] text-lg mb-4 border-b border-gray-100 pb-2'>
                  Verification Documents
                </h3>
                <div className='space-y-4'>
                  {/* Doc 1 */}
                  <div>
                    <label className='block text-[14px] font-bold text-[#1e293b] mb-1'>
                      1. Valid ID Card
                    </label>
                    <p className='text-gray-500 text-xs mb-2'>
                      Government-issued ID of the owner or manager.
                    </p>
                    <label className='border-2 border-dashed border-gray-300 hover:border-[#2563eb] rounded-xl p-6 flex flex-col items-center justify-center bg-[#f8fafc] cursor-pointer transition-colors group'>
                      <input
                        type='file'
                        required
                        accept='image/*,application/pdf'
                        className='hidden'
                        onChange={(e) => handleFileChange(e, setIdCard)}
                      />
                      {idCard ? (
                        <div className='text-[#2563eb] font-bold flex items-center gap-2'>
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          {idCard.name}
                        </div>
                      ) : (
                        <>
                          <div className='h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#2563eb] mb-2'>
                            <svg
                              className='h-5 w-5'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                              />
                            </svg>
                          </div>
                          <span className='text-sm text-gray-500'>Tap to upload ID</span>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Doc 2 */}
                  <div>
                    <label className='block text-[14px] font-bold text-[#1e293b] mb-1'>
                      2. Proof of Ownership
                    </label>
                    <p className='text-gray-500 text-xs mb-2'>
                      Utility bill, lease agreement, or property deed.
                    </p>
                    <label className='border-2 border-dashed border-gray-300 hover:border-[#2563eb] rounded-xl p-6 flex flex-col items-center justify-center bg-[#f8fafc] cursor-pointer transition-colors group'>
                      <input
                        type='file'
                        required
                        accept='image/*,application/pdf'
                        className='hidden'
                        onChange={(e) => handleFileChange(e, setProofOwnership)}
                      />
                      {proofOwnership ? (
                        <div className='text-[#2563eb] font-bold flex items-center gap-2'>
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          {proofOwnership.name}
                        </div>
                      ) : (
                        <>
                          <div className='h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#2563eb] mb-2'>
                            <svg
                              className='h-5 w-5'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                              />
                            </svg>
                          </div>
                          <span className='text-sm text-gray-500'>
                            Tap to upload Proof of Ownership
                          </span>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Doc 3 */}
                  <div>
                    <label className='block text-[14px] font-bold text-[#1e293b] mb-1'>
                      3. Business Registration
                    </label>
                    <p className='text-gray-500 text-xs mb-2'>
                      Official tax or corporate registration document.
                    </p>
                    <label className='border-2 border-dashed border-gray-300 hover:border-[#2563eb] rounded-xl p-6 flex flex-col items-center justify-center bg-[#f8fafc] cursor-pointer transition-colors group'>
                      <input
                        type='file'
                        required
                        accept='image/*,application/pdf'
                        className='hidden'
                        onChange={(e) => handleFileChange(e, setBusinessRegistration)}
                      />
                      {businessRegistration ? (
                        <div className='text-[#2563eb] font-bold flex items-center gap-2'>
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          {businessRegistration.name}
                        </div>
                      ) : (
                        <>
                          <div className='h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#2563eb] mb-2'>
                            <svg
                              className='h-5 w-5'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                              />
                            </svg>
                          </div>
                          <span className='text-sm text-gray-500'>
                            Tap to upload Business Registration
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full bg-[#2563eb] text-white py-3.5 rounded-xl font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm disabled:opacity-50 flex justify-center items-center'
              >
                {loading ? (
                  <svg
                    className='animate-spin h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                ) : (
                  'Submit claim'
                )}
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className='text-center bg-white p-10 shadow-[0_10px_30px_rgba(11,79,74,0.1)] rounded-[18px] animate-in zoom-in-95 duration-500'>
            <div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6'>
              <svg
                className='h-8 w-8 text-green-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h2
              className='text-3xl font-bold text-[#1e293b] mb-4'
              style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
            >
              Claim submitted successfully!
            </h2>
            <p className='text-gray-500 text-[16px] mb-8 leading-relaxed max-w-lg mx-auto'>
              We have received your verification documents. Once approved by our team, your booking
              page will activate and you will be able to start taking real bookings.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/dashboard'>
                <button className='bg-[#2563eb] text-white rounded-xl py-3 px-8 font-bold text-[15px] hover:bg-[#1e40af] transition-colors shadow-sm'>
                  Go to Dashboard
                </button>
              </Link>
              <Link href='/'>
                <button className='bg-[#f1f5f9] text-[#1e293b] border border-gray-300 rounded-xl py-3 px-8 font-bold text-[15px] hover:bg-gray-200 transition-colors'>
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
