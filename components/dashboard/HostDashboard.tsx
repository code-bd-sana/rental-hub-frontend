'use client';

import React, { useState, useEffect } from 'react';
import GlobalCard from '../shared/GlobalCard';
import { listingApi } from '../../lib/api/listings';
import { apiClient } from '../../lib/api/client';

export function HostOverview() {
  return (
    <div className='animate-in fade-in duration-300'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Welcome back, Sample Bistro
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        Here is how your listings are doing this month.
      </p>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2'>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>2</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Active listings
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>3</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            New bookings
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>28</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Page views
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>$420</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Earned this month
          </div>
        </div>
      </div>

      <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4'>
        <div className='flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]'>
          <h3
            className='text-[18px] text-[#15201f] font-bold'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Recent activity
          </h3>
        </div>
        <table className='w-full border-collapse text-[14px]'>
          <tbody>
            <tr>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>
                New booking from a guest in Jamaica
              </td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>Today</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                <span className='bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  New
                </span>
              </td>
            </tr>
            <tr>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>
                Reservation confirmed for 2 guests
              </td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>Yesterday</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  Confirmed
                </span>
              </td>
            </tr>
            <tr>
              <td className='p-[12px_16px] text-[#15201f]'>Booking completed</td>
              <td className='p-[12px_16px] text-[#6b7b79]'>3 days ago</td>
              <td className='p-[12px_16px]'>
                <span className='bg-[#eee] text-[#666] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  Done
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function HostListings() {
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      const res = await listingApi.getMyListings();
      if (res.success) {
        setListings(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isAdding, setIsAdding] = useState(false);
  const [editListing, setEditListing] = useState<Record<string, unknown> | null>(null);
  const [viewListing, setViewListing] = useState<Record<string, unknown> | null>(null);
  const [deleteListingId, setDeleteListingId] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Stay',
    country: 'Jamaica',
    hours: '',
    phone: '',
    status: 'Pending review',
    pricePerNight: 0,
    amenities: '',
    dailyRate: 0,
    carType: 'SUV',
    seats: 4,
    transmission: 'Automatic',
    serviceType: 'Spa',
    packages: [{ name: '', price: 0, imageUrl: '' }],
    availableTimeSlots: '',
    foodItems: [{ name: '', description: '', price: 0, imageUrl: '' }],
    images: [] as string[],
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'Stay',
      country: 'Jamaica',
      hours: '',
      phone: '',
      status: 'Pending review',
      pricePerNight: 0,
      amenities: '',
      dailyRate: 0,
      carType: 'SUV',
      seats: 4,
      transmission: 'Automatic',
      serviceType: 'Spa',
      packages: [{ name: '', price: 0, imageUrl: '' }],
      availableTimeSlots: '',
      foodItems: [{ name: '', description: '', price: 0, imageUrl: '' }],
      images: [],
    });
    setIsAdding(true);
  };

  const handleOpenEdit = (lst: any) => {
    setFormData({
      title: lst.title || '',
      category: lst.category === 'STAY' ? 'Stay' : lst.category === 'CAR' ? 'Car' : 'Service',
      country: lst.country || 'Jamaica',
      hours: lst.description?.includes('Hours:') ? lst.description.split(',')[0].replace('Hours: ', '').trim() : '',
      phone: lst.description?.includes('Phone:') ? lst.description.split(',')[1]?.replace('Phone: ', '').trim() : '',
      status: lst.approvalStatus === 'APPROVED' ? 'Live' : lst.approvalStatus === 'PENDING' ? 'Pending review' : 'Draft',
      pricePerNight: lst.stayDetails?.pricePerNight || 0,
      amenities: lst.stayDetails?.amenities?.join(', ') || '',
      dailyRate: lst.carDetails?.dailyRate || 0,
      carType: lst.carDetails?.carType || 'SUV',
      seats: lst.carDetails?.seats || 4,
      transmission: lst.carDetails?.transmission || 'Automatic',
      serviceType: lst.serviceDetails?.serviceType || 'Spa',
      packages: lst.serviceDetails?.packages?.length ? lst.serviceDetails.packages.map((p: any) => ({ name: p.name, price: p.price, imageUrl: p.imageUrl || '' })) : [{ name: '', price: 0, imageUrl: '' }],
      availableTimeSlots: lst.serviceDetails?.availableTimeSlots?.join(', ') || '',
      foodItems: lst.foodDetails?.items?.length ? lst.foodDetails.items.map((i: any) => ({ name: i.name, description: i.description || '', price: i.price, imageUrl: i.imageUrl || '' })) : [{ name: '', description: '', price: 0, imageUrl: '' }],
      images: lst.images?.map((img: any) => img.url) || [],
    });
    setEditListing(lst);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const [isUploadingPackageImage, setIsUploadingPackageImage] = useState<number | null>(null);

  const handlePackageImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Image size must be less than 5MB.'); return; }
    try {
      setIsUploadingPackageImage(index);
      const data = new FormData();
      data.append('image', file);
      const response = await apiClient.post('/uploads/image', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (response.data.success) {
        const newPackages = [...formData.packages];
        newPackages[index].imageUrl = response.data.data.url;
        setFormData({ ...formData, packages: newPackages });
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally { setIsUploadingPackageImage(null); }
  };

  const handlePackageChange = (index: number, field: string, value: string | number) => {
    const newPackages = [...formData.packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setFormData({ ...formData, packages: newPackages });
  };

  const addPackage = () => { setFormData({ ...formData, packages: [...formData.packages, { name: '', price: 0, imageUrl: '' }] }); };
  const removePackage = (index: number) => {
    const newPackages = [...formData.packages];
    newPackages.splice(index, 1);
    setFormData({ ...formData, packages: newPackages });
  };

  const [isUploadingFoodImage, setIsUploadingFoodImage] = useState<number | null>(null);

  const handleFoodImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Image size must be less than 5MB.'); return; }
    try {
      setIsUploadingFoodImage(index);
      const data = new FormData();
      data.append('image', file);
      const response = await apiClient.post('/uploads/image', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (response.data.success) {
        const newItems = [...formData.foodItems];
        newItems[index].imageUrl = response.data.data.url;
        setFormData({ ...formData, foodItems: newItems });
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally { setIsUploadingFoodImage(null); }
  };

  const handleFoodItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.foodItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, foodItems: newItems });
  };

  const addFoodItem = () => { setFormData({ ...formData, foodItems: [...formData.foodItems, { name: '', description: '', price: 0, imageUrl: '' }] }); };
  const removeFoodItem = (index: number) => {
    const newItems = [...formData.foodItems];
    newItems.splice(index, 1);
    setFormData({ ...formData, foodItems: newItems });
  };

  const removeMainImage = (url: string) => {
    setFormData({ ...formData, images: formData.images.filter(img => img !== url) });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploadingImage(true);
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          alert(`Image ${file.name} is larger than 5MB. Skipping.`);
          continue;
        }
        const data = new FormData();
        data.append('image', file);
        const response = await apiClient.post('/uploads/image', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        if (response.data.success) { uploadedUrls.push(response.data.data.url); }
      }
      setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    } catch (error) {
      console.error('Failed to upload images:', error);
      alert('Failed to upload images. Please try again.');
    } finally { setIsUploadingImage(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let mappedCategory = 'STAY';
      let categoryDetails: any = {};

      if (formData.category === 'Stay') {
        mappedCategory = 'STAY';
        categoryDetails = { stayDetails: { pricePerNight: Number(formData.pricePerNight), amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean) } };
      } else if (formData.category === 'Car') {
        mappedCategory = 'CAR';
        categoryDetails = { carDetails: { dailyRate: Number(formData.dailyRate), carType: formData.carType, seats: Number(formData.seats), transmission: formData.transmission } };
      } else {
        mappedCategory = formData.category === 'Food' ? 'FOOD' : 'SERVICE';
        categoryDetails = {
          serviceDetails: formData.category === 'Service' ? {
            serviceType: formData.serviceType,
            availableTimeSlots: formData.availableTimeSlots.split(',').map(s => s.trim()).filter(Boolean),
            packages: formData.packages.map(p => ({
              name: p.name,
              price: Number(p.price),
              imageUrl: p.imageUrl || undefined
            }))
          } : undefined,
          foodDetails: formData.category === 'Food' ? {
            items: formData.foodItems.map(item => ({
              name: item.name,
              description: item.description,
              price: Number(item.price),
              imageUrl: item.imageUrl || undefined,
            }))
          } : undefined
        };
      }

      const payload = {
        title: formData.title,
        category: mappedCategory,
        country: formData.country,
        description: `Hours: ${formData.hours}, Phone: ${formData.phone}`,
        images: formData.images,
        ...categoryDetails
      };

      if (editListing) {
        await listingApi.updateListing(editListing.id as string, payload);
      } else {
        await listingApi.createListing(payload);
      }
      
      await fetchListings();
      setIsAdding(false);
      setEditListing(null);
    } catch (error) {
      console.error('Failed to save listing:', error);
      alert('Failed to save listing. Please try again.');
    }
  };

  const confirmDelete = async () => {
    if (deleteListingId) {
      try {
        await listingApi.deleteListing(deleteListingId);
        await fetchListings();
        setDeleteListingId(null);
      } catch (error) {
        console.error('Failed to delete listing:', error);
        alert('Failed to delete listing. Please try again.');
      }
    }
  };

  const isFormOpen = isAdding || !!editListing;

  return (
    <div className='animate-in fade-in duration-300 relative'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        My listings
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        Manage your pages, edit details and add new listings.
      </p>

      <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4'>
        <div className='flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]'>
          <h3
            className='text-[18px] text-[#15201f] font-bold'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Listings
          </h3>
          <button
            onClick={handleOpenAdd}
            className='border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-3.5 py-1.75 text-[13px] font-semibold transition-colors hover:bg-[#1e40af] shadow-sm cursor-pointer'
          >
            Add a listing
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-[14px] whitespace-nowrap'>
            <thead>
              <tr>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Listing
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Location
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Hours & Contact
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Status
                </th>
                <th className='text-center text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className='p-8 text-center text-[#6b7b79]'>
                    Loading listings...
                  </td>
                </tr>
              ) : listings.length > 0 ? (
                listings.map((lst) => (
                  <tr key={lst.id} className='hover:bg-[#f8fafc] transition-colors'>
                    <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                      <div className='font-semibold text-[#15201f]'>{lst.title}</div>
                      <div className='text-[12px] text-[#6b7b79]'>
                        {lst.category === 'SERVICE' ? lst.serviceDetails?.serviceType : lst.category}
                      </div>
                    </td>
                    <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>
                      {lst.country || 'N/A'}
                    </td>
                    <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                      <div className='text-[#15201f] text-xs truncate max-w-[200px]'>{lst.description || 'N/A'}</div>
                    </td>
                    <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                      {lst.approvalStatus === 'APPROVED' && (
                        <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                          Live
                        </span>
                      )}
                      {lst.approvalStatus === 'PENDING' && (
                        <span className='bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                          Pending review
                        </span>
                      )}
                      {lst.approvalStatus === 'REJECTED' && (
                        <span className='bg-[#fef2f2] text-[#ef4444] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                          Rejected
                        </span>
                      )}
                    </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='flex items-center justify-center gap-3'>
                      <button
                        onClick={() => setViewListing(lst)}
                        className='text-[#6b7b79] hover:text-[#2563eb] transition-colors cursor-pointer'
                        title='View Preview'
                      >
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
                          <circle cx='12' cy='12' r='3' />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleOpenEdit(lst)}
                        className='text-[#6b7b79] hover:text-[#1e9e72] transition-colors cursor-pointer'
                        title='Edit'
                      >
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M12 20h9' />
                          <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteListingId(lst.id)}
                        className='text-[#6b7b79] hover:text-[#dc2626] transition-colors cursor-pointer'
                        title='Delete'
                      >
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M3 6h18' />
                          <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                          <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan={5} className='p-8 text-center text-[#6b7b79]'>
                    No listings found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-lg w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                {editListing ? 'Edit Listing' : 'Add New Listing'}
              </h3>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditListing(null);
                }}
                className='text-[#6b7b79] hover:text-[#15201f] text-2xl leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className='p-6 space-y-4 text-[14px] max-h-[70vh] overflow-y-auto'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='col-span-2 sm:col-span-1'>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Listing Title
                    </label>
                    <input
                      required
                      value={formData.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      placeholder='e.g. Blue Mountain Villa'
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleFormChange('category', e.target.value)}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] bg-white focus:outline-none focus:border-[#2563eb] transition-colors'
                    >
                      <option value='Stay'>Stay</option>
                      <option value='Car'>Car</option>
                      <option value='Service'>Service</option>
                      <option value='Food'>Food</option>
                    </select>
                  </div>
                </div>
                <div className={formData.category === 'Service' ? 'grid grid-cols-2 gap-4' : ''}>
                  {formData.category === 'Service' && (
                    <div>
                      <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                        Service Type
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => handleFormChange('serviceType', e.target.value)}
                        className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] bg-white focus:outline-none focus:border-[#2563eb] transition-colors'
                      >
                        <option value='Spa'>Spa</option>
                        <option value='Salon'>Salon</option>
                        <option value='Barbar'>Barbar</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleFormChange('country', e.target.value)}
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] bg-white focus:outline-none focus:border-[#2563eb] transition-colors'
                    >
                      <option value='Jamaica'>Jamaica</option>
                      <option value='Barbados'>Barbados</option>
                      <option value='Bahamas'>Bahamas</option>
                      <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                      <option value='United States'>United States</option>
                    </select>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  {formData.category !== 'Car' && formData.category !== 'Food' && (
                    <div>
                      <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                        Hours / Check-in
                      </label>
                      <input
                        required
                        value={formData.hours}
                        onChange={(e) => handleFormChange('hours', e.target.value)}
                        placeholder='e.g. Daily 9am to 5pm'
                        className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                      />
                    </div>
                  )}
                  <div className={(formData.category === 'Car' || formData.category === 'Food') ? 'col-span-2' : ''}>
                    <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                      Phone Number
                    </label>
                    <input
                      required
                      value={formData.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      placeholder='+1 800 000 0000'
                      className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleFormChange('status', e.target.value)}
                    className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] bg-white focus:outline-none focus:border-[#2563eb] transition-colors'
                  >
                    <option value='Live'>Live</option>
                    <option value='Pending review'>Pending review</option>
                    <option value='Draft'>Draft</option>
                  </select>
                </div>

                {/* Dynamic Fields based on Category */}
                {formData.category === 'Stay' && (
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                        Price Per Night
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.pricePerNight}
                        onChange={(e) => handleFormChange('pricePerNight', e.target.value)}
                        className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                      />
                    </div>
                    <div>
                      <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                        Amenities (comma separated)
                      </label>
                      <input
                        value={formData.amenities}
                        onChange={(e) => handleFormChange('amenities', e.target.value)}
                        placeholder='WiFi, Pool, AC'
                        className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                      />
                    </div>
                  </div>
                )}

                {formData.category === 'Car' && (
                  <>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                          Daily Rate
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.dailyRate}
                          onChange={(e) => handleFormChange('dailyRate', e.target.value)}
                          className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                        />
                      </div>
                      <div>
                        <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                          Car Type
                        </label>
                        <input
                          required
                          value={formData.carType}
                          onChange={(e) => handleFormChange('carType', e.target.value)}
                          placeholder='SUV, Sedan, etc.'
                          className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                        />
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                          Seats
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.seats}
                          onChange={(e) => handleFormChange('seats', e.target.value)}
                          className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                        />
                      </div>
                      <div>
                        <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                          Transmission
                        </label>
                        <select
                          value={formData.transmission}
                          onChange={(e) => handleFormChange('transmission', e.target.value)}
                          className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] bg-white focus:outline-none focus:border-[#2563eb] transition-colors'
                        >
                          <option value='Automatic'>Automatic</option>
                          <option value='Manual'>Manual</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {formData.category === 'Service' && (
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                        Available Time Slots (Comma separated)
                      </label>
                      <input
                        value={formData.availableTimeSlots}
                        onChange={(e) => handleFormChange('availableTimeSlots', e.target.value)}
                        placeholder='e.g. 10:00, 11:30, 13:00'
                        className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                      />
                    </div>
                    <div>
                      <div className='flex justify-between items-center mb-2'>
                        <label className='block text-[12px] font-bold text-[#15201f]'>
                          Service Packages
                        </label>
                        <button
                          type="button"
                          onClick={addPackage}
                          className='text-[#2563eb] text-[12px] font-bold hover:underline'
                        >
                          + Add Package
                        </button>
                      </div>
                      <div className='space-y-3'>
                        {formData.packages.map((pkg, index) => (
                          <div key={index} className='border border-[#e7e1d6] rounded-xl p-4 bg-[#f8fafc] relative'>
                            {formData.packages.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removePackage(index)}
                                className='absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg leading-none'
                              >
                                &times;
                              </button>
                            )}
                            <div className='grid grid-cols-2 gap-4 mb-3'>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>Name</label>
                                <input
                                  required
                                  value={pkg.name}
                                  onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                                  placeholder='e.g. Fresh fade cut'
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>Price (USD)</label>
                                <input
                                  type="number"
                                  required
                                  value={pkg.price}
                                  onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                            </div>
                            <div>
                              <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>Package Image (Optional)</label>
                              <div className='flex items-center gap-3'>
                                {pkg.imageUrl && (
                                  <img src={pkg.imageUrl} alt='Package' className='w-12 h-12 rounded-lg object-cover border border-[#e7e1d6]' />
                                )}
                                <div className='relative'>
                                  <input
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => handlePackageImageUpload(index, e)}
                                    className='hidden'
                                    id={`pkg-image-${index}`}
                                  />
                                  <label
                                    htmlFor={`pkg-image-${index}`}
                                    className='bg-white border border-[#e7e1d6] px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-[#e7e1d6] transition-colors'
                                  >
                                    {isUploadingPackageImage === index ? 'Uploading...' : 'Upload Image'}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {formData.category === 'Food' && (
                  <div>
                    <div className='flex justify-between items-center mb-2'>
                      <label className='block text-[12px] font-bold text-[#15201f]'>
                        Food Items
                      </label>
                      <button
                        type="button"
                        onClick={addFoodItem}
                        className='text-[#2563eb] text-[12px] font-bold hover:underline'
                      >
                        + Add Food Item
                      </button>
                    </div>
                    <div className='space-y-3'>
                      {formData.foodItems.map((item, index) => (
                        <div key={index} className='border border-[#e7e1d6] rounded-xl p-4 bg-[#f8fafc] relative'>
                          {formData.foodItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFoodItem(index)}
                              className='absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg leading-none'
                            >
                              &times;
                            </button>
                          )}
                          <div className='mb-3'>
                            <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>Item Name</label>
                            <input
                              required
                              value={item.name}
                              onChange={(e) => handleFoodItemChange(index, 'name', e.target.value)}
                              placeholder='e.g. Wings Platter'
                              className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                            />
                          </div>
                          <div className='grid grid-cols-2 gap-4 mb-3'>
                            <div>
                              <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>Description</label>
                              <input
                                value={item.description}
                                onChange={(e) => handleFoodItemChange(index, 'description', e.target.value)}
                                placeholder='e.g. Crispy glazed wings...'
                                className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                              />
                            </div>
                            <div>
                              <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>Price (USD)</label>
                              <input
                                type="number"
                                required
                                value={item.price}
                                onChange={(e) => handleFoodItemChange(index, 'price', e.target.value)}
                                className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                              />
                            </div>
                          </div>
                          <div>
                            <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>Item Image (Optional)</label>
                            <div className='flex items-center gap-3'>
                              {item.imageUrl && (
                                <img src={item.imageUrl} alt='Food' className='w-12 h-12 rounded-lg object-cover border border-[#e7e1d6]' />
                              )}
                              <div className='relative'>
                                <input
                                  type='file'
                                  accept='image/*'
                                  onChange={(e) => handleFoodImageUpload(index, e)}
                                  className='hidden'
                                  id={`food-image-${index}`}
                                />
                                <label
                                  htmlFor={`food-image-${index}`}
                                  className='bg-white border border-[#e7e1d6] px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-[#e7e1d6] transition-colors'
                                >
                                  {isUploadingFoodImage === index ? 'Uploading...' : 'Upload Image'}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload UI */}
                <div className='col-span-2 pt-4 border-t border-[#e7e1d6]'>
                  <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                    Listing Images (Max 5MB each)
                  </label>
                  <div className='border-2 border-dashed border-[#e7e1d6] rounded-xl p-6 flex flex-col items-center justify-center text-center bg-[#faf9f5]'>
                    {isUploadingImage ? (
                      <div className='text-[#2563eb] font-semibold animate-pulse'>Uploading...</div>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-[#6b7b79] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        <span className='text-[13px] text-[#6b7b79] mb-3'>Click to browse or drag and drop</span>
                        <input
                          type='file'
                          accept='image/*'
                          multiple
                          onChange={handleImageUpload}
                          className='hidden'
                          id='image-upload'
                        />
                        <label
                          htmlFor='image-upload'
                          className='bg-white border border-[#e7e1d6] text-[#15201f] px-4 py-2 rounded-xl text-[13px] font-bold cursor-pointer hover:bg-[#f8fafc] transition-colors shadow-sm'
                        >
                          Select Images
                        </label>
                      </>
                    )}
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className='grid grid-cols-3 gap-3 mt-4'>
                      {formData.images.map((url, idx) => (
                        <div key={idx} className='relative w-full h-24 rounded-xl overflow-hidden border border-[#e7e1d6]'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt={`Listing Preview ${idx + 1}`} className='w-full h-full object-cover' />
                          <button
                            type="button"
                            onClick={() => removeMainImage(url)}
                            className='absolute top-1 right-1 bg-white/80 hover:bg-white text-red-500 rounded-full p-1 shadow-sm transition-colors'
                            title="Remove Image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
              <div className='p-6 border-t border-[#e7e1d6] flex justify-end gap-3 bg-[#faf9f5]'>
                <button
                  type='button'
                  onClick={() => {
                    setIsAdding(false);
                    setEditListing(null);
                  }}
                  className='px-5 py-2.5 rounded-xl font-bold text-[14px] text-[#6b7b79] hover:bg-[#e7e1d6] transition-colors cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-[#2563eb] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#1e40af] transition-colors shadow-sm cursor-pointer'
                >
                  Save Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Preview Modal */}
      {viewListing && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Preview
              </h3>
              <button
                onClick={() => setViewListing(null)}
                className='text-[#6b7b79] hover:text-[#15201f] text-2xl leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>
            <div className='p-6 bg-[#f8fafc] flex justify-center'>
              <div className='w-full max-w-70'>
                <GlobalCard
                  title={viewListing?.title as string}
                  category={viewListing?.category as string}
                  hours={viewListing?.hours as string}
                  phone={viewListing?.phone as string}
                  locked={false}
                  seed={viewListing?.id as string}
                />
              </div>
            </div>
            <div className='p-5 border-t border-[#e7e1d6] bg-white text-right'>
              <button
                onClick={() => setViewListing(null)}
                className='bg-[#172554] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#0f172a] transition-colors cursor-pointer shadow-sm'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteListingId && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-6 text-center'>
              <div className='w-14 h-14 rounded-full bg-[#fee2e2] flex items-center justify-center mx-auto mb-4 text-[#ef4444]'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M3 6h18' />
                  <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                  <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                </svg>
              </div>
              <h3
                className='font-bold text-[20px] text-[#15201f] mb-2'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Delete Listing
              </h3>
              <p className='text-[14px] text-[#6b7b79] leading-relaxed'>
                Are you sure you want to delete this listing? This action cannot be undone and will
                remove it from the directory immediately.
              </p>
            </div>
            <div className='p-5 border-t border-[#e7e1d6] bg-[#f8fafc] flex justify-center gap-3'>
              <button
                onClick={() => setDeleteListingId(null)}
                className='px-6 py-2.5 rounded-xl font-bold text-[14px] text-[#6b7b79] hover:bg-[#e7e1d6] transition-colors cursor-pointer w-full'
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className='bg-[#ef4444] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#dc2626] transition-colors shadow-sm cursor-pointer w-full'
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

export function HostBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 'REQ-001',
      guest: 'John Doe',
      item: 'Ocho Rios Grill',
      type: 'Restaurant',
      date: 'Oct 15, 2026',
      amount: '$120',
      status: 'Pending',
      rejectionReason: '',
    },
    {
      id: 'REQ-002',
      guest: 'Sarah Smith',
      item: 'Blue Mountain Villa',
      type: 'Stay',
      date: 'Nov 02 - Nov 05, 2026',
      amount: '$850',
      status: 'Accepted',
      rejectionReason: '',
    },
    {
      id: 'REQ-003',
      guest: 'Mike Johnson',
      item: 'Ocho Rios Grill Catering',
      type: 'Restaurant',
      date: 'Sep 10, 2026',
      amount: '$400',
      status: 'Declined',
      rejectionReason: 'Fully booked on this date.',
    },
  ]);

  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [viewBooking, setViewBooking] = useState<Record<string, unknown> | null>(null);

  const handleAccept = (id: string) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'Accepted' } : b)));
  };

  const handleOpenReject = (id: string) => {
    setRejectingId(id);
    setRejectReason('');
  };

  const submitReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (rejectingId) {
      setBookings(
        bookings.map((b) =>
          b.id === rejectingId ? { ...b, status: 'Declined', rejectionReason: rejectReason } : b,
        ),
      );
      setRejectingId(null);
    }
  };

  return (
    <div className='animate-in fade-in duration-300 relative'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Bookings and requests
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        Accept or decline incoming bookings and reservation requests.
      </p>

      <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4'>
        <div className='flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]'>
          <h3
            className='text-[18px] text-[#15201f] font-bold'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Incoming
          </h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-[14px] whitespace-nowrap'>
            <thead>
              <tr>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Guest
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Listing Details
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Date & Amount
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Status
                </th>
                <th className='text-center text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((bkg) => (
                <tr key={bkg.id} className='hover:bg-[#f8fafc] transition-colors'>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='font-semibold text-[#15201f]'>{bkg.guest}</div>
                    <div className='text-[12px] text-[#6b7b79]'>{bkg.id}</div>
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='text-[#15201f]'>{bkg.item}</div>
                    <div className='text-[12px] text-[#6b7b79]'>{bkg.type}</div>
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='text-[#15201f]'>{bkg.date}</div>
                    <div className='text-[12px] font-medium text-[#6b7b79]'>{bkg.amount}</div>
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    {bkg.status === 'Accepted' && (
                      <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Accepted
                      </span>
                    )}
                    {bkg.status === 'Pending' && (
                      <span className='bg-[#fef9c3] text-[#ca8a04] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Pending
                      </span>
                    )}
                    {bkg.status === 'Declined' && (
                      <div>
                        <span className='bg-[#fee2e2] text-[#ef4444] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                          Declined
                        </span>
                        {bkg.rejectionReason && (
                          <div
                            className='text-[11px] text-[#ef4444] mt-1 max-w-37.5 truncate'
                            title={bkg.rejectionReason}
                          >
                            {bkg.rejectionReason}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='flex items-center justify-center gap-3'>
                      <button
                        onClick={() => setViewBooking(bkg)}
                        className='text-[#6b7b79] hover:text-[#2563eb] transition-colors cursor-pointer'
                        title='View Details'
                      >
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
                          <circle cx='12' cy='12' r='3' />
                        </svg>
                      </button>
                      {bkg.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleAccept(bkg.id)}
                            className='text-[#6b7b79] hover:text-[#1e9e72] transition-colors cursor-pointer'
                            title='Accept'
                          >
                            <svg
                              width='18'
                              height='18'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <path d='M20 6 9 17l-5-5' />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleOpenReject(bkg.id)}
                            className='text-[#6b7b79] hover:text-[#ef4444] transition-colors cursor-pointer'
                            title='Decline'
                          >
                            <svg
                              width='18'
                              height='18'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <path d='M18 6 6 18' />
                              <path d='m6 6 12 12' />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className='p-8 text-center text-[#6b7b79]'>
                    No bookings to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectingId && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Decline Booking
              </h3>
              <button
                onClick={() => setRejectingId(null)}
                className='text-[#6b7b79] hover:text-[#15201f] text-2xl leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>
            <form onSubmit={submitReject}>
              <div className='p-6 text-[14px]'>
                <label className='block text-[12px] font-bold text-[#15201f] mb-2'>
                  Reason for declining (required)
                </label>
                <textarea
                  required
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                  placeholder='e.g. Fully booked on these dates.'
                  className='w-full border border-[#e7e1d6] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#ef4444] transition-colors resize-none'
                ></textarea>
              </div>
              <div className='p-5 border-t border-[#e7e1d6] bg-[#f8fafc] flex justify-center gap-3'>
                <button
                  type='button'
                  onClick={() => setRejectingId(null)}
                  className='px-6 py-2.5 rounded-xl font-bold text-[14px] text-[#6b7b79] hover:bg-[#e7e1d6] transition-colors cursor-pointer w-full'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-[#ef4444] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#dc2626] transition-colors shadow-sm cursor-pointer w-full'
                >
                  Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Booking Details Modal */}
      {viewBooking && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                Booking Details
              </h3>
              <button
                onClick={() => setViewBooking(null)}
                className='text-[#6b7b79] hover:text-[#15201f] text-2xl leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>
            <div className='p-6 space-y-4 text-[14px]'>
              <div>
                <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                  Reference
                </div>
                <div className='font-semibold text-[#172554] text-[16px]'>
                  {viewBooking.id as string}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Guest Name
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.guest as string}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Listing
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.item as string}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Date
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.date as string}</div>
                </div>
                <div>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Amount
                  </div>
                  <div className='font-medium text-[#15201f]'>{viewBooking.amount as string}</div>
                </div>
                <div className='col-span-2'>
                  <div className='text-[11px] font-bold text-[#6b7b79] uppercase tracking-wide mb-1'>
                    Status
                  </div>
                  <div className='font-medium text-[#15201f] mt-1'>
                    {viewBooking.status === 'Accepted' && (
                      <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.5 py-1 rounded-[20px] uppercase tracking-[0.5px]'>
                        Accepted
                      </span>
                    )}
                    {viewBooking.status === 'Pending' && (
                      <span className='bg-[#fef9c3] text-[#ca8a04] text-[11px] font-bold px-2.5 py-1 rounded-[20px] uppercase tracking-[0.5px]'>
                        Pending
                      </span>
                    )}
                    {viewBooking.status === 'Declined' && (
                      <span className='bg-[#fee2e2] text-[#ef4444] text-[11px] font-bold px-2.5 py-1 rounded-[20px] uppercase tracking-[0.5px]'>
                        Declined
                      </span>
                    )}
                  </div>
                  {viewBooking.status === 'Declined' && !!viewBooking.rejectionReason && (
                    <div className='mt-2 p-3 bg-[#fee2e2] rounded-xl text-[12px] text-[#ef4444]'>
                      <span className='font-bold'>Reason:</span>{' '}
                      {viewBooking.rejectionReason as string}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='p-5 border-t border-[#e7e1d6] bg-[#f8fafc] text-right'>
              <button
                onClick={() => setViewBooking(null)}
                className='bg-[#172554] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#0f172a] transition-colors cursor-pointer shadow-sm'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HostPayouts() {
  return (
    <div className='animate-in fade-in duration-300'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Payouts
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        Earnings from bookings that took payment online. Service reservations are paid to you
        directly.
      </p>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2'>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>$420</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            This month
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>$1,180</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Last 90 days
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>$95</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>Pending</div>
        </div>
      </div>

      <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4'>
        <div className='flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]'>
          <h3
            className='text-[18px] text-[#15201f] font-bold'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Payout history
          </h3>
        </div>
        <table className='w-full border-collapse text-[14px]'>
          <thead>
            <tr>
              <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                Date
              </th>
              <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                Reference
              </th>
              <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                Amount
              </th>
              <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>June 1</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>PO-1042</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>$420.00</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>May 1</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>PO-0991</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]'>$385.00</td>
              <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className='p-[12px_16px] text-[#15201f]'>Next cycle</td>
              <td className='p-[12px_16px] text-[#6b7b79]'>PO-1077</td>
              <td className='p-[12px_16px] text-[#15201f]'>$95.00</td>
              <td className='p-[12px_16px]'>
                <span className='bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { HostSettings } from './HostSettings';
