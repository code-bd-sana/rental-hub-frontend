'use client';

import { ROLES } from '@/constants/roles';

import { AdminGuests } from '@/components/dashboard/AdminDashboard';

export default function DashboardGuestsPage() {
  const authData = typeof window !== 'undefined' ? localStorage.getItem('roamly_auth') : null;
  const parsedAuth = authData ? JSON.parse(authData) : null;
  const role = parsedAuth?.role;
  const permissions = parsedAuth?.permissions || [];

  if (role === ROLES.SUPER_ADMIN || permissions.includes('MANAGE_GUESTS')) {
    return <AdminGuests />;
  }

  return (
    <div className='animate-in fade-in duration-300'>
      <h2 className='text-[26px] font-bold mb-1 text-[#172554]'>Guests</h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>You do not have access to guests.</p>
    </div>
  );
}
