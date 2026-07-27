import React from "react";
import Link from "next/link";
import Image from "next/image";
import ComplianceBanner from "@/components/ComplianceBanner";
import ResultsTicker from "@/components/ResultsTicker";
import HeroClient from "@/components/HeroClient";
import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
import Marquee from "@/components/Marquee";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { getBanner } from "@/lib/getBanner";

export default async function HomePage() {
  const homeBanner = await getBanner("home");
  return (
    <>
      <HeroClient />

      {/* Results Ticker */}
      <ResultsTicker />

      {/* Compliance badges */}
      <section className="border-b border-black/10 py-6 sm:py-8">
        <FadeIn delay={0.1}>
          <ComplianceBanner />
        </FadeIn>
      </section>

      {/* Dual engine */}
      <section className="border-b border-black/10 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              The ecosystem
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
              Two Engines. One Unfair Advantage.
            </h2>
          </FadeIn>

          <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-2">
            <FadeIn>
              <article className="group h-full border-t-4 border-t-accent border border-black/10 bg-surface p-6 shadow-[8px_8px_0_0_rgba(13,13,13,0.08)] transition hover:-translate-y-1 sm:p-8">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Engine 01
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">
                  The Muscle (Services)
                </h3>
                <p className="mt-3 text-sm text-muted sm:mt-4 sm:text-base">
                  High-stakes social execution, LinkedIn authority branding, and
                  dominating search - both Google and AI models.
                </p>
                <p className="mt-3 text-sm font-medium text-ink sm:text-base">
                  Beautiful posts don&apos;t mean a thing if they don&apos;t print leads.
                </p>
                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink transition group-hover:gap-3 group-hover:text-accent sm:mt-6"
                >
                  View Services <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            </FadeIn>

            <FadeIn delay={0.1}>
              <article className="group h-full border-t-4 border-t-accent border border-black/10 bg-surface p-6 shadow-[8px_8px_0_0_rgba(13,13,13,0.08)] transition hover:-translate-y-1 sm:p-8">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Engine 02
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">
                  The Automation (Tools)
                </h3>
                <p className="mt-3 text-sm text-muted sm:mt-4 sm:text-base">
                  Enterprise WhatsApp Marketing Suite powered directly by official
                  Meta APIs.
                </p>
                <p className="mt-3 text-sm font-medium text-ink sm:text-base">
                  Ditch sketchy third-party spammers. Automated broadcasts,
                  green-tick verification, and lead sequences that keep you
                  compliant and scalable.
                </p>
                <Link
                  href="/tools"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink transition group-hover:gap-3 group-hover:text-accent sm:mt-6"
                >
                  Explore WhatsApp Suite <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-b border-black/10 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              <AnimatedCounter
                value={1200000}
                suffix="+"
                label="Messages Delivered (B2B & B2C broadcasts via official API)"
              />
              <AnimatedCounter
                value={45000000}
                prefix="Rs. "
                suffix="+"
                label="B2B Pipeline Won (client inbound pipeline generated)"
              />
              <div className="border border-black/10 bg-surface p-5 sm:p-6">
                <p className="font-display text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">#1</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  AI Search Ranking (ChatGPT, Claude & Perplexity citations)
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Client Logos Marquee */}
      <section className="border-b border-black/10 py-10 bg-surface/30 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-6 sm:mb-8">
              Trusted by operators at
            </p>
            <Marquee speed={25} className="py-2">
              {["GRAIN CONNECT", "AJAY TRADING", "VELOCITY B2B", "INFRA OPS", "GROWTH LABS", "SCALE B2B"].map((logo) => (
                <div
                  key={logo}
                  className="flex items-center justify-center border border-black/10 bg-surface px-6 py-3 font-display text-sm font-bold tracking-wider text-ink shadow-[4px_4px_0_0_rgba(13,13,13,0.04)]"
                >
                  {logo}
                </div>
              ))}
            </Marquee>
          </FadeIn>
        </div>
      </section>

      {/* Visual strip */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden border border-black/10 bg-surface shadow-[12px_12px_0_0_rgba(13,13,13,0.06)]">
              {homeBanner ? (
                <PageBanner
                  src={homeBanner.imagePath}
                  alt={homeBanner.alt || "Team collaborating on growth strategy"}
                  caption={homeBanner.caption}
                  grayscale={homeBanner.grayscale}
                />
              ) : (
                <Image
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&q=80"
                  alt="Team collaborating on growth strategy in a modern office"
                  width={1400}
                  height={600}
                  className="h-48 w-full object-cover sm:h-64 lg:h-80"
                  priority
                />
              )}
              <div className="p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  Revenue velocity, not vanity metrics
                </p>
                <p className="mt-2 max-w-xl font-display text-xl font-bold text-ink sm:text-2xl">
                  Built for founders who are done playing agency bingo.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}