import React from 'react';

interface ListingViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: any;
  isAdmin?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function ListingViewModal({
  isOpen,
  onClose,
  listing,
  isAdmin,
  onApprove,
  onReject
}: ListingViewModalProps) {
  if (!isOpen || !listing) return null;

  return (
    <div className='fixed inset-0 bg-[rgba(21,32,31,0.5)] z-[100] flex items-center justify-center p-4 backdrop-blur-sm'>
      <div className='bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_20px_60px_rgba(11,79,74,0.15)] animate-in fade-in zoom-in-95 duration-200'>
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-[#e7e1d6] sticky top-0 bg-white z-10 rounded-t-3xl'>
          <h2
            className='text-[22px] font-bold text-[#172554]'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            {listing.title}
          </h2>
          <button
            onClick={onClose}
            className='text-[#6b7b79] hover:text-[#15201f] transition-colors cursor-pointer text-2xl leading-none'
          >
            &times;
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='p-6 overflow-y-auto bg-[#faf9f5]'>
          <div className='space-y-8 text-[14px]'>
            
            {/* Status and Basic Info */}
            <div className="bg-white p-5 rounded-2xl border border-[#e7e1d6] shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-[12px] text-[#6b7b79] uppercase tracking-wider mb-1">Status</div>
                  <div>
                    {listing.approvalStatus === 'APPROVED' && <span className="bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Live</span>}
                    {listing.approvalStatus === 'PENDING' && <span className="bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Pending</span>}
                    {listing.approvalStatus === 'REJECTED' && <span className="bg-[#fef2f2] text-[#ef4444] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]">Rejected</span>}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-[#6b7b79] uppercase tracking-wider mb-1">Category</div>
                  <div className="font-semibold text-[#15201f]">{listing.category}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#6b7b79] uppercase tracking-wider mb-1">Country</div>
                  <div className="font-semibold text-[#15201f]">{listing.country || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#6b7b79] uppercase tracking-wider mb-1">Contact</div>
                  <div className="font-semibold text-[#15201f] text-xs max-w-full truncate">{listing.description || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Images Grid */}
            {listing.images && listing.images.length > 0 && (
              <div>
                <h3 className="text-[16px] font-bold text-[#15201f] mb-3">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {listing.images.map((img: any, i: number) => (
                    <div key={i} className={`rounded-xl overflow-hidden shadow-sm ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                      <img src={img.url} alt={`Listing ${i}`} className="w-full h-full object-cover min-h-[150px]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAY Details */}
            {listing.category === 'STAY' && listing.stayDetails && (
              <div className="bg-white p-5 rounded-2xl border border-[#e7e1d6] shadow-sm">
                <h3 className="text-[16px] font-bold text-[#15201f] mb-4 border-b pb-2">Stay Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#6b7b79] block text-xs">Price Per Night</span>
                    <span className="font-semibold text-[16px]">${listing.stayDetails.pricePerNight}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7b79] block text-xs">Amenities</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {listing.stayDetails.amenities?.map((am: string, i: number) => (
                        <span key={i} className="bg-[#f8fafc] border border-[#e7e1d6] px-2 py-1 rounded-md text-xs">{am}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CAR Details */}
            {listing.category === 'CAR' && listing.carDetails && (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-[#e7e1d6] shadow-sm">
                  <h3 className="text-[16px] font-bold text-[#15201f] mb-4 border-b pb-2">Car Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-[#6b7b79] block text-xs">Daily Rate</span>
                      <span className="font-semibold text-[16px]">${listing.carDetails.dailyRate}</span>
                    </div>
                    <div>
                      <span className="text-[#6b7b79] block text-xs">Type</span>
                      <span className="font-semibold">{listing.carDetails.carType}</span>
                    </div>
                    <div>
                      <span className="text-[#6b7b79] block text-xs">Transmission</span>
                      <span className="font-semibold">{listing.carDetails.transmission}</span>
                    </div>
                    <div>
                      <span className="text-[#6b7b79] block text-xs">Seats / Doors</span>
                      <span className="font-semibold">{listing.carDetails.seats} Seats, {listing.carDetails.doors} Doors</span>
                    </div>
                    <div>
                      <span className="text-[#6b7b79] block text-xs">Bags Capacity</span>
                      <span className="font-semibold">{listing.carDetails.bags?.large || 0} Large, {listing.carDetails.bags?.small || 0} Small</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#e7e1d6] shadow-sm">
                  <h3 className="text-[16px] font-bold text-[#15201f] mb-4 border-b pb-2">Locations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#6b7b79] block text-xs">Pickup Locations</span>
                      <ul className="list-disc pl-4 mt-1">
                        {listing.carDetails.pickupLocations?.map((loc: string, i: number) => <li key={i}>{loc}</li>)}
                      </ul>
                    </div>
                    <div>
                      <span className="text-[#6b7b79] block text-xs">Return Locations</span>
                      <ul className="list-disc pl-4 mt-1">
                        {listing.carDetails.returnLocations?.map((loc: string, i: number) => <li key={i}>{loc}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                {(listing.carDetails.fuelOptions?.length > 0 || listing.carDetails.protectionPlans?.length > 0) && (
                  <div className="bg-white p-5 rounded-2xl border border-[#e7e1d6] shadow-sm">
                     <h3 className="text-[16px] font-bold text-[#15201f] mb-4 border-b pb-2">Plans & Options</h3>
                     
                     {listing.carDetails.fuelOptions?.length > 0 && (
                       <div className="mb-4">
                         <h4 className="font-semibold text-[14px] text-[#15201f] mb-2">Fuel Options</h4>
                         <div className="space-y-2">
                           {listing.carDetails.fuelOptions.map((f: any, i: number) => (
                             <div key={i} className="flex justify-between border-b border-dashed border-[#e7e1d6] pb-2">
                               <div>
                                 <div className="font-semibold">{f.title}</div>
                                 <div className="text-xs text-[#6b7b79]">{f.description}</div>
                               </div>
                               <div className="font-bold">${f.price}</div>
                             </div>
                           ))}
                         </div>
                       </div>
                     )}

                     {listing.carDetails.protectionPlans?.length > 0 && (
                       <div>
                         <h4 className="font-semibold text-[14px] text-[#15201f] mb-2">Protection Plans</h4>
                         <div className="space-y-2">
                           {listing.carDetails.protectionPlans.map((p: any, i: number) => (
                             <div key={i} className="flex justify-between border-b border-dashed border-[#e7e1d6] pb-2">
                               <div>
                                 <div className="font-semibold">{p.title}</div>
                                 <div className="text-xs text-[#6b7b79]">{p.description}</div>
                               </div>
                               <div className="text-right">
                                 <div className="font-bold">${p.pricePerDay}/day</div>
                                 <div className="text-xs text-[#6b7b79]">Deposit: ${p.deposit}</div>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     )}
                  </div>
                )}
              </div>
            )}

            {/* SERVICE Details */}
            {listing.category === 'SERVICE' && listing.serviceDetails && (
              <div className="bg-white p-5 rounded-2xl border border-[#e7e1d6] shadow-sm">
                <h3 className="text-[16px] font-bold text-[#15201f] mb-4 border-b pb-2">Service Details: {listing.serviceDetails.serviceType}</h3>
                
                <div className="mb-4">
                  <span className="text-[#6b7b79] block text-xs">Available Time Slots</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {listing.serviceDetails.availableTimeSlots?.map((t: string, i: number) => (
                      <span key={i} className="bg-[#f8fafc] border border-[#e7e1d6] px-2 py-1 rounded-md text-xs">{t}</span>
                    ))}
                  </div>
                </div>

                <h4 className="font-semibold text-[14px] text-[#15201f] mb-3">Packages</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listing.serviceDetails.packages?.map((pkg: any, i: number) => (
                    <div key={i} className="flex gap-4 border border-[#e7e1d6] p-3 rounded-xl items-center">
                      {pkg.imageUrl && <img src={pkg.imageUrl} alt={pkg.name} className="w-16 h-16 object-cover rounded-lg" />}
                      <div>
                        <div className="font-bold">{pkg.name}</div>
                        <div className="text-[#1e9e72] font-semibold">${pkg.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FOOD Details */}
            {listing.category === 'FOOD' && listing.foodDetails && (
              <div className="bg-white p-5 rounded-2xl border border-[#e7e1d6] shadow-sm">
                <h3 className="text-[16px] font-bold text-[#15201f] mb-4 border-b pb-2">Menu Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listing.foodDetails.items?.map((item: any, i: number) => (
                    <div key={i} className="flex gap-4 border border-[#e7e1d6] p-3 rounded-xl">
                      {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />}
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-xs text-[#6b7b79] mb-1 line-clamp-2">{item.description}</div>
                        <div className="text-[#1e9e72] font-semibold">${item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className='p-6 border-t border-[#e7e1d6] flex justify-end gap-3 bg-white rounded-b-3xl'>
          <button
            onClick={onClose}
            className='px-5 py-2.5 rounded-xl font-bold text-[14px] border border-[#e7e1d6] bg-white text-[#15201f] hover:bg-[#f8fafc] transition-colors cursor-pointer shadow-sm'
          >
            Close
          </button>
          
          {isAdmin && onReject && listing.approvalStatus !== 'REJECTED' && listing.approvalStatus !== 'APPROVED' && (
            <button
              onClick={() => onReject(listing.id)}
              className='px-5 py-2.5 rounded-xl font-bold text-[14px] bg-[#fef2f2] text-[#ef4444] border border-[#fee2e2] hover:bg-[#fee2e2] transition-colors cursor-pointer shadow-sm'
            >
              Reject Listing
            </button>
          )}
          
          {isAdmin && onApprove && listing.approvalStatus !== 'APPROVED' && (
            <button
              onClick={() => onApprove(listing.id)}
              className='px-5 py-2.5 rounded-xl font-bold text-[14px] bg-[#1e9e72] text-white hover:bg-[#16855f] transition-colors cursor-pointer shadow-sm'
            >
              Approve Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
