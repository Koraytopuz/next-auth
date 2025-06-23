import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
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

  const adminCards = [
    {
      title: "Kullanıcı Yönetimi",
      description: "Kullanıcıları görüntüle ve yönet",
      icon: "/users.svg",
    },
    {
      title: "Sistem Ayarları",
      description: "Sistem konfigürasyonlarını yönet",
      icon: "/settings.svg",
    },
    {
      title: "Raporlar",
      description: "Sistem raporlarını görüntüle",
      icon: "/chart.svg",
    },
    {
      title: "Güvenlik",
      description: "Güvenlik ayarlarını yönet",
      icon: "/shield.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
              Admin Paneli
            </h1>
            <p className="text-lg text-gray-300">
              Hoş geldin, <span className="font-semibold">{session.user.name || "Admin"}</span>!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="px-5 py-2.5 font-medium bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-center transition-colors">
              User Dashboard
            </a>
            <SignOutButton />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {adminCards.map((card) => (
            <div key={card.title} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-500/10 mb-6">
                <Image src={card.icon} alt={card.title} width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
} 