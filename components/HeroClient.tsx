"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import HeroVideoBackground from "@/components/VideoSection";
import SpotlightContainer from "@/components/SpotlightContainer";
import { siteConfig } from "@/lib/site-config";

export default function HeroClient() {
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

  const headline = (
    <>
      While Your Competitors Run $5 Ads, We{" "}
      <span className="text-accent">Automate</span> Their Market Share.
    </>
  );

  return (
    <section className="relative overflow-hidden border-b border-black/10">
      <HeroVideoBackground videoSrc={heroVideo || siteConfig.heroVideoUrl} />
      <div className="absolute inset-0 bg-stone/40 dark:bg-black/55" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-12 lg:px-8 lg:py-24">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            An independent growth ecosystem - est. Gurugram
          </p>

          {showAnim ? (
            <motion.h1
              className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:mt-6 sm:text-5xl sm:leading-[1.05] lg:text-7xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.0 }}
            >
              {headline}
            </motion.h1>
          ) : (
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:mt-6 sm:text-5xl sm:leading-[1.05] lg:text-7xl">
              {headline}
            </h1>
          )}

          {showAnim ? (
            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-muted [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:text-white/85 dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.6)] sm:mt-8 sm:text-lg lg:text-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              Stop relying on 2019 tactics. We give traditional agencies the side-eye
              so you can give your industry a masterclass.
            </motion.p>
          ) : (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted [text-shadow:0_1px_2px_rgba(0,0,0,0.15)] dark:text-white/85 dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.6)] sm:mt-8 sm:text-lg lg:text-xl">
              Stop relying on 2019 tactics. We give traditional agencies the side-eye
              so you can give your industry a masterclass.
            </p>
          )}

          {showAnim ? (
            <motion.p
              className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
            >
              <span className="sm:hidden">
                Meta-compliant automation meets real B2B execution. No bloated decks, no empty retainers.
              </span>
              <span className="hidden sm:inline">
                We run a dual-powered growth ecosystem: high-converting B2B execution
                combined with Meta-compliant automated infrastructure. No bloated decks,
                no empty retainer fees. Just pure revenue velocity.
              </span>
            </motion.p>
          ) : (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              <span className="sm:hidden">
                Meta-compliant automation meets real B2B execution. No bloated decks, no empty retainers.
              </span>
              <span className="hidden sm:inline">
                We run a dual-powered growth ecosystem: high-converting B2B execution
                combined with Meta-compliant automated infrastructure. No bloated decks,
                no empty retainer fees. Just pure revenue velocity.
              </span>
            </p>
          )}

          {showAnim ? (
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 }}
            >
              <Button href="/services">Launch Engine 1</Button>
              <Button href="/tools" variant="outline">
                Explore Engine 2
              </Button>
            </motion.div>
          ) : (
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Button href="/services">Launch Engine 1</Button>
              <Button href="/tools" variant="outline">
                Explore Engine 2
              </Button>
            </div>
          )}
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