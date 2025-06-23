// app/dashboard/page.tsx

// Lütfen dosyanın içeriğini tamamen bununla değiştirin.
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardPage() {
  const session = await auth();

  // Oturum veya kullanıcı bilgisi yoksa yönlendir.
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <main className="container mx-auto px-4">
        <div className="w-full max-w-lg mx-auto bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700">
          <div className="p-8 text-center">
            
            <div className="relative w-24 h-24 mx-auto mb-6">
              <Image
                src={session.user.image || `https://avatar.vercel.sh/${session.user.email}.png`}
                alt="User Avatar"
                layout="fill"
                className="rounded-full object-cover border-4 border-gray-700"
              />
            </div>

            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
              Hoş Geldin!
            </h1>
            <p className="text-xl text-gray-300 font-medium mb-6">
              {session.user.name || "Kullanıcı"}
            </p>

            <div className="bg-gray-700/50 rounded-lg px-4 py-2 mb-8 inline-flex items-center">
              <span className="text-sm font-semibold text-gray-400 mr-2">ROL:</span>
              <span className="text-sm font-bold uppercase text-green-400">{session.user.role}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session.user.role === "admin" && (
                <a
                  href="/dashboard/admin"
                  className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition-opacity duration-300"
                >
                  Admin Paneline Git
                </a>
              )}
              <SignOutButton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}