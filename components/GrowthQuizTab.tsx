"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GrowthQuizTab() {
  const pathname = usePathname();

  if (pathname === "/growth-quiz") return null;

  return (
    <Link
      href="/growth-quiz"
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-l-lg border border-r-0 border-ink-solid bg-ink-solid px-3 py-4 text-white shadow-[-4px_4px_0_0_rgba(13,13,13,0.2)] transition hover:bg-accent hover:border-accent sm:flex"
      style={{ writingMode: "vertical-rl" }}
    >
      <span className="rotate-180 font-mono text-xs font-medium uppercase tracking-wider">
        Growth Velocity Quiz
      </span>
    </Link>
  );
}