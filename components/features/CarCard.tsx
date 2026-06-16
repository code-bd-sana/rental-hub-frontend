import Link from 'next/link';
import { Car } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/cars/${car.id}`} className="scard">
      <div className="ph car-photo" style={{ aspectRatio: '4/3' }}>
        <img src={car.images[0]} alt={car.model} />
      </div>
      <div className="body">
        <div className="name">{car.model}</div>
        <div className="meta">
          <span className="price">{formatCurrency(car.pricePerDay)} <small>day</small></span>
          <span className="stars s5">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
