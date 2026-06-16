export default function CarsDetail() {
  return (
    <>
{/* ============ CAR DETAIL ============ */}
<div className="view" id="view-car">
  <div className="wrap">
    <div className="crumbs"><a >Home</a> › <a >Cars</a> › <span id="carCrumb"></span></div>
    <div className="stepper">
      <div className="st on"><span className="num">1</span> Your car</div><div className="sep"></div>
      <div className="st"><span className="num">2</span> Extras and protection</div><div className="sep"></div>
      <div className="st"><span className="num">3</span> Confirm and pay</div>
    </div>
    <div className="split" >
      <div>
        <div className="car-photo big" >
          <span className="example-tag"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 8v5m0 3h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Example photo</span>
          <img id="carBigImg" alt=""/>
        </div>
        <h1 id="carTitle" ></h1>
        <div id="carOrSimilar" ></div>
        <div className="car-specs" id="carSpecs" ></div>

        <div className="cd-banner">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 8v5m0 3h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <div><b>This is a category, not one exact car.</b> The photo is an example. Your host will provide this car or a similar vehicle in the same category, with similar year, size, and condition. The host confirms the exact car with you before pickup.</div>
        </div>

        <div className="cd-sec" >
          <h3>What this car offers</h3>
          <div className="spec-grid" id="carSpecGrid"></div>
        </div>

        <div className="cd-sec">
          <h3>Your owner</h3>
          <div className="host-card" id="carHostCard"></div>
        </div>

        <div className="cd-sec">
          <h3>What is included</h3>
          <div className="inc-list" id="carIncluded"></div>
        </div>

        <div className="cd-sec">
          <h3>Pickup and drop off</h3>
          <div className="timeline" id="carTimeline">
            <div className="tl"><div className="dot"></div><div><b>Pickup</b><div className="when" id="cdPickWhen">Select your dates</div><div className="where">Host location or Johan Adolf Pengel International Airport, by arrangement</div></div></div>
            <div className="tl"><div className="dot"></div><div><b>Drop off</b><div className="when" id="cdDropWhen">Select your dates</div><div className="where">Same location as pickup, unless agreed otherwise with the host</div></div></div>
          </div>
        </div>

        <div className="cd-sec">
          <h3>Bring this to your pickup</h3>
          <div className="checklist">
            <div className="ck"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 9h4M7 13h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>A valid driver licence</div>
            <div className="ck"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="2"/><path d="M8 17c.7-2 7.3-2 8 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>A valid ID card or passport</div>
            <div className="ck"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 10h18" stroke="currentColor" stroke-width="2"/></svg>Your refundable deposit, paid to the host</div>
            <div className="ck"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Minimum driver age 21, licence held at least 2 years</div>
          </div>
          <p className="terms-note">This is not the full list. Check the host rental terms for everything you need. The host holds the car for your chosen pickup time and may release it if you arrive late without notice.</p>
        </div>
      </div>

      <div className="aside">
        <div className="panel">
          <div className="p-head"><h3><span id="carPrice"></span> <small >per day</small></h3></div>
          <div className="p-body">
            <div >
              <div className="field" ><label>Pickup and return</label><div className="val ph" id="car-dates">Select your dates</div></div>
              <div className="cs-cals" >
                <div className="cs-cal"><div className="cal-lbl">Pickup date</div><div className="cal-inline" id="carPickCalC"></div></div>
                <div className="cs-cal"><div className="cal-lbl">Return date</div><div className="cal-inline" id="carRetCalC"></div></div>
              </div>
            </div>
            <div id="carBreakdown" ></div>
            <button className="btn primary lg"  >Reserve car</button>
            <button className="btn ghost"  ><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" stroke="currentColor" stroke-width="2"/></svg>Message the host</button>
            <div className="pay-note"><b>How payment works.</b> You pay a small hold online to confirm with the host. The rest and your refundable deposit are settled with the host at pickup. Free cancellation up to 48 hours before pickup.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}