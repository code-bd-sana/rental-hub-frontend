import { getCarById } from "../../../lib/api/cars";
import { formatCurrency } from "../../../lib/utils";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CarsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <div className="view active" id="view-car">
      <div className="wrap">
        <div className="crumbs">
          <Link href="/">Home</Link> › <Link href="/cars">Cars</Link> › <span>{car.model}</span>
        </div>
        <div className="stepper">
          <div className="st on"><span className="num">1</span> Your car</div><div className="sep"></div>
          <div className="st"><span className="num">2</span> Extras and protection</div><div className="sep"></div>
          <div className="st"><span className="num">3</span> Confirm and pay</div>
        </div>
        <div className="split">
          <div>
            <div className="car-photo big" style={{ position: 'relative', width: '100%', minHeight: '300px' }}>
              <span className="example-tag"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /><path d="M12 8v5m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>Example photo</span>
              <Image src={car.images[0]} alt={car.model} fill style={{ objectFit: 'contain' }} />
            </div>
            <h1>{car.brand} {car.model}</h1>
            <div className="text-muted mb-4">{car.model} <span style={{ fontWeight: 500 }}>or similar</span></div>
            
            <div className="car-specs">
              <span className="spec"><svg viewBox="0 0 24 24" fill="none" width="16" height="16"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>{car.specs.transmission}</span>
              <span className="spec"><svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M7 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="2"/><path d="M17 17H7m10 0h2.5a.5.5 0 0 0 .5-.5V11a2 2 0 0 0-2-2h-3M7 17H4.5a.5.5 0 0 1-.5-.5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="2"/></svg>{car.specs.seats} seats</span>
              <span className="spec"><svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M3 22h18M5 19V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14M9 3v16M15 3v16" stroke="currentColor" strokeWidth="2"/></svg>{car.specs.fuel}</span>
            </div>

            <div className="cd-banner">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /><path d="M12 8v5m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              <div><b>This is a category, not one exact car.</b> The photo is an example. Your host will provide this car or a similar vehicle in the same category, with similar year, size, and condition. The host confirms the exact car with you before pickup.</div>
            </div>

            <div className="cd-sec">
              <h3>What this car offers</h3>
              <div className="spec-grid">
                <div className="sk">
                  <div className="lbl">Brand</div>
                  <div className="val">{car.brand}</div>
                </div>
                <div className="sk">
                  <div className="lbl">Model</div>
                  <div className="val">{car.model}</div>
                </div>
                <div className="sk">
                  <div className="lbl">Transmission</div>
                  <div className="val">{car.specs.transmission}</div>
                </div>
                <div className="sk">
                  <div className="lbl">Fuel policy</div>
                  <div className="val">Full to Full</div>
                </div>
              </div>
            </div>

            <div className="cd-sec">
              <h3>Your owner</h3>
              <div className="host-card">
                <div className="av">{car.host.name.substring(0, 2).toUpperCase()}</div>
                <div className="info">
                  <b>{car.host.name}</b>
                  <div className="meta">
                    <span className="stars"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg> 4.8</span>
                    <span>63 reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="aside">
            <div className="panel">
              <div className="p-head">
                <h3>{formatCurrency(car.pricePerDay)} <small>per day</small></h3>
              </div>
              <div className="p-body">
                <div>
                  <div className="field">
                    <label>Pickup and return</label>
                    <div className="val ph">Select your dates</div>
                  </div>
                </div>
                <button className="btn primary lg" style={{ width: '100%' }}>Reserve car</button>
                <button className="btn ghost" style={{ width: '100%', marginTop: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" stroke="currentColor" strokeWidth="2"/></svg>
                  Message the host
                </button>
                <div className="pay-note mt-6">
                  <b>How payment works.</b> You pay a small hold online to confirm with the host. The rest and your refundable deposit are settled with the host at pickup. Free cancellation up to 48 hours before pickup.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
