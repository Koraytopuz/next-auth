// src/app/login/page.tsx

"use client"; // Bu satır mutlaka olmalı

import { signIn } from "next-auth/react"; // next-auth/react'ten import et

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-white">
          Hesabınıza Giriş Yapın
        </h2>
        <p className="mt-2 text-gray-400">
          Devam etmek için Auth0 ile giriş yapın.
        </p>
        <button
          type="button"
          onClick={() => signIn("auth0", { callbackUrl: "/dashboard" })}
          className="w-full px-4 py-2 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-800 transition-colors duration-300"
        >
          Auth0 ile Giriş Yap
        </button>
      </div>
    </div>
  );
}