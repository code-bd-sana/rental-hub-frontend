import React from 'react';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e7e1d6] max-w-md text-center">
        <div className="flex justify-center mb-6 text-red-500">
          <XCircle size={64} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-[#15201f] mb-3">Payment Cancelled</h2>
        <p className="text-[#6b7b79] mb-8">
          Your payment was cancelled or did not complete. You will need to complete the payment to access your dashboard.
        </p>
        <Link 
          href="/dashboard"
          className="bg-[#2563eb] text-white px-8 py-3.5 rounded-xl font-bold text-[16px] hover:bg-[#1e40af] transition-colors w-full inline-block"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
