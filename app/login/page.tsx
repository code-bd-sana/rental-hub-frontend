'use client';

import { ROLES } from '@/constants/roles';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/api/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If they already have a token, auto-redirect
    const authData = localStorage.getItem('roamly_auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed?.accessToken) {
          router.replace('/dashboard');
        }
      } catch (e) {
        console.warn('Failed to parse auth data', e);
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/auth/login', { email, password });

      const { accessToken, user } = response.data.data;

      // Save real credentials from our backend
      localStorage.setItem(
        'roamly_auth',
        JSON.stringify({
          accessToken,
          role: user.role,
          email: user.email,
          name: user.name,
          permissions: user.permissions || [],
          isAuthenticated: true,
        }),
      );

      // Route based on role
      if (user.role === ROLES.SUPER_ADMIN || user.role === ROLES.AGENT) {
        router.push('/dashboard');
      } else if (user.role === ROLES.HOST) {
        router.push('/dashboard'); // Later we can route to specific host dashboard
      } else {
        router.push('/directory'); // Guests go to directory/booking by default
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md text-center'>
        <Link href='/' className='inline-block'>
          <h1
            className='text-4xl font-bold text-[#172554] tracking-tight'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Roam<span className='text-[#2563eb]'>ly</span>
          </h1>
        </Link>
        <h2 className='mt-4 text-2xl font-bold text-[#15201f]'>Sign in to your account</h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow-[0_10px_30px_rgba(11,79,74,0.1)] rounded-[18px] sm:px-10'>
          <div className='relative mb-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-[#e7e1d6]' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-[#6b7b79]'>Log in with email</span>
            </div>
          </div>

          <form className='space-y-5' onSubmit={handleLogin}>
            {error && (
              <div className='p-3 text-sm text-red-600 bg-red-50 rounded-xl text-center font-medium border border-red-100'>
                {error}
              </div>
            )}
            <div>
              <label htmlFor='email' className='block text-[13px] font-bold text-[#15201f] mb-1.5'>
                Email address
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] placeholder-[#6b7b79] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent sm:text-[15px] transition-all'
                  placeholder='you@example.com'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-[13px] font-bold text-[#15201f] mb-1.5'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] placeholder-[#6b7b79] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent sm:text-[15px] transition-all'
                  placeholder='••••••••'
                />
              </div>
            </div>

            <div className='pt-2'>
              <button
                type='submit'
                disabled={loading}
                className='w-full flex justify-center py-3.5 px-6 border border-transparent rounded-[30px] shadow-sm text-[16px] font-bold text-white bg-[#2563eb] hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition-colors disabled:opacity-50'
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className='mt-6 text-center space-y-2'>
            <div className='text-[14px] font-medium text-[#6b7b79]'>
              Don&apos;t have an account?{' '}
              <Link
                href='/signup'
                className='text-[#2563eb] hover:text-[#1e40af] font-bold hover:underline transition-colors'
              >
                Guest signup
              </Link>
            </div>
            <div className='text-[14px] font-medium text-[#6b7b79]'>
              Want to host your property?{' '}
              <Link
                href='/signup/host'
                className='text-[#2563eb] hover:text-[#1e40af] font-bold hover:underline transition-colors'
              >
                Apply to host
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
