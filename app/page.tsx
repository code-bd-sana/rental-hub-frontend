import DirectorySection from "../components/features/DirectorySection";
import SearchWidget from "../components/features/SearchWidget";
import Image from "next/image";

export default function Home() {

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
          <div className="relative pt-23.5 pb-40 text-center text-white max-w-300 mx-auto px-6">
            <div className="inline-flex gap-2 items-center mb-5.5 px-4 py-1.75 border border-[rgba(255,255,255,0.2)] rounded-full text-[0.8rem] tracking-[0.12em] uppercase">
              Suriname · for all your rental needs
            </div>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
              Book the <em className="not-italic text-white">stay</em>, the{" "}
              <em className="not-italic text-white">plate</em>,<br className="hidden md:block" />
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

        <DirectorySection />
      </div>
    </>
  );
}
