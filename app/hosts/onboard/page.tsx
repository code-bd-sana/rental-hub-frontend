'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '../../../lib/api/client';

export default function HostOnboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('businessName', businessName);
      formData.append('country', country);

      const res = await apiClient.post('/auth/register/host', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        // Automatically route to login
        router.push('/login?message=host_registered');
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
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
              Roam<span className='text-[#2563eb]'>ly</span>
            </h1>
          </Link>
        </div>

        <div className='bg-white p-6 md:p-8 shadow-[0_10px_30px_rgba(11,79,74,0.1)] rounded-[18px]'>
          <form onSubmit={handleSubmit} className='animate-in fade-in duration-300'>
            <h2
              className='text-[26px] font-bold text-[#15201f] mb-1.5'
              style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
            >
              Become a Host
            </h2>
            <p className='text-[#6b7b79] text-[14px] mb-6'>
              Register your business and start managing your bookings today.
            </p>

            {error && (
              <div className='mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-xl font-medium'>
                {error}
              </div>
            )}

            <div className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>Full Name</label>
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
                  <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>Phone Number</label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type='tel'
                    placeholder='+1 234 567 890'
                    className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]'
                  />
                </div>
              </div>
              <div>
                <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>Email Address</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  placeholder='you@email.com'
                  className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]'
                />
              </div>
              <div>
                <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>Password</label>
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
                <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>Business Name (Optional)</label>
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  type='text'
                  placeholder='My Bistro'
                  className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]'
                />
              </div>
              <div>
                <label className='block text-[13px] font-bold text-[#15201f] mb-1.5'>Country (Optional)</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type='text'
                  placeholder='e.g. Suriname'
                  className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]'
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full mt-6 bg-[#2563eb] text-white rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm disabled:opacity-50'
            >
              {loading ? 'Registering...' : 'Register as Host'}
            </button>
            <div className='text-[13px] font-medium text-[#6b7b79] mt-4 text-center'>
              Already have an account?{' '}
              <Link href='/login' className='text-[#2563eb] hover:underline'>
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
