import { getProperties } from "../lib/api/properties";
import { getCars } from "../lib/api/cars";
import { getServices } from "../lib/api/services";
import PropertyCard from "../components/features/PropertyCard";
import CarCard from "../components/features/CarCard";
import ServiceCard from "../components/features/ServiceCard";
import SearchWidget from "../components/features/SearchWidget";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const properties = (await getProperties()).slice(0, 6);
  const cars = (await getCars()).slice(0, 6);
  const services = (await getServices()).slice(0, 6);

  return (
    <>
      <div className="block animate-[fade_0.4s_ease]" id="view-home">
        <div className="relative overflow-hidden bg-(--dark)">
          <div className="absolute inset-0 opacity-32">
            <Image
              src="/images/extracted_1.jpeg"
              alt="Hero Background"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-[rgba(26,10,46,0.6)] to-[rgba(26,10,46,0.92)]"></div>
          <div className="relative pt-19.5 pb-32.5 text-center text-white max-w-300 mx-auto px-6">
            <div className="inline-flex gap-2 items-center mb-5.5 px-4 py-1.75 border border-[rgba(255,255,255,0.2)] rounded-full text-[0.8rem] tracking-[0.12em] uppercase">
              Suriname · for all your rental needs
            </div>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
              Book the <em className="not-italic text-white">stay</em>, the{" "}
              <em className="not-italic text-white">plate</em>,<br />
              and everything in between
            </h1>
            <p className="max-w-140 mt-4.5 mx-auto text-[#d9cdeb] text-[1.1rem]">
              One place for homes, cars, food, salons, spas, and barbers across
              all of Suriname. Browse the service, not the list.
            </p>
          </div>
        </div>

        {/* SEARCH WIDGET */}
        <SearchWidget />

        {/* SHOWCASE ROWS (6 per category) */}
        <section className="py-16 max-w-300 mx-auto px-6">
          <div className="flex items-end justify-between mb-6.5 gap-5 flex-wrap">
            <div>
              <div className="text-[#8b8693] font-bold text-[0.8rem] tracking-[0.14em] uppercase mb-1.5">
                Step one
              </div>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.12] tracking-[-0.02em]">
                Explore by service
              </h2>
              <p className="text-(--muted) max-w-105 mt-2">
                Six picks from every category to get you moving. Tap any to dive
                in.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-7.5 mb-2">
            <h3 className="text-[1.45rem] font-bold leading-[1.12] tracking-[-0.02em]">
              Rooms
            </h3>
            <Link
              href="/stays"
              className="text-(--purple) font-bold text-[0.92rem] inline-flex gap-1.5 items-center hover:underline"
            >
              All stays →
            </Link>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-3.5 pt-1 px-0.5 snap-x snap-mandatory [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#f1eaf9] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6c6ee] [&::-webkit-scrollbar-thumb]:rounded-full"
            id="rowBeds"
          >
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          <div className="flex items-center justify-between mt-7.5 mb-2">
            <h3 className="text-[1.45rem] font-bold leading-[1.12] tracking-[-0.02em]">
              Cars
            </h3>
            <Link
              href="/cars"
              className="text-(--purple) font-bold text-[0.92rem] inline-flex gap-1.5 items-center hover:underline"
            >
              All cars →
            </Link>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-3.5 pt-1 px-0.5 snap-x snap-mandatory [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#f1eaf9] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6c6ee] [&::-webkit-scrollbar-thumb]:rounded-full"
            id="rowCars"
          >
            {cars.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>

          <div className="flex items-center justify-between mt-7.5 mb-2">
            <h3 className="text-[1.45rem] font-bold leading-[1.12] tracking-[-0.02em]">
              Services
            </h3>
            <Link
              href="/services"
              className="text-(--purple) font-bold text-[0.92rem] inline-flex gap-1.5 items-center hover:underline"
            >
              All services →
            </Link>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-3.5 pt-1 px-0.5 snap-x snap-mandatory [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#f1eaf9] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6c6ee] [&::-webkit-scrollbar-thumb]:rounded-full"
            id="rowServices"
          >
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
