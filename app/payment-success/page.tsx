import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function GuestPaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e7e1d6] max-w-md text-center">
        <div className="flex justify-center mb-6 text-green-500">
          <CheckCircle2 size={64} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-[#15201f] mb-3">Subscription Activated!</h2>
        <p className="text-[#6b7b79] mb-8">
          Thank you for subscribing. You now have full access to explore all directory listings without any limits!
        </p>
        <Link 
          href="/directory"
          className="bg-[#2563eb] text-white px-8 py-3.5 rounded-xl font-bold text-[16px] hover:bg-[#1e40af] transition-colors w-full inline-block"
        >
          Explore Directory
        </Link>
      </div>
    </div>
  );
}
