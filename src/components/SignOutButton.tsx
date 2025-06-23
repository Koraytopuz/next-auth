// components/SignOutButton.tsx
'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="w-full max-w-xs px-4 py-3 mt-6 font-semibold text-white transition-transform duration-300 ease-in-out transform bg-gradient-to-r from-red-500 to-orange-500 rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-800"
    >
      Çıkış Yap
    </button>
  );
}