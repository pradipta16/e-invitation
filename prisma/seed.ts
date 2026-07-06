import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const invitation = await prisma.invitation.create({
    data: {
      ownerId: "owner-demo",
      eventName: "Pernikahan Budi & Ani",
      eventDate: new Date("2026-09-12"),
    },
  });

  const [elegan, adat, modern] = await Promise.all([
    prisma.theme.create({
      data: {
        invitationId: invitation.id,
        name: "Elegan",
        config: { primaryColor: "#1f2937", font: "Playfair Display", animation: "fade" },
      },
    }),
    prisma.theme.create({
      data: {
        invitationId: invitation.id,
        name: "Adat",
        config: { primaryColor: "#7c2d12", font: "Merriweather", animation: "slide" },
      },
    }),
    prisma.theme.create({
      data: {
        invitationId: invitation.id,
        name: "Modern",
        config: { primaryColor: "#0ea5e9", font: "Poppins", animation: "zoom" },
      },
    }),
  ]);

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: { defaultThemeId: modern.id },
  });

  const keluarga = await prisma.guestGroup.create({
    data: { invitationId: invitation.id, themeId: adat.id, name: "Keluarga" },
  });

  const kolega = await prisma.guestGroup.create({
    data: { invitationId: invitation.id, themeId: elegan.id, name: "Kolega" },
  });

  await prisma.guest.createMany({
    data: [
      {
        invitationId: invitation.id,
        guestGroupId: keluarga.id,
        name: "Siti (Keluarga)",
        uniqueCode: "SITI01",
        phone: "081200000001",
      },
      {
        invitationId: invitation.id,
        guestGroupId: kolega.id,
        name: "Budi (Kolega)",
        uniqueCode: "BUDI01",
        phone: "081200000002",
      },
      {
        invitationId: invitation.id,
        guestGroupId: keluarga.id,
        themeId: modern.id,
        name: "Rian (Override Modern)",
        uniqueCode: "RIAN01",
        phone: "081200000003",
      },
      {
        invitationId: invitation.id,
        name: "Tamu Tanpa Grup",
        uniqueCode: "UMUM01",
      },
    ],
  });

  console.log("Seed selesai. Invitation ID:", invitation.id);
  console.log("Coba akses kode: SITI01, BUDI01, RIAN01, UMUM01");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
