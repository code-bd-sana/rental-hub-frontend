import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { ModalProvider } from "../components/shared/ModalProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rentals Hub",
  description: "Discover the best properties, cars, and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ModalProvider>
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
