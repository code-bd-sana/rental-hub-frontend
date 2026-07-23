import Image from 'next/image';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export interface GlobalCardProps {
  title: string;
  category: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  hours?: string;
  phone?: string;
  locked?: boolean;
  seed?: string;
  status?: string; // 'UNCLAIMED' or 'CLAIMED'
}

export default function GlobalCard({
  title,
  category,
  imageUrl,
  icon,
  hours,
  phone,
  locked,
  seed,
  status
}: GlobalCardProps) {
  return (
    <div className='bg-white border border-[#e7e1d6] rounded-[18px] overflow-hidden shadow-[0_10px_30px_rgba(11,79,74,0.1)] relative'>
      <div className='aspect-4/3 bg-linear-to-br from-[#dbeafe] to-[#bfdbfe] relative'>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
            className='object-cover'
          />
        ) : (
          <div className='absolute inset-0 flex items-center justify-center text-[38px] opacity-50'>
            {icon || '🏠'}
          </div>
        )}
        {locked && (
          <div className='absolute top-2.5 right-2.5 bg-[rgba(21,32,31,0.78)] text-white text-[11px] px-2.5 py-1.5 rounded-[20px] flex items-center gap-1 z-10'>
            <Lock size={14} className='mr-1.5' strokeWidth={2.5} /> Locked
          </div>
        )}
        
        {/* Overlay Action Button on the Image */}
        {!locked && status === 'UNCLAIMED' && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity z-20'>
            <Link
              href={`/claim/${seed}`}
              className='bg-[#facc15] text-[#15201f] text-[15px] font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform'
            >
              Claim
            </Link>
          </div>
        )}
        {!locked && status === 'CLAIMED' && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity z-20'>
            <Link
              href={`/booking?id=${seed}`}
              className='bg-[#1e9e72] text-white text-[15px] font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform'
            >
              Book
            </Link>
          </div>
        )}
      </div>
      <div className='p-[13px_14px]'>
        <span className='inline-block bg-[#dbeafe] text-[#1e40af] text-[11px] font-bold px-2.25 py-0.75 rounded-[20px] uppercase tracking-[0.5px]'>
          {category}
        </span>
        <h3 className='text-[16px] font-bold text-[#15201f] mt-2 mb-1'>
          {locked ? (
            <span className='blur-[5px] select-none text-[#6b7b79] opacity-70'>
              Hidden host name
            </span>
          ) : (
            <span className='line-clamp-1'>{title}</span>
          )}
        </h3>
        {locked ? (
          <div className='text-[13px] text-[#6b7b79] blur-[5px] select-none opacity-70'>
            Hours hidden, contact hidden
          </div>
        ) : (
          <div className='text-[13px] text-[#6b7b79] line-clamp-2'>
            {hours || 'Hours not provided'}
            {phone && (
              <>
                <br />
                {phone}
              </>
            )}
          </div>
        )}

        <div className='flex gap-2 mt-2.75'>
          {locked ? (
            <Link
              href='/login'
              className='flex-1 text-center rounded-xl p-2.25 font-semibold text-[13px] bg-[#1e40af] text-white! hover:bg-[#172554] transition-colors'
            >
              Unlock to book
            </Link>
          ) : (
            <>
              <Link
                href={seed ? `/directory/${seed}` : '#'}
                prefetch={false}
                className='flex-1 text-center rounded-xl p-2.25 font-semibold text-[13px] bg-[#1e40af] text-white! hover:bg-[#172554] transition-colors block'
              >
                View page
              </Link>
              <Link
                href={seed ? `/booking?id=${seed}` : '#'}
                prefetch={false}
                className='flex-1 text-center rounded-xl p-2.25 font-semibold text-[13px] bg-white border border-[#e7e1d6] text-[#172554] hover:bg-[#f8fafc] transition-colors block'
              >
                Book
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
