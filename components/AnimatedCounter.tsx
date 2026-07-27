"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  useKFormat?: boolean;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  useKFormat = true,
  className = "border border-black/10 bg-surface p-6",
  valueClassName = "font-display text-3xl font-semibold text-ink sm:text-4xl",
  labelClassName = "mt-2 text-sm leading-relaxed text-muted",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  let formatted = "";
  if (value === 0 && count === 0) {
    formatted = `${prefix}Zero${suffix}`;
  } else if (!useKFormat) {
    formatted = `${prefix}${count.toLocaleString()}${suffix}`;
  } else {
    formatted =
      value >= 1000000
        ? `${prefix}${(count / 1000000).toFixed(count >= value ? 1 : 0)}M${suffix}`
        : value >= 1000
          ? `${prefix}${count >= value ? (value / 1000).toFixed(0) : Math.floor(count / 1000)}K${suffix}`
          : `${prefix}${count}${suffix}`;
  }

  return (
    <div ref={ref} className={className}>
      <p className={valueClassName}>{formatted}</p>
      <p className={labelClassName}>{label}</p>
    </div>
  );
}
