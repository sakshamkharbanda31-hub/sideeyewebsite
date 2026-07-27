"use client";
import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

const REAL_COUNT_THRESHOLD = 5;

function getSessionId() {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("sev_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("sev_session_id", id);
  }
  return id;
}

export default function LiveVisitorCounter() {
  const [count, setCount] = useState(23);
  const [hovered, setHovered] = useState(false);
  const simIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSimulation = () => {
    if (simIntervalRef.current) return;
    simIntervalRef.current = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return Math.min(47, Math.max(9, next));
      });
    }, 4000);
  };

  const stopSimulation = () => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
  };

  useEffect(() => {
    const id = getSessionId();
    let cancelled = false;

    const ping = async () => {
      try {
        const res = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        if (cancelled || typeof data.count !== "number") return;

        if (data.count >= REAL_COUNT_THRESHOLD) {
          stopSimulation();
          setCount(data.count);
        } else {
          startSimulation();
        }
      } catch {
        startSimulation();
      }
    };

    ping();
    const heartbeat = setInterval(ping, 10000);

    return () => {
      cancelled = true;
      clearInterval(heartbeat);
      stopSimulation();
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 left-6 z-40 hidden sm:block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="absolute bottom-full left-0 mb-2 w-56 border border-black/10 bg-surface px-3 py-2 shadow-[4px_4px_0_0_rgba(13,13,13,0.12)]">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink">
            <span className="font-bold text-accent">{count}</span> people
            side-eyeing their competitors right now
          </p>
        </div>
      )}
      <div className="flex h-10 items-center gap-1.5 rounded-full border border-ink-solid bg-ink-solid px-3.5 text-white shadow-[4px_4px_0_0_rgba(13,13,13,0.15)]">
        <Eye className="h-3.5 w-3.5 text-accent" aria-hidden />
        <span className="font-mono text-xs font-bold">{count}</span>
      </div>
    </div>
  );
}