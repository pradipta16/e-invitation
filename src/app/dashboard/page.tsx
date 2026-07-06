import { prisma } from "@/lib/prisma";
import { approveWish, rejectWish } from "./actions";
import CopyLinkButton from "./copy-link-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const invitation = await prisma.invitation.findFirst({
    include: {
      defaultTheme: true,
      themes: true,
      guestGroups: { include: { theme: true } },
      guests: {
        include: {
          theme: true,
          guestGroup: { include: { theme: true } },
          rsvp: true,
        },
        orderBy: { name: "asc" },
      },
    },
  });

  if (!invitation) {
    return (
      <main className="p-10">
        <p>Belum ada undangan. Jalankan `npm run seed` dulu.</p>
      </main>
    );
  }

  const pendingWishes = await prisma.wish.findMany({
    where: { guest: { invitationId: invitation.id }, isApproved: false },
    include: { guest: { select: { name: true } } },
    orderBy: { createdAt: "asc" },
  });

  const attendingCount = invitation.guests.filter((g) => g.rsvp?.attending).length;
  const notAttendingCount = invitation.guests.filter((g) => g.rsvp && !g.rsvp.attending).length;
  const noResponseCount = invitation.guests.filter((g) => !g.rsvp).length;

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-10">
      <header>
        <h1 className="text-2xl font-bold">{invitation.eventName}</h1>
        <p className="text-sm opacity-70">
          {invitation.eventDate.toLocaleDateString("id-ID")} · Default tema: {invitation.defaultTheme?.name ?? "-"}
        </p>
      </header>

      <section className="grid grid-cols-3 gap-4 text-center">
        <div className="border rounded-xl p-4">
          <p className="text-2xl font-bold">{attendingCount}</p>
          <p className="text-sm opacity-70">Hadir</p>
        </div>
        <div className="border rounded-xl p-4">
          <p className="text-2xl font-bold">{notAttendingCount}</p>
          <p className="text-sm opacity-70">Tidak Hadir</p>
        </div>
        <div className="border rounded-xl p-4">
          <p className="text-2xl font-bold">{noResponseCount}</p>
          <p className="text-sm opacity-70">Belum Respon</p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Daftar Tamu</h2>
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-3">Nama</th>
                <th className="p-3">Grup</th>
                <th className="p-3">Tema Berlaku</th>
                <th className="p-3">RSVP</th>
                <th className="p-3">Link</th>
              </tr>
            </thead>
            <tbody>
              {invitation.guests.map((guest) => {
                const resolvedTheme = guest.theme ?? guest.guestGroup?.theme;
                return (
                  <tr key={guest.id} className="border-t">
                    <td className="p-3">{guest.name}</td>
                    <td className="p-3">{guest.guestGroup?.name ?? "-"}</td>
                    <td className="p-3">
                      {resolvedTheme?.name ?? invitation.defaultTheme?.name ?? "-"}
                      {guest.theme && <span className="ml-1 text-xs opacity-60">(override)</span>}
                    </td>
                    <td className="p-3">
                      {guest.rsvp
                        ? guest.rsvp.attending
                          ? `Hadir (${guest.rsvp.guestCount})`
                          : "Tidak hadir"
                        : "-"}
                    </td>
                    <td className="p-3">
                      <CopyLinkButton code={guest.uniqueCode} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Moderasi Ucapan ({pendingWishes.length})</h2>
        {pendingWishes.length === 0 ? (
          <p className="text-sm opacity-70">Tidak ada ucapan menunggu moderasi.</p>
        ) : (
          <ul className="space-y-2">
            {pendingWishes.map((wish) => (
              <li key={wish.id} className="border rounded-xl p-3 flex justify-between items-start gap-3">
                <div>
                  <p className="font-medium text-sm">{wish.guest.name}</p>
                  <p className="text-sm opacity-80">{wish.message}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <form action={approveWish.bind(null, wish.id)}>
                    <button className="text-xs px-2 py-1 border rounded bg-green-50 hover:bg-green-100">
                      Setujui
                    </button>
                  </form>
                  <form action={rejectWish.bind(null, wish.id)}>
                    <button className="text-xs px-2 py-1 border rounded bg-red-50 hover:bg-red-100">
                      Tolak
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
