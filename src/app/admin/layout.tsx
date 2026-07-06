import Link from "next/link";
import type { ReactNode } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "home" },
  { href: "/admin/users", label: "Pengguna", icon: "users" },
  { href: "/admin/themes", label: "Tema / Template", icon: "grid" },
  { href: "/admin/transactions", label: "Transaksi & Pembayaran", icon: "card" },
  { href: "/admin/pricing", label: "Paket Harga", icon: "tag" },
  { href: "/admin/moderation", label: "Moderasi Konten", icon: "shield" },
  { href: "/admin/analytics", label: "Analitik & Laporan", icon: "chart" },
  { href: "/admin/settings", label: "Pengaturan Sistem", icon: "cog" },
  { href: "/admin/support", label: "Support / Tiket", icon: "chat" },
] as const;

function NavIcon({ name }: { name: string }) {
  const common = "w-5 h-5";
  switch (name) {
    case "home":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
        </svg>
      );
    case "users":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM3 21a7 7 0 0 1 14 0M17 21a6.98 6.98 0 0 0-2-4.9M15 5.3a4 4 0 0 1 0 7.4" />
        </svg>
      );
    case "grid":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "card":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path strokeLinecap="round" d="M2.5 10h19" />
        </svg>
      );
    case "tag":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 8 8-8 8-8-8 4-8h4Z" />
          <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "shield":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 4 6v6c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.5 8-9V6l-8-3Z" />
        </svg>
      );
    case "chart":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      );
    case "cog":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0A1.65 1.65 0 0 0 21 10H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      );
    case "chat":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a8 8 0 1 1-3.2-6.4M21 12v-6h-6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 shrink-0 bg-white border-r border-gray-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 px-6 py-6">
            <span className="text-2xl">💗</span>
            <div>
              <p className="font-bold leading-tight">Wedding Invitation</p>
              <p className="text-xs text-gray-500 leading-tight">Admin Dashboard</p>
            </div>
          </div>

          <nav className="px-3 space-y-1">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                  i === 0
                    ? "bg-violet-50 text-violet-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <NavIcon name={item.icon} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Kristi Kamiykova</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-gray-100 bg-white flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">Ringkasan performa platform wedding invitation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600">
              01.08.2022 – 31.08.2022
            </div>
            <button className="relative w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center">
              🔔
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-200" />
              <span className="text-sm font-medium">Kristi Kamiykova</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
