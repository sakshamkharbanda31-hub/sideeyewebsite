"use client";

import { useEffect, useState } from "react";

const defaultMetrics = [
  "Rs. 45M+ Pipeline Won",
  "1.2M+ Messages Delivered",
  "#1 AI Search Ranking",
];

export default function ResultsTicker() {
  const [metrics, setMetrics] = useState<string[]>(defaultMetrics);

  useEffect(() => {
    fetch("/api/admin/content?pageKey=results-ticker")
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.metrics && Array.isArray(data.data.metrics)) {
          setMetrics(data.data.metrics);
        }
      })
      .catch(() => {});
  }, []);

  const items = [...metrics, ...metrics, ...metrics, ...metrics];

  return (
    <section
      aria-label="Key results ticker"
      className="border-b border-black/10 bg-ink-solid overflow-hidden py-4"
    >
      <div className="animate-ticker flex whitespace-nowrap">
        {items.map((metric, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center gap-6 px-8 font-mono text-xs uppercase tracking-[0.25em] text-white/80"
          >
            {metric}
            <span className="text-accent select-none" aria-hidden>
              *
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}