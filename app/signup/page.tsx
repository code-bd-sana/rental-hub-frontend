"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [dietNote, setDietNote] = useState("");

  const countries = ["Japan", "Italy", "France", "Bali", "Mexico"];
  const interests = ["Culture", "Food", "Nature", "Adventure", "Relaxation"];
  const diets = ["Vegetarian", "Vegan", "Gluten-Free", "Halal"];

  const toggleSelection = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[], item: string) => {
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password && confirmPassword === password) {
      setStep(2);
    } else if (password !== confirmPassword) {
      alert("Passwords do not match.");
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinish = () => {
    // Redirect to login successfully
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-[#172554] tracking-tight" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
              Roam<span className="text-[#2563eb]">ly</span>
            </h1>
          </Link>
        </div>

        <div className="bg-white p-6 md:p-8 shadow-[0_10px_30px_rgba(11,79,74,0.1)] rounded-[18px]">
          {step === 1 && (
            <form onSubmit={handleNextStep1} className="animate-in fade-in duration-300">
              <h2 className="text-[26px] font-bold text-[#15201f] mb-1.5" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Become a guest</h2>
              <p className="text-[#6b7b79] text-[14px] mb-6">
                A few quick fields to start. We unlock the directory after a short setup.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Your name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="First name" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Email</label>
                  <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@email.com" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Password</label>
                  <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Confirm Password</label>
                  <input required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>
              </div>

              <button type="submit" className="w-full mt-6 bg-[#2563eb] text-white rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm">
                Continue
              </button>
              <div className="text-[13px] font-medium text-[#6b7b79] mt-4 text-center">
                Already have an account? <Link href="/login" className="text-[#2563eb] hover:underline">Sign in</Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep2} className="animate-in fade-in duration-300">
              <h2 className="text-[26px] font-bold text-[#15201f] mb-1.5" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Tell us about your trip</h2>
              <p className="text-[#6b7b79] text-[14px] mb-6">
                This builds your profile so the assistant can help you right away and remember you next time.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-2.5">Which countries do you want to visit?</label>
                  <div className="flex flex-wrap gap-2">
                    {countries.map(c => (
                      <button type="button" key={c} onClick={() => toggleSelection(setSelectedCountries, selectedCountries, c)} className={`border rounded-[22px] px-4 py-2 text-[13px] font-semibold transition-colors ${selectedCountries.includes(c) ? 'bg-[#1e40af] text-white border-[#1e40af]' : 'border-[#e7e1d6] bg-[#f8fafc] text-[#15201f] hover:bg-[#dbeafe]'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-2.5">What are you into?</label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map(i => (
                      <button type="button" key={i} onClick={() => toggleSelection(setSelectedInterests, selectedInterests, i)} className={`border rounded-[22px] px-4 py-2 text-[13px] font-semibold transition-colors ${selectedInterests.includes(i) ? 'bg-[#1e40af] text-white border-[#1e40af]' : 'border-[#e7e1d6] bg-[#f8fafc] text-[#15201f] hover:bg-[#dbeafe]'}`}>
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-2.5">Any allergies or dietary needs?</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {diets.map(d => (
                      <button type="button" key={d} onClick={() => toggleSelection(setSelectedDiet, selectedDiet, d)} className={`border rounded-[22px] px-4 py-2 text-[13px] font-semibold transition-colors ${selectedDiet.includes(d) ? 'bg-[#1e40af] text-white border-[#1e40af]' : 'border-[#e7e1d6] bg-[#f8fafc] text-[#15201f] hover:bg-[#dbeafe]'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                  <input value={dietNote} onChange={e => setDietNote(e.target.value)} type="text" placeholder="Anything else we should know" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>
              </div>

              <button type="submit" className="w-full mt-8 bg-[#2563eb] text-white rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm">
                Build my profile
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="animate-in fade-in duration-300">
              <span className="bg-[#1e9e72] text-white text-[12px] font-bold py-1.5 px-3 rounded-[20px] inline-block mb-3">Profile saved</span>
              <h2 className="text-[26px] font-bold text-[#15201f]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Welcome, {name || "Guest"}</h2>
              
              <div className="bg-[#172554] text-white rounded-[18px] p-6 mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div>
                  <h3 className="text-[22px] mb-1.5" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Unlock everything</h3>
                  <p className="opacity-90 text-[14px] max-w-107.5">
                    Your profile is ready. Subscribe to open the full directory and let the assistant book your trip.
                  </p>
                </div>
                <div className="text-left md:text-right w-full md:w-auto shrink-0">
                  <div className="text-[28px] font-extrabold">$9.99 <small className="text-[13px] font-semibold opacity-80">/ month</small></div>
                  <button onClick={handleFinish} className="mt-3 w-full bg-[#2563eb] text-white rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm">
                    Unlock now (demo)
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button onClick={handleFinish} className="text-[#172554] font-bold text-[14px] hover:underline">
                  Skip to assistant (login)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
