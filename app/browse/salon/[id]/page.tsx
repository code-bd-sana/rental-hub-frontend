import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MOCK_SALON } from "../../../../lib/data/mockSalon";

export async function generateStaticParams() {
  return MOCK_SALON.map((service) => ({
    id: service.id,
  }));
}

export default async function SalonDetailsPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const service = MOCK_SALON.find((s) => s.id === resolvedParams.id);

  if (!service) {
    notFound();
  }

  // Get other services in the same category for the list
  const otherServices = MOCK_SALON;

  return (
    <div className="bg-[#fcfcff] min-h-[calc(100vh-80px)] pb-10 text-ink">
      <div className="max-w-7xl mx-auto">
        <div className="py-4 text-[1rem] font-medium">
          <Link href="/" className="text-purple font-bold hover:underline cursor-pointer">Home</Link> › <Link href="/browse/salon" className="text-purple font-bold hover:underline cursor-pointer">Salon</Link> › <span className="text-muted">{service.name}</span>
        </div>

        <div className="mt-2 mb-8">
          <div className="text-[#8b8693] font-bold text-[0.8rem] tracking-[0.14em] uppercase mb-1.5">Reserve and confirm</div>
          <h2 className="font-sans font-bold leading-[1.12] tracking-[-0.02em] text-[clamp(1.6rem,3vw,2.2rem)] mb-2">Book nails and toes</h2>
          <p className="text-muted max-w-105">Manicures, pedicures, and nail care by skilled technicians. Book the treatment and the time that work for you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8.5 items-start pb-17.5">
          {/* Left Column */}
          <div>
            <div className="relative w-full h-75 rounded-[18px] overflow-hidden mb-2">
              <Image 
                src={service.image} 
                alt={service.name} 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            <h3 className="text-[1.3rem] font-bold mb-3">{service.provider.name}</h3>
            
            <div className="flex gap-2 mb-4.5 overflow-x-auto pb-2">
              {otherServices.slice(0, 5).map((s, i) => (
                <Link href={`/browse/salon/${s.id}`} key={i} className="relative w-17.5 h-17.5 rounded-xl overflow-hidden shrink-0 border-2 border-transparent hover:border-purple transition-colors">
                  <Image src={s.image} alt={s.name} fill className="object-cover" />
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              {otherServices.map((s) => (
                <Link href={`/browse/salon/${s.id}`} key={s.id} className={`flex items-center justify-between p-[13px_16px] border ${service.id === s.id ? 'border-purple bg-[#faf7ff]' : 'border-line bg-white'} rounded-[13px] hover:border-purple transition-colors cursor-pointer`}>
                  <div className="flex items-center gap-3">
                    <div className="relative w-13.5 h-13.5 rounded-[11px] overflow-hidden shrink-0">
                      <Image src={s.image} alt={s.name} fill className="object-cover" />
                    </div>
                    <label className="flex items-center gap-2.5 font-semibold cursor-pointer text-[0.95rem]">
                      <input 
                        type="radio" 
                        name="svc" 
                        className="w-4.5 h-4.5 accent-purple cursor-pointer" 
                        checked={service.id === s.id}
                        readOnly
                      />
                      {s.name}
                    </label>
                  </div>
                  <b className="font-extrabold text-[1.05rem]">USD 55</b>
                </Link>
              ))}
            </div>

            <h3 className="text-[1.3rem] font-bold mt-6.5 mb-1.5">Pick a time</h3>
            <p className="text-muted text-[0.9rem] mb-1.5">Today, {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</p>
            <div className="flex flex-wrap gap-2.25 mt-2.5">
              {['10:00','11:30','13:00','14:30','16:00','17:30','19:00','20:30'].map((time, i) => (
                <button key={i} className={`px-3.5 py-2.25 border-[1.5px] border-line rounded-[10px] font-bold text-[0.86rem] transition-colors hover:border-purple hover:text-purple ${i === 2 ? 'bg-orange text-white border-orange hover:text-white hover:border-orange' : ''}`}>
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Aside */}
          <div className="flex flex-col gap-6 sticky top-24">
            <div className="bg-white border border-line rounded-[18px] overflow-hidden shadow-custom-sm">
              <div className="px-4.5 py-4 border-b border-line bg-[#fdfcff]">
                <h3 className="font-bold text-[1.15rem]">Your reservation</h3>
              </div>
              <div className="p-4.5">
                <div className="flex justify-between items-center text-[0.95rem] font-bold text-ink mb-2">
                  <span>{service.name}</span>
                  <span>USD 55</span>
                </div>
                <div className="flex justify-between items-center text-[0.95rem] font-bold text-ink mb-3.5">
                  <span>Time</span>
                  <span className="text-purple">13:00</span>
                </div>
                
                <button className="w-full bg-purple text-white font-bold rounded-full py-3.5 hover:shadow-custom transition-all duration-200 mt-2">
                  Confirm with payment
                </button>
                <button className="w-full bg-transparent text-ink font-bold rounded-full py-3.5 mt-2.5 hover:bg-[#f1eaf9] transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" stroke="currentColor" strokeWidth="2"/></svg>
                  Request to chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}