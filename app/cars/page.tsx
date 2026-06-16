import { getCars } from "../../lib/api/cars";
import CarCard from "../../components/features/CarCard";
import Link from "next/link";

export default async function CarsCatalog() {
  const cars = await getCars();

  return (
    <div className="view active" id="view-cars">
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> › Cars</div>
        <div className="sec-head">
          <div>
            <div className="eyebrow">Cars</div>
            <h2>Vehicles for any journey</h2>
            <p>From compact city cars to rugged 4x4s for the interior. All vehicles are from verified rental partners.</p>
          </div>
        </div>
        <div className="cards" id="carsList">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
