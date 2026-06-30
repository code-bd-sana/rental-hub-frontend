'use client';

import Link from 'next/link';

export function GuestOverview() {
  return (
    <div className='animate-in fade-in duration-300'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Welcome back, Guest
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        Here is an overview of your account and recent activities.
      </p>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-2'>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>1</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Upcoming Trip
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>4</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Past Bookings
          </div>
        </div>
        <div className='bg-white border border-[#e7e1d6] rounded-2xl p-4 shadow-custom-sm'>
          <div className='text-[28px] font-extrabold text-[#172554]'>Active</div>
          <div className='text-[12px] text-[#6b7b79] mt-1 uppercase tracking-[0.5px]'>
            Subscription
          </div>
        </div>
      </div>

      <div className='bg-[#172554] text-white rounded-[18px] p-6 mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-custom-sm'>
        <div>
          <h3
            className='text-[20px] mb-1.5'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Ready for your next adventure?
          </h3>
          <p className='opacity-90 text-[14px] max-w-107.5'>
            Explore new countries, find the best stays, cars, and services all in one place.
          </p>
        </div>
        <div className='text-left md:text-right w-full md:w-auto shrink-0'>
          <Link
            href='/directory'
            className='inline-block w-full sm:w-auto bg-[#2563eb] text-white text-center rounded-[30px] py-3 px-6 font-bold text-[15px] hover:bg-[#1e40af] transition-colors shadow-sm'
          >
            Browse Directory
          </Link>
        </div>
      </div>
    </div>
  );
}

export function GuestBookingHistory() {
  const demoBookings = [
    {
      id: 'BKG-9382',
      item: 'Blue Mountain Villa',
      location: 'Jamaica',
      type: 'Stay',
      dates: 'Oct 12 - Oct 18, 2026',
      status: 'Upcoming',
      amount: '$1,250',
    },
    {
      id: 'BKG-7741',
      item: 'Kingston Car Hire',
      location: 'Jamaica',
      type: 'Car rental',
      dates: 'Oct 12 - Oct 18, 2026',
      status: 'Upcoming',
      amount: '$350',
    },
    {
      id: 'BKG-4492',
      item: 'Ocean Drive Day Spa',
      location: 'United States',
      type: 'Spa',
      dates: 'Sep 05, 2026',
      status: 'Completed',
      amount: '$120',
    },
    {
      id: 'BKG-1029',
      item: 'Maracas Bay Lodge',
      location: 'Trinidad and Tobago',
      type: 'Stay',
      dates: 'Aug 14 - Aug 20, 2026',
      status: 'Completed',
      amount: '$890',
    },
  ];

  return (
    <div className='animate-in fade-in duration-300'>
      <h2
        className='text-[26px] font-bold mb-1 text-[#172554]'
        style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
      >
        Booking History
      </h2>
      <p className='text-[14px] text-[#6b7b79] mb-4.5'>
        View and manage your past and upcoming reservations.
      </p>

      <div className='bg-white border border-[#e7e1d6] rounded-2xl shadow-[0_10px_30px_rgba(11,79,74,0.1)] overflow-hidden mt-4'>
        <div className='flex justify-between items-center px-4 py-3.5 border-b border-[#e7e1d6]'>
          <h3
            className='text-[18px] text-[#15201f] font-bold'
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            All Bookings
          </h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-[14px] whitespace-nowrap'>
            <thead>
              <tr>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Reference
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Item
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Dates
                </th>
                <th className='text-left text-[#6b7b79] text-[11px] uppercase tracking-[0.5px] p-[10px_16px] border-b border-[#e7e1d6]'>
                  Amount
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
              {demoBookings.map((bkg) => (
                <tr key={bkg.id} className='hover:bg-[#f8fafc] transition-colors'>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6] font-semibold text-[#172554]'>
                    {bkg.id}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='text-[#15201f] font-medium'>{bkg.item}</div>
                    <div className='text-[12px] text-[#6b7b79]'>
                      {bkg.type} · {bkg.location}
                    </div>
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#6b7b79]'>
                    {bkg.dates}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6] text-[#15201f] font-medium'>
                    {bkg.amount}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    {bkg.status === 'Upcoming' ? (
                      <span className='bg-[#e6eefb] text-[#2a5db0] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Upcoming
                      </span>
                    ) : (
                      <span className='bg-[#dff3ec] text-[#1e9e72] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
                        Completed
                      </span>
                    )}
                  </td>
                  <td className='p-[12px_16px] border-b border-[#e7e1d6]'>
                    <div className='flex items-center justify-center gap-3'>
                      <button
                        className='text-[#6b7b79] hover:text-[#2563eb] transition-colors'
                        title='View'
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
                        className='text-[#6b7b79] hover:text-[#1e9e72] transition-colors'
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
                        className='text-[#6b7b79] hover:text-[#dc2626] transition-colors'
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
