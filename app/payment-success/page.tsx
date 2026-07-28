'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function GuestPaymentSuccessPage() {
  useEffect(() => {
    const authData = localStorage.getItem('roamly_auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed && parsed.role === 'GUEST') {
          parsed.subscriptionStatus = true;
          localStorage.setItem('roamly_auth', JSON.stringify(parsed));
        }
      } catch (e) {
        console.warn('Failed to parse auth data on payment success', e);
      }
    }
  }, []);

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
