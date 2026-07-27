"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "@/components/TiltCard";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FAQItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/10 border border-black/10 bg-surface">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        const header = (
          <button
            id={buttonId}
            type="button"
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-black/[0.02]"
            onClick={() => setOpenIndex(isOpen ? null : index)}
            aria-expanded={isOpen}
            aria-controls={panelId}
          >
            <span className="font-medium text-ink">{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                isOpen ? "rotate-180 text-accent" : "text-accent/60"
              }`}
              aria-hidden
            />
          </button>
        );

        return (
          <div key={item.question}>
            {/* Wrap closed headers in TiltCard; open headers stay flat */}
            {isOpen ? header : <TiltCard className="w-full">{header}</TiltCard>}

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
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
                  <div className="px-6 pb-5 text-sm leading-relaxed text-muted">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}