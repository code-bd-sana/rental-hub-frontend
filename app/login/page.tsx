"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DEMO_ACCOUNTS = [
  { role: "Guest", email: "guest@roamly.com", password: "password123", redirect: "/countries" },
  { role: "Host", email: "host@roamly.com", password: "password123", redirect: "/dashboard" },
  { role: "Agent", email: "agent@roamly.com", password: "password123", redirect: "/dashboard" },
  { role: "Super Admin", email: "admin@roamly.com", password: "password123", redirect: "/dashboard" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem("roamly_auth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed?.isAuthenticated) {
          router.replace("/dashboard");
        }
      } catch (e) {
        console.warn("Failed to parse auth data from localStorage", e);
      }
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = DEMO_ACCOUNTS.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (user) {
      // Save to localStorage
      localStorage.setItem(
        "roamly_auth",
        JSON.stringify({
          role: user.role,
          email: user.email,
          isAuthenticated: true,
        })
      );

      // Redirect to the appropriate dashboard
      router.push(user.redirect);
    } else {
      setError("Invalid email or password");
    }
  };

  const handleDemoClick = (account: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-bold text-[#172554] tracking-tight" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
          Roam<span className="text-[#2563eb]">ly</span>
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-[#15201f]">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_10px_30px_rgba(11,79,74,0.1)] rounded-[18px] sm:px-10">
          
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#6b7b79] mb-3">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-3">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleDemoClick(acc)}
                  className="w-full flex justify-center py-2 px-3 border border-[#e7e1d6] rounded-xl text-sm font-semibold text-[#172554] bg-[#f8fafc] hover:bg-[#dbeafe] hover:text-[#1e40af] transition-colors"
                >
                  {acc.role}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e7e1d6]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#6b7b79]">Or login manually</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 text-sm text-[#1e40af] bg-[#dbeafe] rounded-xl text-center font-medium">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-bold text-[#15201f] mb-1.5"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] placeholder-[#6b7b79] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent sm:text-[15px]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-bold text-[#15201f] mb-1.5"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-[#e7e1d6] rounded-xl bg-[#f8fafc] placeholder-[#6b7b79] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent sm:text-[15px]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-6 border border-transparent rounded-[30px] shadow-sm text-[16px] font-bold text-white bg-[#2563eb] hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-[14px] font-medium text-[#6b7b79]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#2563eb] hover:text-[#1e40af] font-bold hover:underline">
              Guest signup
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-[#6b7b79]">
        Roamly Demo Prototype
      </div>
    </div>
  );
}
