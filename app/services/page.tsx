export default function ServicesIndex() {
  return (
    <>
{/* ============ SERVICES (SALON/SPA/BARBER/RESTAURANT) ============ */}
{/* ============ SERVICES INDEX (types only) ============ */}
<div className="view" id="view-services">
  <div className="wrap">
    <div className="crumbs"><a >Home</a> › <span id="svcTypeCrumb">Book a service</span></div>
    <div className="sec-head">
      <div><div className="eyebrow">Reserve and confirm</div><h2 id="svcTitle">Book a service</h2><p id="svcDesc">Pick a service, choose a time, and confirm your booking with the host.</p></div>
    </div>
    <div className="split" >
      <div>
        <img id="svcHero" className="svc-hero" alt=""/>
        <h3  id="svcProvider"></h3>
        <div className="svc-gallery" id="svcGallery"></div>
        <div className="svc-list" id="svcList"></div>
        <h3 >Pick a time</h3>
        <p  id="svcDay"></p>
        <div className="slots" id="svcSlots"></div>
      </div>
      <div className="aside">
        <div className="panel">
          <div className="p-head"><h3>Your reservation</h3></div>
          <div className="p-body">
            <div id="svcSummary" >Select a service and a time to continue.</div>
            <button className="btn primary lg"  >Confirm with payment</button>
            <button className="btn ghost"  ><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" stroke="currentColor" stroke-width="2"/></svg>Request to chat</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}