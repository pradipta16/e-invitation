import { notFound } from "next/navigation";
import { resolveThemeForGuest } from "@/lib/theme-resolver";
import RsvpForm from "./rsvp-form";
import WishForm from "./wish-form";
import WishList from "./wish-list";

type ThemeConfig = {
  primaryColor?: string;
  font?: string;
  animation?: string;
};

export default async function GuestInvitationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const result = await resolveThemeForGuest(code);

  if (!result) notFound();

  const { guest, theme } = result;
  const config = (theme?.config ?? {}) as ThemeConfig;
  const primaryColor = config.primaryColor ?? "#111827";

  return (
    <main
      className="min-h-screen flex flex-col items-center gap-8 px-6 py-16"
      style={{ backgroundColor: `${primaryColor}0d`, color: primaryColor }}
    >
      <section className="text-center space-y-2">
        <p className="uppercase tracking-widest text-sm opacity-70">
          Tema: {theme?.name ?? "Default"}
        </p>
        <h1 className="text-3xl font-bold">Halo, {guest.name}</h1>
        <p className="opacity-80">Kamu diundang ke acara kami.</p>
      </section>

      <RsvpForm guestId={guest.id} accentColor={primaryColor} />
      <WishForm guestId={guest.id} accentColor={primaryColor} />
      <WishList guestId={guest.id} />
    </main>
  );
}
