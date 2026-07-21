"use client";

import { ROLES } from '@/constants/roles';

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api/client';

export function Settings() {
  const [role, setRole] = useState<string>('Administrator');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/users/me');
      if (res.data.success) {
        const { name, email, phone, role } = res.data.data;
        setName(name || '');
        setEmail(email || '');
        setPhone(phone || '');
        if (role === ROLES.SUPER_ADMIN) setRole('Administrator');
        else if (role === ROLES.LOADER) setRole('Content Loader');
        else if (role === ROLES.AGENT) setRole('Agent');
        else if (role === ROLES.HOST) setRole('Host');
        else if (role === ROLES.GUEST) setRole('Guest');
      }
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // 1. Update Profile
      const res = await apiClient.patch('/users/me', { name, phone });
      
      // 2. Update Password if fields are filled
      if (oldPassword || newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          alert('New passwords do not match');
          setIsSaving(false);
          return;
        }
        if (!oldPassword) {
          alert('Current password is required to change password');
          setIsSaving(false);
          return;
        }
        if (newPassword.length < 8) {
          alert('New password must be at least 8 characters long');
          setIsSaving(false);
          return;
        }

        await apiClient.post('/auth/change-password', {
          oldPassword,
          newPassword
        });
        
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
      
      alert('Settings saved successfully');
    } catch (error: any) {
      console.error('Failed to save settings:', error);
      alert(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-in fade-in flex items-center justify-center p-12">
        <div className="text-[#6b7b79]">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 max-w-4xl pb-10">
      <div className="mb-6">
        <h2 className="text-[26px] font-bold mb-2 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
          {role} Settings
        </h2>
        <p className="text-[14px] text-[#6b7b79]">
          Manage your personal details and security preferences.
        </p>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Personal Details Card */}
        <div className="bg-white rounded-2xl border border-[#e7e1d6] shadow-sm p-8">
          <h3 className="text-[18px] font-bold text-[#172554] mb-4" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Personal Details
          </h3>
          <div className="h-px bg-[#e7e1d6] w-full mb-6"></div>

          <div className="space-y-6">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#15201f] mb-2">
                Full Name
              </label>
              <input 
                type="text" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#15201f] mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  disabled
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] bg-[#f8fafc] text-[#6b7b79] cursor-not-allowed focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#15201f] mb-2">
                  Phone Number
                </label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Password Card */}
        <div className="bg-white rounded-2xl border border-[#e7e1d6] shadow-sm p-8">
          <h3 className="text-[18px] font-bold text-[#172554] mb-4" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Security & Password
          </h3>
          <div className="h-px bg-[#e7e1d6] w-full mb-6"></div>

          <div className="space-y-6">
            <div className="md:w-1/2">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#15201f] mb-2">
                Current Password
              </label>
              <input 
                type="password" 
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                className="w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#15201f] mb-2">
                  New Password
                </label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#15201f] mb-2">
                  Confirm New Password
                </label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={isSaving}
            className="bg-[#2563eb] text-white font-bold py-3.5 px-8 rounded-full hover:bg-[#1d4ed8] transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
