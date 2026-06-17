import Link from "next/link";
import { notFound } from "next/navigation";
import { getCars } from "../../../lib/api/cars";
import { getProperties } from "../../../lib/api/properties";
import { getServices } from "../../../lib/api/services";
import CarCard from "../../../components/features/CarCard";
import PropertyCard from "../../../components/features/PropertyCard";
import ServiceCard from "../../../components/features/ServiceCard";

const CATEGORIES = [
  { id: "food", label: "Food", eyebrow: "Food", heading: "All the food we have" },
  { id: "rooms", label: "Rooms", eyebrow: "Rooms", heading: "All the rooms we have" },
  { id: "cars", label: "Cars", eyebrow: "Cars", heading: "All the cars we have" },
  { id: "salon", label: "Salon", eyebrow: "Salon", heading: "All the salon services we have" },
  { id: "barber", label: "Barber", eyebrow: "Barber", heading: "All the barber services we have" },
  { id: "spa", label: "Spa", eyebrow: "Spa", heading: "All the spa treatments we have" },
];

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.id,
  }));
}

export default async function BrowseCategoryPage({ params }: { params: { category: string } }) {
  // Await the params object to avoid Next.js warnings about async params
  const resolvedParams = await params;
  const category = CATEGORIES.find(c => c.id === resolvedParams.category);
  
  if (!category) {
    notFound();
  }

  let items: React.ReactNode[] = [];

  if (category.id === "rooms") {
    const properties = await getProperties();
    items = properties.map(p => <PropertyCard key={p.id} property={p} />);
  } else if (category.id === "cars") {
    const cars = await getCars();
    items = cars.map(c => <CarCard key={c.id} car={c} />);
  } else {
    // Food, Salon, Barber, Spa
    const allServices = await getServices();
    const services = allServices.filter(s => s.type.toLowerCase() === category.id);
    items = services.map(s => <ServiceCard key={s.id} service={s} />);
  }

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="text-[1rem] mb-4.5 flex items-center gap-1.5">
        <Link href="/" className="hover:text-purple font-bold transition-colors cursor-pointer">Home</Link>
        <span>›</span>
        <span className="text-muted">Browse</span>
      </div>
      
      <div className="flex items-end justify-between mb-6.5 gap-5 flex-wrap">
        <div>
          <div className="text-[#8b8693] font-bold text-[0.9rem] tracking-[0.14em] uppercase mb-1.5">{category.eyebrow}</div>
          <h2 className="font-sans font-bold leading-[1.12] tracking-[-0.02em] text-4xl">{category.heading}</h2>
          <p className="text-muted max-w-125 mt-4 text-xl">Pick a category, browse everything we offer, then tap an item to see the host and book or order.</p>
        </div>
      </div>

      <div className="flex gap-2.5 flex-wrap mb-6.5">
        {CATEGORIES.map(cat => {
          const isActive = cat.id === category.id;
          return (
            <Link 
              key={cat.id}
              href={`/browse/${cat.id}`}
              className={`px-5 py-2.75 rounded-full border-[1.5px] font-bold text-[0.9rem] transition-all duration-160 ${
                isActive
                  ? "bg-purple text-white! border-purple" 
                  : "bg-white text-ink border-line hover:text-purple hover:border-purple"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-17.5">
        {items}
        {items.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted border-2 border-dashed border-line rounded-2xl">
            No items available in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}