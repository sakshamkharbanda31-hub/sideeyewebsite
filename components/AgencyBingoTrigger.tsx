"use client";
import { useState } from "react";
import AgencyBingoModal from "@/components/AgencyBingoModal";

export default function AgencyBingoTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 border border-black/10 bg-surface px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition hover:border-accent hover:text-accent"
        >
          <span aria-hidden>👀</span>
          Play Agency Bingo
        </button>
      </div>
      {open && <AgencyBingoModal onClose={() => setOpen(false)} />}
    </>
  );
}