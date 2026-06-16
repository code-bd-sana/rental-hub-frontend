export default function StaysDetail() {
  return (
    <>
{/* ============ PROPERTY DETAIL ============ */}
<div className="view" id="view-property">
  <div className="wrap">
    <div className="crumbs"><a >Home</a> › <a >Stays</a> › <span id="propCrumb"></span></div>
    <h1 id="propTitle" ></h1>
    <div className="row" >
      <span className="stars"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg> 4.9</span>
      <span>Paramaribo, Suriname</span>
    </div>
    <div className="gallery" id="propGallery"></div>
    <div className="split" >
      <div>
        <h3 >About this stay</h3>
        <p >A bright, modern space with full amenities, set in a well kept resort with pool access and on site dining. Perfect for both short city trips and longer stays.</p>
        <div className="amenities">
          <span className="amen"><svg viewBox="0 0 24 24" fill="none"><path d="M2 12h20M5 12V7h14v5M7 18v-6m10 6v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>King bed</span>
          <span className="amen"><svg viewBox="0 0 24 24" fill="none"><path d="M4 14h16v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-3ZM7 14V6a2 2 0 0 1 2-2h0" stroke="currentColor" stroke-width="2"/></svg>Pool access</span>
          <span className="amen"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9 16l10-9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Free wifi</span>
          <span className="amen"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9 16l10-9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Air conditioning</span>
          <span className="amen"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9 16l10-9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>On site restaurant</span>
        </div>
      </div>
      <div className="aside">
        <div className="panel">
          <div className="p-head"><h3><span id="propPrice"></span> <small >per night</small></h3></div>
          <div className="p-body">
            <div >
              <div className="field"  ><label>Check in and check out</label><div className="val ph" id="prop-dates">Select your dates</div></div>
              <div className="cal-pop" id="propCal"  ></div>
            </div>
            <button className="btn primary lg"  >Reserve</button>
            <button className="btn ghost"  ><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" stroke="currentColor" stroke-width="2"/></svg>Request to chat</button>
            <p >You will not be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}