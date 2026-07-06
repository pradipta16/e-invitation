const STATS = [
  { label: "Undangan Aktif", value: "2.450", delta: "+12.5%", icon: "✉️", tint: "bg-violet-100" },
  { label: "Total Pengguna", value: "18.920", delta: "+9.8%", icon: "👥", tint: "bg-blue-100" },
  { label: "Revenue (IDR)", value: "Rp 125.430.000", delta: "+15.3%", icon: "💳", tint: "bg-green-100" },
  { label: "Transaksi", value: "3.284", delta: "+10.1%", icon: "🖼️", tint: "bg-orange-100" },
];

const GROWTH = [
  { label: "JAN", value: 13 },
  { label: "FEB", value: 12.2 },
  { label: "MAR", value: 15.5 },
  { label: "APR", value: 16.8 },
  { label: "MEI", value: 19.5 },
  { label: "JUN", value: 14.5 },
  { label: "JUL", value: 13.8 },
  { label: "AGU", value: 8 },
  { label: "SEP", value: 15.2 },
  { label: "OKT", value: 16.2 },
  { label: "NOV", value: 15.8 },
  { label: "DES", value: 17 },
];

const TOP_THEMES = [
  { name: "Modern Elegance", count: "1.254 undangan", pct: "42%" },
  { name: "Simple Love", count: "986 undangan", pct: "33%" },
  { name: "Rustic Garden", count: "623 undangan", pct: "21%" },
  { name: "Classic Gold", count: "412 undangan", pct: "14%" },
];

const TRANSACTIONS = [
  { id: "#INV-82831", user: "Andi Pratama", plan: "Premium 12 Bulan", method: "Midtrans (VA BCA)", status: "Sukses", total: "Rp 298.000", date: "24.08.2022 14:32" },
  { id: "#INV-82830", user: "Siti Aisyah", plan: "Premium 6 Bulan", method: "Credit Card", status: "Sukses", total: "Rp 199.000", date: "24.08.2022 13:10" },
  { id: "#INV-82829", user: "Budi Santoso", plan: "Basic", method: "DANA", status: "Pending", total: "Rp 48.000", date: "24.08.2022 12:45" },
  { id: "#INV-82828", user: "Rina Amelia", plan: "Premium 12 Bulan", method: "OVO", status: "Gagal", total: "Rp 298.000", date: "24.08.2022 11:05" },
  { id: "#INV-82827", user: "Dewi Lestari", plan: "Premium 6 Bulan", method: "Midtrans (VA BRI)", status: "Refund", total: "Rp 199.000", date: "24.08.2022 10:20" },
];

const ACTIVITIES = [
  { title: "User baru mendaftar", detail: "andi.pratama@email.com", time: "2 menit lalu", icon: "👤", tint: "bg-blue-100" },
  { title: "Pembayaran berhasil", detail: "Order #INV-82831", time: "8 menit lalu", icon: "💳", tint: "bg-violet-100" },
  { title: "Tema baru ditambahkan", detail: "Modern Bloom", time: "1 jam lalu", icon: "🎨", tint: "bg-orange-100" },
  { title: "Laporan konten baru", detail: "Komentar pada undangan #12324", time: "2 jam lalu", icon: "🚩", tint: "bg-red-100" },
  { title: "Tiket baru masuk", detail: "Tentang pembayaran gagal", time: "3 jam lalu", icon: "💬", tint: "bg-blue-100" },
];

const STATUS_STYLE: Record<string, string> = {
  Sukses: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-700",
  Gagal: "bg-red-100 text-red-700",
  Refund: "bg-violet-100 text-violet-700",
};

export default function AdminDashboardPage() {
  const maxGrowth = Math.max(...GROWTH.map((g) => g.value));

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-4 gap-5">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <span className={`w-10 h-10 rounded-full ${stat.tint} flex items-center justify-center text-lg`}>
                {stat.icon}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600 font-medium">{stat.delta}</span> sejak last month
            </p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">Pertumbuhan Pengguna</h2>
            <div className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600">Per Bulan</div>
          </div>
          <div className="flex items-end justify-between gap-2 h-56">
            {GROWTH.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full max-w-6 rounded-t-md bg-violet-400"
                  style={{ height: `${(bar.value / maxGrowth) * 100}%` }}
                />
                <span className="text-[10px] text-gray-500">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Tema Paling Banyak Dipakai</h2>
            <a href="#" className="text-xs text-violet-600 font-medium">Lihat Semua</a>
          </div>
          <ul className="space-y-4">
            {TOP_THEMES.map((theme, i) => (
              <li key={theme.name} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{i + 1}. {theme.name}</p>
                  <p className="text-xs text-gray-500">{theme.count}</p>
                </div>
                <span className="text-sm font-semibold">{theme.pct}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Transaksi Terbaru</h2>
            <a href="#" className="text-xs text-violet-600 font-medium">Lihat Semua</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Pengguna</th>
                  <th className="pb-3 font-medium">Paket</th>
                  <th className="pb-3 font-medium">Metode Pembayaran</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="border-t border-gray-50">
                    <td className="py-3 font-medium">{tx.id}</td>
                    <td className="py-3">{tx.user}</td>
                    <td className="py-3">{tx.plan}</td>
                    <td className="py-3">{tx.method}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLE[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3">{tx.total}</td>
                    <td className="py-3 text-gray-500">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Aktivitas Terbaru</h2>
            <a href="#" className="text-xs text-violet-600 font-medium">Lihat Semua</a>
          </div>
          <ul className="space-y-4">
            {ACTIVITIES.map((activity) => (
              <li key={activity.title} className="flex items-start gap-3">
                <span className={`w-9 h-9 rounded-full ${activity.tint} flex items-center justify-center text-sm shrink-0`}>
                  {activity.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.detail}</p>
                </div>
                <span className="ml-auto text-xs text-gray-400 shrink-0">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
