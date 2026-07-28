'use client';

import { ROLES } from '@/constants/roles';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { apiClient } from '../../lib/api/client';
import { countryApi } from '../../lib/api/countries';
import { useModal } from '../shared/ModalProvider';

type AdminPermission =
  | 'LOAD_DIRECTORY'
  | 'APPROVE_CLAIMS'
  | 'MANAGE_GUESTS'
  | 'MANAGE_TEAM'
  | 'VIEW_REVENUE';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  agentProfile?: {
    permissions: AdminPermission[];
    assignedCountries: string[];
  };
  isActive: boolean;
}

export function TeamAndAccess() {
  const { confirm } = useModal();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string>(ROLES.AGENT);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [availableCountries, setAvailableCountries] = useState<{ id: string; name: string }[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<AdminPermission[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const ALL_PERMISSIONS: { label: string; value: AdminPermission }[] = [
    { label: 'Load directory', value: 'LOAD_DIRECTORY' },
    { label: 'Approve claims', value: 'APPROVE_CLAIMS' },
    { label: 'Manage guests', value: 'MANAGE_GUESTS' },
    { label: 'Manage team', value: 'MANAGE_TEAM' },
    { label: 'View revenue', value: 'VIEW_REVENUE' },
  ];

  const fetchCountries = async () => {
    try {
      const res = await countryApi.getAllCountries();
      if (res.success) {
        setAvailableCountries(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/team');
      if (res.data.success) {
        setMembers(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMembers();

    fetchCountries();
  }, []);

  const handleTogglePermission = (perm: AdminPermission) => {
    if (selectedPermissions.includes(perm)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== perm));
    } else {
      setSelectedPermissions([...selectedPermissions, perm]);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole(ROLES.AGENT);
    setSelectedCountries([]);
    setSelectedPermissions([]);
    setEditingId(null);
  };

  const handleEditClick = (member: TeamMember) => {
    setEditingId(member.id);
    setName(member.name);
    setEmail(member.email);
    setRole(member.role);
    setSelectedCountries(member.agentProfile?.assignedCountries || []);
    setSelectedPermissions(member.agentProfile?.permissions || []);

    // Scroll to form smoothly
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Name and email are required');
      return;
    }

    try {
      setIsSubmitting(true);
      const assignedCountries = selectedCountries;

      if (editingId) {
        const payload = {
          role,
          assignedCountries,
          permissions: selectedPermissions,
        };
        const res = await apiClient.patch(`/admin/team/${editingId}`, payload);
        if (res.data.success) {
          resetForm();
          fetchMembers();
        }
      } else {
        const payload = {
          name,
          email,
          role,
          assignedCountries,
          permissions: selectedPermissions,
        };
        const res = await apiClient.post('/admin/team', payload);
        if (res.data.success) {
          resetForm();
          fetchMembers();
        }
      }
    } catch (error: unknown) {
      console.error('Failed to save agent:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || 'Failed to save agent');
      } else {
        toast.error('Failed to save agent');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (id: string) => {
    const isConfirmed = await confirm("Remove Team Member", "Are you sure you want to remove this team member?");
    if (!isConfirmed) return;
    try {
      await apiClient.delete(`/admin/team/${id}`);
      fetchMembers();
    } catch (error) {
      console.error('Failed to remove team member:', error);
      toast.error('Failed to remove team member');
    }
  };

  return (
    <div className='animate-in fade-in duration-300 max-w-6xl'>
      <div className='mb-6'>
        <h2
          className='text-[26px] font-bold mb-2 text-[#172554]'
          style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
        >
          Team and access
        </h2>
        <p className='text-[14px] text-[#6b7b79]'>
          Only the super admin or director can manage this. Agents can load the directory for the
          countries you assign them. The director can do everything.
        </p>
      </div>

      {/* Table Section */}
      <div className='bg-white rounded-2xl border border-[#e7e1d6] shadow-sm mb-8 overflow-hidden'>
        <div className='p-5 border-b border-[#e7e1d6] bg-[#faf9f5]'>
          <h3
            className='text-[18px] font-bold text-[#172554]'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Admins and agents
          </h3>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-[#e7e1d6] text-[11px] uppercase tracking-wider text-[#6b7b79] bg-white'>
                <th className='py-4 px-5 font-bold'>Name</th>
                <th className='py-4 px-5 font-bold'>Role</th>
                <th className='py-4 px-5 font-bold'>Assigned Countries</th>
                <th className='py-4 px-5 font-bold'>Status</th>
                <th className='py-4 px-5 font-bold text-right'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-[14px] text-[#15201f]'>
              {loading ? (
                <tr>
                  <td colSpan={5} className='py-8 text-center text-[#6b7b79]'>
                    Loading team members...
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={5} className='py-8 text-center text-[#6b7b79]'>
                    No team members found.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr
                    key={member.id}
                    className='border-b border-[#e7e1d6] last:border-0 hover:bg-[#f8fafc] transition-colors'
                  >
                    <td className='py-4 px-5'>
                      <div className='font-semibold'>{member.name}</div>
                      <div className='text-[12px] text-[#6b7b79]'>{member.email}</div>
                    </td>
                    <td className='py-4 px-5'>
                      {member.role === ROLES.SUPER_ADMIN
                        ? 'Super admin'
                        : member.role === ROLES.LOADER
                          ? 'Content Loader'
                          : 'Agent'}
                    </td>
                    <td className='py-4 px-5'>
                      {member.role === ROLES.SUPER_ADMIN ? (
                        <span className='text-[#6b7b79]'>All countries</span>
                      ) : member.agentProfile?.assignedCountries?.length ? (
                        member.agentProfile.assignedCountries.join(', ')
                      ) : (
                        <span className='text-[#6b7b79] italic'>None</span>
                      )}
                    </td>
                    <td className='py-4 px-5'>
                      <span className='inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ecfdf5] text-[#059669]'>
                        ACTIVE
                      </span>
                    </td>
                    <td className='py-4 px-5 text-right'>
                      {member.role !== ROLES.SUPER_ADMIN ? (
                        <div className='flex items-center justify-end gap-2'>
                          <button
                            onClick={() => handleEditClick(member)}
                            className='px-3 py-1.5 rounded-lg border border-[#e7e1d6] text-[12px] font-semibold text-[#15201f] hover:bg-[#f8fafc] transition-colors'
                          >
                            Edit access
                          </button>
                          <button
                            onClick={() => handleRemove(member.id)}
                            className='px-3 py-1.5 rounded-lg border border-[#e7e1d6] text-[12px] font-semibold text-[#ef4444] hover:bg-[#fef2f2] hover:border-[#fecaca] transition-colors'
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span className='text-[#6b7b79] text-[12px]'>Full access</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Section */}
      <div className='bg-white rounded-2xl border border-[#e7e1d6] shadow-sm p-6'>
        <h3
          className='text-[18px] font-bold text-[#172554] mb-6'
          style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
        >
          {editingId ? 'Edit access' : 'Add an agent'}
        </h3>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-[13px] font-bold text-[#15201f] mb-2'>Name</label>
              <input
                type='text'
                required
                disabled={!!editingId}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Agent name'
                className='w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc] disabled:opacity-60 disabled:cursor-not-allowed'
              />
            </div>

            <div>
              <label className='block text-[13px] font-bold text-[#15201f] mb-2'>Email</label>
              <input
                type='email'
                required
                disabled={!!editingId}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Agent email'
                className='w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc] disabled:opacity-60 disabled:cursor-not-allowed'
              />
            </div>

            <div>
              <label className='block text-[13px] font-bold text-[#15201f] mb-2'>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc]'
              >
                <option value={ROLES.AGENT}>Agent</option>
                <option value={ROLES.LOADER}>Content Loader</option>
                <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
              </select>
            </div>

            <div>
              <label className='block text-[13px] font-bold text-[#15201f] mb-3'>
                Assign countries
              </label>

              <div className='relative'>
                <button
                  type='button'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='w-full text-left border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc] flex justify-between items-center'
                >
                  <span
                    className={
                      selectedCountries.length > 0
                        ? 'text-[#15201f] font-semibold'
                        : 'text-gray-400'
                    }
                  >
                    {selectedCountries.length > 0
                      ? `${selectedCountries.length} countr${selectedCountries.length > 1 ? 'ies' : 'y'} selected`
                      : 'Select countries'}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className='absolute z-10 w-full mt-2 bg-white border border-[#e7e1d6] rounded-xl shadow-lg max-h-60 overflow-y-auto py-1'>
                    {availableCountries.length === 0 ? (
                      <div className='px-4 py-3 text-sm text-gray-500'>Loading countries...</div>
                    ) : (
                      <div className='p-2 space-y-1'>
                        {availableCountries.map((country) => (
                          <label
                            key={country.id}
                            className='flex items-center px-3 py-2 hover:bg-[#f8fafc] rounded-lg cursor-pointer'
                          >
                            <input
                              type='checkbox'
                              checked={selectedCountries.includes(country.name)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCountries([...selectedCountries, country.name]);
                                } else {
                                  setSelectedCountries(
                                    selectedCountries.filter((c) => c !== country.name),
                                  );
                                }
                              }}
                              className='w-4 h-4 text-[#2563eb] border-gray-300 rounded focus:ring-[#2563eb]'
                            />
                            <span className='ml-3 text-[14px] text-[#15201f] font-medium'>
                              {country.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selected Chips */}
              {selectedCountries.length > 0 && (
                <div className='flex flex-wrap gap-2 mt-3'>
                  {selectedCountries.map((c) => (
                    <span
                      key={c}
                      className='inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold bg-[#e0e7ff] text-[#3730a3]'
                    >
                      {c}
                      <button
                        type='button'
                        onClick={() =>
                          setSelectedCountries(selectedCountries.filter((sc) => sc !== c))
                        }
                        className='ml-2 text-[#3730a3] hover:text-indigo-900 focus:outline-none'
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className='block text-[13px] font-bold text-[#15201f] mb-3'>Permissions</label>
            <div className='flex flex-wrap gap-2 mb-2'>
              {ALL_PERMISSIONS.map((perm) => (
                <button
                  key={perm.value}
                  type='button'
                  onClick={() => handleTogglePermission(perm.value)}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors border ${
                    selectedPermissions.includes(perm.value)
                      ? 'bg-[#172554] text-white border-[#172554]'
                      : 'bg-white text-[#15201f] border-[#e7e1d6] hover:bg-[#f8fafc]'
                  }`}
                >
                  {perm.label}
                </button>
              ))}
            </div>
            <p className='text-[12px] text-[#6b7b79]'>
              Agents are usually given Load directory only. The director keeps every permission.
            </p>
          </div>

          <div className='flex gap-4'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 bg-[#2563eb] text-white font-bold py-3.5 px-4 rounded-xl hover:bg-[#1d4ed8] transition-colors disabled:opacity-50'
            >
              {isSubmitting
                ? editingId
                  ? 'Saving changes...'
                  : 'Adding agent...'
                : editingId
                  ? 'Save changes'
                  : 'Add agent'}
            </button>
            {editingId && (
              <button
                type='button'
                onClick={resetForm}
                disabled={isSubmitting}
                className='flex-1 bg-white border border-[#e7e1d6] text-[#15201f] font-bold py-3.5 px-4 rounded-xl hover:bg-[#f8fafc] transition-colors disabled:opacity-50'
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
