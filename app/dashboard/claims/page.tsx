/* eslint-disable @next/next/no-img-element */
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { apiClient } from '../../../lib/api/client';

interface User {
  name: string;
  email: string;
}

interface DirectoryListing {
  id: string;
  businessName: string;
  country: string;
  businessNumber: string | null;
  address: string | null;
  primaryImage: string | null;
}

interface ClaimRequest {
  id: string;
  directoryListingId: string;
  userId: string;
  idCardUrl: string;
  proofOfOwnershipUrl: string;
  businessRegistration: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  user: User;
  directoryListing: DirectoryListing;
}

export default function ClaimsDashboardPage() {
  const queryClient = useQueryClient();

  const [selectedClaim, setSelectedClaim] = useState<ClaimRequest | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');

  const {
    data: claims = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['claims'],
    queryFn: async () => {
      const response = await apiClient.get('/claims');
      return response.data.data as ClaimRequest[];
    },
  });

  const actionMutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: 'approve' | 'reject' }) => {
      await apiClient.patch(`/claims/${id}/${action}`);
      return action;
    },
    onSuccess: (action) => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success(`Claim ${action}d successfully`);
      setSelectedClaim(null);
    },
    onError: (err: unknown) => {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        toast.error(axiosErr.response?.data?.message || 'Failed to update claim');
      } else {
        toast.error('Failed to update claim');
      }
    },
  });

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    actionMutation.mutate({ id, action });
  };

  const filteredClaims = claims.filter((claim) =>
    filter === 'ALL' ? true : claim.status === filter,
  );

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-100'>
        <div className='w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-50 text-red-600 p-4 rounded-xl'>
        Failed to load claims. Please try again.
      </div>
    );
  }

  return (
    <div className='animate-in fade-in duration-500 max-w-6xl mx-auto'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4'>
        <div>
          <h1
            className='text-3xl font-bold text-[#172554] mb-2'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Business Claims
          </h1>
          <p className='text-gray-500'>Review and manage business ownership claims.</p>
        </div>

        <div className='bg-white p-1 rounded-lg border border-gray-200 inline-flex shadow-sm'>
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED')}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${
                filter === f
                  ? 'bg-[#f1f5f9] text-[#0f172a]'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className='bg-white border border-[#f1f5f9] rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-[#f8fafc] border-b border-gray-100'>
                <th className='p-5 text-sm font-bold text-[#1e293b] uppercase tracking-wider'>
                  Business
                </th>
                <th className='p-5 text-sm font-bold text-[#1e293b] uppercase tracking-wider'>
                  Claimant
                </th>
                <th className='p-5 text-sm font-bold text-[#1e293b] uppercase tracking-wider'>
                  Status
                </th>
                <th className='p-5 text-sm font-bold text-[#1e293b] uppercase tracking-wider'>
                  Date
                </th>
                <th className='p-5 text-sm font-bold text-[#1e293b] uppercase tracking-wider text-right'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={5} className='p-8 text-center text-gray-500'>
                    No claims found for this filter.
                  </td>
                </tr>
              ) : (
                filteredClaims.map((claim) => (
                  <tr key={claim.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='p-5'>
                      <div className='font-bold text-[#0f172a]'>
                        {claim.directoryListing.businessName}
                      </div>
                      <div className='text-sm text-gray-500'>{claim.directoryListing.country}</div>
                    </td>
                    <td className='p-5'>
                      <div className='font-bold text-[#0f172a]'>{claim.user.name}</div>
                      <div className='text-sm text-gray-500'>{claim.user.email}</div>
                    </td>
                    <td className='p-5'>
                      {claim.status === 'PENDING' && (
                        <span className='bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold'>
                          Pending
                        </span>
                      )}
                      {claim.status === 'APPROVED' && (
                        <span className='bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold'>
                          Approved
                        </span>
                      )}
                      {claim.status === 'REJECTED' && (
                        <span className='bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold'>
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className='p-5 text-sm text-gray-600'>
                      {new Date(claim.createdAt).toLocaleDateString()}
                    </td>
                    <td className='p-5 text-right'>
                      <button
                        onClick={() => setSelectedClaim(claim)}
                        className='px-4 py-2 bg-white border border-gray-200 text-sm font-bold text-[#0f172a] rounded-lg hover:bg-gray-50 transition-colors shadow-sm'
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedClaim && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172554]/40 backdrop-blur-sm animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 animate-in zoom-in-95 duration-200 flex flex-col'>
            <div className='flex justify-between items-start mb-6'>
              <div>
                <h2
                  className='text-2xl font-bold text-[#1e293b] mb-1'
                  style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
                >
                  Review Claim Request
                </h2>
                <p className='text-gray-500 text-[14px]'>
                  Review documents submitted by {selectedClaim.user.name} for{' '}
                  {selectedClaim.directoryListing.businessName}.
                </p>
              </div>
              <button
                onClick={() => setSelectedClaim(null)}
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

            <div className='grid sm:grid-cols-2 gap-8 mb-8'>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-2'>
                    Claimant Info
                  </h3>
                  <div className='bg-gray-50 p-4 rounded-xl'>
                    <div className='font-bold text-[#0f172a]'>{selectedClaim.user.name}</div>
                    <div className='text-sm text-gray-500'>{selectedClaim.user.email}</div>
                  </div>
                </div>
                <div>
                  <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-2'>
                    Business Info
                  </h3>
                  <div className='bg-gray-50 p-4 rounded-xl'>
                    <div className='font-bold text-[#0f172a]'>
                      {selectedClaim.directoryListing.businessName}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {selectedClaim.directoryListing.address}
                    </div>
                    <div className='text-sm text-gray-500'>
                      Country: {selectedClaim.directoryListing.country}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-2'>
                    Registration Number
                  </h3>
                  <div className='bg-[#dbeafe] text-[#1e40af] p-4 rounded-xl font-mono font-bold text-lg text-center border border-blue-200 shadow-inner'>
                    {selectedClaim.businessRegistration}
                  </div>
                </div>
              </div>

              <div className='space-y-6'>
                <div>
                  <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-2'>
                    1. ID Card
                  </h3>
                  <a
                    href={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${selectedClaim.idCardUrl.startsWith('/') ? '' : '/'}${selectedClaim.idCardUrl}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#2563eb] transition-colors group aspect-video relative bg-gray-100'
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${selectedClaim.idCardUrl.startsWith('/') ? '' : '/'}${selectedClaim.idCardUrl}`}
                      alt='ID Card'
                      className='w-full h-full object-cover group-hover:opacity-90 transition-opacity'
                      onError={(e) => {
                        e.currentTarget.src = '';
                        e.currentTarget.className = 'hidden';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className='hidden absolute inset-0 items-center justify-center font-bold text-gray-500'>
                      View Document (PDF/Doc)
                    </div>
                  </a>
                </div>

                <div>
                  <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-2'>
                    2. Proof of Ownership
                  </h3>
                  <a
                    href={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${selectedClaim.proofOfOwnershipUrl.startsWith('/') ? '' : '/'}${selectedClaim.proofOfOwnershipUrl}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#2563eb] transition-colors group aspect-video relative bg-gray-100'
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${selectedClaim.proofOfOwnershipUrl.startsWith('/') ? '' : '/'}${selectedClaim.proofOfOwnershipUrl}`}
                      alt='Proof of Ownership'
                      className='w-full h-full object-cover group-hover:opacity-90 transition-opacity'
                      onError={(e) => {
                        e.currentTarget.src = '';
                        e.currentTarget.className = 'hidden';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className='hidden absolute inset-0 items-center justify-center font-bold text-gray-500'>
                      View Document (PDF/Doc)
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className='mt-auto flex justify-end gap-3 pt-6 border-t border-gray-100'>
              <button
                onClick={() => setSelectedClaim(null)}
                className='px-6 py-3 rounded-xl font-bold text-[15px] bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Close
              </button>
              {selectedClaim.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => handleAction(selectedClaim.id, 'reject')}
                    disabled={actionMutation.isPending}
                    className='px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold text-[15px] hover:bg-red-100 transition-colors disabled:opacity-50'
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedClaim.id, 'approve')}
                    disabled={actionMutation.isPending}
                    className='px-6 py-3 bg-[#10b981] text-white rounded-xl font-bold text-[15px] hover:bg-[#059669] transition-colors shadow-sm disabled:opacity-50'
                  >
                    {actionMutation.isPending && actionMutation.variables?.action === 'approve'
                      ? 'Approving...'
                      : 'Approve & Claim'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
