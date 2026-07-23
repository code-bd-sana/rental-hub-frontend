'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { claimApi } from '../../../lib/api/claims';

export default function ClaimPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params?.id as string;

  const [businessReg, setBusinessReg] = useState('');
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!listingId) {
      setError('Invalid listing ID.');
      return;
    }

    if (!idCardFile || !proofFile) {
      setError('Both ID Card and Proof of Ownership files are required.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('directoryListingId', listingId);
      formData.append('businessRegistration', businessReg);
      formData.append('idCard', idCardFile);
      formData.append('proofOfOwnership', proofFile);

      const res = await claimApi.createClaim(formData);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } else {
        setError(res.message || 'Failed to submit claim request.');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className='min-h-screen bg-[#f8fafc] flex items-center justify-center p-4'>
        <div className='bg-white max-w-md w-full p-8 rounded-2xl shadow-lg text-center border border-[#e7e1d6]'>
          <div className='text-5xl mb-4'>🎉</div>
          <h2 className='text-2xl font-bold text-[#15201f] mb-2'>Claim Request Submitted!</h2>
          <p className='text-[#6b7b79] mb-6'>
            Our team will review your documents shortly. You will be redirected to your dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-[#e7e1d6]'>
          <h1 className='text-3xl font-bold text-[#15201f] mb-2 font-serif'>Claim Your Business</h1>
          <p className='text-[#6b7b79] mb-8'>
            Please provide proof of ownership and your business registration number. Once approved, you will be prompted to pay a one-time fee to unlock your host dashboard.
          </p>

          {error && (
            <div className='mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-semibold text-[#15201f] mb-1.5'>
                Business Registration Number <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                required
                value={businessReg}
                onChange={(e) => setBusinessReg(e.target.value)}
                placeholder='e.g., BRN-12345678'
                className='w-full px-4 py-3 rounded-xl border border-[#e7e1d6] bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#1e40af] transition-shadow text-[#15201f]'
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-semibold text-[#15201f] mb-1.5'>
                  Government ID / Passport <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    required
                    accept='image/*,.pdf'
                    onChange={(e) => setIdCardFile(e.target.files?.[0] || null)}
                    className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#1e40af] hover:file:bg-blue-100 cursor-pointer'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-semibold text-[#15201f] mb-1.5'>
                  Proof of Ownership Document <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    required
                    accept='image/*,.pdf'
                    onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                    className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-[#1e9e72] hover:file:bg-green-100 cursor-pointer'
                  />
                </div>
              </div>
            </div>

            <div className='pt-4'>
              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-[#1e40af] text-white font-bold py-3.5 rounded-xl hover:bg-[#172554] transition-colors disabled:opacity-50 flex items-center justify-center gap-2'
              >
                {isLoading ? (
                  <>
                    <svg className='animate-spin h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Claim Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
