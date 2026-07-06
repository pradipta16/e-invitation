"use client";

import { useState } from "react";

export default function CopyLinkButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}/${code}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={copy}
      className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
    >
      {copied ? "Tersalin!" : "Salin Link"}
    </button>
  );
}
