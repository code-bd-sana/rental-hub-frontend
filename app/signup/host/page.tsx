"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "../../../lib/api/client";

export default function HostSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Basic Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2: Business Info
  const [businessName, setBusinessName] = useState("");
  const [hostTypes, setHostTypes] = useState<string[]>([]);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Step 3: Documents
  const [documents, setDocuments] = useState<File[]>([]);

  const availableHostTypes = ["Property Manager", "Individual Host", "Boutique Hotel", "Resort", "Other"];

  const toggleHostType = (type: string) => {
    setHostTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setDocuments((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      
      if (businessName) formData.append("businessName", businessName);
      if (registrationNumber) formData.append("registrationNumber", registrationNumber);
      if (country) formData.append("country", country);
      if (city) formData.append("city", city);
      if (address) formData.append("address", address);
      
      // Append array items properly for multer
      hostTypes.forEach(type => {
        formData.append("hostTypes", type);
      });

      // Append files
      documents.forEach(file => {
        formData.append("documents", file);
      });

      // We use apiClient with multipart/form-data
      await apiClient.post("/auth/register/host", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      
      setStep(4);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong during host registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-[#172554] tracking-tight" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
              Roam<span className="text-[#2563eb]">ly</span> <span className="text-[#6b7b79] text-xl ml-1">Hosts</span>
            </h1>
          </Link>
        </div>

        <div className="bg-white p-6 md:p-8 shadow-[0_10px_30px_rgba(11,79,74,0.1)] rounded-[18px]">
          {error && (
            <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-xl font-medium border border-red-100 flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleNextStep1} className="animate-in fade-in duration-300">
              <h2 className="text-[26px] font-bold text-[#15201f] mb-1.5" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Partner with us</h2>
              <p className="text-[#6b7b79] text-[14px] mb-6">
                Let's get your host account setup. First, we need your basic contact details.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Full Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="John Doe" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Email Address</label>
                  <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@company.com" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Phone Number (Required for Hosts)</label>
                  <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="+1 (555) 123-4567" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Password</label>
                    <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Confirm Password</label>
                    <input required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full mt-6 bg-[#2563eb] text-white rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm">
                Continue to Business Details
              </button>
              
              <div className="mt-5 text-center text-[13px] text-[#6b7b79] font-medium">
                Want to book instead? <Link href="/signup" className="text-[#2563eb] hover:underline font-bold">Register as Guest</Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep2} className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button type="button" onClick={() => setStep(1)} className="text-[#6b7b79] hover:text-[#15201f] text-sm mb-4 font-semibold flex items-center transition-colors">
                &larr; Back
              </button>
              <h2 className="text-[26px] font-bold text-[#15201f] mb-1.5" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Your Business Details</h2>
              <p className="text-[#6b7b79] text-[14px] mb-6">
                Tell us a little bit about what you host. (All fields are optional for now, you can complete them later).
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-2.5">What type of host are you?</label>
                  <div className="flex flex-wrap gap-2">
                    {availableHostTypes.map(t => (
                      <button type="button" key={t} onClick={() => toggleHostType(t)} className={`border rounded-[22px] px-4 py-2 text-[13px] font-semibold transition-colors ${hostTypes.includes(t) ? 'bg-[#1e40af] text-white border-[#1e40af]' : 'border-[#e7e1d6] bg-[#f8fafc] text-[#15201f] hover:bg-[#dbeafe]'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Business / Company Name</label>
                  <input value={businessName} onChange={e => setBusinessName(e.target.value)} type="text" placeholder="e.g. Oceanview Rentals LLC" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Business Registration Number</label>
                  <input value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} type="text" placeholder="Optional" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Country</label>
                    <input value={country} onChange={e => setCountry(e.target.value)} type="text" placeholder="e.g. USA" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">City</label>
                    <input value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="e.g. Miami" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#15201f] mb-1.5">Full Address</label>
                  <input value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder="123 Coastal Highway, Suite 100" className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-[#6b7b79]" />
                </div>
              </div>

              <button type="submit" className="w-full mt-8 bg-[#2563eb] text-white rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm">
                Next: Upload Verification
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button type="button" onClick={() => setStep(2)} className="text-[#6b7b79] hover:text-[#15201f] text-sm mb-4 font-semibold flex items-center transition-colors">
                &larr; Back
              </button>
              <h2 className="text-[26px] font-bold text-[#15201f] mb-1.5" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Verify your identity</h2>
              <p className="text-[#6b7b79] text-[14px] mb-6">
                Upload your ID or business registration documents to expedite your approval. (Optional for now)
              </p>

              <div className="border-2 border-dashed border-[#e7e1d6] rounded-xl p-8 text-center bg-[#f8fafc] mb-6 relative hover:border-[#2563eb] transition-colors group">
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*,application/pdf"
                />
                <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                  <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#2563eb] group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[#2563eb] font-semibold">Click to upload</span> or drag and drop
                    <p className="text-[#6b7b79] text-xs mt-1">PDF, PNG, JPG up to 10MB each</p>
                  </div>
                </div>
              </div>

              {documents.length > 0 && (
                <div className="space-y-2 mb-6">
                  <h4 className="text-[13px] font-bold text-[#15201f]">Selected Files:</h4>
                  {documents.map((file, i) => (
                    <div key={i} className="flex items-center justify-between bg-white border border-[#e7e1d6] p-3 rounded-xl shadow-sm">
                      <div className="flex items-center overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6b7b79] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-medium text-[#15201f] truncate">{file.name}</span>
                      </div>
                      <button type="button" onClick={() => removeFile(i)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors ml-2 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full mt-4 bg-[#2563eb] text-white rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-[#1e40af] transition-colors shadow-sm disabled:opacity-50">
                {loading ? "Creating Host Account..." : "Submit Registration"}
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center animate-in zoom-in-95 duration-500 py-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-[26px] font-bold text-[#15201f] mb-3" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Registration Received!</h2>
              <p className="text-[#6b7b79] text-[15px] mb-8 leading-relaxed">
                Thank you for applying to host on Roamly. Your application is currently <span className="font-bold text-amber-600">Pending Approval</span>. We will review your details and documents shortly.
              </p>
              
              <Link href="/login">
                <button className="w-full bg-[#15201f] text-white rounded-[30px] py-3.5 px-6 font-bold text-[16px] hover:bg-black transition-colors shadow-sm">
                  Proceed to Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
