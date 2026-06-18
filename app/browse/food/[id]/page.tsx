import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MOCK_FOOD } from "../../../../lib/data/mockFood";

export async function generateStaticParams() {
  return MOCK_FOOD.map((food) => ({
    id: food.id,
  }));
}

export default async function FoodDetailsPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const food = MOCK_FOOD.find((f) => f.id === resolvedParams.id);

  if (!food) {
    notFound();
  }

  return (
    <div className="bg-[#fcfcff] min-h-[calc(100vh-80px)] pb-10">
      {/* Hero Section */}
      <div className="relative h-84 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#1a0a2e1a] to-[#1a0a2ec7] z-10 pointer-events-none" />
        <Image
          src={food.image}
          alt={food.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute left-0 right-0 bottom-0 text-white py-7.5 z-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[2.4rem] font-bold leading-tight">{food.name}</h1>
            <div className="flex gap-4.5 items-center mt-2 text-[#e7dcf5] text-[0.95rem] flex-wrap">
              <span className="flex items-center gap-1 font-bold">
                <svg className="w-4.5 h-4.5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6L12 2z"/></svg> 
                {food.rating.toFixed(1)}
              </span>
              <span>{food.provider?.name || "Restaurant"} · {food.reviewsCount} reviews</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Page Content */}
      <div className="max-w-7xl mx-auto">
        <div className="py-4 text-[1rem] font-medium">
          <Link href="/" className="text-purple font-bold hover:underline cursor-pointer">Home</Link> › <Link href="/browse/food" className="text-purple font-bold hover:underline cursor-pointer">Food</Link> › <span className="text-muted">{food.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8.5 items-start pb-17.5 mt-2.5">
          {/* Left Column: Menu/Food Details */}
          <div className="col-span-2">
            <h3 className="text-[1.5rem] font-bold mb-4">Menu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
              {/* Dish Card */}
              <div className="flex gap-3.5 bg-white border border-line rounded-2xl p-3 shadow-custom-sm">
                <div className="relative w-25 h-25 shrink-0 rounded-[10px] overflow-hidden">
                   <Image src={food.image} alt={food.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-[1.05rem] text-ink">{food.name}</div>
                    <div className="text-[0.84rem] text-muted my-1 leading-snug">A delicious serving of {food.name.toLowerCase()} prepared freshly for you.</div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-ink">USD 15</span>
                    <button className="flex items-center gap-1.5 bg-ink text-white font-bold text-[0.85rem] px-3 py-1.5 rounded-full hover:bg-purple transition-colors disabled:opacity-50">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Aside */}
          <div className="flex flex-col gap-6 col-span-1">
            {/* Cart Panel */}
            <div className="bg-white border border-line rounded-[20px] overflow-hidden shadow-custom-sm">
              <div className="px-5 py-4 border-b border-line flex justify-between items-center bg-[#fdfcff]">
                <h3 className="font-bold text-[1.1rem]">Your food cart</h3>
                <span className="font-bold text-[0.9rem] text-orange">0 items</span>
              </div>
              <div className="p-5">
                <div className="text-muted text-[0.95rem] text-center py-6">Tap any dish to drop it in your cart.</div>
                <button className="w-full bg-[#f1eaf9] text-purple font-bold rounded-full py-3.5 mt-3 opacity-50 cursor-not-allowed">Place order</button>
              </div>
            </div>
            
            {/* Contact Panel */}
            <div className="bg-white border border-line rounded-[20px] overflow-hidden shadow-custom-sm">
              <div className="px-5 py-4 border-b border-line bg-[#fdfcff]">
                <h3 className="font-bold text-[1.1rem]">Talk to the kitchen</h3>
              </div>
              <div className="p-5">
                <p className="text-[0.88rem] text-muted mb-3 leading-snug">Have a question about an item or a custom order? Reach the host directly.</p>
                <div className="flex flex-col gap-2 mt-4">
                  <button className="w-full bg-ink text-white font-bold rounded-full py-3.5 hover:bg-[#333] transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                    Request to chat
                  </button>
                  <button className="w-full bg-transparent text-ink font-bold rounded-full py-3.5 hover:bg-[#f1eaf9] transition-colors">
                    Book a table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}