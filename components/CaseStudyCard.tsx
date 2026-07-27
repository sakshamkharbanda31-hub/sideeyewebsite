"use client";

import { useState } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  useKFormat?: boolean;
}

export interface CaseStudy {
  id: string;
  client: string;
  headlineStat: string;
  subtitle: string;
  challenge: string;
  strategy: string;
  stats: StatItem[];
}

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `case-study-panel-${study.id}`;
  const headerId = `case-study-header-${study.id}`;

  return (
    <article className="border border-black/10 bg-surface shadow-[8px_8px_0_0_rgba(13,13,13,0.06)] overflow-hidden">
      <div className="p-8">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          Case Study {study.id}
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
          {study.client}
        </h2>
        <p className="mt-1 text-sm font-medium text-muted">{study.subtitle}</p>

        <p className="mt-4 inline-block border border-black/10 bg-stone px-4 py-2 font-mono text-sm font-semibold text-ink">
          {study.headlineStat}
        </p>
      </div>

      <button
        id={headerId}
        type="button"
        className="flex w-full items-center justify-between gap-4 border-t border-black/10 px-8 py-4 text-left transition hover:bg-black/[0.02]"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          {isOpen ? "Hide details" : "View problem / strategy / results"}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/10 p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    Problem
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    Strategy
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {study.strategy}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  Results
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {study.stats.map((stat, i) => (
                    <AnimatedCounter
                      key={i}
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      label={stat.label}
                      useKFormat={stat.useKFormat !== false}
                      className="border border-black/10 bg-stone p-4 text-center"
                      valueClassName="font-display text-2xl font-semibold text-ink"
                      labelClassName="mt-1 text-xs text-muted"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}