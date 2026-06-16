import { getServices } from "../../lib/api/services";
import ServiceCard from "../../components/features/ServiceCard";
import Link from "next/link";

export default async function ServicesIndex() {
  const services = await getServices();

  return (
    <div className="view active" id="view-services">
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> › Services</div>
        <div className="sec-head">
          <div>
            <div className="eyebrow">Services</div>
            <h2>Self care & Local Flavors</h2>
            <p>Book your next appointment at the salon, spa, or barber. Or discover the best local food and drinks Suriname has to offer.</p>
          </div>
        </div>
        <div className="cards" id="servicesList">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
