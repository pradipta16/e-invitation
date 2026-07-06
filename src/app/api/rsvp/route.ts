import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { guestId, attending, guestCount } = body as {
    guestId: string;
    attending: boolean;
    guestCount: number;
  };

  if (!guestId || typeof attending !== "boolean") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const rsvp = await prisma.rsvp.upsert({
    where: { guestId },
    create: { guestId, attending, guestCount: guestCount ?? 1 },
    update: { attending, guestCount: guestCount ?? 1 },
  });

  return NextResponse.json({ rsvp });
}
