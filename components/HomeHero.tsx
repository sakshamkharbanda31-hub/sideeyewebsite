"use client";

import React from "react";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import HeroVideoBackground from "@/components/VideoSection";
import SpotlightContainer from "@/components/SpotlightContainer";
import { siteConfig } from "@/lib/site-config";
import { motion, useScroll, useTransform } from "framer-motion";

interface HomeHeroProps {
  eyebrow: string;
  headline: string;
  highlightWord: string;
  subheadline: string;
  supportingText: string;
  button1Text: string;
  button2Text: string;
}

export default function HomeHero({
  eyebrow,
  headline,
  highlightWord,
  subheadline,
  supportingText,
  button1Text,
  button2Text,
}: HomeHeroProps) {
  const [showAnim, setShowAnim] = React.useState(false);

  React.useEffect(() => {
    const alreadyAnimated = sessionStorage.getItem("heroAnimated");
    if (!alreadyAnimated) {
      setShowAnim(true);
      const timer = setTimeout(() => {
        sessionStorage.setItem("heroAnimated", "true");
        setShowAnim(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 80]);

  const renderHeadline = () => {
    if (highlightWord && headline.includes(highlightWord)) {
      const parts = headline.split(highlightWord);
      return (
        <>
          {parts[0]}
          <span className="text-accent">{highlightWord}</span>
          {parts.slice(1).join(highlightWord)}
        </>
      );
    }
    return headline;
  };

  return (
    <section className="relative overflow-hidden border-b border-black/10">
      <HeroVideoBackground videoSrc={siteConfig.heroVideoUrl} />
      <div className="absolute inset-0 bg-stone/40" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-12 lg:px-8 lg:py-24">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </p>

          {showAnim ? (
            <motion.h1
              className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.0 }}
            >
              {renderHeadline()}
            </motion.h1>
          ) : (
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {renderHeadline()}
            </h1>
          )}

          {showAnim ? (
            <motion.p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              {subheadline}
            </motion.p>
          ) : (
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              {subheadline}
            </p>
          )}

          {showAnim ? (
            <motion.p
              className="mt-4 max-w-2xl text-base leading-relaxed text-muted"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
            >
              {supportingText}
            </motion.p>
          ) : (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {supportingText}
            </p>
          )}

          {showAnim ? (
            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 }}
            >
              <Button href="/services">{button1Text}</Button>
              <Button href="/tools" variant="outline">
                {button2Text}
              </Button>
            </motion.div>
          ) : (
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/services">{button1Text}</Button>
              <Button href="/tools" variant="outline">
                {button2Text}
              </Button>
            </div>
          )}
        </FadeIn>

        <FadeIn delay={0.15}>
          <motion.div style={{ y }} className="flex flex-col gap-0 border border-black/10">
            <div className="bg-surface p-6 shadow-[8px_8px_0_0_rgba(13,13,13,0.08)]">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Issue No 01
              </p>
              <p className="mt-2 font-display text-4xl font-bold text-ink">2026</p>
              <div className="mt-4 h-px w-full bg-ink/20" />
              <p className="mt-4 text-sm leading-relaxed text-muted">
                A field manual for founders who want an agency that thinks like a
                marketer and executes like an operator.
              </p>
            </div>
            <SpotlightContainer className="bg-ink-solid p-6 text-white">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                On the cover
              </p>
              <p className="mt-2 font-display text-xl italic">
                &ldquo;No bloated decks. Built to ship.&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/50">
                <span>Vol. 1</span>
                <span>Gurugram / India</span>
              </div>
            </SpotlightContainer>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}