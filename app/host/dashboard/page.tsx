export default function HostDashboard() {
  return (
    <>
      {/* ============ HOST BACK OFFICE ============ */}
      <div className="view" id="view-hostadmin">
        <div className="wrap">
          <div className="crumbs">
            <a>Home</a> &rsaquo; Host back office
          </div>
          <div className="ha-head">
            <div className="eyebrow">Host back office</div>
            <h2>Manage your listings</h2>
            <p>
              Calendar sync, booking holds, accepted banks, and guest payments
              in one place. Built for property and car rental hosts.
            </p>
          </div>
          <div id="hostAdminBody"></div>
        </div>
      </div>
    </>
  );
}
