"use client";
import { useEffect, useRef, useState } from "react";

const PATH_D = "M0,34 L150,28 L300,32 L450,18 L600,24 L750,10 L900,16 L1050,4 L1200,8";

export default function ScrollGrowthBar() {
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [marker, setMarker] = useState({ x: 0, y: 34 });

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(pct);
      if (pathRef.current && length > 0) {
        const point = pathRef.current.getPointAtLength(length * pct);
        setMarker({ x: point.x, y: point.y });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [length]);

  return (
    <div className="sticky top-0 z-[60] h-7 w-full border-b border-black/10 bg-surface">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="#e8b04b" />
          </linearGradient>
        </defs>
        <path d={PATH_D} fill="none" stroke="var(--ink)" strokeOpacity={0.1} strokeWidth={2} />
        <path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke="url(#growthGradient)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={length}
          strokeDashoffset={length - length * progress}
        />
        {progress > 0 && <circle cx={marker.x} cy={marker.y} r={4} fill="url(#growthGradient)" />}
      </svg>
    </div>
  );
}