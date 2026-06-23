"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { DIR_DATA } from "../../lib/data/directoryData";
import { useModal } from "../../components/shared/ModalProvider";

const SR_BANKS = [
  {code:'dsb',name:'De Surinaamsche Bank',short:'DSB',color:'#0a7d3c',acct:'10.45.221.8'},
  {code:'hakrin',name:'Hakrinbank',short:'HKB',color:'#c8102e',acct:'201.778.340'},
  {code:'finabank',name:'Finabank',short:'FINA',color:'#e87722',acct:'30.118.905'},
  {code:'republic',name:'Republic Bank',short:'RBL',color:'#d31245',acct:'88.220.114'},
  {code:'trust',name:'Trustbank Amanah',short:'TBA',color:'#0f7a6e',acct:'14.903.226'},
  {code:'godo',name:'Godobank',short:'GODO',color:'#1d4e89',acct:'55.610.073'},
  {code:'surichange',name:'Surichange Bank',short:'SUR',color:'#5a2d82',acct:'72.330.519'},
  {code:'landbouw',name:'Landbouwbank',short:'LBB',color:'#2e7d32',acct:'40.221.660'},
  {code:'spsb',name:'Surinaamse Postspaarbank',short:'SPSB',color:'#b8141f',acct:'63.014.882'},
  {code:'vcb',name:'Volkscredietbank',short:'VCB',color:'#00529b',acct:'19.557.402'},
  {code:'southern',name:'Southern Commercial Bank',short:'SCB',color:'#16386b',acct:'24.880.131'}
];

function bankMark(b: any) {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 inline-block">
      <rect width="64" height="64" rx="15" fill={b.color} />
      <text x="32" y="40" textAnchor="middle" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800" fontSize={b.short.length > 3 ? 16 : 21} fill="#fff">
        {b.short}
      </text>
    </svg>
  );
}

// Separate component to handle the inner part of the page using useSearchParams
function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const seed = searchParams.get("id");
  const { openModal } = useModal();

  const [item, setItem] = useState<any>(null);
  const [step, setStep] = useState<"summary" | "bank-select" | "bank-details" | "intl-options" | "status">("summary");
  
  // Payment states
  const [payData, setPayData] = useState<any>(null);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [proofName, setProofName] = useState("");
  const [receipt, setReceipt] = useState<any>(null);

  useEffect(() => {
    if (!seed) {
      router.push("/");
      return;
    }
    
    // Find the item
    let foundItem = null;
    for (const country in DIR_DATA) {
      const match = DIR_DATA[country].find((x) => x.seed === seed);
      if (match) {
        foundItem = match;
        break;
      }
    }

    if (!foundItem) {
      router.push("/");
      return;
    }

    setItem(foundItem);

    // Dynamic mock pricing based on category
    let basePrice = 150; // default Stay
    const cat = foundItem.cat.toLowerCase();
    if (cat.includes("car")) basePrice = 50;
    else if (cat.includes("spa")) basePrice = 80;
    else if (cat.includes("restaurant") || cat.includes("food")) basePrice = 30;
    else if (cat.includes("barber")) basePrice = 20;
    else if (cat.includes("tour")) basePrice = 60;
    else if (cat.includes("taxi")) basePrice = 15;
    else if (cat.includes("salon")) basePrice = 40;
    else if (cat.includes("flight")) basePrice = 300;

    const taxRate = 10;
    const tax = Math.round(basePrice * taxRate / 100);
    const amount = basePrice + tax;
    const holdPct = (cat.includes("restaurant") || cat.includes("food")) ? 50 : 30;
    const hold = Math.round(amount * holdPct / 100);
    const balance = amount - hold;
    const ref = 'RH' + Math.floor(100000 + Math.random() * 900000);

    setPayData({
      company: foundItem.name,
      cat: foundItem.cat,
      base: basePrice,
      taxRate,
      taxLabel: "BTW",
      tax,
      amount,
      holdPct,
      hold,
      balance,
      ref,
      currency: "USD",
      isFood: cat.includes("restaurant") || cat.includes("food")
    });

  }, [seed, router]);

  if (!item || !payData) {
    return <div className="min-h-[60vh] flex items-center justify-center font-bold text-gray-500">Loading booking details...</div>;
  }

  const handleBankSelect = (bank: any) => {
    setSelectedBank(bank);
    setStep("bank-details");
  };

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProofName(file.name);
  };

  const submitProof = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setReceipt({
      ...payData,
      bank: selectedBank.name,
      email,
      proof: proofName,
      status: "review",
      otp,
      when: new Date()
    });
    setStep("status");
  };

  const payAtLocation = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setReceipt({
      ...payData,
      email,
      status: "pay_at_location",
      otp,
      when: new Date()
    });
    setStep("status");
  };

  const renderStep = () => {
    if (step === "summary") {
      return (
        <div className="bg-white border border-[#e7e1d6] rounded-[18px] shadow-[0_10px_30px_rgba(11,79,74,0.06)] relative overflow-hidden" style={{ maxWidth: 500, margin: "0 auto" }}>
          <div className="p-6 border-b border-[#e7e1d6] flex justify-between items-start">
            <div>
              <h3 className="text-[20px] font-bold text-[#15201f]">Confirm and pay</h3>
              <p className="text-[#6b7b79] font-medium mt-1">{payData.company}</p>
            </div>
            <Link href="/" className="text-[#6b7b79] hover:text-[#15201f] text-xl leading-none">✕</Link>
          </div>
          <div className="p-6">
            <div className="bg-[#f8fafc] border border-[#e7e1d6] rounded-xl p-5 mb-6 text-[14px]">
              <div className="flex justify-between mb-3"><span className="text-[#6b7b79]">Subtotal</span><span className="font-semibold">{payData.currency} {payData.base}</span></div>
              <div className="flex justify-between mb-4 border-b border-[#e7e1d6] pb-4"><span className="text-[#6b7b79]">{payData.taxLabel} ({payData.taxRate}%)</span><span className="font-semibold">{payData.currency} {payData.tax}</span></div>
              <div className="flex justify-between font-bold text-[18px] mb-4"><span>Total</span><span>{payData.currency} {payData.amount}</span></div>
              <div className="flex justify-between text-[#1e40af] font-bold mb-3"><span>Pay now to hold ({payData.holdPct}%)</span><span>{payData.currency} {payData.hold}</span></div>
              <div className="flex justify-between text-[#6b7b79] font-medium"><span>Balance at the location</span><span>{payData.currency} {payData.balance}</span></div>
            </div>
            
            {payData.isFood && (
              <div className="bg-[#fff3cd] text-[#856404] p-4 rounded-xl text-[13px] font-medium mb-6">
                For food orders, 50% must be paid before your food is prepared. The rest is paid on pickup.
              </div>
            )}

            <div className="font-bold text-[16px] mb-3 text-[#15201f]">Where are you paying from?</div>
            <div className="flex flex-col gap-3">
              <button onClick={() => setStep("bank-select")} className="text-left flex items-center gap-4 p-4 border border-[#e7e1d6] rounded-xl hover:bg-[#f8fafc] transition-colors">
                <span className="text-3xl grayscale-20">🇸🇷</span>
                <div>
                  <b className="block text-[15px] text-[#15201f]">I am in Suriname</b>
                  <small className="text-[#6b7b79] text-[13px]">Pay by local bank transfer and upload your proof</small>
                </div>
              </button>
              <button onClick={() => setStep("intl-options")} className="text-left flex items-center gap-4 p-4 border border-[#e7e1d6] rounded-xl hover:bg-[#f8fafc] transition-colors">
                <span className="text-3xl grayscale-20">🌍</span>
                <div>
                  <b className="block text-[15px] text-[#15201f]">International guest</b>
                  <small className="text-[#6b7b79] text-[13px]">Pay at the location or chat with the local host</small>
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (step === "bank-select") {
      return (
        <div className="bg-white border border-[#e7e1d6] rounded-[18px] shadow-[0_10px_30px_rgba(11,79,74,0.06)] relative overflow-hidden p-6" style={{ maxWidth: 500, margin: "0 auto" }}>
          <button className="text-[#1e40af] font-semibold text-sm mb-6 hover:underline flex items-center gap-1" onClick={() => setStep("summary")}>‹ Back</button>
          <div className="font-bold text-[18px] mb-4 text-[#15201f]">Choose your bank</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SR_BANKS.map(b => (
              <button key={b.code} onClick={() => handleBankSelect(b)} className="border border-[#e7e1d6] rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-[#f8fafc] hover:border-[#cbd5e1] transition-all">
                {bankMark(b)}
                <span className="text-[12px] font-semibold text-center leading-tight text-[#15201f]">{b.name}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === "bank-details") {
      return (
        <div className="bg-white border border-[#e7e1d6] rounded-[18px] shadow-[0_10px_30px_rgba(11,79,74,0.06)] relative overflow-hidden p-6" style={{ maxWidth: 500, margin: "0 auto" }}>
          <button className="text-[#1e40af] font-semibold text-sm mb-6 hover:underline flex items-center gap-1" onClick={() => setStep("bank-select")}>‹ Banks</button>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#e7e1d6]">
            {bankMark(selectedBank)}
            <div>
              <b className="block text-[16px] text-[#15201f]">{selectedBank.name}</b>
              <small className="text-[#6b7b79] text-[13px]">Transfer to the host account below</small>
            </div>
          </div>
          
          <div className="bg-[#f8fafc] border border-[#e7e1d6] rounded-xl p-5 text-[14px] flex flex-col gap-3 mb-6">
            <div className="flex justify-between"><span className="text-[#6b7b79]">Account name</span><b className="text-[#15201f] text-right">{payData.company}</b></div>
            <div className="flex justify-between"><span className="text-[#6b7b79]">Account number</span><b className="text-[#15201f] text-right font-mono text-[15px]">{selectedBank.acct}</b></div>
            <div className="flex justify-between text-[#1e40af]"><span className="font-semibold">Amount to transfer</span><b className="text-[16px] text-right">{payData.currency} {payData.hold}</b></div>
            <div className="flex justify-between"><span className="text-[#6b7b79]">Reference</span><b className="text-[#15201f] text-right font-mono text-[15px]">{payData.ref}</b></div>
          </div>

          <input 
            className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#15201f] mb-6 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe] transition-all placeholder:text-[#94a3b8]" 
            type="email" 
            placeholder="Email for your instant receipt" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="font-bold text-[16px] mb-3 text-[#15201f]">Upload your payment proof</div>
          <label className={`block border-2 border-dashed ${proofName ? 'border-[#10b981] bg-[#ecfdf5]' : 'border-[#cbd5e1] bg-[#f8fafc]'} rounded-xl p-8 text-center cursor-pointer mb-6 hover:bg-[#f1f5f9] transition-colors`}>
            <input type="file" accept="image/*,application/pdf" hidden onChange={handleProofUpload} />
            <svg viewBox="0 0 24 24" fill="none" className={`w-8 h-8 mx-auto mb-3 ${proofName ? 'text-[#10b981]' : 'text-[#94a3b8]'}`}><path d="M12 16V4m0 0l-4 4m4-4l4 4M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className={`text-[14px] ${proofName ? 'text-[#059669] font-bold' : 'text-[#6b7b79] font-medium'}`}>
              {proofName ? `Attached: ${proofName}` : 'Tap to upload a screenshot or PDF of your transfer'}
            </div>
          </label>

          <button 
            className={`w-full py-4 rounded-xl font-bold text-white text-[16px] transition-all ${proofName ? 'bg-[#2563eb] hover:bg-[#1d4ed8] shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:-translate-y-px' : 'bg-[#94a3b8] cursor-not-allowed'}`}
            disabled={!proofName}
            onClick={submitProof}
          >
            Submit payment for review
          </button>
        </div>
      );
    }

    if (step === "intl-options") {
      return (
        <div className="bg-white border border-[#e7e1d6] rounded-[18px] shadow-[0_10px_30px_rgba(11,79,74,0.06)] relative overflow-hidden p-6" style={{ maxWidth: 500, margin: "0 auto" }}>
          <button className="text-[#1e40af] font-semibold text-sm mb-6 hover:underline flex items-center gap-1" onClick={() => setStep("summary")}>‹ Back</button>
          
          <input 
            className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#15201f] mb-6 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe] transition-all placeholder:text-[#94a3b8]" 
            type="email" 
            placeholder="Email for your instant receipt" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="font-bold text-[18px] mb-4 text-[#15201f]">How would you like to continue?</div>
          <div className="flex flex-col gap-4">
            <button onClick={payAtLocation} className="text-left flex items-start gap-4 p-5 border border-[#e7e1d6] rounded-xl hover:bg-[#f8fafc] transition-colors group">
              <div className="mt-0.5 w-6 h-6 rounded-full border-[2.5px] border-[#1e40af] flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-2.5 h-2.5 bg-[#1e40af] rounded-full"></div>
              </div>
              <div>
                <b className="block text-[16px] text-[#15201f]">Pay at the location</b>
                <small className="text-[#6b7b79] leading-relaxed block mt-1 text-[13px]">Reserve now and settle in cash or card when you arrive. {payData.isFood && <span className="font-medium text-[#856404]">Food orders need 50% confirmed with the host first.</span>}</small>
              </div>
            </button>
            <button onClick={() => alert("Chat opened with host!")} className="text-left flex items-start gap-4 p-5 border border-[#e7e1d6] rounded-xl hover:bg-[#f8fafc] transition-colors group">
              <div className="mt-0.5 w-6 h-6 flex items-center justify-center text-[#1e40af] group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M21 12a8 8 0 01-11.5 7.2L4 20l1-4.2A8 8 0 1121 12z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <b className="block text-[16px] text-[#15201f]">Chat with the local host</b>
                <small className="text-[#6b7b79] leading-relaxed block mt-1 text-[13px]">Agree on payment directly with the host before you arrive.</small>
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (step === "status") {
      const isReview = receipt.status === "review";
      const statusTitle = isReview ? "Under review" : "Reserved";
      const statusColor = isReview ? "#e8a33d" : "#10b981";
      const statusMsg = isReview 
        ? "We sent your proof to the host. You will be confirmed once they approve it."
        : "Your booking is held. Pay the balance when you arrive at the location. You and the host can now message each other directly here in the app.";
      
      const otpLabel = payData.isFood ? "Show this code to the host on pickup" : "Show this code to the host on arrival";

      return (
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0" }}>
          <div className="text-sm font-semibold text-[#6b7b79] mb-4 flex items-center gap-2"><Link href="/" className="hover:text-[#15201f] transition-colors">Home</Link> <span className="text-xs">›</span> Payment</div>
          <div className="bg-white border border-[#e7e1d6] rounded-3xl p-6 sm:p-10 shadow-[0_10px_30px_rgba(11,79,74,0.06)] relative overflow-hidden">
            <div className="text-center mb-8">
              <span className="inline-block text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-5 shadow-sm" style={{ backgroundColor: statusColor }}>
                {statusTitle}
              </span>
              <h2 className="text-[32px] font-bold text-[#15201f] mb-3" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Your payment</h2>
              <p className="text-[#6b7b79] text-[15px] max-w-md mx-auto leading-relaxed">{statusMsg}</p>
            </div>

            <div className="bg-[#f8fafc] border border-[#e7e1d6] rounded-2xl p-6 mb-8 text-[14px]">
              <div className="flex justify-between py-2.5 border-b border-[#e7e1d6]"><span className="text-[#6b7b79]">Reference</span><b className="text-[#15201f]">{receipt.ref}</b></div>
              <div className="flex justify-between py-2.5 border-b border-[#e7e1d6]"><span className="text-[#6b7b79]">Booking</span><b className="text-[#15201f]">{receipt.cat}</b></div>
              <div className="flex justify-between py-2.5 border-b border-[#e7e1d6]"><span className="text-[#6b7b79]">Sold by</span><b className="text-[#15201f] text-right">{receipt.company}</b></div>
              {receipt.bank && <div className="flex justify-between py-2.5 border-b border-[#e7e1d6]"><span className="text-[#6b7b79]">Paid via</span><b className="text-[#15201f]">{receipt.bank}</b></div>}
              <div className="flex justify-between py-2.5 border-b border-[#e7e1d6]"><span className="text-[#6b7b79]">Subtotal</span><b className="text-[#15201f]">{receipt.currency} {receipt.base}</b></div>
              <div className="flex justify-between py-2.5 border-b border-[#e7e1d6]"><span className="text-[#6b7b79]">{receipt.taxLabel} ({receipt.taxRate}%)</span><b className="text-[#15201f]">{receipt.currency} {receipt.tax}</b></div>
              <div className="flex justify-between py-3 border-b border-[#e7e1d6] font-bold text-[18px]"><span>Total</span><span className="text-[#15201f]">{receipt.currency} {receipt.amount}</span></div>
              <div className="flex justify-between py-3 border-b border-[#e7e1d6] text-[#1e40af] font-semibold"><span>Amount {receipt.status === 'pay_at_location' ? 'due at location' : 'paid now'}</span><b>{receipt.currency} {receipt.status === 'pay_at_location' ? receipt.amount : receipt.hold}</b></div>
              {receipt.proof && <div className="flex justify-between py-3 border-b border-[#e7e1d6]"><span className="text-[#6b7b79]">Proof</span><b className="text-[#10b981]">{receipt.proof}</b></div>}
              
              <div className="bg-[#dbeafe] text-[#1e40af] p-5 rounded-xl mt-6 text-center border border-[#bfdbfe]">
                <small className="block mb-2 font-bold uppercase tracking-wider text-[11px]">{otpLabel}</small>
                <div className="text-[38px] font-mono font-bold tracking-widest leading-none drop-shadow-sm">{receipt.otp}</div>
              </div>
            </div>

            {receipt.email && (
              <div className="text-center text-[#6b7b79] text-[14px] font-medium mb-8">
                A receipt with your code was emailed instantly to <b className="text-[#15201f]">{receipt.email}</b>
              </div>
            )}

            <button 
              className="w-full py-4 rounded-xl font-bold text-white text-[16px] bg-[#2563eb] hover:bg-[#1d4ed8] transition-all mb-4 shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:-translate-y-px"
              onClick={() => openModal("receipt", receipt)}
            >
              View email receipt
            </button>
            <button className="w-full py-4 rounded-xl font-bold text-[#1e40af] text-[16px] bg-white border-2 border-[#dbeafe] hover:bg-[#f8fafc] transition-colors mb-4">
              Message the host directly
            </button>
            <Link href="/" className="block w-full text-center py-3 rounded-xl font-bold text-[#6b7b79] text-[15px] hover:text-[#15201f] hover:bg-[#f1f5f9] transition-colors">
              Back to home
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#f8fafc] py-10 px-4">
      {renderStep()}
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center font-bold text-gray-500">Loading checkout...</div>}>
      <BookingContent />
    </Suspense>
  );
}
