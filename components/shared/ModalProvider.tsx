"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "list" | "info" | "payment" | null;

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
