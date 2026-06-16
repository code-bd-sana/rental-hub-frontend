export default function CarsCheckout() {
  return (
    <>
{/* ============ CAR EXTRAS AND PROTECTION (Step 2) ============ */}
<div className="view" id="view-car-extras">
  <div className="wrap">
    <div className="crumbs"><a >Home</a> › <a >Cars</a> › <a ><span id="carExCrumb"></span></a> › Extras and protection</div>
    <div className="stepper">
      <div className="st done"><span className="num">✓</span> Your car</div><div className="sep"></div>
      <div className="st on"><span className="num">2</span> Extras and protection</div><div className="sep"></div>
      <div className="st"><span className="num">3</span> Confirm and pay</div>
    </div>
    <div className="split" >
      <div>
        <div className="date-pill">
          <div><b id="carExCar"></b><span > · pickup and return</span><br/><span id="carExDates" ></span></div>
          <a >Edit</a>
        </div>

        <div className="cd-sec" >
          <h3>Pickup and return</h3>
          <p >Choose where you collect and return the car.</p>
          <label className="loc-lbl">Pickup location</label>
          <select id="pickupSel" className="loc-sel" ></select>
          <div id="pickupNote" className="loc-note"></div>
          <label className="loc-lbl" >Return location</label>
          <select id="returnSel" className="loc-sel" ></select>
          <div id="returnNote" className="loc-note"></div>
        </div>

        <div className="cd-sec">
          <h3>Fuel</h3>
          <p >Choose how you would like to handle fuel.</p>
          <div className="ins-grid" id="fuelGrid"></div>
        </div>

        <div className="cd-sec">
          <h3>Choose your protection</h3>
          <p >Pick the cover that suits your trip. Higher cover means a smaller deposit hold and less to worry about on the road.</p>
          <div className="ins-grid" id="insGrid"></div>
        </div>

        <div className="cd-sec">
          <h3>Add extras</h3>
          <p >Optional add ons for a smoother trip. Tap to add or remove.</p>
          <div id="xtraList"></div>
        </div>
      </div>

      <div className="aside">
        <div className="panel">
          <div className="p-head"><h3>Your booking</h3></div>
          <div className="p-body">
            <div id="carExSummary"></div>
            <button className="btn primary lg"  >Continue to payment</button>
            <button className="btn ghost"  >Back to car</button>
            <div className="pay-note"><b>Free cancellation</b> up to 48 hours before pickup. You pay a small hold online to confirm, the rest and the deposit are settled with the host at pickup.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}