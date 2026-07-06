import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { guestId, message } = body as { guestId: string; message: string };

  if (!guestId || !message?.trim()) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const wish = await prisma.wish.create({
    data: { guestId, message: message.trim() },
  });

  return NextResponse.json({ wish });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const guestId = searchParams.get("guestId");
  if (!guestId) return NextResponse.json({ error: "guestId required" }, { status: 400 });

  const guest = await prisma.guest.findUnique({ where: { id: guestId } });
  if (!guest) return NextResponse.json({ error: "Guest not found" }, { status: 404 });

  const wishes = await prisma.wish.findMany({
    where: { guest: { invitationId: guest.invitationId }, isApproved: true },
    orderBy: { createdAt: "desc" },
    include: { guest: { select: { name: true } } },
  });

  return NextResponse.json({ wishes });
}
