export default function GuestProfile() {
  return (
    <>
{/* ============ GUEST PROFILE ============ */}
<div className="view" id="view-account">
  <div className="wrap">
    <div className="crumbs"><a >Home</a> › My profile</div>
    <div className="sec-head">
      <div><div className="eyebrow">Your profile</div><h2>Your Rentals Hub profile</h2><p>This is how hosts see you when you book a stay, order food, or reserve a service.</p></div>
    </div>
    <div className="host-card" >
      <div className="av">AR</div>
      <div >
        <div className="hc-name" >Anita Ramlal
          <span className="verified"><svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>Verified</span>
          <button className="btn dark"  ><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Video ad</button>
        </div>
        <div className="hc-meta">Paramaribo · Member since 2026 · Identity verified by Rentals Hub</div>
      </div>
    </div>
    <p >Verified guests can add a short video ad to their profile. It is a quick clip that introduces you to hosts, so they know who they are welcoming before they accept your booking. Tap Video ad to see how it works.</p>
  </div>
</div>


    </>
  );
}