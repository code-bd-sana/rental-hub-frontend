/* eslint-disable @next/next/no-img-element */
'use client';

import { ROLES } from '@/constants/roles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { apiClient } from '../../../lib/api/client';
import { countryApi } from '../../../lib/api/countries';

interface DirectoryListing {
  id: string;
  country: string;
  businessName: string;
  businessNumber: string;
  address: string;
  primaryImage: string;
  loadedBy?: {
    name: string;
    email: string;
  };
}

export default function LoadDirectoryPage() {
  const queryClient = useQueryClient();

  // Auth check
  const authData = typeof window !== 'undefined' ? localStorage.getItem('roamly_auth') : null;
  const parsedAuth = authData ? JSON.parse(authData) : null;
  const role = parsedAuth?.role;
  const permissions = parsedAuth?.permissions || [];
  const hasAccess = role === ROLES.SUPER_ADMIN || permissions.includes('LOAD_DIRECTORY');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [directoryToDelete, setDirectoryToDelete] = useState<string | null>(null);

  // Form State
  const [country, setCountry] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [address, setAddress] = useState('');
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [submitError, setSubmitError] = useState('');

  // Fetch countries
  const { data: countries = [], isLoading: loadingCountries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await countryApi.getAllCountries();
      return response.data as { id: string; name: string }[];
    },
    enabled: hasAccess,
  });

  // Fetch directories
  const { data: directories = [], isLoading: loadingDirectories } = useQuery({
    queryKey: ['directories'],
    queryFn: async () => {
      const response = await apiClient.get('/directory');
      return response.data.data;
    },
    enabled: hasAccess,
  });

  const resetForm = () => {
    setCountry('');
    setBusinessName('');
    setBusinessNumber('');
    setAddress('');
    setPrimaryImage(null);
    setPreviewUrl(null);
    setSubmitError('');
    setEditingId(null);
  };

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (dir: DirectoryListing) => {
    resetForm();
    setEditingId(dir.id);
    setCountry(dir.country);
    setBusinessName(dir.businessName);
    setBusinessNumber(dir.businessNumber);
    setAddress(dir.address);
    // Keep previewUrl as string for existing image
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    setPreviewUrl(`${backendUrl}${dir.primaryImage.startsWith('/') ? '' : '/'}${dir.primaryImage}`);
    setIsModalOpen(true);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/directory/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directories'] });
    },
  });

  const handleDelete = (id: string) => {
    setDirectoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (editingId) {
        const res = await apiClient.patch(`/directory/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
      } else {
        const res = await apiClient.post('/directory', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directories'] });
      setIsModalOpen(false);
      resetForm();
    },
    onError: (err: { response?: { data?: { message?: string } }; message: string }) => {
      setSubmitError(
        err?.response?.data?.message || err.message || 'An error occurred while saving.',
      );
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPrimaryImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country || !businessName || !businessNumber || !address) {
      setSubmitError('Please fill in all required fields.');
      return;
    }
    if (!editingId && !primaryImage) {
      setSubmitError('Primary image is required for new listings.');
      return;
    }

    const formData = new FormData();
    formData.append('country', country);
    formData.append('businessName', businessName);
    formData.append('businessNumber', businessNumber);
    formData.append('address', address);
    if (primaryImage) {
      formData.append('primaryImage', primaryImage);
    }

    saveMutation.mutate(formData);
  };

  if (!hasAccess) {
    return (
      <div className='animate-in fade-in duration-300'>
        <h2 className='text-[26px] font-bold mb-1 text-[#172554]'>Load Directory</h2>
        <p className='text-[14px] text-[#6b7b79] mb-4.5'>
          You do not have permission to load directories.
        </p>
      </div>
    );
  }

  return (
    <div className='animate-in fade-in duration-500 relative'>
      <div className='flex justify-between items-end mb-8'>
        <div>
          <h1
            className='text-3xl font-extrabold text-[#172554] tracking-tight mb-2'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Load Directory
          </h1>
          <p className='text-[#6b7b79] text-[15px] max-w-2xl'>
            Manage businesses and properties directly in the global directory database.
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className='px-6 py-3 rounded-xl font-bold text-sm bg-[#2563eb] text-white hover:bg-[#1e40af] transition-colors shadow-md flex items-center'
        >
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
          </svg>
          Add Directory
        </button>
      </div>

      {/* Directories Table */}
      <div className='bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f5f9] overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-[#f8fafc] text-[#6b7b79] font-semibold text-[13px] uppercase tracking-wider border-b border-[#f1f5f9]'>
              <tr>
                <th className='px-6 py-4'>Image</th>
                <th className='px-6 py-4'>Business Name</th>
                <th className='px-6 py-4'>Country</th>
                <th className='px-6 py-4'>Contact</th>
                <th className='px-6 py-4'>Loaded By</th>
                <th className='px-6 py-4 text-right'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#f1f5f9]'>
              {loadingDirectories ? (
                <tr>
                  <td colSpan={6} className='px-6 py-12 text-center text-[#6b7b79]'>
                    <div className='inline-block w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin'></div>
                  </td>
                </tr>
              ) : directories.length === 0 ? (
                <tr>
                  <td colSpan={6} className='px-6 py-12 text-center text-[#6b7b79] font-medium'>
                    No directories loaded yet.
                  </td>
                </tr>
              ) : (
                directories.map((dir: DirectoryListing) => (
                  <tr key={dir.id} className='hover:bg-[#f8fafc] transition-colors group'>
                    <td className='px-6 py-4'>
                      <div className='w-12 h-12 rounded-lg overflow-hidden border border-gray-200'>
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${dir.primaryImage.startsWith('/') ? '' : '/'}${dir.primaryImage}`}
                          alt={dir.businessName}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='font-bold text-[#172554]'>{dir.businessName}</div>
                      <div className='text-[#6b7b79] text-xs mt-0.5 max-w-40 truncate'>
                        {dir.address}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-[#15201f] font-medium'>{dir.country}</td>
                    <td className='px-6 py-4 text-[#15201f]'>{dir.businessNumber}</td>
                    <td className='px-6 py-4'>
                      <div className='font-medium text-[#15201f]'>
                        {dir.loadedBy?.name || 'Unknown'}
                      </div>
                      <div className='text-[#6b7b79] text-xs mt-0.5'>{dir.loadedBy?.email}</div>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex justify-end gap-2'>
                        <button
                          onClick={() => handleEdit(dir)}
                          className='text-[#2563eb] font-bold text-[13px] hover:text-[#1e40af] bg-blue-50 px-3 py-1.5 rounded-lg transition-all hover:bg-blue-100'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dir.id)}
                          className='text-red-600 font-bold text-[13px] hover:text-red-800 bg-red-50 px-3 py-1.5 rounded-lg transition-all hover:bg-red-100'
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172554]/40 backdrop-blur-sm animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]'>
            <div className='flex justify-between items-center p-6 border-b border-[#f1f5f9]'>
              <h2
                className='text-2xl font-bold text-[#172554]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                {editingId ? 'Edit Directory Listing' : 'Add Directory Listing'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
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

            <div className='p-6 overflow-y-auto'>
              {submitError && (
                <div className='mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-xl font-medium border border-red-100'>
                  {submitError}
                </div>
              )}

              <form id='directory-form' onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Country */}
                  <div>
                    <label className='block text-sm font-bold text-[#15201f] mb-2'>Country *</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc] appearance-none'
                      disabled={loadingCountries}
                    >
                      <option value=''>Select a country</option>
                      {countries.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className='block text-sm font-bold text-[#15201f] mb-2'>
                      Business Name *
                    </label>
                    <input
                      type='text'
                      placeholder='e.g. The Grand Hotel'
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc]'
                    />
                  </div>

                  {/* Business Number / Contact */}
                  <div>
                    <label className='block text-sm font-bold text-[#15201f] mb-2'>
                      Business Number / Phone *
                    </label>
                    <input
                      type='text'
                      placeholder='e.g. +1 234 567 890'
                      value={businessNumber}
                      onChange={(e) => setBusinessNumber(e.target.value)}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc]'
                    />
                  </div>

                  {/* Address */}
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-bold text-[#15201f] mb-2'>
                      Full Address *
                    </label>
                    <textarea
                      placeholder='123 Main St, City, State, ZIP'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-[#f8fafc] resize-none'
                    />
                  </div>

                  {/* Primary Image Upload */}
                  <div className='md:col-span-2 border-t border-[#f1f5f9] pt-6 mt-2'>
                    <label className='block text-sm font-bold text-[#15201f] mb-2'>
                      Primary Business Image {editingId ? '' : '*'}
                    </label>

                    <div className='flex items-center gap-6'>
                      <div
                        className={`w-32 h-32 shrink-0 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors ${
                          previewUrl
                            ? 'border-[#2563eb] bg-blue-50'
                            : 'border-[#e7e1d6] bg-[#f8fafc] hover:border-blue-400'
                        }`}
                      >
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt='Preview'
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <div className='text-center p-4'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 mx-auto text-gray-400 mb-1'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1.5}
                                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                              />
                            </svg>
                            <span className='text-[10px] font-semibold text-gray-500 uppercase tracking-wide'>
                              No image
                            </span>
                          </div>
                        )}
                      </div>

                      <div className='flex-1'>
                        <label className='inline-flex items-center justify-center px-4 py-2 rounded-xl font-bold text-sm bg-white border-2 border-[#2563eb] text-[#2563eb] hover:bg-blue-50 transition-colors cursor-pointer'>
                          <span>Choose file</span>
                          <input
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className='text-xs text-gray-500 mt-2'>
                          Upload a high-quality JPG or PNG image.
                          <br /> Max file size 5MB. This will be the main image displayed for the
                          listing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className='p-5 border-t border-[#f1f5f9] bg-[#f8fafc] flex justify-end gap-3'>
              <button
                type='button'
                onClick={() => setIsModalOpen(false)}
                className='px-6 py-2.5 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
              <button
                type='submit'
                form='directory-form'
                disabled={saveMutation.isPending}
                className='px-6 py-2.5 rounded-xl font-bold text-sm bg-[#2563eb] text-white hover:bg-[#1e40af] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center'
              >
                {saveMutation.isPending ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                    Saving...
                  </>
                ) : editingId ? (
                  'Update Listing'
                ) : (
                  'Save Listing'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172554]/40 backdrop-blur-sm animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200'>
            <div className='w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-[#172554] mb-2'>Delete Listing</h3>
            <p className='text-[#6b7b79] text-sm mb-6'>
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className='flex justify-center gap-3'>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className='px-6 py-2.5 flex-1 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (directoryToDelete) {
                    deleteMutation.mutate(directoryToDelete);
                    setIsDeleteModalOpen(false);
                    toast.success('Directory deleted successfully');
                  }
                }}
                disabled={deleteMutation.isPending}
                className='px-6 py-2.5 flex-1 rounded-xl font-bold text-sm bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
