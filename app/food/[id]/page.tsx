export default function FoodHost() {
  return (
    <>
{/* ============ HOST (FOOD SUPPLIER) ============ */}
<div className="view" id="view-host">
  <div className="detail-hero">
    <img id="hostHero" src="" alt=""/>
    <div className="info"><div className="wrap">
      <h1 id="hostName"></h1>
      <div className="row">
        <span className="stars"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg> <span id="hostRating"></span></span>
        <span id="hostMeta"></span>
      </div>
    </div></div>
  </div>
  <div className="wrap">
    <div className="crumbs"><a >Home</a> › <a >Food</a> › <span id="hostCrumb"></span></div>
    <div className="split">
      <div>
        <h3 >Menu</h3>
        <div className="menu-grid" id="hostMenu"></div>
      </div>
      <div className="aside">
        {/* CART */}
        <div className="panel">
          <div className="p-head">
            <h3>Your food cart</h3>
            <span className="stars"  id="cartCount">0 items</span>
          </div>
          <div className="p-body">
            <div id="cartLines"><div className="cart-empty">Tap any dish to drop it in your cart.</div></div>
            <div className="cart-total" id="cartTotalRow" ><span>Total</span><span id="cartTotal">USD 0</span></div>
            <button className="btn primary lg"  id="checkoutBtn"  disabled>Place order</button>
          </div>
        </div>
        {/* BOOKING + CHAT */}
        <div className="panel">
          <div className="p-head"><h3>Talk to the kitchen</h3></div>
          <div className="p-body">
            <p >Have a question about an item or a custom order? Reach the host directly.</p>
            <div className="chat-mini">
              <button className="btn dark" ><svg viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>Request to chat</button>
              <button className="btn ghost" >Book a table</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}