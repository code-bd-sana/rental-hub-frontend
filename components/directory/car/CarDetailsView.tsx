/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useMemo, useState } from 'react';

export function CarDetailsView({ listing }: { listing: any }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [protection, setProtection] = useState<string>('');
  const [fuel, setFuel] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [returnLocation, setReturnLocation] = useState<string>('same');
  const [pickupDate, setPickupDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');

  const heroImage = listing.images?.find((img: any) => img.isHero) || listing.images?.[0];
  const car = listing.carDetails || {};

  const normalize = (arr: any) => {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    return arr.map((item: any, i: number) => {
      if (typeof item === 'string') {
        return { key: item, name: item, note: '' }; // For location strings
      }
      return {
        ...item,
        key: item.key || item.id || item.title || item.name || String(i),
        name: item.name || item.title,
        desc: item.desc || item.description || item.sub || '',
        price: item.price ?? item.pricePerDay ?? 0,
        perDay: item.perDay ?? (item.pricePerDay !== undefined ? true : !item.isOneOff),
        deposit: item.deposit,
        rec: item.rec ?? item.isRecommended ?? false,
      };
    });
  };

  const fuelOptions = normalize(car.fuelOptions);
  const protectionPlans = normalize(car.protectionPlans);
  const extraOptions = useMemo(() => {
    return normalize(car.extras);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car.extras]);
  
  const pickupLocations = normalize(car.pickupLocations);
  const returnLocations = normalize(car.returnLocations);

  const activeProtection =
    protectionPlans.find((p: any) => p.key === protection) || protectionPlans[0];
  const activeFuel = fuelOptions.find((f: any) => f.key === fuel) || fuelOptions[0];

  const days = useMemo(() => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1; // Minimum 1 day
    }
    return 1; // Default to 1 day if dates are not selected
  }, [pickupDate, returnDate]);
  
  const dailyRate = car.dailyRate || 0;

  const extrasCost = useMemo(() => {
    let sum = 0;
    Object.keys(selectedExtras).forEach((k) => {
      if (selectedExtras[k]) {
        const opt = extraOptions.find((o: any) => o.key === k);
        if (opt) {
          sum += opt.perDay ? opt.price * days : opt.price;
        }
      }
    });
    return sum;
  }, [selectedExtras, extraOptions, days]);

  const toggleExtra = (key: string) => {
    setSelectedExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!protection) setProtection(protectionPlans[0]?.key);
      if (!fuel) setFuel(fuelOptions[0]?.key);
      if (!pickupLocation) setPickupLocation(pickupLocations[0]?.key);
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className='view'
      id='view-car'
      style={{ display: 'block', minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}
    >
      <div className='wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='crumbs flex items-center gap-2 text-sm text-gray-500 mb-6'>
          <Link href='/'>Home</Link> ›<Link href='/directory'>Cars</Link> ›
          {step === 2 && (
            <>
              <button onClick={() => setStep(1)} className='hover:underline'>
                {listing.title}
              </button>{' '}
              › Extras and protection
            </>
          )}
          {step === 1 && <span className='font-medium text-gray-900'>{listing.title}</span>}
        </div>

        <div className='stepper'>
          <div className={`st ${step >= 1 ? (step === 2 ? 'done' : 'on') : ''}`}>
            <span className='num'>{step === 2 ? '✓' : '1'}</span> Your car
          </div>
          <div className='sep'></div>
          <div className={`st ${step === 2 ? 'on' : ''}`}>
            <span className='num'>2</span> Extras and protection
          </div>
          <div className='sep'></div>
          <div className='st'>
            <span className='num'>3</span> Confirm and pay
          </div>
        </div>

        <div className='split flex flex-col lg:flex-row gap-12' style={{ paddingTop: '10px' }}>
          <div className='flex-1'>
            {step === 1 && (
              <div className='animate-in fade-in slide-in-from-bottom-4 duration-500'>
                <div
                  className='car-photo big'
                  style={{ borderRadius: '18px', aspectRatio: '16/9', background: '#e9e9ed' }}
                >
                  <span className='example-tag'>
                    <svg viewBox='0 0 24 24' fill='none'>
                      <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
                      <path
                        d='M12 8v5m0 3h.01'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                    Example photo
                  </span>
                  {heroImage && (
                    <Image
                      src={heroImage.url}
                      alt='Car'
                      fill
                      className='object-cover rounded-[18px]'
                      priority
                    />
                  )}
                </div>

                <h1
                  id='carTitle'
                  style={{ fontSize: '2rem', margin: '20px 0 2px', fontWeight: 'bold' }}
                >
                  {listing.title}
                </h1>
                <div
                  id='carOrSimilar'
                  style={{
                    color: 'var(--orange)',
                    fontWeight: 700,
                    fontSize: '.95rem',
                    marginBottom: '8px',
                  }}
                >
                  Or similar • {car.carType || 'Car category'}
                </div>

                <div className='car-specs' id='carSpecs' style={{ fontSize: '.95rem' }}>
                  {car.seats > 0 && (
                    <span>
                      <svg fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                        />
                      </svg>
                      {car.seats} Seats
                    </span>
                  )}
                  {car.transmission && (
                    <span>
                      <svg fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                        />
                      </svg>
                      {car.transmission}
                    </span>
                  )}
                  {car.doors > 0 && (
                    <span>
                      <svg fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 6h16M4 10h16M4 14h16M4 18h16'
                        />
                      </svg>
                      {car.doors} Doors
                    </span>
                  )}
                  {car.bags?.large > 0 && <span>👜 {car.bags.large} Large bag</span>}
                </div>

                <div className='cd-banner'>
                  <svg viewBox='0 0 24 24' fill='none'>
                    <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
                    <path
                      d='M12 8v5m0 3h.01'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                  <div>
                    <b>This is a category, not one exact car.</b> The photo is an example. Your host
                    will provide this car or a similar vehicle in the same category, with similar
                    year, size, and condition. The host confirms the exact car with you before
                    pickup.
                  </div>
                </div>

                {car.features && car.features.length > 0 && (
                  <div className='cd-sec' style={{ borderTop: 'none', paddingTop: 0 }}>
                    <h3>What this car offers</h3>
                    <div className='spec-grid'>
                      {car.features.map((feat: string, i: number) => (
                        <div key={i} className='spec'>
                          <svg
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M5 12.5 9 16l10-9' />
                          </svg>
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className='cd-sec'>
                  <h3>Your owner</h3>
                  <div className='host-card'>
                    <div className='av'>{listing.host?.firstName?.[0] || 'O'}</div>
                    <div>
                      <div className='hc-name'>
                        {listing.host?.firstName || 'Owner'} {listing.host?.lastName || ''}{' '}
                        <span className='verified'>✓ Verified</span>
                      </div>
                      <div className='hc-meta'>Typically replies within an hour</div>
                    </div>
                  </div>
                </div>

                {car.includedItems && car.includedItems.length > 0 && (
                  <div className='cd-sec'>
                    <h3>What is included</h3>
                    <div className='inc-list'>
                      {car.includedItems.map((inc: string, i: number) => (
                        <div key={i} className='inc'>
                          <svg viewBox='0 0 24 24' fill='none'>
                            <path
                              d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z'
                              stroke='currentColor'
                              strokeWidth='2'
                            />
                            <path
                              d='M8 12l3 3 5-5'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                            />
                          </svg>
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className='cd-sec'>
                  <h3>Pickup and drop off</h3>
                  <div className='timeline'>
                    <div className='tl'>
                      <div className='dot'></div>
                      <div>
                        <b>Pickup</b>
                        <div className='when'>{pickupDate ? pickupDate : 'Select your dates'}</div>
                        <div className='where'>
                          Host location or Johan Adolf Pengel International Airport, by arrangement
                        </div>
                      </div>
                    </div>
                    <div className='tl'>
                      <div className='dot'></div>
                      <div>
                        <b>Drop off</b>
                        <div className='when'>{returnDate ? returnDate : 'Select your dates'}</div>
                        <div className='where'>
                          Same location as pickup, unless agreed otherwise with the host
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='cd-sec'>
                  <h3>Bring this to your pickup</h3>
                  <div className='checklist'>
                    <div className='ck'>
                      <svg viewBox='0 0 24 24' fill='none'>
                        <rect
                          x='3'
                          y='5'
                          width='18'
                          height='14'
                          rx='2'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <path
                          d='M7 9h4M7 13h7'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                      </svg>
                      A valid driver licence
                    </div>
                    <div className='ck'>
                      <svg viewBox='0 0 24 24' fill='none'>
                        <rect
                          x='4'
                          y='3'
                          width='16'
                          height='18'
                          rx='2'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <circle cx='12' cy='10' r='2.5' stroke='currentColor' strokeWidth='2' />
                        <path
                          d='M8 17c.7-2 7.3-2 8 0'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                      </svg>
                      A valid ID card or passport
                    </div>
                    <div className='ck'>
                      <svg viewBox='0 0 24 24' fill='none'>
                        <rect
                          x='3'
                          y='6'
                          width='18'
                          height='12'
                          rx='2'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <path d='M3 10h18' stroke='currentColor' strokeWidth='2' />
                      </svg>
                      Your refundable deposit, paid to the host
                    </div>
                    <div className='ck'>
                      <svg viewBox='0 0 24 24' fill='none'>
                        <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
                        <path
                          d='M12 7v5l3 2'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                      </svg>
                      Minimum driver age 21, licence held at least 2 years
                    </div>
                  </div>
                  <p className='terms-note'>
                    This is not the full list. Check the host rental terms for everything you need.
                    The host holds the car for your chosen pickup time and may release it if you
                    arrive late without notice.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className='animate-in fade-in slide-in-from-right-8 duration-500'>
                <div className='date-pill'>
                  <div>
                    <b>{listing.title}</b>
                    <span style={{ color: 'var(--muted)' }}> · pickup and return</span>
                    <br />
                    <span style={{ color: 'var(--purple)', fontWeight: 700 }}>3 Days rental</span>
                  </div>
                  <a onClick={() => setStep(1)}>Edit</a>
                </div>

                <div className='cd-sec' style={{ borderTop: 'none', paddingTop: 0 }}>
                  <h3>Pickup and return</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '12px' }}>
                    Choose where you collect and return the car.
                  </p>

                  <label className='loc-lbl'>Pickup location</label>
                  <select
                    className='loc-sel'
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  >
                    {pickupLocations.map((loc: any) => (
                      <option key={loc.key} value={loc.key}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                  <div className='loc-note'>
                    {pickupLocations.find((l: any) => l.key === pickupLocation)?.note}
                  </div>

                  <label className='loc-lbl' style={{ marginTop: '14px' }}>
                    Return location
                  </label>
                  <select
                    className='loc-sel'
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                  >
                    <option value='same'>Same as pickup</option>
                    {returnLocations.map((loc: any) => (
                      <option key={loc.key} value={loc.key}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                  <div className='loc-note'>
                    {returnLocation === 'same'
                      ? `Returning to ${pickupLocations.find((l: any) => l.key === pickupLocation)?.name || 'the pickup location'}.`
                      : returnLocations.find((l: any) => l.key === returnLocation)?.note}
                  </div>
                </div>

                <div className='cd-sec'>
                  <h3>Fuel</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '14px' }}>
                    Choose how you would like to handle fuel.
                  </p>
                  <div className='ins-grid'>
                    {fuelOptions.map((f: any) => (
                      <div
                        key={f.key}
                        className={`ins-opt ${fuel === f.key ? 'sel' : ''}`}
                        onClick={() => setFuel(f.key)}
                      >
                        <span className='radio'></span>
                        <div style={{ flex: 1 }}>
                          <div className='it-title'>{f.name}</div>
                          <div className='it-sub'>{f.desc}</div>
                        </div>
                        <div className='it-price'>
                          {f.price ? `USD ${f.price}` : 'Free'}
                          <small>{f.price ? 'one off' : 'no charge'}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='cd-sec'>
                  <h3>Choose your protection</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '14px' }}>
                    Pick the cover that suits your trip. Higher cover means a smaller deposit hold
                    and less to worry about on the road.
                  </p>
                  <div className='ins-grid'>
                    {protectionPlans.map((o: any) => (
                      <div
                        key={o.key}
                        className={`ins-opt ${protection === o.key ? 'sel' : ''}`}
                        onClick={() => setProtection(o.key)}
                      >
                        <span className='radio'></span>
                        <div style={{ flex: 1 }}>
                          <div className='it-title'>
                            {o.name} {o.rec && <span className='tag-rec'>Recommended</span>}
                          </div>
                          <div className='it-sub'>
                            {o.desc} Deposit hold {o.deposit ? `USD ${o.deposit}` : 'none'}.
                          </div>
                        </div>
                        <div className='it-price'>
                          {o.price ? `USD ${o.price}` : 'Included'}
                          <small>{o.price ? 'per day' : 'in the price'}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='cd-sec'>
                  <h3>Add extras</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '6px' }}>
                    Optional add ons for a smoother trip. Tap to add or remove.
                  </p>
                  <div>
                    {extraOptions.map((a: any) => (
                      <div key={a.key} className='xtra'>
                        <div className='xi'>
                          <svg
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                          >
                            <path
                              d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                        <div className='xt'>
                          <b>{a.name}</b>
                          <small>{a.desc}</small>
                        </div>
                        <div className='xp'>
                          USD {a.price}
                          <small>{a.perDay ? 'per day' : 'one off'}</small>
                        </div>
                        <div
                          className={`toggle ${selectedExtras[a.key] ? 'on' : ''}`}
                          onClick={() => toggleExtra(a.key)}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='aside w-full lg:w-95 flex-none'>
            <div
              className='panel bg-white border border-gray-200 rounded-[18px] shadow-sm sticky top-24'
              style={{ overflow: 'hidden' }}
            >
              <div className='p-head px-5 py-4 border-b border-gray-100'>
                <h3 className='font-extrabold text-[1.4rem]'>
                  ${dailyRate}{' '}
                  <small style={{ fontWeight: 500, color: 'var(--muted)', fontSize: '.8rem' }}>
                    per day
                  </small>
                </h3>
              </div>
              <div className='p-body p-5'>
                {step === 1 && (
                  <>
                    <div
                      style={{
                        border: '1px solid var(--line)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        marginBottom: '14px',
                      }}
                    >
                      <div className='p-3 bg-gray-50 border-b border-gray-200'>
                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-wide'>
                          Pickup Date
                        </label>
                        <input
                          type='date'
                          className='w-full bg-transparent font-medium mt-1 outline-none'
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                        />
                      </div>
                      <div className='p-3 bg-gray-50'>
                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-wide'>
                          Return Date
                        </label>
                        <input
                          type='date'
                          className='w-full bg-transparent font-medium mt-1 outline-none'
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      className='w-full bg-[#e85d04] hover:bg-[#dc2f02] text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-sm'
                      onClick={handleNext}
                    >
                      Reserve car
                    </button>

                    <button className='w-full mt-3 bg-white border border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2'>
                      <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                        <path
                          d='M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                      </svg>
                      Message the host
                    </button>

                    <div className='pay-note mt-4'>
                      <b>How payment works.</b> You pay a small hold online to confirm with the
                      host. The rest and your refundable deposit are settled with the host at
                      pickup. Free cancellation up to 48 hours before pickup.
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className='text-lg font-bold mb-4'>Your booking</div>
                    <div className='sum-line'>
                      <span>Car rental ({days} days)</span> <span>${dailyRate * days}</span>
                    </div>
                    {activeFuel && activeFuel.price > 0 && (
                      <div className='sum-line'>
                        <span>{activeFuel.name}</span> <span>${activeFuel.price}</span>
                      </div>
                    )}
                    {activeProtection && activeProtection.price > 0 && (
                      <div className='sum-line'>
                        <span>{activeProtection.name}</span>{' '}
                        <span>${activeProtection.price * days}</span>
                      </div>
                    )}
                    {extrasCost > 0 && (
                      <div className='sum-line'>
                        <span>Extras</span> <span>${extrasCost}</span>
                      </div>
                    )}

                    <div className='sum-line tot'>
                      <span>Total</span>
                      <span>
                        $
                        {dailyRate * days +
                          (activeProtection ? activeProtection.price * days : 0) +
                          (activeFuel ? activeFuel.price : 0) +
                          extrasCost}
                      </span>
                    </div>

                    <button
                      className='w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3.5 px-4 rounded-xl mt-6 transition-colors shadow-sm'
                      onClick={() => alert('Proceed to checkout')}
                    >
                      Continue to payment
                    </button>
                    <button
                      className='w-full mt-3 text-gray-500 font-bold py-3 hover:text-gray-900 transition-colors'
                      onClick={() => setStep(1)}
                    >
                      Back to car
                    </button>

                    <div className='pay-note mt-4'>
                      <b>Free cancellation</b> up to 48 hours before pickup. You pay a small hold
                      online to confirm, the rest and the deposit are settled with the host at
                      pickup.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
