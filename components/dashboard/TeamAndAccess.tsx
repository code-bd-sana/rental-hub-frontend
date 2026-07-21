"use client";

import { ROLES } from '@/constants/roles';

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api/client';

type AdminPermission = 'LOAD_DIRECTORY' | 'APPROVE_CLAIMS' | 'MANAGE_GUESTS' | 'MANAGE_TEAM' | 'VIEW_REVENUE';

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
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string>(ROLES.AGENT);
  const [countriesStr, setCountriesStr] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<AdminPermission[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const ALL_PERMISSIONS: { label: string; value: AdminPermission }[] = [
    { label: 'Load directory', value: 'LOAD_DIRECTORY' },
    { label: 'Approve claims', value: 'APPROVE_CLAIMS' },
    { label: 'Manage guests', value: 'MANAGE_GUESTS' },
    { label: 'Manage team', value: 'MANAGE_TEAM' },
    { label: 'View revenue', value: 'VIEW_REVENUE' },
  ];

  useEffect(() => {
    fetchMembers();
  }, []);

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

  const handleTogglePermission = (perm: AdminPermission) => {
    if (selectedPermissions.includes(perm)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== perm));
    } else {
      setSelectedPermissions([...selectedPermissions, perm]);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole(ROLES.AGENT);
    setCountriesStr('');
    setSelectedPermissions([]);
    setEditingId(null);
  };

  const handleEditClick = (member: TeamMember) => {
    setEditingId(member.id);
    setName(member.name);
    setEmail(member.email);
    setRole(member.role);
    setCountriesStr(member.agentProfile?.assignedCountries?.join(', ') || '');
    setSelectedPermissions(member.agentProfile?.permissions || []);
    
    // Scroll to form smoothly
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and email are required");
      return;
    }

    try {
      setIsSubmitting(true);
      const assignedCountries = countriesStr.split(',').map(c => c.trim()).filter(c => c);
      
      if (editingId) {
        const payload = {
          role,
          assignedCountries,
          permissions: selectedPermissions
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
          permissions: selectedPermissions
        };
        const res = await apiClient.post('/admin/team', payload);
        if (res.data.success) {
          resetForm();
          fetchMembers();
        }
      }
    } catch (error: any) {
      console.error('Failed to save agent:', error);
      alert(error.response?.data?.message || 'Failed to save agent');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    try {
      await apiClient.delete(`/admin/team/${id}`);
      fetchMembers();
    } catch (error) {
      console.error('Failed to remove team member:', error);
      alert('Failed to remove team member');
    }
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-[26px] font-bold mb-2 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
          Team and access
        </h2>
        <p className="text-[14px] text-[#6b7b79]">
          Only the super admin or director can manage this. Agents can load the directory for the countries you assign them. The director can do everything.
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-[#e7e1d6] shadow-sm mb-8 overflow-hidden">
        <div className="p-5 border-b border-[#e7e1d6] bg-[#faf9f5]">
          <h3 className="text-[18px] font-bold text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Admins and agents
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e7e1d6] text-[11px] uppercase tracking-wider text-[#6b7b79] bg-white">
                <th className="py-4 px-5 font-bold">Name</th>
                <th className="py-4 px-5 font-bold">Role</th>
                <th className="py-4 px-5 font-bold">Assigned Countries</th>
                <th className="py-4 px-5 font-bold">Status</th>
                <th className="py-4 px-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-[#15201f]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#6b7b79]">Loading team members...</td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#6b7b79]">No team members found.</td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="border-b border-[#e7e1d6] last:border-0 hover:bg-[#f8fafc] transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-semibold">{member.name}</div>
                      <div className="text-[12px] text-[#6b7b79]">{member.email}</div>
                    </td>
                    <td className="py-4 px-5">
                      {member.role === ROLES.SUPER_ADMIN ? 'Super admin' : member.role === ROLES.LOADER ? 'Content Loader' : 'Agent'}
                    </td>
                    <td className="py-4 px-5">
                      {member.role === ROLES.SUPER_ADMIN ? (
                        <span className="text-[#6b7b79]">All countries</span>
                      ) : member.agentProfile?.assignedCountries?.length ? (
                        member.agentProfile.assignedCountries.join(', ')
                      ) : (
                        <span className="text-[#6b7b79] italic">None</span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ecfdf5] text-[#059669]">
                        ACTIVE
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      {member.role !== ROLES.SUPER_ADMIN ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEditClick(member)}
                            className="px-3 py-1.5 rounded-lg border border-[#e7e1d6] text-[12px] font-semibold text-[#15201f] hover:bg-[#f8fafc] transition-colors"
                          >
                            Edit access
                          </button>
                          <button 
                            onClick={() => handleRemove(member.id)}
                            className="px-3 py-1.5 rounded-lg border border-[#e7e1d6] text-[12px] font-semibold text-[#ef4444] hover:bg-[#fef2f2] hover:border-[#fecaca] transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span className="text-[#6b7b79] text-[12px]">Full access</span>
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
      <div className="bg-white rounded-2xl border border-[#e7e1d6] shadow-sm p-6">
        <h3 className="text-[18px] font-bold text-[#172554] mb-6" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
          {editingId ? 'Edit access' : 'Add an agent'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-bold text-[#15201f] mb-2">Name</label>
              <input 
                type="text" 
                required
                disabled={!!editingId}
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Agent name"
                className="w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc] disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-bold text-[#15201f] mb-2">Email</label>
              <input 
                type="email" 
                required
                disabled={!!editingId}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Agent email"
                className="w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc] disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#15201f] mb-2">Role</label>
              <select 
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc]"
              >
                <option value={ROLES.AGENT}>Agent</option>
                <option value={ROLES.LOADER}>Content Loader</option>
                <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#15201f] mb-2">Assign countries</label>
              <input 
                type="text" 
                value={countriesStr}
                onChange={e => setCountriesStr(e.target.value)}
                placeholder="For example Jamaica, Barbados"
                className="w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#15201f] mb-3">Permissions</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {ALL_PERMISSIONS.map(perm => (
                <button
                  key={perm.value}
                  type="button"
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
            <p className="text-[12px] text-[#6b7b79]">
              Agents are usually given Load directory only. The director keeps every permission.
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#2563eb] text-white font-bold py-3.5 px-4 rounded-xl hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (editingId ? 'Saving changes...' : 'Adding agent...') : (editingId ? 'Save changes' : 'Add agent')}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="flex-1 bg-white border border-[#e7e1d6] text-[#15201f] font-bold py-3.5 px-4 rounded-xl hover:bg-[#f8fafc] transition-colors disabled:opacity-50"
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
