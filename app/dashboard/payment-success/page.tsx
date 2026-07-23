import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e7e1d6] max-w-md text-center">
        <div className="flex justify-center mb-6 text-green-500">
          <CheckCircle2 size={64} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-[#15201f] mb-3">Payment Successful!</h2>
        <p className="text-[#6b7b79] mb-8">
          Thank you for your purchase. Your 1-month access pass has been activated and you can now manage your listings and bookings.
        </p>
        <Link 
          href="/dashboard"
          className="bg-[#2563eb] text-white px-8 py-3.5 rounded-xl font-bold text-[16px] hover:bg-[#1e40af] transition-colors w-full inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
