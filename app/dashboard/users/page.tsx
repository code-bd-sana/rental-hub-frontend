'use client';

import { ROLES } from '@/constants/roles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { apiClient } from '../../../lib/api/client';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UserManagementPage() {
  const queryClient = useQueryClient();

  const authData = typeof window !== 'undefined' ? localStorage.getItem('roamly_auth') : null;
  const parsedAuth = authData ? JSON.parse(authData) : null;
  const role = parsedAuth?.role;
  const permissions = parsedAuth?.permissions || [];
  const hasAccess = role === ROLES.SUPER_ADMIN || permissions.includes('MANAGE_GUESTS'); // Reusing MANAGE_GUESTS for users

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) queryParams.append('search', search);
  if (roleFilter) queryParams.append('role', roleFilter);

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', page, limit, search, roleFilter],
    queryFn: async () => {
      const response = await apiClient.get(`/users?${queryParams.toString()}`);
      return response.data as {
        meta: { total: number; page: number; limit: number };
        data: User[];
      };
    },
    enabled: hasAccess,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/users/${id}`);
    },
    onSuccess: () => {
      toast.success('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setDeleteModalOpen(false);
      setUserToDelete(null);
    },
    onError: (err: unknown) => {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        toast.error(axiosErr.response?.data?.message || 'Failed to delete user');
      } else {
        toast.error('Failed to delete user');
      }
    },
  });

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
    }
  };

  if (!hasAccess) {
    return (
      <div className='animate-in fade-in duration-300'>
        <h2 className='text-[26px] font-bold mb-1 text-[#172554]'>User Management</h2>
        <p className='text-[14px] text-[#6b7b79] mb-4.5'>You do not have access to manage users.</p>
      </div>
    );
  }

  const users = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
    setPage(1); // Reset to first page
  };

  return (
    <div className='animate-in fade-in duration-500 max-w-7xl mx-auto'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4'>
        <div>
          <h1
            className='text-3xl font-bold text-[#172554] mb-2'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            User Management
          </h1>
          <p className='text-gray-500'>Manage all users, filter by roles, and maintain accounts.</p>
        </div>
      </div>

      <div className='bg-white p-4 rounded-t-2xl border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between'>
        <div className='relative w-full sm:max-w-md'>
          <svg
            className='absolute left-3 top-2.5 h-5 w-5 text-gray-400'
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
            placeholder='Search by name or email...'
            value={search}
            onChange={handleSearchChange}
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm'
          />
        </div>
        <div className='w-full sm:w-auto'>
          <select
            value={roleFilter}
            onChange={handleRoleChange}
            className='w-full sm:w-48 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm bg-white'
          >
            <option value=''>All Roles</option>
            <option value='GUEST'>Guest</option>
            <option value='HOST'>Host</option>
            <option value='AGENT'>Agent</option>
            <option value='LOADER'>Loader</option>
            <option value='SUPER_ADMIN'>Super Admin</option>
          </select>
        </div>
      </div>

      <div className='bg-white border-x border-b border-[#f1f5f9] rounded-b-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden'>
        <div className='overflow-x-auto min-h-100 relative'>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center bg-white/80 z-10'>
              <div className='w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin'></div>
            </div>
          ) : error ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-red-500'>Failed to load users.</div>
            </div>
          ) : users.length === 0 ? (
            <div className='absolute inset-0 flex items-center justify-center text-gray-500'>
              No users found matching your criteria.
            </div>
          ) : (
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-[#f8fafc] border-b border-gray-100'>
                  <th className='p-5 text-sm font-bold text-[#1e293b] uppercase tracking-wider'>
                    User Info
                  </th>
                  <th className='p-5 text-sm font-bold text-[#1e293b] uppercase tracking-wider'>
                    Role
                  </th>
                  <th className='p-5 text-sm font-bold text-[#1e293b] uppercase tracking-wider'>
                    Joined Date
                  </th>
                  <th className='p-5 text-sm font-bold text-[#1e293b] uppercase tracking-wider text-right'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {users.map((user) => (
                  <tr key={user.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='p-5'>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg'>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className='font-bold text-[#0f172a]'>{user.name}</div>
                          <div className='text-sm text-gray-500'>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className='p-5'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === 'SUPER_ADMIN'
                            ? 'bg-purple-100 text-purple-700'
                            : user.role === 'HOST'
                              ? 'bg-emerald-100 text-emerald-700'
                              : user.role === 'AGENT'
                                ? 'bg-blue-100 text-blue-700'
                                : user.role === 'LOADER'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className='p-5 text-sm text-gray-600'>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className='p-5 text-right'>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className='px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-bold transition-colors'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className='bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-between'>
          <div className='text-sm text-gray-500'>
            Showing {users.length > 0 ? (page - 1) * limit + 1 : 0} to{' '}
            {Math.min(page * limit, total)} of {total} results
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className='px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent'
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className='px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent'
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModalOpen && userToDelete && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172554]/40 backdrop-blur-sm animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 animate-in zoom-in-95 duration-200 text-center'>
            <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4'>
              <svg
                className='h-6 w-6 text-red-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Delete User</h3>
            <p className='text-sm text-gray-500 mb-6'>
              Are you sure you want to delete{' '}
              <strong className='text-gray-900'>{userToDelete.name}</strong>? This action cannot be
              undone.
            </p>
            <div className='flex justify-center gap-3'>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className='px-6 py-2.5 rounded-xl font-bold text-[14px] bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className='px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold text-[14px] hover:bg-red-700 transition-colors disabled:opacity-50'
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
