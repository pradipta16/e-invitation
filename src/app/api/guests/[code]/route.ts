import { NextResponse } from "next/server";
import { resolveThemeForGuest } from "@/lib/theme-resolver";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const result = await resolveThemeForGuest(code);

  if (!result) {
    return NextResponse.json({ error: "Guest not found" }, { status: 404 });
  }

  return NextResponse.json({
    guest: {
      id: result.guest.id,
      name: result.guest.name,
    },
    theme: result.theme,
  });
}
