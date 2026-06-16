import { getProperties } from "../../lib/api/properties";
import PropertyCard from "../../components/features/PropertyCard";
import Link from "next/link";

export default async function StaysCatalog() {
  const properties = await getProperties();

  return (
    <div className="view active" id="view-stays">
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> › Beds</div>
        <div className="sec-head">
          <div>
            <div className="eyebrow">Stays</div>
            <h2>Find the perfect place to rest</h2>
            <p>Browse the room styles on offer, see what is available right now, and reserve the dates that suit you in just a few taps.</p>
          </div>
        </div>
        <div className="cards" id="staysList">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
