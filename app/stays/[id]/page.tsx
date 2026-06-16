import { getPropertyById } from "../../../lib/api/properties";
import { formatCurrency } from "../../../lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function StaysDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="view active" id="view-property">
      <div className="wrap">
        <div className="crumbs">
          <Link href="/">Home</Link> › <Link href="/stays">Stays</Link> › <span>{property.title}</span>
        </div>
        <h1>{property.title}</h1>
        <div className="row">
          <span className="stars">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
            {property.rating}
          </span>
          <span>{property.location}</span>
        </div>
        
        <div className="gallery" id="propGallery">
          {property.images.map((img, idx) => (
            <img key={idx} src={img} alt={`${property.title} ${idx + 1}`} className={idx === 0 ? "main" : ""} />
          ))}
        </div>

        <div className="split">
          <div>
            <h3>About this stay</h3>
            <p>A bright, modern space with full amenities, set in a well kept resort with pool access and on site dining. Perfect for both short city trips and longer stays.</p>
            <div className="amenities">
              {property.amenities.map((amen, idx) => (
                <span key={idx} className="amen">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9 16l10-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {amen}
                </span>
              ))}
            </div>
          </div>
          <div className="aside">
            <div className="panel">
              <div className="p-head">
                <h3>{formatCurrency(property.price)} <small>per {property.priceUnit}</small></h3>
              </div>
              <div className="p-body">
                <div>
                  <div className="field">
                    <label>Check in and check out</label>
                    <div className="val ph">Select your dates</div>
                  </div>
                </div>
                <button className="btn primary lg" style={{ width: '100%' }}>Reserve</button>
                <button className="btn ghost" style={{ width: '100%', marginTop: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" stroke="currentColor" strokeWidth="2"/></svg>
                  Request to chat
                </button>
                <p className="text-center text-muted mt-4">You will not be charged yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
