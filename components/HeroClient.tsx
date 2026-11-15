"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import HeroVideoBackground from "@/components/VideoSection";
import SpotlightContainer from "@/components/SpotlightContainer";
import { siteConfig } from "@/lib/site-config";
import { homeHeroDefaults, type HomeHeroContent } from "@/lib/homeHero";

function Appear({
  show,
  tag,
  delay,
  offset = -10,
  className,
  children,
}: {
  show: boolean;
  tag: "h1" | "p" | "div";
  delay: number;
  offset?: number;
  className?: string;
  children: React.ReactNode;
}) {
  if (show) {
    const M: any = tag === "h1" ? motion.h1 : tag === "div" ? motion.div : motion.p;
    return (
      <M
        className={className}
        initial={{ opacity: 0, y: offset }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay }}
      >
        {children}
      </M>
    );
  }
  const T: any = tag;
  return <T className={className}>{children}</T>;
}

function renderHeadline(headline: string, word: string) {
  if (!word) return headline;
  const i = headline.indexOf(word);
  if (i === -1) return headline;
  return (
    <>
      {headline.slice(0, i)}
      <span className="text-accent">{word}</span>
      {headline.slice(i + word.length)}
    </>
  );
}

export default function HeroClient({
  content = homeHeroDefaults,
}: {
  content?: HomeHeroContent;
}) {
  const [showAnim, setShowAnim] = React.useState(false);
  const [heroVideo, setHeroVideo] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/admin/hero-video")
      .then((res) => res.json())
      .then((data) => {
        if (data.videoPath) setHeroVideo(data.videoPath);
      })
      .catch(() => {});
  }, []);

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

  const headline = renderHeadline(content.headline, content.highlightWord);

  return (
    <section className="relative overflow-hidden border-b border-black/10">
      <HeroVideoBackground videoSrc={heroVideo || siteConfig.heroVideoUrl} />
      <div className="absolute inset-0 bg-stone/40 dark:bg-black/55" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-12 lg:px-8 lg:py-24">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            {content.eyebrow}
          </p>

          <Appear
            show={showAnim}
            tag="h1"
            delay={0}
            offset={-20}
            className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:mt-6 sm:text-5xl sm:leading-[1.05] lg:text-7xl"
          >
            {headline}
          </Appear>

          <Appear
            show={showAnim}
            tag="p"
            delay={0.1}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:text-white/85 dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.6)] sm:mt-8 sm:text-lg lg:text-xl"
          >
            {content.subheadline}
          </Appear>

          <Appear
            show={showAnim}
            tag="p"
            delay={0.2}
            className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base"
          >
            <span className="sm:hidden">
              Meta-compliant automation meets real B2B execution. No bloated decks, no empty retainers.
            </span>
            <span className="hidden sm:inline">{content.supportingText}</span>
          </Appear>

          <Appear
            show={showAnim}
            tag="div"
            delay={0.3}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <Button href="/services">{content.button1Text}</Button>
            <Button href="/tools" variant="outline">
              {content.button2Text}
            </Button>
          </Appear>
        </FadeIn>

        <FadeIn delay={0.15} className="hidden lg:block">
          <motion.div style={{ y }} className="flex flex-col gap-0 border border-black/10 dark:border-white/10">
            <div className="border-b border-black/5 bg-surface p-6 shadow-[8px_8px_0_0_rgba(13,13,13,0.08)] dark:border-white/10 dark:bg-[#232323] sm:p-7">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Issue No 01
              </p>
              <p className="mt-3 font-display text-4xl font-bold text-ink">2026</p>
              <div className="mt-5 h-px w-full bg-ink/20" />
              <p className="mt-5 text-sm leading-relaxed text-muted">
                A field manual for founders who want an agency that thinks like a
                marketer and executes like an operator.
              </p>
            </div>
            <SpotlightContainer className="bg-ink-solid p-6 text-white sm:p-7">
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