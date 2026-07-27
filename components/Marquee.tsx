import React, { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // duration in seconds
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`group flex overflow-hidden p-2 select-none w-full ${className}`}
      style={{ "--speed": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={`flex shrink-0 items-center justify-around gap-8 min-w-full ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-around gap-8 min-w-full ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
