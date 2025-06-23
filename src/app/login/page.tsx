// src/app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSignIn = async () => {
    try {
      await signIn("auth0", { 
        callbackUrl,
        redirect: true 
      });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg text-center">
        <div>
          <img
            src="/kayra_export.jpeg"
            alt="Kayra Export Logo"
            className="mx-auto mb-4 w-20 h-20 rounded-full object-cover border-4 border-gray-700"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Hesabınıza Giriş Yapın
          </h2>
          <p className="mt-2 text-gray-400">
            Devam etmek için Auth0 ile giriş yapın.
          </p>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full px-4 py-2 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-800 transition-colors duration-300"
        >
          Auth0 ile Giriş Yap
        </button>
      </div>
    </div>
  );
}