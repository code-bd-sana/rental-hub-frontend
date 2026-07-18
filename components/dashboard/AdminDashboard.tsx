"use client";

import React, { useState, useEffect } from "react";
import { listingApi } from "../../lib/api/listings";
import { countryApi } from "../../lib/api/countries";
import ListingFormModal from './ListingFormModal';
import ListingViewModal from './ListingViewModal';
import { TeamAndAccess } from './TeamAndAccess';

export function AdminOverview() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Platform overview
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Load progress and revenue at a glance.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2">
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">2</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Countries</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">17</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Listings loaded</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">3</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Claims pending</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">214</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Paid guests</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">9</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Paid listing owners</div>
        </div>
        <div className="bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm">
          <div className="text-[28px] font-extrabold text-[#172554]">$2,491</div>
          <div className="text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]">Monthly revenue</div>
        </div>
      </div>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Load progress by country
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">12 of 150</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] w-40">
                <div className="bg-[#e7e1d6] h-1.5 rounded-sm overflow-hidden"><div className="bg-[#1e9e72] h-full" style={{ width: "8%" }}></div></div>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Barbados</td>
              <td className="p-[12px_16px] text-[#6b7b79]">5 of 150</td>
              <td className="p-[12px_16px] w-40">
                <div className="bg-[#e7e1d6] h-1.5 rounded-sm overflow-hidden"><div className="bg-[#1e9e72] h-full" style={{ width: "3.3%" }}></div></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminClaims() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Ownership claims
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Approve or reject hosts who claim a listing before their booking page activates.
      </p>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Pending claims
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Business</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Claimed by</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Country</th>
              <th className="p-[10px_16px] border-b border-[#e7e1d6]"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Ocho Rios Grill</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Owner one</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-right space-x-2">
                <button className="border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#1e40af]">Approve</button>
                <button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">Reject</button>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">The Cliff Hotel</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Owner two</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Jamaica</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-right space-x-2">
                <button className="border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#1e40af]">Approve</button>
                <button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">Reject</button>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Oistins Fish Fry</td>
              <td className="p-[12px_16px] text-[#6b7b79]">Owner three</td>
              <td className="p-[12px_16px] text-[#6b7b79]">Barbados</td>
              <td className="p-[12px_16px] text-right space-x-2">
                <button className="border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#1e40af]">Approve</button>
                <button className="border border-[#e7e1d6] bg-white text-[#172554] rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold hover:bg-[#f8fafc]">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminListings() {
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewListing, setViewListing] = useState<any>(null);
  const [editListing, setEditListing] = useState<any>(null);
  const [deleteListingId, setDeleteListingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      const res = await listingApi.getAllListings({ status: 'ALL' });
      if (res.success) {
        setListings(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteListingId) return;
    setIsDeleting(true);
    try {
      const res = await listingApi.deleteListing(deleteListingId);
      if (res.success) {
        await fetchListings();
      }
    } catch (error) {
      console.error('Failed to delete listing:', error);
      alert('Failed to delete listing. Please try again.');
    } finally {
      setIsDeleting(false);
      setDeleteListingId(null);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await listingApi.approveListing(id, status);
      await fetchListings();
      setViewListing(null);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        All listings
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Every listing across countries, with status and quick actions.
      </p>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Listings
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Listing</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Category</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Country</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">State</th>
              <th className="p-[10px_16px] border-b border-[#e7e1d6]"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#6b7b79]">Loading listings...</td>
              </tr>
            ) : listings.length > 0 ? (
              listings.map((lst) => (
                <tr key={lst.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f] font-semibold">{lst.title}</td>
                  <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">{lst.category}</td>
                  <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">{lst.country || 'N/A'}</td>
                  <td className="p-[12px_16px] border-b border-[#e7e1d6]">
                    {lst.approvalStatus === 'APPROVED' && <span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Live</span>}
                    {lst.approvalStatus === 'PENDING' && <span className="bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Pending</span>}
                    {lst.approvalStatus === 'REJECTED' && <span className="bg-[#fef2f2] text-[#ef4444] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Rejected</span>}
                    {lst.approvalStatus === 'SUSPENDED' && <span className="bg-[#fef2f2] text-[#ef4444] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Suspended</span>}
                  </td>
                  <td className="p-[12px_16px] border-b border-[#e7e1d6] text-right">
                    <div className='flex items-center justify-end gap-3'>
                      <button
                        onClick={() => setViewListing(lst)}
                        className='text-[#6b7b79] hover:text-[#2563eb] transition-colors cursor-pointer'
                        title='View Preview'
                      >
                        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                          <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
                          <circle cx='12' cy='12' r='3' />
                        </svg>
                      </button>
                      <button
                        onClick={() => setEditListing(lst)}
                        className='text-[#6b7b79] hover:text-[#1e9e72] transition-colors cursor-pointer'
                        title='Edit'
                      >
                        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                          <path d='M12 20h9' />
                          <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteListingId(lst.id)}
                        className='text-[#6b7b79] hover:text-[#dc2626] transition-colors cursor-pointer'
                        title='Delete'
                      >
                        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                          <path d='M3 6h18' />
                          <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                          <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                          <line x1='10' y1='11' x2='10' y2='17' />
                          <line x1='14' y1='11' x2='14' y2='17' />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#6b7b79]">No listings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ListingFormModal
        isOpen={!!editListing}
        onClose={() => setEditListing(null)}
        listingToEdit={editListing}
        onSuccess={() => {
          fetchListings();
          setEditListing(null);
        }}
      />

      {/* Delete Confirmation Modal */}
      {deleteListingId && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-[100] flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-[400px] w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-6'>
              <h3 className='font-bold text-[18px] text-[#15201f] mb-2'>Delete Listing</h3>
              <p className='text-[14px] text-[#6b7b79]'>Are you sure you want to delete this listing? This action cannot be undone.</p>
            </div>
            <div className='p-4 border-t border-[#e7e1d6] flex justify-end gap-3 bg-[#f8fafc]'>
              <button
                onClick={() => !isDeleting && setDeleteListingId(null)}
                disabled={isDeleting}
                className='px-4 py-2 text-[14px] font-semibold text-[#15201f] hover:bg-[#e7e1d6] rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className='px-4 py-2 text-[14px] font-semibold bg-[#ef4444] text-white hover:bg-[#dc2626] rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[70px]'
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ListingViewModal
        isOpen={!!viewListing}
        onClose={() => setViewListing(null)}
        listing={viewListing}
        isAdmin={true}
        onApprove={(id) => handleUpdateStatus(id, 'APPROVED')}
        onReject={(id) => handleUpdateStatus(id, 'REJECTED')}
      />
    </div>
  );
}

export function AdminCountries() {
  const [countries, setCountries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCountry, setEditCountry] = useState<any>(null);
  const [deleteCountryId, setDeleteCountryId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ name: '', target: 150 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCountries = async () => {
    try {
      setIsLoading(true);
      const res = await countryApi.getAllCountries();
      if (res.success) {
        setCountries(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const openAddModal = () => {
    setEditCountry(null);
    setFormData({ name: '', target: 150 });
    setIsModalOpen(true);
  };

  const openEditModal = (country: any) => {
    setEditCountry(country);
    setFormData({ name: country.name, target: country.target });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (editCountry) {
        await countryApi.updateCountry(editCountry.id, {
          name: formData.name,
          target: Number(formData.target)
        });
      } else {
        await countryApi.createCountry({
          name: formData.name,
          target: Number(formData.target)
        });
      }
      await fetchCountries();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save country.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteCountryId) return;
    try {
      setIsSubmitting(true);
      await countryApi.deleteCountry(deleteCountryId);
      await fetchCountries();
    } catch (err) {
      console.error(err);
      alert("Failed to delete country.");
    } finally {
      setIsSubmitting(false);
      setDeleteCountryId(null);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Countries and loading
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Add countries and manage host loading targets.
      </p>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Countries
          </h3>
          <button onClick={openAddModal} className="border border-[#2563eb] bg-[#2563eb] text-white rounded-[9px] px-2.75 py-1.5 text-[12px] font-semibold transition-colors hover:bg-[#1e40af] cursor-pointer">
            Add new country
          </button>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Country</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Loaded</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Target</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Progress</th>
              <th className="p-[10px_16px] border-b border-[#e7e1d6]"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#6b7b79]">Loading countries...</td>
              </tr>
            ) : countries.length > 0 ? (
              countries.map((c) => {
                const progress = c.target > 0 ? Math.min(100, Math.round((c.loaded / c.target) * 100)) : 0;
                return (
                  <tr key={c.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f] font-medium">{c.name}</td>
                    <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">{c.loaded}</td>
                    <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">{c.target}</td>
                    <td className="p-[12px_16px] border-b border-[#e7e1d6] w-40">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#e7e1d6] h-1.5 rounded-sm overflow-hidden flex-1">
                          <div className="bg-[#1e9e72] h-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="text-[11px] font-bold text-[#6b7b79] w-8 text-right">{progress}%</span>
                      </div>
                    </td>
                    <td className="p-[12px_16px] border-b border-[#e7e1d6] text-right">
                      <div className='flex items-center justify-end gap-3'>
                        <button
                          onClick={() => openEditModal(c)}
                          className='text-[#6b7b79] hover:text-[#1e9e72] transition-colors cursor-pointer'
                          title='Edit'
                        >
                          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M12 20h9' />
                            <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteCountryId(c.id)}
                          className='text-[#6b7b79] hover:text-[#dc2626] transition-colors cursor-pointer'
                          title='Delete'
                        >
                          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M3 6h18' />
                            <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                            <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                            <line x1='10' y1='11' x2='10' y2='17' />
                            <line x1='14' y1='11' x2='14' y2='17' />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#6b7b79]">No countries found. Add one above.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-[100] flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-[400px] w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <form onSubmit={handleSubmit}>
              <div className='p-6 border-b border-[#e7e1d6]'>
                <h3 className='font-bold text-[18px] text-[#15201f]'>
                  {editCountry ? 'Edit Country' : 'Add New Country'}
                </h3>
              </div>
              <div className='p-6 space-y-4'>
                <div>
                  <label className="block text-[13px] font-semibold text-[#15201f] mb-1.5">Country Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jamaica"
                    className="w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#15201f] mb-1.5">Target Listings Goal</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full border border-[#e7e1d6] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#2563eb] transition-colors"
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className='p-4 border-t border-[#e7e1d6] flex justify-end gap-3 bg-[#f8fafc]'>
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className='px-4 py-2 text-[14px] font-semibold text-[#15201f] hover:bg-[#e7e1d6] rounded-xl transition-colors cursor-pointer disabled:opacity-50'
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className='px-4 py-2 text-[14px] font-semibold bg-[#2563eb] text-white hover:bg-[#1e40af] rounded-xl transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center min-w-[70px]'
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteCountryId && (
        <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-[100] flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl max-w-[400px] w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='p-6'>
              <h3 className='font-bold text-[18px] text-[#15201f] mb-2'>Delete Country</h3>
              <p className='text-[14px] text-[#6b7b79]'>Are you sure you want to delete this country? This will not delete the associated listings, but the country goal will be removed.</p>
            </div>
            <div className='p-4 border-t border-[#e7e1d6] flex justify-end gap-3 bg-[#f8fafc]'>
              <button
                onClick={() => !isSubmitting && setDeleteCountryId(null)}
                disabled={isSubmitting}
                className='px-4 py-2 text-[14px] font-semibold text-[#15201f] hover:bg-[#e7e1d6] rounded-xl transition-colors cursor-pointer disabled:opacity-50'
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isSubmitting}
                className='px-4 py-2 text-[14px] font-semibold bg-[#ef4444] text-white hover:bg-[#dc2626] rounded-xl transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center min-w-[70px]'
              >
                {isSubmitting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminGuests() {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-[26px] font-bold mb-1 text-[#172554]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
        Guests
      </h2>
      <p className="text-[14px] text-[#6b7b79] mb-4.5">
        Guest accounts and subscription status.
      </p>

      <div className="bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4">
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]">
          <h3 className="text-[18px] text-[#15201f] font-bold" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
            Recent guests
          </h3>
        </div>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Name</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Countries of interest</th>
              <th className="text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Aisha</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">Jamaica, Barbados</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]">
                <span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Subscribed</span>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f]">Marco</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]">United States</td>
              <td className="p-[12px_16px] border-b border-[#e7e1d6]">
                <span className="bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Free</span>
              </td>
            </tr>
            <tr>
              <td className="p-[12px_16px] text-[#15201f]">Priya</td>
              <td className="p-[12px_16px] text-[#6b7b79]">Bahamas</td>
              <td className="p-[12px_16px]">
                <span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Subscribed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


type AdminTab = 'Overview' | 'Claims' | 'Listings' | 'Countries' | 'Guests' | 'Team and access' | 'Load directory' | 'Bookings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('Overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs: AdminTab[] = [
    'Overview',
    'Claims',
    'Listings',
    'Countries',
    'Guests',
    'Team and access',
    'Load directory',
    'Bookings'
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#15201f] text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-[24px] font-bold tracking-tight text-white flex items-center gap-2">
              Roam<span className="text-[#2563eb]">ly</span>
            </h1>
            <p className="text-[#6b7b79] text-[10px] tracking-[1px] uppercase mt-1">Super Admin / Director</p>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-[14px] font-semibold ${
                  activeTab === tab
                    ? 'bg-[#1f2d2c] text-white shadow-sm'
                    : 'text-[#8c9c9a] hover:bg-[#1f2d2c]/50 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="md:hidden p-4 bg-white border-b border-[#e7e1d6] flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-[20px] font-bold text-[#172554]">Roamly</h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#15201f] hover:bg-[#f8fafc] rounded-lg">
            ☰
          </button>
        </div>
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-full">
          {activeTab === 'Overview' && <AdminOverview />}
          {activeTab === 'Claims' && <AdminClaims />}
          {activeTab === 'Listings' && <AdminOverview />}
          {activeTab === 'Guests' && <AdminGuests />}
          {activeTab === 'Team and access' && <TeamAndAccess />}
        </div>
      </main>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#15201f]/20 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
}
