/* eslint-disable @next/next/no-img-element */
'use client';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Form State
  const [idCard, setIdCard] = useState<File | null>(null);
  const [proofOwnership, setProofOwnership] = useState<File | null>(null);
  const [businessRegistration, setBusinessRegistration] = useState('');

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
    setIsModalOpen(true);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (f: File | null) => void,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCard || !proofOwnership || !businessRegistration) {
      toast.error('Please upload ID and Proof of Ownership, and enter the Business Registration.');
      return;
    }
    if (!selectedListing) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('directoryListingId', selectedListing.id);
      formData.append('businessRegistration', businessRegistration);
      formData.append('idCard', idCard);
      formData.append('proofOfOwnership', proofOwnership);

      await apiClient.post('/claims', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Claim submitted successfully! We will review it shortly.');
      setIsModalOpen(false);
      // Reset form
      setIdCard(null);
      setProofOwnership(null);
      setBusinessRegistration('');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        toast.error(axiosErr.response?.data?.message || 'Failed to submit claim');
      } else if (err instanceof Error) {
        toast.error(err.message || 'Failed to submit claim');
      } else {
        toast.error('Failed to submit claim');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans pb-20'>
      <div className='max-w-7xl mx-auto'>
        {!isModalOpen && (
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

        {/* Claim Modal */}
        {isModalOpen && selectedListing && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172554]/40 backdrop-blur-sm animate-in fade-in duration-200'>
            <div className='bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 animate-in zoom-in-95 duration-200'>
              <div className='flex justify-between items-start mb-6'>
                <div>
                  <h2
                    className='text-2xl font-bold text-[#1e293b] mb-1'
                    style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
                  >
                    Claim {selectedListing.title}
                  </h2>
                  <p className='text-gray-500 text-[14px]'>
                    Please provide the required documents below to verify ownership.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className='text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors'
                >
                  <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='space-y-6'>
                  {/* Doc 1 */}
                  <div>
                    <label className='block text-[14px] font-bold text-[#1e293b] mb-1'>
                      1. Valid ID Card <span className='text-red-500'>*</span>
                    </label>
                    <p className='text-gray-500 text-xs mb-2'>
                      Government-issued ID of the owner or manager.
                    </p>
                    <label className='border-2 border-dashed border-gray-300 hover:border-[#2563eb] rounded-xl p-5 flex flex-col items-center justify-center bg-[#f8fafc] cursor-pointer transition-colors group'>
                      <input
                        type='file'
                        required
                        accept='image/*'
                        className='hidden'
                        onChange={(e) => handleFileChange(e, setIdCard)}
                      />
                      {idCard ? (
                        <div className='text-[#2563eb] font-bold flex items-center gap-2 text-sm'>
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
                        <div className='text-center'>
                          <span className='text-sm text-gray-500 group-hover:text-[#2563eb] font-medium'>
                            Tap to upload ID (Image)
                          </span>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Doc 2 */}
                  <div>
                    <label className='block text-[14px] font-bold text-[#1e293b] mb-1'>
                      2. Proof of Ownership <span className='text-red-500'>*</span>
                    </label>
                    <p className='text-gray-500 text-xs mb-2'>
                      Utility bill, lease agreement, or property deed.
                    </p>
                    <label className='border-2 border-dashed border-gray-300 hover:border-[#2563eb] rounded-xl p-5 flex flex-col items-center justify-center bg-[#f8fafc] cursor-pointer transition-colors group'>
                      <input
                        type='file'
                        required
                        accept='image/*,application/pdf,.doc,.docx'
                        className='hidden'
                        onChange={(e) => handleFileChange(e, setProofOwnership)}
                      />
                      {proofOwnership ? (
                        <div className='text-[#2563eb] font-bold flex items-center gap-2 text-sm'>
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
                        <div className='text-center'>
                          <span className='text-sm text-gray-500 group-hover:text-[#2563eb] font-medium'>
                            Tap to upload Proof of Ownership (Doc/PDF/Image)
                          </span>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Input 3 */}
                  <div>
                    <label className='block text-[14px] font-bold text-[#1e293b] mb-1'>
                      3. Business Registration Number <span className='text-red-500'>*</span>
                    </label>
                    <p className='text-gray-500 text-xs mb-2'>
                      Official tax or corporate registration text.
                    </p>
                    <input
                      required
                      value={businessRegistration}
                      onChange={(e) => setBusinessRegistration(e.target.value)}
                      type='text'
                      placeholder='e.g. REG-123456789'
                      className='appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400'
                    />
                  </div>
                </div>

                <div className='mt-8 flex gap-3'>
                  <button
                    type='button'
                    onClick={() => setIsModalOpen(false)}
                    className='px-6 py-3 rounded-xl font-bold text-[15px] bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors w-1/3'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={loading}
                    className='w-2/3 bg-[#2563eb] text-white py-3 rounded-xl font-bold text-[15px] hover:bg-[#1e40af] transition-colors shadow-sm disabled:opacity-50 flex justify-center items-center'
                  >
                    {loading ? (
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    ) : (
                      'Submit Claim Request'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
