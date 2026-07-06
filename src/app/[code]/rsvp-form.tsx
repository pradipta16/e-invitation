"use client";

import { useState } from "react";

export default function RsvpForm({
  guestId,
  accentColor,
}: {
  guestId: string;
  accentColor: string;
}) {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function submit() {
    if (attending === null) return;
    setStatus("sending");
    await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guestId, attending, guestCount }),
    });
    setStatus("sent");
  }

  if (status === "sent") {
    return <p className="text-center">Terima kasih, RSVP kamu sudah tercatat.</p>;
  }

  return (
    <section className="w-full max-w-sm space-y-3 border rounded-xl p-5" style={{ borderColor: accentColor }}>
      <h2 className="font-semibold text-center">Konfirmasi Kehadiran</h2>
      <div className="flex gap-3 justify-center">
        <button
          className="px-4 py-2 rounded-lg border"
          style={{ borderColor: accentColor, opacity: attending === true ? 1 : 0.5 }}
          onClick={() => setAttending(true)}
        >
          Hadir
        </button>
        <button
          className="px-4 py-2 rounded-lg border"
          style={{ borderColor: accentColor, opacity: attending === false ? 1 : 0.5 }}
          onClick={() => setAttending(false)}
        >
          Tidak Hadir
        </button>
      </div>
      {attending && (
        <label className="flex flex-col items-center gap-1 text-sm">
          Jumlah orang
          <input
            type="number"
            min={1}
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1 text-center"
          />
        </label>
      )}
      <button
        onClick={submit}
        disabled={attending === null || status === "sending"}
        className="w-full py-2 rounded-lg text-white disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {status === "sending" ? "Mengirim..." : "Kirim RSVP"}
      </button>
    </section>
  );
}
