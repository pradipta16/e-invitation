import { prisma } from "@/lib/prisma";

export default async function WishList({ guestId }: { guestId: string }) {
  const guest = await prisma.guest.findUnique({ where: { id: guestId } });
  if (!guest) return null;

  const wishes = await prisma.wish.findMany({
    where: { guest: { invitationId: guest.invitationId }, isApproved: true },
    orderBy: { createdAt: "desc" },
    include: { guest: { select: { name: true } } },
    take: 20,
  });

  if (wishes.length === 0) return null;

  return (
    <section className="w-full max-w-sm space-y-3">
      <h2 className="font-semibold text-center">Ucapan dari Tamu</h2>
      <ul className="space-y-2">
        {wishes.map((wish) => (
          <li key={wish.id} className="border rounded-lg p-3 text-sm">
            <p className="font-medium">{wish.guest.name}</p>
            <p className="opacity-80">{wish.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
