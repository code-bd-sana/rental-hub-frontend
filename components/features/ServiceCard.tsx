import Link from 'next/link';
import Image from 'next/image';
import { Service } from '../../lib/types';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.id}`} className="scard">
      <div className="ph" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
        <Image 
          src={service.image} 
          alt={service.name} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }} 
        />
      </div>
      <div className="body">
        <div className="name">{service.name}</div>
        <div className="meta">
          <span className="price">Reserve</span>
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
