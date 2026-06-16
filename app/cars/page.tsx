export default function CarsCatalog() {
  return (
    <>
{/* ============ CARS ============ */}
<div className="view" id="view-cars">
  <div className="wrap">
    <div className="crumbs"><a >Home</a> › Cars</div>
    <div className="sec-head">
      <div><div className="eyebrow">Car rental</div><h2>Browse cars by category</h2><p>Self drive rentals for every trip across Suriname, from quick runs around the city to long drives into the interior. Pick a category, then choose the days you need it.</p></div>
    </div>
    <div className="concept-note">
      <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 8v5m0 3h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <div><b>Please read.</b> The cars shown here are categories, not a promise of one exact vehicle. Each photo is an example only. The owner may provide a similar car in the same category, year, and condition. Pick your dates, then tap a car to see the actual vehicle on the owner profile.</div>
    </div>
    <div className="cars-search">
      <div className="cs-head"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>When do you need the car?</div>
      <div className="cs-sub">Choose your pickup and return dates. We will show only the cars available for those days.</div>
      <div className="cs-field">
        <div className="field" ><label>Pickup and return</label><div className="val ph" id="carsearch-dates">Select your dates</div></div>
        <div className="cs-cals" >
          <div className="cs-cal"><div className="cal-lbl">Pickup date</div><div className="cal-inline" id="carPickCalS"></div></div>
          <div className="cs-cal"><div className="cal-lbl">Return date</div><div className="cal-inline" id="carRetCalS"></div></div>
        </div>
      </div>
    </div>
    <div className="avail-note off" id="carsAvailNote"></div>
    <div className="cards" id="carsList" ></div>
  </div>
</div>


    </>
  );
}