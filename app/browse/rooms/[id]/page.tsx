import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MOCK_PROPERTIES } from "../../../../lib/data/mockProperties";

export async function generateStaticParams() {
  return MOCK_PROPERTIES.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const property = MOCK_PROPERTIES.find((p) => p.id === resolvedParams.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-[#fcfcff] min-h-[calc(100vh-80px)] pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="py-4 text-[1rem] font-medium">
          <Link href="/" className="text-purple font-bold hover:underline cursor-pointer">Home</Link> › <Link href="/browse/rooms" className="text-purple font-bold hover:underline cursor-pointer">Rooms</Link> › <span className="text-muted">{property.title}</span>
        </div>
        
        <h1 className="text-[2.2rem] font-bold mb-1 leading-tight text-ink">
          {property.host.name}, {property.title}
        </h1>
        
        <div className="flex gap-4 text-muted font-semibold mb-4 items-center flex-wrap">
          <span className="flex items-center gap-1">
            <svg className="w-4.5 h-4.5 text-ink" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg> 
            {property.rating.toFixed(1)}
          </span>
          <span>{property.location}</span>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-[2fr_1fr_1fr] grid-rows-2 gap-2.5 h-105 rounded-[18px] overflow-hidden max-md:grid-cols-1 max-md:grid-rows-none max-md:h-auto">
          {property.images[0] && (
            <div className="row-span-2 relative w-full h-full max-md:h-62.5">
              <Image src={property.images[0]} alt="Gallery image 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          )}
          {property.images[1] && (
            <div className="relative w-full h-full max-md:hidden">
              <Image src={property.images[1]} alt="Gallery image 2" fill className="object-cover" sizes="25vw" />
            </div>
          )}
          {property.images[2] && (
            <div className="relative w-full h-full max-md:hidden">
              <Image src={property.images[2]} alt="Gallery image 3" fill className="object-cover" sizes="25vw" />
            </div>
          )}
          {property.images[3] && (
            <div className="col-span-2 relative w-full h-full max-md:hidden">
              <Image src={property.images[3]} alt="Gallery image 4" fill className="object-cover" sizes="50vw" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8.5 items-start pb-17.5 mt-7.5">
          {/* Left Column: About & Amenities */}
          <div>
            <h3 className="text-[1.4rem] font-bold mb-2 text-ink">About this stay</h3>
            <p className="text-muted mb-4 leading-relaxed">
              A bright, modern space with full amenities, set in a well kept resort with pool access and on site dining. Perfect for both short city trips and longer stays.
            </p>
            
            <div className="flex flex-wrap gap-2.5 my-4.5">
              <span className="flex items-center gap-1.75 bg-[#f3f2f5] rounded-[10px] px-3.25 py-2 text-[0.88rem] font-semibold text-ink">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M2 12h20M5 12V7h14v5M7 18v-6m10 6v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                King bed
              </span>
              <span className="flex items-center gap-1.75 bg-[#f3f2f5] rounded-[10px] px-3.25 py-2 text-[0.88rem] font-semibold text-ink">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M4 14h16v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-3ZM7 14V6a2 2 0 0 1 2-2h0" stroke="currentColor" strokeWidth="2"/></svg>
                Pool access
              </span>
              <span className="flex items-center gap-1.75 bg-[#f3f2f5] rounded-[10px] px-3.25 py-2 text-[0.88rem] font-semibold text-ink">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9 16l10-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Free wifi
              </span>
              <span className="flex items-center gap-1.75 bg-[#f3f2f5] rounded-[10px] px-3.25 py-2 text-[0.88rem] font-semibold text-ink">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9 16l10-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Air conditioning
              </span>
              <span className="flex items-center gap-1.75 bg-[#f3f2f5] rounded-[10px] px-3.25 py-2 text-[0.88rem] font-semibold text-ink">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9 16l10-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                On site restaurant
              </span>
            </div>
          </div>
          
          {/* Right Column: Aside */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-line rounded-[20px] overflow-hidden shadow-custom-sm">
              <div className="px-5 py-4 border-b border-line bg-[#fdfcff]">
                <h3 className="font-bold text-[1.4rem]">
                  USD {property.price} <small className="font-medium text-muted text-[0.8rem]">per {property.priceUnit}</small>
                </h3>
              </div>
              <div className="p-5">
                <div className="border border-line rounded-xl overflow-hidden mb-3.5">
                  <div className="p-3 bg-[#fdfcff] cursor-pointer hover:bg-[#f3f2f5] transition-colors">
                    <label className="block text-[0.75rem] font-bold uppercase text-muted mb-1">Check in and check out</label>
                    <div className="text-[0.95rem] text-muted">Select your dates</div>
                  </div>
                </div>
                
                <button className="w-full bg-purple text-white font-bold rounded-full py-3.5 hover:bg-[#3a1d6b] transition-colors">
                  Reserve
                </button>
                
                <button className="w-full bg-transparent text-ink font-bold rounded-full py-3.5 mt-2.5 hover:bg-[#f1eaf9] transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" stroke="currentColor" strokeWidth="2"/></svg>
                  Request to chat
                </button>
                
                <p className="text-center text-[0.8rem] text-muted mt-2.5">
                  You will not be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}