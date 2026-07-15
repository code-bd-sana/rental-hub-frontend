'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export function AdminSettings() {
  const queryClient = useQueryClient();
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { data: profileData, isLoading: loading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await apiClient.get('/users/me');
      return data.data;
    }
  });

  useEffect(() => {
    if (profileData) {
      setFormData(prev => ({
        ...prev,
        name: profileData.name || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
      }));
    }
  }, [profileData]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveMutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      await apiClient.patch('/users/me', payload);
      if (formData.newPassword) {
        await apiClient.post('/auth/change-password', {
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword
        });
      }
    },
    onSuccess: () => {
      setSuccessMsg('Settings saved successfully!');
      if (formData.newPassword) {
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (err: unknown) => {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || 'Failed to save settings.');
    }
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (formData.newPassword && !formData.currentPassword) {
      setError('Current password is required to set a new password.');
      return;
    }

    const payload: Record<string, unknown> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };
    
    saveMutation.mutate(payload);
  };

  const saving = saveMutation.isPending;

  if (loading) {
    return <div className="p-8 text-[#6b7b79] animate-pulse">Loading settings...</div>;
  }

  return (
    <div className='animate-in fade-in duration-300 max-w-3xl pb-10'>
      <div className='mb-6'>
        <h2
          className='text-[26px] font-bold mb-1 text-[#172554]'
          style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
        >
          Administrator Settings
        </h2>
        <p className='text-[14px] text-[#6b7b79]'>
          Manage your personal details and security preferences.
        </p>
      </div>

      {error && (
        <div className="bg-[#fee2e2] text-[#ef4444] p-4 rounded-xl mb-6 text-[14px] font-medium border border-[#fca5a5]">
          {error}
        </div>
      )}
      
      {successMsg && (
        <div className="bg-[#dff3ec] text-[#1e9e72] p-4 rounded-xl mb-6 text-[14px] font-medium border border-[#a7f3d0]">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className='space-y-6'>
        {/* Personal Details */}
        <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] p-6 md:p-8'>
          <h3 className='text-[18px] font-bold text-[#15201f] mb-6 border-b border-[#e7e1d6] pb-3' style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Personal Details
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='md:col-span-2'>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Full Name</label>
              <input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Email Address</label>
              <input
                type='email'
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Phone Number</label>
              <input
                type='tel'
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
          </div>
        </div>

        {/* Security & Password */}
        <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] p-6 md:p-8'>
          <h3 className='text-[18px] font-bold text-[#15201f] mb-6 border-b border-[#e7e1d6] pb-3' style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Security & Password
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='md:col-span-2'>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Current Password</label>
              <input
                type='password'
                value={formData.currentPassword}
                onChange={(e) => handleChange('currentPassword', e.target.value)}
                placeholder='••••••••'
                className='w-full md:w-1/2 border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>New Password</label>
              <input
                type='password'
                value={formData.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
                placeholder='Enter new password'
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>Confirm New Password</label>
              <input
                type='password'
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder='Confirm new password'
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center justify-end pt-2'>
          <button
            type='submit'
            disabled={saving}
            className='bg-[#2563eb] text-white rounded-[30px] px-8 py-3.5 text-[15px] font-bold shadow-sm transition-colors hover:bg-[#1e40af] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
