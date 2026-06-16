export default function Home() {
  return (
    <>
{/* ============ HOME ============ */}
<div className="view active" id="view-home">
  <div className="hero">
    <div className="hero-bg"></div>
    <div className="hero-inner wrap">
      <div className="tagband">Suriname · for all your rental needs</div>
      <h1>Book the <em>stay</em>, the <em>plate</em>,<br/>and everything in between</h1>
      <p>One place for homes, cars, food, salons, spas, and barbers across all of Suriname. Browse the service, not the list.</p>
    </div>
  </div>

  {/* SEARCH WIDGET */}
  <div className="search-wrap wrap">
    <div className="search">
      <div className="tabs" id="searchTabs">
        <button className="tab live" data-cat="stays" ><svg viewBox="0 0 24 24" fill="none"><path d="M3 11 12 4l9 7M5 10v9h14v-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Stays</button>
        <button className="tab" data-cat="food" ><svg viewBox="0 0 24 24" fill="none"><path d="M5 3v8m0 0a2 2 0 0 0 2-2V3M9 3v18M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4m0 0v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Food</button>
        <button className="tab" data-cat="cars" ><svg viewBox="0 0 24 24" fill="none"><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14m-14 0v6h2v-2h10v2h2v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Cars</button>
        <button className="tab" data-cat="salon" ><svg viewBox="0 0 24 24" fill="none"><path d="M8 8a3 3 0 1 0-3-3m3 3 8 8m-8-8 3 3m5 5a3 3 0 1 0 3 3m-3-3-8-8m8 8-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Salon</button>
        <button className="tab" data-cat="spa" ><svg viewBox="0 0 24 24" fill="none"><path d="M12 22c4-3 7-7 7-11a7 7 0 0 0-14 0c0 4 3 8 7 11Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>Spa</button>
        <button className="tab" data-cat="barber" ><svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2"/><path d="m20 4-12 12m12 4L8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Barber</button>
      </div>
      <div className="fields">
        <div className="field" >
          <label id="loc-label">Destination</label>
          <div className="val">Paramaribo, Suriname</div>
        </div>
        <div className="field" id="ciField" >
          <label>Check in</label>
          <div className="val ph" id="ci-val">Add date</div>
          <div className="cal-pop" id="calPop" ></div>
        </div>
        <div className="field" >
          <label>Check out</label>
          <div className="val ph" id="co-val">Add date</div>
        </div>
        <div className="field go">
          <button className="btn primary" >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#fff" stroke-width="2.2"/><path d="m20 20-3.5-3.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>
            Search
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* SHOWCASE ROWS (6 per category) */}
  <section className="block wrap" >
    <div className="sec-head"><div><div className="eyebrow">Step one</div><h2>Explore by service</h2><p>Six picks from every category to get you moving. Tap any to dive in.</p></div></div>

    <div className="scrow-head"><h3>Rooms</h3><a className="link-more" >All stays →</a></div>
    <div className="scrow" id="rowBeds"></div>

    <div className="scrow-head"><h3>Dishes</h3><a className="link-more" >All food →</a></div>
    <div className="scrow" id="rowFood"></div>

    <div className="scrow-head"><h3>Cars</h3><a className="link-more" >All cars →</a></div>
    <div className="scrow" id="rowCars"></div>

    <div className="scrow-head"><h3>Salon</h3><a className="link-more" >Book a session →</a></div>
    <div className="scrow" id="rowNails"></div>

    <div className="scrow-head"><h3>Mens Cuts</h3><a className="link-more" >Book a chair →</a></div>
    <div className="scrow" id="rowBarber"></div>

    <div className="scrow-head"><h3>Spa</h3><a className="link-more" >Book a treatment →</a></div>
    <div className="scrow" id="rowSpa"></div>
  </section>
</div>


    </>
  );
}