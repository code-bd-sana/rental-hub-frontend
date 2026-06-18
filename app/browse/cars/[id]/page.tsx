import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MOCK_CARS } from "../../../../lib/data/mockCars";

export async function generateStaticParams() {
  return MOCK_CARS.map((car) => ({
    id: car.id,
  }));
}

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const car = MOCK_CARS.find((c) => c.id === resolvedParams.id);

  if (!car) {
    notFound();
  }

  return (
    <div className="bg-[#fcfcff] min-h-[calc(100vh-80px)] pb-10 text-ink">
      <div className="max-w-7xl mx-auto">
        <div className="py-4 text-[1rem] font-medium">
          <Link href="/" className="text-purple font-bold hover:underline cursor-pointer">Home</Link> › <Link href="/browse/cars" className="text-purple font-bold hover:underline cursor-pointer">Cars</Link> › <span className="text-muted">{car.type} category</span>
        </div>

        <div className="flex gap-4 my-3 text-[0.9rem] font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2 text-purple">
            <span className="w-6 h-6 rounded-full bg-purple text-white flex items-center justify-center text-[0.7rem]">1</span>
            Your car ---------
          </div>
          <div className="flex items-center gap-2 text-muted/40">
            <span className="w-6 h-6 rounded-full bg-muted/20 text-muted flex items-center justify-center text-[0.7rem]">2</span>
            Extras ---------
          </div>
          <div className="flex items-center gap-2 text-muted/40">
            <span className="w-6 h-6 rounded-full bg-muted/20 text-muted flex items-center justify-center text-[0.7rem]">3</span>
            Payment
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8.5 items-start mt-6">
          {/* Left Column */}
          <div className="col-span-2">
            <div className="relative w-full aspect-video rounded-xl bg-white overflow-hidden mb-6">
              <span className="absolute top-4 left-4 z-10 bg-white/90 text-purple font-bold text-[0.7rem] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-custom-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5m0 3h.01"/></svg>
                Example photo
              </span>
              <Image 
                src={car.images[0]} 
                alt={car.model} 
                fill 
                className="object-cover p-4 rounded-xl"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            <h1 className="text-[2.2rem] font-bold mb-0.5 leading-tight">{car.model}</h1>
            <div className="text-orange font-bold text-[0.95rem] mb-2">or a similar {car.type} car in this category</div>
            <div className="flex gap-4 text-muted text-[0.95rem] font-medium mb-6">
              <span>{car.type}</span>
              <span>•</span>
              <span>{car.seats} seats</span>
              <span>•</span>
              <span>{car.transmission}</span>
            </div>

            <div className="bg-[#fff5ec] border border-[#f6d8bd] text-[#7a4a1d] rounded-[14px] p-4 flex gap-3 items-start text-[0.88rem] mb-8">
              <svg className="w-4.75 h-4.75 shrink-0 mt-0.5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5m0 3h.01"/></svg>
              <div>
                <b className="text-[#5e3613]">This is a category, not one exact car.</b> The photo is an example. Your host will provide this car or a similar vehicle in the same category, with similar year, size, and condition. The host confirms the exact car with you before pickup.
              </div>
            </div>

            <div className="border-t border-line py-6">
              <h3 className="text-[1.15rem] font-bold mb-4">What this car offers</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex items-center gap-2.5 font-semibold text-[0.92rem]">
                   <svg className="w-5 h-5 text-purple shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 10v4h10v-4m-10 0V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>
                   {car.seats} seats
                </div>
                <div className="flex items-center gap-2.5 font-semibold text-[0.92rem]">
                   <svg className="w-5 h-5 text-purple shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8m-4-4h8"/></svg>
                   {car.transmission}
                </div>
                <div className="flex items-center gap-2.5 font-semibold text-[0.92rem]">
                   <svg className="w-5 h-5 text-purple shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>
                   2 large bags
                </div>
                <div className="flex items-center gap-2.5 font-semibold text-[0.92rem]">
                   <svg className="w-5 h-5 text-purple shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M12 3v18"/></svg>
                   Unlimited mileage
                </div>
              </div>
            </div>

            <div className="border-t border-line py-6">
              <h3 className="text-[1.15rem] font-bold mb-4">Your owner</h3>
              <div className="flex items-center gap-3.5 bg-[#faf7ff] border border-line rounded-[14px] p-4">
                <div className="w-12 h-12 rounded-xl bg-purple text-white flex items-center justify-center font-extrabold text-[1.1rem] shrink-0">
                  {car.host.name[0]}
                </div>
                <div>
                  <div className="font-bold text-[1.02rem] flex items-center gap-2">
                    {car.host.name}
                    <span className="inline-flex items-center gap-1 bg-[#e7f5ee] text-good text-[0.7rem] font-bold px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                      Verified
                    </span>
                  </div>
                  <div className="text-muted text-[0.84rem] mt-0.5">Car rental owner · {car.location} · {car.reviewsCount} reviews</div>
                </div>
              </div>
            </div>

            <div className="border-t border-line py-6">
              <h3 className="text-[1.15rem] font-bold mb-4">Pickup and drop off</h3>
              <div className="flex flex-col">
                <div className="relative flex gap-4 pb-6">
                  <div className="absolute left-1.5 top-4.5 bottom-0 w-0.5 bg-line z-0" />
                  <div className="relative w-3.5 h-3.5 rounded-full border-[3px] border-orange bg-white mt-1 shrink-0 z-10" />
                  <div>
                    <div className="font-bold text-[0.95rem]">Pickup</div>
                    <div className="text-purple font-bold text-[0.86rem]">Select your dates</div>
                    <div className="text-muted text-[0.86rem]">Host location or Johan Adolf Pengel International Airport, by arrangement</div>
                  </div>
                </div>
                <div className="relative flex gap-4">
                  <div className="relative w-3.5 h-3.5 rounded-full border-[3px] border-orange bg-white mt-1 shrink-0 z-10" />
                  <div>
                    <div className="font-bold text-[0.95rem]">Drop off</div>
                    <div className="text-purple font-bold text-[0.86rem]">Select your dates</div>
                    <div className="text-muted text-[0.86rem]">Same location as pickup, unless agreed otherwise with the host</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-line py-6">
              <h3 className="text-[1.15rem] font-bold mb-4">Bring this to your pickup</h3>
              <div className="grid gap-2.5">
                {[
                  "A valid driver licence",
                  "A valid ID card or passport",
                  "Your refundable deposit, paid to the host",
                  "Minimum driver age 21, licence held at least 2 years"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-[0.9rem] font-semibold">
                    <svg className="w-4.5 h-4.5 text-purple shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-muted text-[0.84rem] mt-4 leading-relaxed italic">
                This is not the full list. Check the host rental terms for everything you need. The host holds the car for your chosen pickup time and may release it if you arrive late without notice.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 flex flex-col gap-6 sticky top-24">
            <div className="bg-white border border-line rounded-[20px] overflow-hidden shadow-custom-sm">
              <div className="px-5 py-4 border-b border-line flex justify-between items-center bg-[#fdfcff]">
                <h3 className="font-bold text-[1.4rem]">USD {car.pricePerDay} <small className="text-muted font-medium text-[0.8rem]">per day</small></h3>
              </div>
              <div className="p-5">
                <div className="border border-line rounded-xl overflow-hidden mb-4 bg-[#fdfcff]">
                   <div className="p-3 cursor-pointer hover:bg-[#f3f2f5] transition-colors border-b border-line">
                      <label className="block text-[0.7rem] font-bold uppercase text-muted mb-0.5">Pickup date</label>
                      <div className="text-[0.95rem] text-muted">Select date</div>
                   </div>
                   <div className="p-3 cursor-pointer hover:bg-[#f3f2f5] transition-colors">
                      <label className="block text-[0.7rem] font-bold uppercase text-muted mb-0.5">Return date</label>
                      <div className="text-[0.95rem] text-muted">Select date</div>
                   </div>
                </div>

                <button className="w-full bg-purple text-white font-bold rounded-full py-3.5 hover:shadow-custom transition-all duration-200 mb-2.5">
                  Reserve car
                </button>

                <button className="w-full bg-transparent border border-line text-ink font-bold rounded-full py-3.5 hover:bg-[#f1eaf9] transition-colors flex items-center justify-center gap-2 mb-4">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z"/></svg>
                  Message the host
                </button>

                <div className="bg-[#f4f1f9] rounded-xl p-3 text-[0.8rem] text-muted leading-relaxed">
                  <b className="text-ink">How payment works.</b> You pay a small hold online to confirm with the host. The rest and your refundable deposit are settled with the host at pickup. Free cancellation up to 48 hours before pickup.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}