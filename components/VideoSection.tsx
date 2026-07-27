"use client";

export default function HeroVideoBackground({ videoSrc }: { videoSrc: string }) {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover grayscale"
      src={videoSrc}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}