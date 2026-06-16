import { getServiceById } from "../../../lib/api/services";
import { formatCurrency } from "../../../lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function FoodHost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="view active" id="view-host">
      <div className="detail-hero">
        <img src={service.image} alt={service.name} />
        <div className="info">
          <div className="wrap">
            <h1>{service.name}</h1>
            <div className="row">
              <span className="stars">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg>
                {service.rating}
              </span>
              <span>{service.reviewsCount} reviews · {service.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="crumbs">
          <Link href="/">Home</Link> › <Link href="/services">Services</Link> › <span>{service.name}</span>
        </div>
        <div className="split">
          <div>
            <h3>Menu</h3>
            <div className="menu-grid">
              <p className="text-muted">Menu items for this provider will appear here.</p>
            </div>
          </div>
          <div className="aside">
            <div className="panel">
              <div className="p-head">
                <h3>Your food cart</h3>
                <span className="stars">0 items</span>
              </div>
              <div className="p-body">
                <div className="cart-empty">Tap any dish to drop it in your cart.</div>
                <div className="cart-total"><span>Total</span><span>{formatCurrency(0)}</span></div>
                <button className="btn primary lg" style={{ width: '100%' }} disabled>Place order</button>
              </div>
            </div>
            <div className="panel">
              <div className="p-head"><h3>Talk to the kitchen</h3></div>
              <div className="p-body">
                <p>Have a question about an item or a custom order? Reach the host directly.</p>
                <div className="chat-mini">
                  <button className="btn dark" style={{ width: '100%' }}>
                    <svg viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/></svg>
                    Request to chat
                  </button>
                  <button className="btn ghost" style={{ width: '100%', marginTop: '10px' }}>Book a table</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
