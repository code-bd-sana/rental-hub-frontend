'use client';

import { ROLES } from '@/constants/roles';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { apiClient } from '../../lib/api/client';
import { paymentApi } from '../../lib/api/payment';

function SidebarNav({
  role,
  displayRole,
  permissions = [],
  hostSubscriptionActive = false,
}: {
  role: string;
  displayRole: string;
  permissions?: string[];
  hostSubscriptionActive?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubscribing, setIsSubscribing] = useState(false);

  const navClass = (path: string) => {
    const isActive = pathname === path;
    return `text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold flex justify-between items-center transition-colors ${
      isActive
        ? 'bg-[rgba(255,255,255,0.14)] text-white opacity-100'
        : 'bg-transparent text-white opacity-80 hover:bg-[rgba(255,255,255,0.14)] hover:opacity-100'
    }`;
  };

  const handleSubscribe = async () => {
    try {
      setIsSubscribing(true);
      const res = await paymentApi.createHostPaymentSession();
      if (res.success && res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('Failed to create payment session');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        toast.error(axiosErr.response?.data?.message || 'Payment error occurred');
      } else {
        toast.error('Payment error occurred');
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleRestrictedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.error('Subscription Required', {
      description: 'You must activate your subscription to access your listings.',
      action: {
        label: isSubscribing ? 'Loading...' : 'Subscribe Now',
        onClick: handleSubscribe,
      },
      duration: 5000,
    });
  };

  return (
    <aside className='sticky top-0 h-screen overflow-y-auto flex flex-col flex-none w-55 bg-[#172554] text-white p-5 rounded-r-[22px]'>
      <Link href='/' className='text-2xl font-bold mb-1.5'>
        <span
          className='block text-white text-[20px] mb-1 font-bold'
          style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
        >
          Roam<b className='text-[#2563eb]'>ly</b>
        </span>
      </Link>
      <div className='text-[12px] opacity-70 uppercase tracking-[1px] mb-4.5'>{displayRole}</div>

      <nav className='flex flex-col flex-1'>
        <div className='flex flex-col gap-1'>
          <Link href='/dashboard' className={navClass('/dashboard')}>
            {role === ROLES.AGENT || role === ROLES.LOADER ? 'My workspace' : 'Overview'}
          </Link>

          {role === ROLES.GUEST && (
            <Link
              href='/dashboard/booking-history'
              className={navClass('/dashboard/booking-history')}
            >
              Booking History
            </Link>
          )}

          {role === ROLES.HOST && (
            <>
              {hostSubscriptionActive ? (
                <>
                  <Link href='/dashboard/listings' className={navClass('/dashboard/listings')}>
                    My listings
                  </Link>
                  <Link href='/dashboard/bookings' className={navClass('/dashboard/bookings')}>
                    Bookings
                  </Link>
                  <Link href='/dashboard/payouts' className={navClass('/dashboard/payouts')}>
                    Payouts
                  </Link>
                  <Link href='/claim' className={navClass('/claim')}>
                    Claim Business
                  </Link>
                </>
              ) : (
                <a
                  href='#'
                  onClick={handleRestrictedClick}
                  className={navClass('/dashboard/listings')}
                >
                  My listings 🔒
                </a>
              )}
            </>
          )}

          {(role === ROLES.AGENT || role === ROLES.LOADER) && (
            <>
              {permissions.includes('LOAD_DIRECTORY') && (
                <Link
                  href='/dashboard/load-directory'
                  className={navClass('/dashboard/load-directory')}
                >
                  Load directory
                </Link>
              )}
              {permissions.includes('APPROVE_CLAIMS') && (
                <Link href='/dashboard/claims' className={navClass('/dashboard/claims')}>
                  Claims
                </Link>
              )}
              {permissions.includes('MANAGE_GUESTS') && (
                <Link href='/dashboard/users' className={navClass('/dashboard/users')}>
                  User Management
                </Link>
              )}
              {permissions.includes('MANAGE_TEAM') && (
                <Link href='/dashboard/team' className={navClass('/dashboard/team')}>
                  Team and access
                </Link>
              )}
            </>
          )}
          {role === ROLES.SUPER_ADMIN && (
            <>
              <Link
                href='/dashboard/load-directory'
                className={navClass('/dashboard/load-directory')}
              >
                Load directory
              </Link>
              <Link href='/dashboard/claims' className={navClass('/dashboard/claims')}>
                Claims
              </Link>
              <Link href='/dashboard/listings' className={navClass('/dashboard/listings')}>
                Listings
              </Link>
              <Link href='/dashboard/countries' className={navClass('/dashboard/countries')}>
                Countries
              </Link>
              <Link href='/dashboard/users' className={navClass('/dashboard/users')}>
                User Management
              </Link>
              <Link href='/dashboard/team' className={navClass('/dashboard/team')}>
                Team and access
              </Link>
            </>
          )}
          <Link href='/dashboard/settings' className={navClass('/dashboard/settings')}>
            Settings
          </Link>
        </div>

        <div className='mt-auto border-t border-[rgba(255,255,255,0.1)] pt-4'>
          <button
            onClick={() => {
              localStorage.removeItem('roamly_auth');
              router.push('/login');
            }}
            className='bg-transparent text-[#b9a8d4] text-left w-full px-3.25 py-2.75 rounded-[11px] text-[14px] font-semibold opacity-80 flex justify-between items-center hover:bg-[rgba(255,255,255,0.14)] hover:text-white hover:opacity-100 transition-colors'
          >
            Sign Out
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [hostSubscriptionActive, setHostSubscriptionActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authData = localStorage.getItem('roamly_auth');
    if (!authData) {
      router.replace('/login');
      return;
    }

    try {
      const parsed = JSON.parse(authData);
      if (!parsed?.isAuthenticated) {
        router.replace('/login');
        return;
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRole(parsed.role);
      setPermissions(parsed.permissions || []);

      if (parsed.role === ROLES.HOST) {
        // Fetch host profile to check subscription status
        apiClient
          .get('/users/me')
          .then((res) => {
            const user = res.data?.data;
            if (user?.hostProfile) {
              const isPaid = user.hostProfile.paymentStatus === 'PAID';
              const expiresAt = user.hostProfile.paymentExpiresAt
                ? new Date(user.hostProfile.paymentExpiresAt)
                : null;
              const isExpired = expiresAt ? expiresAt < new Date() : true;

              if (isPaid && !isExpired) {
                setHostSubscriptionActive(true);
              } else {
                setHostSubscriptionActive(false);
              }
            }
          })
          .catch((err) => {
            console.error('Failed to fetch user profile', err);
          })
          .finally(() => {
            setIsAuthChecking(false);
          });
      } else {
        setIsAuthChecking(false);
      }
    } catch (e) {
      console.warn('Failed to parse auth data:', e);
      router.replace('/login');
    }
  }, [router]);

  if (isAuthChecking) {
    return (
      <div className='min-h-screen bg-[#f8fafc] flex items-center justify-center'>
        <div className='w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  }

  const displayRole = role ? `${role} dashboard` : 'Dashboard';

  return (
    <div className='flex gap-0 min-h-screen font-sans bg-[#f8fafc]'>
      <Suspense
        fallback={
          <aside className='sticky top-0 h-screen overflow-y-auto flex-none w-55 bg-[#172554] p-5 rounded-r-[22px]'></aside>
        }
      >
        <SidebarNav
          role={role!}
          displayRole={displayRole}
          permissions={permissions}
          hostSubscriptionActive={hostSubscriptionActive}
        />
      </Suspense>
      <main className='flex-1 p-6 md:p-[22px_26px] min-w-0'>
        {role === ROLES.HOST &&
        !hostSubscriptionActive &&
        pathname !== '/dashboard' &&
        pathname !== '/dashboard/settings' ? (
          <div className='bg-red-50 border border-red-200 p-8 rounded-2xl text-center flex flex-col items-center justify-center min-h-100'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
              <svg
                className='w-8 h-8 text-red-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-red-900 mb-2'>Subscription Required</h2>
            <p className='text-red-700 max-w-md mb-6'>
              Your host subscription is either inactive or has expired. Please activate your
              subscription to access this feature.
            </p>
            <button
              onClick={async () => {
                try {
                  const res = await paymentApi.createHostPaymentSession();
                  if (res.success && res.data?.url) {
                    window.location.href = res.data.url;
                  }
                } catch (err: unknown) {
                  toast.error('Failed to create payment session');
                }
              }}
              className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors'
            >
              Activate Subscription Now
            </button>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
