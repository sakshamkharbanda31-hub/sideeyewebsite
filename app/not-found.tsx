"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

export default function NotFound() {
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTilt((prev) => (prev === 0 ? -8 : 0));
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Error 404
      </p>

      <div className="mt-6 flex items-center justify-center gap-4 font-display text-7xl font-bold text-ink sm:text-9xl">
        <span>4</span>
        <span
          className="inline-block transition-transform duration-700 ease-in-out"
          style={{ transform: `rotate(${tilt}deg)` }}
          aria-hidden
        >
          👀
        </span>
        <span>4</span>
      </div>

      <h1 className="mt-8 max-w-xl font-display text-2xl font-bold text-ink sm:text-3xl">
        Even We&apos;re Giving This Page The Side-Eye.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        It doesn&apos;t exist, it moved, or it never had a real growth strategy
        to begin with. Unlike us.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button href="/">Back to Home</Button>
        <Button href="/contact" variant="outline">
          Talk to Us Instead
        </Button>
      </div>

      <p className="mt-16 font-mono text-[10px] uppercase tracking-widest text-muted">
        Vol. 1 &middot; Gurugram / India
      </p>
    </section>
  );
}