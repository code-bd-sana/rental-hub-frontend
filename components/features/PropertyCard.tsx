import Link from 'next/link';
import Image from 'next/image';
import { Property } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';

export default function PropertyCard({ property }: { property: Property }) {
  const ok = true; // Could be based on availability logic
  return (
    <Link 
      href="#"
      className={`block bg-card rounded-[18px] overflow-hidden shadow-custom-sm transition-all duration-220 cursor-pointer border border-line hover:-translate-y-1 hover:shadow-custom group ${ok ? '' : 'opacity-[0.62] grayscale-[0.25]'}`}
    >
      <div className="relative w-full aspect-4/3 overflow-hidden">
        {ok ? (
          <span className="absolute top-3 left-3 bg-white/95 text-purple font-bold text-[0.72rem] px-2.5 py-1.25 rounded-lg z-10">Available</span>
        ) : (
          <span className="absolute top-3 left-3 font-bold text-[0.72rem] px-2.5 py-1.25 rounded-lg z-10 bg-dark/80 text-white">Not available</span>
        )}
        <Image 
          src={property.images[0]} 
          alt={property.title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {ok && (
          <span className="absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-white/90 grid place-items-center z-10">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M12 20s-7-4.5-9.5-9C1 7 3 4 6 4c2 0 3 1.3 4 3 1-1.7 2-3 4-3 3 0 5 3 3.5 7C19 15.5 12 20 12 20Z" stroke="#555" strokeWidth="1.8" />
            </svg>
          </span>
        )}
      </div>
      <div className="px-4 pt-3.75 pb-4.25">
        <div className="text-[0.78rem] text-orange font-bold uppercase tracking-wider">{property.host.name}</div>
        <div className="font-sans text-[1.12rem] mt-0.75 mb-2 text-ink">{property.title}</div>
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-ink">{formatCurrency(property.price)} <small className="font-medium text-muted text-[0.78rem]">{property.priceUnit}</small></span>
          <span className="flex items-center gap-px text-[0.84rem] font-bold">
            <svg className="w-3.25 h-3.25 text-orange" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
            <svg className="w-3.25 h-3.25 text-orange" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
            <svg className="w-3.25 h-3.25 text-orange" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
            <svg className="w-3.25 h-3.25 text-orange" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
            <svg className="w-3.25 h-3.25 text-orange" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
