import Link from 'next/link';
import Image from 'next/image';
import { Car } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link 
      href={`/browse/cars/${car.id}`} 
      className="block bg-white border border-line rounded-2xl overflow-hidden shadow-custom-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-custom"
    >
      <div className="relative w-full aspect-4/3 overflow-hidden bg-[#0c0a11]">
        <Image 
          src={car.images[0]} 
          alt={car.model} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover" 
        />
      </div>
      <div className="px-3.5 pt-3 pb-3.5">
        <div className="font-sans text-[1.02rem] mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis text-ink">{car.model}</div>
        <div className="flex justify-between items-center">
          <span className="font-extrabold text-[0.95rem] text-ink">{formatCurrency(car.pricePerDay)} <small className="font-medium text-muted text-[0.74rem]">day</small></span>
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
