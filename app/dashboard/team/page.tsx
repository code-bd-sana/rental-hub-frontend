'use client';

import { TeamAndAccess } from '@/components/dashboard/TeamAndAccess';
import { ROLES } from '@/constants/roles';

export default function TeamPage() {
  const authData = typeof window !== 'undefined' ? localStorage.getItem('roamly_auth') : null;
  const parsedAuth = authData ? JSON.parse(authData) : null;
  const role = parsedAuth?.role;
  const permissions = parsedAuth?.permissions || [];

  if (role === ROLES.SUPER_ADMIN || permissions.includes('MANAGE_TEAM')) {
    return <TeamAndAccess />;
  }

  return (
    <div className='animate-in fade-in duration-300'>
      <h2 className='text-[26px] font-bold mb-1 text-[#172554]'>Team and access</h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        You do not have access to team management.
      </p>
    </div>
  );
}
