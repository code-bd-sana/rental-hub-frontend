import { getProperties } from "../lib/api/properties";
import { getCars } from "../lib/api/cars";
import { getServices } from "../lib/api/services";
import PropertyCard from "../components/features/PropertyCard";
import CarCard from "../components/features/CarCard";
import ServiceCard from "../components/features/ServiceCard";
import SearchWidget from "../components/features/SearchWidget";
import Link from "next/link";

export default async function Home() {
  const properties = (await getProperties()).slice(0, 6);
  const cars = (await getCars()).slice(0, 6);
  const services = (await getServices()).slice(0, 6);

  return (
    <>
      {/* ============ HOME ============ */}
      <div className="view active" id="view-home">
        <div className="hero">
          <div className="hero-bg"></div>
          <div className="hero-inner wrap">
            <div className="tagband">Suriname · for all your rental needs</div>
            <h1>
              Book the <em>stay</em>, the <em>plate</em>,<br />
              and everything in between
            </h1>
            <p>
              One place for homes, cars, food, salons, spas, and barbers across
              all of Suriname. Browse the service, not the list.
            </p>
          </div>
        </div>

        {/* SEARCH WIDGET */}
        <SearchWidget />

        {/* SHOWCASE ROWS (6 per category) */}
        <section className="block wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Step one</div>
              <h2>Explore by service</h2>
              <p>
                Six picks from every category to get you moving. Tap any to dive
                in.
              </p>
            </div>
          </div>

          <div className="scrow-head">
            <h3>Rooms</h3>
            <Link href="/stays" className="link-more">
              All stays →
            </Link>
          </div>
          <div className="scrow" id="rowBeds">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          <div className="scrow-head">
            <h3>Cars</h3>
            <Link href="/cars" className="link-more">
              All cars →
            </Link>
          </div>
          <div className="scrow" id="rowCars">
            {cars.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>

          <div className="scrow-head">
            <h3>Services</h3>
            <Link href="/services" className="link-more">
              All services →
            </Link>
          </div>
          <div className="scrow" id="rowServices">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
