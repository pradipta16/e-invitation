"use client";

import { useState } from "react";

export default function WishForm({
  guestId,
  accentColor,
}: {
  guestId: string;
  accentColor: string;
}) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function submit() {
    if (!message.trim()) return;
    setStatus("sending");
    await fetch("/api/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guestId, message }),
    });
    setMessage("");
    setStatus("sent");
  }

  return (
    <section className="w-full max-w-sm space-y-3 border rounded-xl p-5" style={{ borderColor: accentColor }}>
      <h2 className="font-semibold text-center">Ucapan & Doa</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        placeholder="Tulis ucapan/doa..."
        className="w-full border rounded-lg p-2"
      />
      <button
        onClick={submit}
        disabled={status === "sending"}
        className="w-full py-2 rounded-lg text-white disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {status === "sending" ? "Mengirim..." : "Kirim Ucapan"}
      </button>
      {status === "sent" && (
        <p className="text-xs text-center opacity-70">
          Terkirim, menunggu moderasi sebelum tampil publik.
        </p>
      )}
    </section>
  );
}
