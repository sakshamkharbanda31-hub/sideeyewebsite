"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, Phone, MessageCircle, ArrowUp, Calendar } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function FloatingQuickActions() {
  const [open, setOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const baseActions = [
    { label: "Contact Us", icon: Phone, href: "/contact", external: false },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/" + siteConfig.whatsappNumber,
      external: true,
    },
    { label: "Book a Call", icon: Calendar, href: "/contact", external: false },
  ];

  const backToTopAction = {
    label: "Back to Top",
    icon: ArrowUp,
    href: "#top",
    external: false,
  };

  const actions = showBackToTop ? [...baseActions, backToTopAction] : baseActions;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="w-56 overflow-hidden border border-black/10 bg-surface shadow-[8px_8px_0_0_rgba(13,13,13,0.12)]">
          <p className="border-b border-black/10 bg-stone px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Quick Actions
          </p>
          <div className="flex flex-col">
            {actions.map((action) => {
              const Icon = action.icon;

              if (action.label === "Back to Top") {
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={handleBackToTop}
                    className="flex items-center gap-3 border-b border-black/5 px-4 py-3 text-left text-sm text-ink transition last:border-b-0 hover:bg-accent/5 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {action.label}
                  </button>
                );
              }

              return (
                <Link
                  key={action.label}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-black/5 px-4 py-3 text-sm text-ink transition last:border-b-0 hover:bg-accent/5 hover:text-accent"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-solid bg-ink-solid text-white shadow-[6px_6px_0_0_rgba(13,13,13,0.2)] transition hover:scale-105 hover:bg-accent hover:border-accent sm:h-14 sm:w-14"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <span className="text-xl leading-none" aria-hidden>👀</span>
        )}
      </button>
    </div>
  );
}


