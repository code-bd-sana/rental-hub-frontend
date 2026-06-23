"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "list" | "info" | "payment" | "receipt" | null;

interface ModalContextType {
  openModal: (type: ModalType, payload?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);

  const openModal = (type: ModalType, payload?: any) => {
    setActiveModal(type);
    setModalPayload(payload);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      
      {activeModal === "list" && (
        <div className="overlay open">
          <div className="modal">
            <div className="m-head">
              <div>
                <h3>List Your Business</h3>
                <p>Join the Rentals Hub platform.</p>
              </div>
              <button className="x" onClick={closeModal}>✕</button>
            </div>
            <div className="m-body">
              <p className="text-muted mb-4">We are currently in private beta. Please leave your email to get early access.</p>
              <input className="inp" placeholder="Business Name" />
              <input className="inp" placeholder="Email address" />
              <button className="btn primary lg" style={{ width: "100%" }} onClick={() => { alert("Requested!"); closeModal(); }}>Request Access</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "info" && (
        <div className="overlay open">
          <div className="modal">
            <div className="m-head">
              <div>
                <h3>{modalPayload?.title || "Information"}</h3>
              </div>
              <button className="x" onClick={closeModal}>✕</button>
            </div>
            <div className="m-body">
              <p className="text-muted leading-relaxed">{modalPayload?.text || "Details will be provided here."}</p>
              <button className="btn primary lg mt-6" style={{ width: "100%" }} onClick={closeModal}>Understood</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "receipt" && modalPayload && (
        <div className="overlay open" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', inset: 0, backgroundColor: 'rgba(21,32,31,0.5)', zIndex: 100 }}>
          <div className="modal" style={{ maxWidth: 470, padding: 0, width: '100%', backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' }}>
            <div className="m-head" style={{ padding: '20px', borderBottom: '1px solid #e7e1d6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 className="text-[18px] font-bold text-[#15201f]">Email receipt</h3>
                <p className="text-[13px] text-[#6b7b79]">This is the receipt your guest receives instantly.</p>
              </div>
              <button className="text-xl leading-none px-2 py-1 text-[#6b7b79] hover:text-[#15201f]" onClick={closeModal}>✕</button>
            </div>
            <div className="m-body" style={{ padding: '24px' }}>
              <div className="border border-[#e7e1d6] p-6 rounded-xl bg-white text-[13px] text-[#15201f]">
                <div className="flex justify-between items-center mb-6">
                  <div className="font-bold text-[18px]" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>{modalPayload.company}</div>
                  <div className="bg-[#f1f5f9] text-[#6b7b79] px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wide">
                    {modalPayload.taxOn ? 'Tax invoice' : 'Booking receipt'}
                  </div>
                </div>
                <div className="text-[20px] font-bold mb-1">Thank you for your booking</div>
                <div className="text-[#6b7b79] mb-6">Hi {modalPayload.email ? modalPayload.email.split('@')[0] : 'guest'}, here is your receipt and your code.</div>
                
                <div className="bg-[#f8fafc] border border-[#e7e1d6] p-4 rounded-lg flex flex-col items-center justify-center mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b7b79] mb-1">
                    {modalPayload.isFood ? 'Pickup code' : 'Confirmation code'}
                  </span>
                  <b className="text-[32px] font-mono leading-none tracking-widest">{modalPayload.otp}</b>
                  <small className="text-[#6b7b79] mt-1">Show this to {modalPayload.company}</small>
                </div>

                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-[#f1f5f9]"><td className="py-2.5 text-[#6b7b79]">Reference</td><td className="py-2.5 text-right font-medium">{modalPayload.ref}</td></tr>
                    <tr className="border-b border-[#f1f5f9]"><td className="py-2.5 text-[#6b7b79]">Booking</td><td className="py-2.5 text-right font-medium">{modalPayload.cat}</td></tr>
                    <tr className="border-b border-[#f1f5f9]"><td className="py-2.5 text-[#6b7b79]">{modalPayload.bank ? 'Paid via' : 'Payment'}</td><td className="py-2.5 text-right font-medium">{modalPayload.bank || 'At the location'}</td></tr>
                    <tr className="border-b border-[#f1f5f9]"><td className="py-2.5 text-[#6b7b79]">Subtotal</td><td className="py-2.5 text-right font-medium">{modalPayload.currency} {modalPayload.base}</td></tr>
                    <tr className="border-b border-[#f1f5f9]"><td className="py-2.5 text-[#6b7b79]">{modalPayload.taxLabel} ({modalPayload.taxRate}%)</td><td className="py-2.5 text-right font-medium">{modalPayload.currency} {modalPayload.tax}</td></tr>
                    <tr className="border-b border-[#e7e1d6]"><td className="py-2.5 text-[#6b7b79]">Total</td><td className="py-2.5 text-right font-bold">{modalPayload.currency} {modalPayload.amount}</td></tr>
                    <tr><td className="py-3 text-[#1e40af] font-semibold">{modalPayload.status === 'pay_at_location' ? 'Amount due at location' : 'Amount paid'}</td><td className="py-3 text-right font-bold text-[#1e40af]">{modalPayload.currency} {modalPayload.status === 'pay_at_location' ? modalPayload.amount : modalPayload.hold}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
