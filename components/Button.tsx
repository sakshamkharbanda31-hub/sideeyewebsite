"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "border border-ink-solid bg-ink-solid text-white transition-all hover:opacity-90 hover:scale-[1.03] hover:shadow-lg dark:bg-white dark:text-ink-solid dark:border-white",
  secondary: "border border-black/10 bg-surface text-ink hover:border-black/20",
  outline:
    "border border-ink bg-transparent text-ink hover:border-accent hover:bg-accent hover:text-white",
};

export default function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const offsetX = clientX - centerX;
    const offsetY = clientY - centerY;

    const strength = 0.35;
    let moveX = offsetX * strength;
    let moveY = offsetY * strength;

    const maxDisplacement = 20;
    const currentDist = Math.sqrt(moveX * moveX + moveY * moveY);
    if (currentDist > maxDisplacement) {
      moveX = (moveX / currentDist) * maxDisplacement;
      moveY = (moveY / currentDist) * maxDisplacement;
    }

    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionLink = motion.create(Link) as any;

  return (
    <MotionLink
      ref={ref}
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </MotionLink>
  );
}


