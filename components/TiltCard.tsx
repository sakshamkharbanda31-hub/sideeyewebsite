"use client";

import React, { useRef, useState, useEffect } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // max tilt degrees
  perspective?: number; // perspective pixels
}

export default function TiltCard({
  children,
  className = "",
  maxRotation = 8,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasHoverSupport, setHasHoverSupport] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect hover support (true for desktop mouse, false for touch devices)
    const hoverQuery = window.matchMedia("(hover: hover)");
    setHasHoverSupport(hoverQuery.matches);
    const hoverHandler = (e: MediaQueryListEvent) => setHasHoverSupport(e.matches);
    hoverQuery.addEventListener("change", hoverHandler);

    // Detect reduced motion preferences
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);

    return () => {
      hoverQuery.removeEventListener("change", hoverHandler);
      motionQuery.removeEventListener("change", motionHandler);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !hasHoverSupport || reducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative mouse position from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    
    setRotateX(-relativeY * maxRotation);
    setRotateY(relativeX * maxRotation);
  };

  const handleMouseEnter = () => {
    if (!hasHoverSupport || reducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const shouldTilt = isHovered && hasHoverSupport && !reducedMotion;

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: shouldTilt
          ? `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
