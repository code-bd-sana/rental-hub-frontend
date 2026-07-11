'use client';

import { apiClient } from '@/lib/api/client';
import React, { useEffect, useState } from 'react';

export function HostSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    payoutAccount: '',
    currency: 'USD',

    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get('/users/me');
        const user = data.data;
        const hp = user.hostProfile || {};

        setFormData((prev) => ({
          ...prev,
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          businessName: hp.businessName || '',
          address: hp.address || '',
          city: hp.city || '',
          state: hp.state || '',
          country: hp.country || '',
          payoutAccount: hp.payoutAccount || '',
          currency: hp.billingCurrency || 'USD',
        }));
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        payoutAccount: formData.payoutAccount,
        billingCurrency: formData.currency,
      };

      await apiClient.patch('/users/me', payload);

      if (formData.newPassword) {
        await apiClient.post('/auth/change-password', {
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
        setFormData((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      }

      setSuccessMsg('Settings saved successfully!');
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className='p-8 text-[#6b7b79] animate-pulse'>Loading settings...</div>;
  }

  return (
    <div className='animate-in fade-in duration-300 max-w-4xl pb-10'>
      <div className='mb-6'>
        <h2
          className='text-[26px] font-bold mb-1 text-[#172554]'
          style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
        >
          Settings
        </h2>
        <p className='text-[14px] text-[#6b7b79]'>
          Manage your profile, business details, financials, and security.
        </p>
      </div>

      {error && (
        <div className='bg-[#fee2e2] text-[#ef4444] p-4 rounded-xl mb-6 text-[14px] font-medium border border-[#fca5a5]'>
          {error}
        </div>
      )}

      {successMsg && (
        <div className='bg-[#dff3ec] text-[#1e9e72] p-4 rounded-xl mb-6 text-[14px] font-medium border border-[#a7f3d0]'>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className='space-y-6'>
        {/* Profile & Business Details */}
        <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] p-6 md:p-8'>
          <h3
            className='text-[18px] font-bold text-[#15201f] mb-6 border-b border-[#e7e1d6] pb-3'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Business Profile
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                Primary Contact (Name)
              </label>
              <input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                Business Name
              </label>
              <input
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                Login & Contact Email
              </label>
              <input
                type='email'
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                Contact Phone
              </label>
              <input
                type='tel'
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                Street Address
              </label>
              <input
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                City
              </label>
              <input
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                State / Province
              </label>
              <input
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                Country
              </label>
              <input
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
          </div>
        </div>

        {/* Financials & Payouts */}
        <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] p-6 md:p-8'>
          <h3
            className='text-[18px] font-bold text-[#15201f] mb-6 border-b border-[#e7e1d6] pb-3'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Financials & Payouts
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                Payout Account (IBAN/Routing)
              </label>
              <input
                value={formData.payoutAccount}
                onChange={(e) => handleChange('payoutAccount', e.target.value)}
                placeholder='Bank or account for payouts'
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                Billing Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              >
                <option value='USD'>USD ($)</option>
                <option value='EUR'>EUR (€)</option>
                <option value='GBP'>GBP (£)</option>
                <option value='JMD'>JMD (J$)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Password */}
        <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] p-6 md:p-8'>
          <h3
            className='text-[18px] font-bold text-[#15201f] mb-6 border-b border-[#e7e1d6] pb-3'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Security & Password
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                Current Password
              </label>
              <input
                type='password'
                value={formData.currentPassword}
                onChange={(e) => handleChange('currentPassword', e.target.value)}
                placeholder='••••••••'
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div className='hidden md:block'></div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                New Password
              </label>
              <input
                type='password'
                value={formData.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
                placeholder='Enter new password'
                className='w-full border border-[#e7e1d6] rounded-xl bg-white px-4 py-3 text-[14px] text-[#15201f] focus:outline-none focus:border-[#2563eb] transition-colors'
              />
            </div>
            <div>
              <label className='block text-[#15201f] text-[12px] font-bold mb-1.5 uppercase tracking-wide'>
                Confirm New Password
              </label>
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

        {/* Subscription Plan */}
        <div className='bg-[#f8fafc] border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.05)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <div>
            <h3
              className='text-[18px] font-bold text-[#15201f] mb-1'
              style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
            >
              Current Subscription
            </h3>
            <p className='text-[13px] text-[#6b7b79]'>
              Listing owner, $39.99 per month. Next billing cycle: Nov 1, 2026.
            </p>
          </div>
          <button
            type='button'
            className='px-5 py-2.5 bg-white border border-[#2563eb] text-[#2563eb] rounded-xl font-bold text-[13px] hover:bg-[#e6eefb] transition-colors shrink-0'
          >
            Manage Plan
          </button>
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
