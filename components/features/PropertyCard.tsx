import Link from 'next/link';
import { Property } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';

export default function PropertyCard({ property }: { property: Property }) {
  const ok = true; // Could be based on availability logic
  return (
    <Link href={`/stays/${property.id}`} className={`card ${ok ? '' : 'na'}`}>
      <div className="ph">
        {ok ? (
          <span className="tag">Available</span>
        ) : (
          <span className="tag na-tag">Not available</span>
        )}
        <img src={property.images[0]} alt={property.title} />
        <span className="heart">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M12 20s-7-4.5-9.5-9C1 7 3 4 6 4c2 0 3 1.3 4 3 1-1.7 2-3 4-3 3 0 5 3 3.5 7C19 15.5 12 20 12 20Z" stroke="#555" strokeWidth="1.8" />
          </svg>
        </span>
      </div>
      <div className="body">
        <div className="host">{property.host.name}</div>
        <div className="name">{property.title}</div>
        <div className="meta">
          <span className="price">{formatCurrency(property.price)} <small>{property.priceUnit}</small></span>
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
