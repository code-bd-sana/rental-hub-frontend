'use client';

import Link from 'next/link';
import { useState } from 'react';
import { apiClient } from '../../../lib/api/client';

export default function HostSignupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Basic Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);

      // We use apiClient with multipart/form-data
      await apiClient.post('/auth/register/host', formData);

      setStep(2);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Something went wrong during host registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans'>
      <div className='sm:mx-auto sm:w-full sm:max-w-xl'>
        <div className='text-center mb-8'>
          <Link href='/' className='inline-block'>
            <h1
              className='text-4xl font-bold text-[#172554] tracking-tight'
              style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
            >
              Roam<span className='text-[#2563eb]'>ly</span>{' '}
              <span className='text-[#6b7b79] text-xl ml-1'>Hosts</span>
            </h1>
          </Link>
        </div>

        <div className='bg-white p-6 md:p-8 shadow-[0_10px_30px_rgba(11,79,74,0.1)] rounded-[18px]'>
          {error && (
            <div className='mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-xl font-medium border border-red-100 flex items-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2 shrink-0 mt-0.5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSubmit} className='animate-in fade-in duration-300'>
              <h2
                className='text-[26px] font-bold text-[#15201f] mb-1.5'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Partner with us
              </h2>
              <p className='text-[#6b7b79] text-[14px] mb-6'>
                Let&apos;s get your host account setup. First, we need your basic contact details.
              </p>

              <div className='space-y-4'>
                <div>
                  <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>
                    Full Name
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    placeholder='John Doe'
                    className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]'
                  />
                </div>
                <div>
                  <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>
                    Email Address
                  </label>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    placeholder='you@company.com'
                    className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]'
                  />
                </div>
                <div>
                  <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>
                    Phone Number (Required for Hosts)
                  </label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type='tel'
                    placeholder='+1 (555) 123-4567'
                    className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]'
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>
                      Password
                    </label>
                    <input
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type='password'
                      placeholder='••••••••'
                      className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]'
                    />
                  </div>
                  <div>
                    <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>
                      Confirm Password
                    </label>
                    <input
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type='password'
                      placeholder='••••••••'
                      className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]'
                    />
                  </div>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full mt-6 bg-[#2563eb] text-white rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm disabled:opacity-50'
              >
                {loading ? 'Submitting...' : 'Register as Host'}
              </button>

              <div className='mt-5 text-center text-[13px] text-[#6b7b79] font-medium'>
                Want to book instead?{' '}
                <Link href='/signup' className='text-[#2563eb] hover:underline font-bold'>
                  Register as Guest
                </Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className='text-center animate-in zoom-in-95 duration-500 py-6'>
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
                className='text-[26px] font-bold text-[#15201f] mb-3'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Registration Received!
              </h2>
              <p className='text-[#6b7b79] text-[15px] mb-8 leading-relaxed'>
                Thank you for applying to host on Roamly. Your application is currently{' '}
                <span className='font-bold text-amber-600'>Pending Approval</span>. You can still login perfectly with your account.
              </p>

              <Link href='/login'>
                <button className='w-full bg-[#15201f] text-white rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-black transition-colors shadow-sm'>
                  Proceed to Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
