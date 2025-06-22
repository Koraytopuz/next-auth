import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function AdminDashboardPage() {
  const session = await auth();

  // Oturum veya kullanıcı bilgisi yoksa yönlendir.
  if (!session?.user) {
    redirect("/login");
  }

  // Admin rolü kontrolü
  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Admin Kontrol Paneli
        </h1>
        <p className="text-lg text-gray-300">
          Hoş geldin, Admin {session.user.name || "Kullanıcı"}!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">Kullanıcı Yönetimi</h3>
            <p className="text-gray-300">Kullanıcıları görüntüle ve yönet</p>
          </div>
          
          <div className="p-6 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">Sistem Ayarları</h3>
            <p className="text-gray-300">Sistem konfigürasyonlarını yönet</p>
          </div>
          
          <div className="p-6 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">Raporlar</h3>
            <p className="text-gray-300">Sistem raporlarını görüntüle</p>
          </div>
          
          <div className="p-6 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">Güvenlik</h3>
            <p className="text-gray-300">Güvenlik ayarlarını yönet</p>
          </div>
        </div>

        <div className="p-4 mt-6 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Session Bilgileri:</h3>
          <p className="font-mono text-sm text-left text-green-400 break-all">
            {JSON.stringify(session, null, 2)}
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <a
            href="/dashboard"
            className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Normal Dashboard
          </a>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
} 