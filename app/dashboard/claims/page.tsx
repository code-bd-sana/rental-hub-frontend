'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '../../../lib/api/client';

interface HostDocument {
  id: string;
  documentType: string;
  fileUrl: string;
  uploadedAt: string;
}

interface HostUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
}

interface HostProfile {
  id: string;
  userId: string;
  user: HostUser;
  hostTypes: string[];
  businessName: string | null;
  location: string | null;
  address: string | null;
  country: string | null;
  city: string | null;
  state: string | null;
  registrationNumber: string | null;
  description: string | null;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  documents: HostDocument[];
  createdAt: string;
}

export default function ClaimsPage() {
  const [hosts, setHosts] = useState<HostProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State
  const [selectedHost, setSelectedHost] = useState<HostProfile | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchHosts = async () => {
    try {
      const response = await apiClient.get('/users/hosts');
      setHosts(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch host claims.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHosts();
  }, []);

  const handleUpdateStatus = async (status: string) => {
    if (!selectedHost) return;
    setActionLoading(true);
    try {
      await apiClient.patch(`/users/host/${selectedHost.id}/approve`, { status });
      // Update local state without full reload
      setHosts((prev) =>
        prev.map((h) => (h.id === selectedHost.id ? { ...h, approvalStatus: status as any } : h)),
      );
      setSelectedHost({ ...selectedHost, approvalStatus: status as any });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setActionLoading(false);
      setSelectedHost(null); // Close modal on success
    }
  };

  const formatHostType = (type: string) => {
    return type
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className='bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 shadow-sm'>
            Pending Review
          </span>
        );
      case 'APPROVED':
        return (
          <span className='bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 shadow-sm'>
            Approved
          </span>
        );
      case 'REJECTED':
        return (
          <span className='bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200 shadow-sm'>
            Rejected
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className='bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 shadow-sm'>
            Suspended
          </span>
        );
      default:
        return (
          <span className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold'>
            {status}
          </span>
        );
    }
  };

  return (
    <div className='animate-in fade-in duration-500'>
      <div className='flex justify-between items-end mb-8'>
        <div>
          <h1
            className='text-3xl font-extrabold text-[#172554] tracking-tight mb-2'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Host Claims
          </h1>
          <p className='text-[#6b7b79] text-[15px] max-w-2xl'>
            Review and manage incoming host applications. Approving a host grants them access to the
            dashboard to list their properties.
          </p>
        </div>
      </div>

      {error && (
        <div className='mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-xl font-medium border border-red-100'>
          {error}
        </div>
      )}

      <div className='bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f5f9] overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-[#f8fafc] text-[#6b7b79] font-semibold text-[13px] uppercase tracking-wider border-b border-[#f1f5f9]'>
              <tr>
                <th className='px-6 py-4'>Host Name</th>
                <th className='px-6 py-4'>Business / Types</th>
                <th className='px-6 py-4'>Location</th>
                <th className='px-6 py-4'>Status</th>
                <th className='px-6 py-4 text-right'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#f1f5f9]'>
              {loading ? (
                <tr>
                  <td colSpan={5} className='px-6 py-12 text-center text-[#6b7b79]'>
                    <div className='inline-block w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin'></div>
                  </td>
                </tr>
              ) : hosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className='px-6 py-12 text-center text-[#6b7b79] font-medium'>
                    No host claims found.
                  </td>
                </tr>
              ) : (
                hosts.map((host) => (
                  <tr key={host.id} className='hover:bg-[#f8fafc] transition-colors group'>
                    <td className='px-6 py-4'>
                      <div className='font-bold text-[#172554]'>{host.user?.name || 'Unknown'}</div>
                      <div className='text-[#6b7b79] text-xs mt-0.5'>
                        {host.user?.email || 'Unknown'}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='font-semibold text-[#15201f]'>
                        {host.businessName || 'Individual'}
                      </div>
                      <div className='text-[#6b7b79] text-xs mt-0.5 max-w-50 truncate'>
                        {host.hostTypes?.map(formatHostType).join(', ') || 'Unspecified'}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-[#15201f] font-medium'>
                      {host.city || host.country
                        ? `${host.city || ''}, ${host.country || ''}`.replace(/^, /, '')
                        : 'N/A'}
                    </td>
                    <td className='px-6 py-4'>{getStatusBadge(host.approvalStatus)}</td>
                    <td className='px-6 py-4 text-right'>
                      <button
                        onClick={() => setSelectedHost(host)}
                        className='text-[#2563eb] font-bold text-[13px] hover:text-[#1e40af] bg-blue-50 px-3 py-1.5 rounded-lg transition-all hover:bg-blue-100'
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedHost && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172554]/30 backdrop-blur-sm animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]'>
            <div className='flex justify-between items-center p-6 border-b border-[#f1f5f9]'>
              <div>
                <h2
                  className='text-2xl font-bold text-[#172554]'
                  style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
                >
                  Review Application
                </h2>
                <div className='text-sm text-[#6b7b79] mt-1'>
                  Submitted on {new Date(selectedHost.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => setSelectedHost(null)}
                className='p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>

            <div className='p-6 overflow-y-auto bg-[#f8fafc]'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* User Info */}
                <div className='bg-white p-5 rounded-2xl border border-[#f1f5f9] shadow-sm'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-[#6b7b79] mb-4'>
                    Contact Information
                  </h3>
                  <div className='space-y-3 text-[14px]'>
                    <div className='flex justify-between border-b border-gray-50 pb-2'>
                      <span className='text-gray-500'>Name</span>
                      <span className='font-semibold text-[#15201f]'>
                        {selectedHost.user?.name || 'N/A'}
                      </span>
                    </div>
                    <div className='flex justify-between border-b border-gray-50 pb-2'>
                      <span className='text-gray-500'>Email</span>
                      <span className='font-semibold text-[#15201f]'>
                        {selectedHost.user?.email || 'N/A'}
                      </span>
                    </div>
                    <div className='flex justify-between pb-1'>
                      <span className='text-gray-500'>Phone</span>
                      <span className='font-semibold text-[#15201f]'>
                        {selectedHost.user?.phone || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                <div className='bg-white p-5 rounded-2xl border border-[#f1f5f9] shadow-sm'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-[#6b7b79] mb-4'>
                    Business Details
                  </h3>
                  <div className='space-y-3 text-[14px]'>
                    <div className='flex justify-between border-b border-gray-50 pb-2'>
                      <span className='text-gray-500'>Business Name</span>
                      <span className='font-semibold text-[#15201f]'>
                        {selectedHost.businessName || 'None'}
                      </span>
                    </div>
                    <div className='flex justify-between border-b border-gray-50 pb-2'>
                      <span className='text-gray-500'>Reg. Number</span>
                      <span className='font-semibold text-[#15201f]'>
                        {selectedHost.registrationNumber || 'None'}
                      </span>
                    </div>
                    <div className='flex justify-between border-b border-gray-50 pb-2'>
                      <span className='text-gray-500'>Types</span>
                      <span className='font-semibold text-[#15201f] text-right max-w-50 wrap-break-word'>
                        {selectedHost.hostTypes?.map(formatHostType).join(', ') || 'None'}
                      </span>
                    </div>
                    <div className='flex justify-between pb-1'>
                      <span className='text-gray-500'>Address</span>
                      <span className='font-semibold text-[#15201f] text-right max-w-37.5'>
                        {selectedHost.address
                          ? `${selectedHost.address}, ${selectedHost.city || ''}, ${selectedHost.country || ''}`
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className='bg-white p-5 rounded-2xl border border-[#f1f5f9] shadow-sm md:col-span-2'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-[#6b7b79] mb-4 flex items-center justify-between'>
                    Uploaded Documents
                    <span className='bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px]'>
                      {selectedHost.documents?.length || 0} Files
                    </span>
                  </h3>

                  {!selectedHost.documents || selectedHost.documents.length === 0 ? (
                    <div className='text-center py-6 text-sm text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200'>
                      No documents uploaded.
                    </div>
                  ) : (
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                      {selectedHost.documents.map((doc) => (
                        <a
                          key={doc.id}
                          href={
                            doc.fileUrl.startsWith('http')
                              ? doc.fileUrl
                              : `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${doc.fileUrl.startsWith('/') ? '' : '/'}${doc.fileUrl}`
                          }
                          target='_blank'
                          rel='noreferrer'
                          className='flex flex-col items-center justify-center p-4 bg-[#f8fafc] border border-[#e7e1d6] rounded-xl hover:border-[#2563eb] hover:bg-blue-50 transition-colors group'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-8 w-8 text-[#6b7b79] group-hover:text-[#2563eb] mb-2 transition-colors'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={1.5}
                              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                            />
                          </svg>
                          <span className='text-xs font-semibold text-[#15201f] text-center w-full truncate px-2'>
                            {doc.documentType}
                          </span>
                          <span className='text-[10px] text-gray-400 mt-1 uppercase'>
                            Click to view
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='p-5 border-t border-[#f1f5f9] bg-white flex items-center justify-between'>
              <div>
                <span className='text-sm text-gray-500 mr-3'>Current Status:</span>
                {getStatusBadge(selectedHost.approvalStatus)}
              </div>

              <div className='flex gap-3'>
                {selectedHost.approvalStatus !== 'REJECTED' && (
                  <button
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus('REJECTED')}
                    className='px-5 py-2.5 rounded-[30px] font-bold text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50'
                  >
                    Reject
                  </button>
                )}

                {selectedHost.approvalStatus !== 'SUSPENDED' && (
                  <button
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus('SUSPENDED')}
                    className='px-5 py-2.5 rounded-[30px] font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50'
                  >
                    Suspend
                  </button>
                )}

                {selectedHost.approvalStatus !== 'APPROVED' && (
                  <button
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus('APPROVED')}
                    className='px-5 py-2.5 rounded-[30px] font-bold text-sm bg-[#2563eb] text-white shadow-sm hover:bg-[#1e40af] transition-colors disabled:opacity-50'
                  >
                    Approve Host
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
