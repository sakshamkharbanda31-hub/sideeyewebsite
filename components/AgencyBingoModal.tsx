"use client";
import { useState } from "react";
import { X, RotateCcw, Share2, Check } from "lucide-react";

const PHRASES = [
  "Let's circle back",
  "Can you make the logo bigger?",
  "We need more synergy",
  "Think outside the box",
  "Let's take this offline",
  "It's more of a brand play",
  "We'll 10x this",
  "Low-hanging fruit",
  "Let's boil the ocean",
  "Move the needle",
  "Deep dive on this",
  "Circling the wagons",
  "SIDE EYE.IN",
  "Let's socialize this",
  "Best practice, honestly",
  "We're pivoting the strategy",
  "Growth hacking, essentially",
  "Let's take a step back",
  "It's giving corporate",
  "Bandwidth is tight this week",
  "Let's align offline",
  "Data-driven, obviously",
  "We need a bigger budget",
  "Can we A/B test the font?",
  "Loop in stakeholders",
];

const CENTER_INDEX = 12;

const LINES = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

export default function AgencyBingoModal({ onClose }: { onClose: () => void }) {
  const [marked, setMarked] = useState<Set<number>>(new Set([CENTER_INDEX]));
  const [copied, setCopied] = useState(false);

  const toggle = (i: number) => {
    if (i === CENTER_INDEX) return;
    setMarked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const winningLine = LINES.find((line) => line.every((i) => marked.has(i)));
  const won = Boolean(winningLine);

  const reset = () => {
    setMarked(new Set([CENTER_INDEX]));
    setCopied(false);
  };

  const shareText =
    "I just got BINGO on SideEye's Agency Bingo. Survived every agency cliche in the book. Try it: https://sideeye.in/faqs";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const whatsappShareUrl = "https://wa.me/?text=" + encodeURIComponent(shareText);

  const handleWhatsappShare = () => {
    window.open(whatsappShareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-black/10 bg-surface p-6 shadow-[12px_12px_0_0_rgba(13,13,13,0.2)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              You found it
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
              Agency Bingo
            </h2>
            {!won && (
              <p className="mt-2 text-sm text-muted">
                Click a square every time you&apos;ve heard it from an agency.
                Get five in a row.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-sm p-2 text-ink hover:bg-black/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {won ? (
          <div className="mt-8 flex flex-col items-center text-center">
            <span className="text-5xl" aria-hidden>
              👀
            </span>
            <p className="mt-4 font-display text-2xl font-bold text-accent sm:text-3xl">
              BINGO!
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              You&apos;ve officially survived the agency-speak gauntlet. We
              promise we don&apos;t talk like this. Mostly.
            </p>

            <div className="mt-8 grid w-full max-w-xs grid-cols-5 gap-1.5">
              {PHRASES.map((_, i) => {
                const isOnWinLine = winningLine?.includes(i);
                const isCenter = i === CENTER_INDEX;
                return (
                  <div
                    key={i}
                    className={`aspect-square border ${
                      isOnWinLine || isCenter
                        ? "border-accent bg-accent"
                        : marked.has(i)
                          ? "border-ink-solid bg-ink-solid"
                          : "border-black/10 bg-background"
                    }`}
                  />
                );
              })}
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-solid bg-ink-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden />
                    Copied
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" aria-hidden />
                    Copy Result
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleWhatsappShare}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-surface px-5 py-2.5 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                Share on WhatsApp
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-surface px-5 py-2.5 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Play Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-5 gap-1.5 sm:gap-2">
              {PHRASES.map((phrase, i) => {
                const isMarked = marked.has(i);
                const isCenter = i === CENTER_INDEX;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggle(i)}
                    className={`flex aspect-square items-center justify-center border p-1.5 text-center font-mono text-[9px] font-medium uppercase leading-tight transition sm:text-[10px] ${
                      isCenter
                        ? "border-ink-solid bg-ink-solid text-white"
                        : isMarked
                          ? "border-accent bg-accent text-white"
                          : "border-black/10 bg-background text-ink hover:border-accent/50"
                    }`}
                  >
                    {phrase}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {marked.size - 1} / 24 marked
              </p>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted transition hover:text-accent"
              >
                <RotateCcw className="h-3 w-3" aria-hidden />
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}