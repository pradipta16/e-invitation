import { prisma } from "@/lib/prisma";

/**
 * Priority per doc 1.2 / 3.4: guest.theme_id (override) > guest_group.theme_id > invitation.default_theme_id.
 */
export async function resolveThemeForGuest(uniqueCode: string) {
  const guest = await prisma.guest.findUnique({
    where: { uniqueCode },
    include: {
      theme: true,
      guestGroup: { include: { theme: true } },
      invitation: { include: { defaultTheme: true } },
    },
  });

  if (!guest) return null;

  const theme =
    guest.theme ?? guest.guestGroup?.theme ?? guest.invitation.defaultTheme ?? null;

  return { guest, theme };
}

export async function resolveDefaultTheme(invitationId: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    include: { defaultTheme: true },
  });

  return invitation?.defaultTheme ?? null;
}
