/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { apiClient } from '../../lib/api/client';
import { countryApi } from '../../lib/api/countries';
import { listingApi } from '../../lib/api/listings';

export default function ListingFormModal({
  isOpen,
  onClose,
  listingToEdit,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  listingToEdit: any;
  onSuccess: () => void;
}) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await countryApi.getAllCountries();
        if (res.success) {
          setCountries(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch countries', err);
      }
    };
    fetchCountries();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Stay',
    country: '',
    hours: '',
    phone: '',
    status: 'Pending review',
    pricePerNight: 0,
    amenities: '',
    dailyRate: 0,
    carType: 'SUV',
    seats: 4,
    transmission: 'Automatic',
    doors: 4,
    largeBags: 2,
    smallBags: 1,
    features: '',
    includedItems: '',
    pickupLocations: '',
    returnLocations: '',
    fuelOptions: [{ title: '', description: '', price: 0, isOneOff: false }],
    protectionPlans: [
      { title: '', description: '', pricePerDay: 0, deposit: 0, isRecommended: false },
    ],
    carExtras: [{ name: '', description: '', pricePerDay: 0 }],
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
      country: countries.length > 0 ? countries[0].name : '',
      hours: '',
      phone: '',
      status: 'Pending review',
      pricePerNight: 0,
      amenities: '',
      dailyRate: 0,
      carType: 'SUV',
      seats: 4,
      transmission: 'Automatic',
      doors: 4,
      largeBags: 2,
      smallBags: 1,
      features: '',
      includedItems: '',
      pickupLocations: '',
      returnLocations: '',
      fuelOptions: [{ title: '', description: '', price: 0, isOneOff: false }],
      protectionPlans: [
        { title: '', description: '', pricePerDay: 0, deposit: 0, isRecommended: false },
      ],
      carExtras: [{ name: '', description: '', pricePerDay: 0 }],
      serviceType: 'Spa',
      packages: [{ name: '', price: 0, imageUrl: '' }],
      availableTimeSlots: '',
      foodItems: [{ name: '', description: '', price: 0, imageUrl: '' }],
      images: [],
    });
  };

  const handleOpenEdit = (lst: any) => {
    setFormData({
      title: lst.title || '',
      category: lst.category === 'STAY' ? 'Stay' : lst.category === 'CAR' ? 'Car' : 'Service',
      country: lst.country || (countries.length > 0 ? countries[0].name : ''),
      hours: lst.description?.includes('Hours:')
        ? lst.description.split(',')[0].replace('Hours: ', '').trim()
        : '',
      phone: lst.description?.includes('Phone:')
        ? lst.description.split(',')[1]?.replace('Phone: ', '').trim()
        : '',
      status:
        lst.approvalStatus === 'APPROVED'
          ? 'Live'
          : lst.approvalStatus === 'PENDING'
            ? 'Pending review'
            : 'Draft',
      pricePerNight: lst.stayDetails?.pricePerNight || 0,
      amenities: lst.stayDetails?.amenities?.join(', ') || '',
      dailyRate: lst.carDetails?.dailyRate || 0,
      carType: lst.carDetails?.carType || 'SUV',
      seats: lst.carDetails?.seats || 4,
      transmission: lst.carDetails?.transmission || 'Automatic',
      doors: lst.carDetails?.doors || 4,
      largeBags: lst.carDetails?.bags?.large || 2,
      smallBags: lst.carDetails?.bags?.small || 1,
      features: lst.carDetails?.features?.join(', ') || '',
      includedItems: lst.carDetails?.includedItems?.join(', ') || '',
      pickupLocations: lst.carDetails?.pickupLocations?.join(', ') || '',
      returnLocations: lst.carDetails?.returnLocations?.join(', ') || '',
      fuelOptions: lst.carDetails?.fuelOptions?.length
        ? lst.carDetails.fuelOptions
        : [{ title: '', description: '', price: 0, isOneOff: false }],
      protectionPlans: lst.carDetails?.protectionPlans?.length
        ? lst.carDetails.protectionPlans
        : [{ title: '', description: '', pricePerDay: 0, deposit: 0, isRecommended: false }],
      carExtras: lst.carDetails?.extras?.length
        ? lst.carDetails.extras
        : [{ name: '', description: '', pricePerDay: 0 }],
      serviceType: lst.serviceDetails?.serviceType || 'Spa',
      packages: lst.serviceDetails?.packages?.length
        ? lst.serviceDetails.packages.map((p: any) => ({
            name: p.name,
            price: p.price,
            imageUrl: p.imageUrl || '',
          }))
        : [{ name: '', price: 0, imageUrl: '' }],
      availableTimeSlots: lst.serviceDetails?.availableTimeSlots?.join(', ') || '',
      foodItems: lst.foodDetails?.items?.length
        ? lst.foodDetails.items.map((i: any) => ({
            name: i.name,
            description: i.description || '',
            price: i.price,
            imageUrl: i.imageUrl || '',
          }))
        : [{ name: '', description: '', price: 0, imageUrl: '' }],
      images: lst.images?.map((img: any) => img.url) || [],
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const [isUploadingPackageImage, setIsUploadingPackageImage] = useState<number | null>(null);

  const handlePackageImageUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB.');
      return;
    }
    try {
      setIsUploadingPackageImage(index);
      const data = new FormData();
      data.append('image', file);
      const response = await apiClient.post('/uploads/image', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success) {
        const newPackages = [...formData.packages];
        newPackages[index].imageUrl = response.data.data.url;
        setFormData({ ...formData, packages: newPackages });
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploadingPackageImage(null);
    }
  };

  const handlePackageChange = (index: number, field: string, value: string | number) => {
    const newPackages = [...formData.packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setFormData({ ...formData, packages: newPackages });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: 0, imageUrl: '' }],
    });
  };
  const removePackage = (index: number) => {
    const newPackages = [...formData.packages];
    newPackages.splice(index, 1);
    setFormData({ ...formData, packages: newPackages });
  };

  const [isUploadingFoodImage, setIsUploadingFoodImage] = useState<number | null>(null);

  const handleFoodImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB.');
      return;
    }
    try {
      setIsUploadingFoodImage(index);
      const data = new FormData();
      data.append('image', file);
      const response = await apiClient.post('/uploads/image', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success) {
        const newItems = [...formData.foodItems];
        newItems[index].imageUrl = response.data.data.url;
        setFormData({ ...formData, foodItems: newItems });
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploadingFoodImage(null);
    }
  };

  const handleFoodItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.foodItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, foodItems: newItems });
  };

  const addFoodItem = () => {
    setFormData({
      ...formData,
      foodItems: [...formData.foodItems, { name: '', description: '', price: 0, imageUrl: '' }],
    });
  };
  const removeFoodItem = (index: number) => {
    const newItems = [...formData.foodItems];
    newItems.splice(index, 1);
    setFormData({ ...formData, foodItems: newItems });
  };

  const handleFuelOptionChange = (index: number, field: string, value: any) => {
    const newOpts = [...formData.fuelOptions];
    newOpts[index] = { ...newOpts[index], [field]: value };
    setFormData({ ...formData, fuelOptions: newOpts });
  };
  const addFuelOption = () =>
    setFormData({
      ...formData,
      fuelOptions: [
        ...formData.fuelOptions,
        { title: '', description: '', price: 0, isOneOff: false },
      ],
    });
  const removeFuelOption = (index: number) => {
    const newOpts = [...formData.fuelOptions];
    newOpts.splice(index, 1);
    setFormData({ ...formData, fuelOptions: newOpts });
  };

  const handleProtectionPlanChange = (index: number, field: string, value: any) => {
    const newPlans = [...formData.protectionPlans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setFormData({ ...formData, protectionPlans: newPlans });
  };
  const addProtectionPlan = () =>
    setFormData({
      ...formData,
      protectionPlans: [
        ...formData.protectionPlans,
        { title: '', description: '', pricePerDay: 0, deposit: 0, isRecommended: false },
      ],
    });
  const removeProtectionPlan = (index: number) => {
    const newPlans = [...formData.protectionPlans];
    newPlans.splice(index, 1);
    setFormData({ ...formData, protectionPlans: newPlans });
  };

  const handleCarExtraChange = (index: number, field: string, value: any) => {
    const newExtras = [...formData.carExtras];
    newExtras[index] = { ...newExtras[index], [field]: value };
    setFormData({ ...formData, carExtras: newExtras });
  };
  const addCarExtra = () =>
    setFormData({
      ...formData,
      carExtras: [...formData.carExtras, { name: '', description: '', pricePerDay: 0 }],
    });
  const removeCarExtra = (index: number) => {
    const newExtras = [...formData.carExtras];
    newExtras.splice(index, 1);
    setFormData({ ...formData, carExtras: newExtras });
  };

  const removeMainImage = (url: string) => {
    setFormData({ ...formData, images: formData.images.filter((img) => img !== url) });
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
          toast.error(`Image ${file.name} is larger than 5MB. Skipping.`);
          continue;
        }
        const data = new FormData();
        data.append('image', file);
        const response = await apiClient.post('/uploads/image', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.success) {
          uploadedUrls.push(response.data.data.url);
        }
      }
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    } catch (error) {
      console.error('Failed to upload images:', error);
      toast.error('Failed to upload images. Please try again.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let mappedCategory = 'STAY';
      let categoryDetails: any = {};

      if (formData.category === 'Stay') {
        mappedCategory = 'STAY';
        categoryDetails = {
          stayDetails: {
            pricePerNight: Number(formData.pricePerNight),
            amenities: formData.amenities
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          },
        };
      } else if (formData.category === 'Car') {
        mappedCategory = 'CAR';
        categoryDetails = {
          carDetails: {
            dailyRate: Number(formData.dailyRate),
            carType: formData.carType,
            seats: Number(formData.seats),
            transmission: formData.transmission,
            doors: Number(formData.doors),
            bags: { large: Number(formData.largeBags), small: Number(formData.smallBags) },
            features: formData.features
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
            includedItems: formData.includedItems
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
            pickupLocations: formData.pickupLocations
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
            returnLocations: formData.returnLocations
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
            fuelOptions: formData.fuelOptions.map((f) => ({ ...f, price: Number(f.price) })),
            protectionPlans: formData.protectionPlans.map((p) => ({
              ...p,
              pricePerDay: Number(p.pricePerDay),
              deposit: Number(p.deposit),
            })),
            extras: formData.carExtras.map((e) => ({ ...e, pricePerDay: Number(e.pricePerDay) })),
          },
        };
      } else {
        mappedCategory = formData.category === 'Food' ? 'FOOD' : 'SERVICE';
        categoryDetails = {
          serviceDetails:
            formData.category === 'Service'
              ? {
                  serviceType: formData.serviceType,
                  availableTimeSlots: formData.availableTimeSlots
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                  packages: formData.packages.map((p) => ({
                    name: p.name,
                    price: Number(p.price),
                    imageUrl: p.imageUrl || undefined,
                  })),
                }
              : undefined,
          foodDetails:
            formData.category === 'Food'
              ? {
                  items: formData.foodItems.map((item) => ({
                    name: item.name,
                    description: item.description,
                    price: Number(item.price),
                    imageUrl: item.imageUrl || undefined,
                  })),
                }
              : undefined,
        };
      }

      const payload = {
        title: formData.title,
        category: mappedCategory,
        country: formData.country,
        description: `Hours: ${formData.hours}, Phone: ${formData.phone}`,
        images: formData.images,
        ...categoryDetails,
      };

      if (listingToEdit) {
        await listingApi.updateListing(listingToEdit.id as string, payload);
      } else {
        await listingApi.createListing(payload);
      }

      await onSuccess();

      onClose();
    } catch (error) {
      console.error('Failed to save listing:', error);
      toast.error('Failed to save listing. Please try again.');
    }
  };

  // We need useEffect to set form data when listingToEdit changes
  useEffect(() => {
    if (listingToEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleOpenEdit(listingToEdit);
    } else {
      handleOpenAdd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingToEdit, isOpen]);

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-100 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-3xl w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-5 border-b border-[#e7e1d6] flex justify-between items-center bg-[#f8fafc]'>
              <h3
                className='font-bold text-[18px] text-[#15201f]'
                style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
              >
                {listingToEdit ? 'Edit Listing' : 'Add New Listing'}
              </h3>
              <button
                onClick={() => {
                  onClose();
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
                      <option value=''>Select Country</option>
                      {countries.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
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
                  <div
                    className={
                      formData.category === 'Car' || formData.category === 'Food'
                        ? 'col-span-2'
                        : ''
                    }
                  >
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
                        type='number'
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
                  <div className='space-y-6'>
                    {/* Basic Specs */}
                    <div>
                      <h4 className='text-[14px] font-bold text-[#15201f] mb-3 border-b pb-2'>
                        Basic Specifications
                      </h4>
                      <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div>
                          <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                            Daily Rate (USD)
                          </label>
                          <input
                            type='number'
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
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div>
                          <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                            Seats
                          </label>
                          <input
                            type='number'
                            required
                            value={formData.seats}
                            onChange={(e) => handleFormChange('seats', e.target.value)}
                            className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                          />
                        </div>
                        <div>
                          <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                            Doors
                          </label>
                          <input
                            type='number'
                            value={formData.doors}
                            onChange={(e) => handleFormChange('doors', e.target.value)}
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
                    </div>

                    {/* Bags & Amenities */}
                    <div>
                      <h4 className='text-[14px] font-bold text-[#15201f] mb-3 border-b pb-2'>
                        Details & Features
                      </h4>
                      <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div>
                          <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                            Large Bags
                          </label>
                          <input
                            type='number'
                            value={formData.largeBags}
                            onChange={(e) => handleFormChange('largeBags', e.target.value)}
                            className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                          />
                        </div>
                        <div>
                          <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                            Small Bags
                          </label>
                          <input
                            type='number'
                            value={formData.smallBags}
                            onChange={(e) => handleFormChange('smallBags', e.target.value)}
                            className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                          />
                        </div>
                      </div>
                      <div className='grid grid-cols-1 gap-4'>
                        <div>
                          <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                            Features (Comma separated)
                          </label>
                          <input
                            value={formData.features}
                            onChange={(e) => handleFormChange('features', e.target.value)}
                            placeholder='Unlimited mileage, Air conditioning'
                            className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                          />
                        </div>
                        <div>
                          <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                            Included Items (Comma separated)
                          </label>
                          <input
                            value={formData.includedItems}
                            onChange={(e) => handleFormChange('includedItems', e.target.value)}
                            placeholder='Free cancellation, Damage cover'
                            className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                          />
                        </div>
                      </div>
                    </div>

                    {/* Locations */}
                    <div>
                      <h4 className='text-[14px] font-bold text-[#15201f] mb-3 border-b pb-2'>
                        Locations
                      </h4>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                            Pickup Locations (Comma separated)
                          </label>
                          <input
                            value={formData.pickupLocations}
                            onChange={(e) => handleFormChange('pickupLocations', e.target.value)}
                            placeholder='Airport, Downtown'
                            className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                          />
                        </div>
                        <div>
                          <label className='block text-[12px] font-bold text-[#15201f] mb-1.5'>
                            Return Locations (Comma separated)
                          </label>
                          <input
                            value={formData.returnLocations}
                            onChange={(e) => handleFormChange('returnLocations', e.target.value)}
                            placeholder='Same as pickup'
                            className='w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors'
                          />
                        </div>
                      </div>
                    </div>

                    {/* Fuel Options */}
                    <div>
                      <div className='flex justify-between items-center mb-2 border-b pb-2'>
                        <h4 className='text-[14px] font-bold text-[#15201f]'>Fuel Options</h4>
                        <button
                          type='button'
                          onClick={addFuelOption}
                          className='text-[#2563eb] text-[12px] font-bold hover:underline'
                        >
                          + Add Option
                        </button>
                      </div>
                      <div className='space-y-3'>
                        {formData.fuelOptions.map((opt, index) => (
                          <div
                            key={index}
                            className='border border-[#e7e1d6] rounded-xl p-4 bg-[#f8fafc] relative'
                          >
                            {formData.fuelOptions.length > 1 && (
                              <button
                                type='button'
                                onClick={() => removeFuelOption(index)}
                                className='absolute top-2 right-2 text-red-500 text-lg leading-none'
                              >
                                &times;
                              </button>
                            )}
                            <div className='grid grid-cols-2 gap-3 mb-2'>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                  Title
                                </label>
                                <input
                                  value={opt.title}
                                  onChange={(e) =>
                                    handleFuelOptionChange(index, 'title', e.target.value)
                                  }
                                  placeholder='Return full'
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                  Price (0 for Free)
                                </label>
                                <input
                                  type='number'
                                  value={opt.price}
                                  onChange={(e) =>
                                    handleFuelOptionChange(index, 'price', e.target.value)
                                  }
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                            </div>
                            <div className='mb-2'>
                              <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                Description
                              </label>
                              <input
                                value={opt.description}
                                onChange={(e) =>
                                  handleFuelOptionChange(index, 'description', e.target.value)
                                }
                                placeholder='Bring it back full.'
                                className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                              />
                            </div>
                            <label className='flex items-center gap-2 text-[12px] text-[#15201f]'>
                              <input
                                type='checkbox'
                                checked={opt.isOneOff}
                                onChange={(e) =>
                                  handleFuelOptionChange(index, 'isOneOff', e.target.checked)
                                }
                              />
                              Is this a one-off charge?
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Protection Plans */}
                    <div>
                      <div className='flex justify-between items-center mb-2 border-b pb-2'>
                        <h4 className='text-[14px] font-bold text-[#15201f]'>Protection Plans</h4>
                        <button
                          type='button'
                          onClick={addProtectionPlan}
                          className='text-[#2563eb] text-[12px] font-bold hover:underline'
                        >
                          + Add Plan
                        </button>
                      </div>
                      <div className='space-y-3'>
                        {formData.protectionPlans.map((plan, index) => (
                          <div
                            key={index}
                            className='border border-[#e7e1d6] rounded-xl p-4 bg-[#f8fafc] relative'
                          >
                            {formData.protectionPlans.length > 1 && (
                              <button
                                type='button'
                                onClick={() => removeProtectionPlan(index)}
                                className='absolute top-2 right-2 text-red-500 text-lg leading-none'
                              >
                                &times;
                              </button>
                            )}
                            <div className='grid grid-cols-3 gap-3 mb-2'>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                  Title
                                </label>
                                <input
                                  value={plan.title}
                                  onChange={(e) =>
                                    handleProtectionPlanChange(index, 'title', e.target.value)
                                  }
                                  placeholder='Basic protection'
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                  Price/Day
                                </label>
                                <input
                                  type='number'
                                  value={plan.pricePerDay}
                                  onChange={(e) =>
                                    handleProtectionPlanChange(index, 'pricePerDay', e.target.value)
                                  }
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                  Deposit Hold
                                </label>
                                <input
                                  type='number'
                                  value={plan.deposit}
                                  onChange={(e) =>
                                    handleProtectionPlanChange(index, 'deposit', e.target.value)
                                  }
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                            </div>
                            <div className='mb-2'>
                              <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                Description
                              </label>
                              <input
                                value={plan.description}
                                onChange={(e) =>
                                  handleProtectionPlanChange(index, 'description', e.target.value)
                                }
                                className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                              />
                            </div>
                            <label className='flex items-center gap-2 text-[12px] text-[#15201f]'>
                              <input
                                type='checkbox'
                                checked={plan.isRecommended}
                                onChange={(e) =>
                                  handleProtectionPlanChange(
                                    index,
                                    'isRecommended',
                                    e.target.checked,
                                  )
                                }
                              />
                              Mark as Recommended
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Extras */}
                    <div>
                      <div className='flex justify-between items-center mb-2 border-b pb-2'>
                        <h4 className='text-[14px] font-bold text-[#15201f]'>Extras & Add-ons</h4>
                        <button
                          type='button'
                          onClick={addCarExtra}
                          className='text-[#2563eb] text-[12px] font-bold hover:underline'
                        >
                          + Add Extra
                        </button>
                      </div>
                      <div className='space-y-3'>
                        {formData.carExtras.map((extra, index) => (
                          <div
                            key={index}
                            className='border border-[#e7e1d6] rounded-xl p-4 bg-[#f8fafc] relative'
                          >
                            {formData.carExtras.length > 1 && (
                              <button
                                type='button'
                                onClick={() => removeCarExtra(index)}
                                className='absolute top-2 right-2 text-red-500 text-lg leading-none'
                              >
                                &times;
                              </button>
                            )}
                            <div className='grid grid-cols-2 gap-3 mb-2'>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                  Extra Name
                                </label>
                                <input
                                  value={extra.name}
                                  onChange={(e) =>
                                    handleCarExtraChange(index, 'name', e.target.value)
                                  }
                                  placeholder='Baby seat'
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                  Price/Day
                                </label>
                                <input
                                  type='number'
                                  value={extra.pricePerDay}
                                  onChange={(e) =>
                                    handleCarExtraChange(index, 'pricePerDay', e.target.value)
                                  }
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                            </div>
                            <div>
                              <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                Description
                              </label>
                              <input
                                value={extra.description}
                                onChange={(e) =>
                                  handleCarExtraChange(index, 'description', e.target.value)
                                }
                                placeholder='For infants, ages 0 to 1 year'
                                className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
                          type='button'
                          onClick={addPackage}
                          className='text-[#2563eb] text-[12px] font-bold hover:underline'
                        >
                          + Add Package
                        </button>
                      </div>
                      <div className='space-y-3'>
                        {formData.packages.map((pkg, index) => (
                          <div
                            key={index}
                            className='border border-[#e7e1d6] rounded-xl p-4 bg-[#f8fafc] relative'
                          >
                            {formData.packages.length > 1 && (
                              <button
                                type='button'
                                onClick={() => removePackage(index)}
                                className='absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg leading-none'
                              >
                                &times;
                              </button>
                            )}
                            <div className='grid grid-cols-2 gap-4 mb-3'>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                  Name
                                </label>
                                <input
                                  required
                                  value={pkg.name}
                                  onChange={(e) =>
                                    handlePackageChange(index, 'name', e.target.value)
                                  }
                                  placeholder='e.g. Fresh fade cut'
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                              <div>
                                <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                  Price (USD)
                                </label>
                                <input
                                  type='number'
                                  required
                                  value={pkg.price}
                                  onChange={(e) =>
                                    handlePackageChange(index, 'price', e.target.value)
                                  }
                                  className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                                />
                              </div>
                            </div>
                            <div>
                              <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                Package Image (Optional)
                              </label>
                              <div className='flex items-center gap-3'>
                                {pkg.imageUrl && (
                                  <img
                                    src={pkg.imageUrl}
                                    alt='Package'
                                    className='w-12 h-12 rounded-lg object-cover border border-[#e7e1d6]'
                                  />
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
                                    {isUploadingPackageImage === index
                                      ? 'Uploading...'
                                      : 'Upload Image'}
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
                        type='button'
                        onClick={addFoodItem}
                        className='text-[#2563eb] text-[12px] font-bold hover:underline'
                      >
                        + Add Food Item
                      </button>
                    </div>
                    <div className='space-y-3'>
                      {formData.foodItems.map((item, index) => (
                        <div
                          key={index}
                          className='border border-[#e7e1d6] rounded-xl p-4 bg-[#f8fafc] relative'
                        >
                          {formData.foodItems.length > 1 && (
                            <button
                              type='button'
                              onClick={() => removeFoodItem(index)}
                              className='absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg leading-none'
                            >
                              &times;
                            </button>
                          )}
                          <div className='mb-3'>
                            <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                              Item Name
                            </label>
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
                              <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                Description
                              </label>
                              <input
                                value={item.description}
                                onChange={(e) =>
                                  handleFoodItemChange(index, 'description', e.target.value)
                                }
                                placeholder='e.g. Crispy glazed wings...'
                                className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                              />
                            </div>
                            <div>
                              <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                                Price (USD)
                              </label>
                              <input
                                type='number'
                                required
                                value={item.price}
                                onChange={(e) =>
                                  handleFoodItemChange(index, 'price', e.target.value)
                                }
                                className='w-full border border-[#e7e1d6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb]'
                              />
                            </div>
                          </div>
                          <div>
                            <label className='block text-[11px] font-bold text-[#6b7b79] mb-1'>
                              Item Image (Optional)
                            </label>
                            <div className='flex items-center gap-3'>
                              {item.imageUrl && (
                                <img
                                  src={item.imageUrl}
                                  alt='Food'
                                  className='w-12 h-12 rounded-lg object-cover border border-[#e7e1d6]'
                                />
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
                        <svg
                          className='w-8 h-8 text-[#6b7b79] mb-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                          />
                        </svg>
                        <span className='text-[13px] text-[#6b7b79] mb-3'>
                          Click to browse or drag and drop
                        </span>
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
                        <div
                          key={idx}
                          className='relative w-full h-24 rounded-xl overflow-hidden border border-[#e7e1d6]'
                        >
                          {}
                          <img
                            src={url}
                            alt={`Listing Preview ${idx + 1}`}
                            className='w-full h-full object-cover'
                          />
                          <button
                            type='button'
                            onClick={() => removeMainImage(url)}
                            className='absolute top-1 right-1 bg-white/80 hover:bg-white text-red-500 rounded-full p-1 shadow-sm transition-colors'
                            title='Remove Image'
                          >
                            <svg
                              className='w-4 h-4'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                              />
                            </svg>
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
                    onClose();
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
    </>
  );
}
