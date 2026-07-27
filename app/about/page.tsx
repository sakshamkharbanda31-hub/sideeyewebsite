import { createMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { getPageContent } from "@/lib/getPageContent";

export const metadata = createMetadata({
  title: "About - SideEye.in",
  description:
    "We're not your typical agency. Meet SideEye - an independent B2B growth ecosystem built for founders who want results, not decks.",
  path: "/about",
});

interface DifferentiatorItem {
  title: string;
  description: string;
}

interface AboutContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroHighlightWord: string;
  heroDescription: string;
  storyEyebrow: string;
  storyHeadline: string;
  storyParagraph1: string;
  storyParagraph2: string;
  differentiatorsEyebrow: string;
  differentiatorsHeadline: string;
  differentiators: DifferentiatorItem[];
  ctaHeading: string;
  ctaText: string;
  ctaButtonText: string;
}

const defaultContent: AboutContent = {
  heroEyebrow: "Who we are",
  heroHeadline: "We're Not Here to Impress You With Jargon.",
  heroHighlightWord: "Jargon",
  heroDescription:
    "SideEye.in is an independent growth ecosystem built by people who got tired of watching agencies charge premium prices for outdated playbooks. So we built something better.",
  storyEyebrow: "Our Story",
  storyHeadline: "Built Out of Gurugram, For Founders Who Are Done Waiting.",
  storyParagraph1:
    "We started SideEye because we kept seeing the same pattern: businesses paying big retainers for agencies that delivered pretty reports and little else. Meanwhile, the tools to actually move revenue - real LinkedIn authority, real local search dominance, real compliant automation - were sitting right there, underused.",
  storyParagraph2:
    "So we built a dual-powered ecosystem: sharp, high-conviction service execution paired with scalable, Meta-compliant automation tools. No bloated decks. No empty promises. Just infrastructure that prints results.",
  differentiatorsEyebrow: "Why We're Different",
  differentiatorsHeadline: "Four Reasons Founders Stick With Us.",
  differentiators: [
    {
      title: "Operator-Grade Execution",
      description:
        "We don't hand you a strategy deck and disappear. Every campaign is run by people who've actually shipped growth for real businesses, not just presented slides about it.",
    },
    {
      title: "Meta-Compliant Infrastructure",
      description:
        "Our WhatsApp automation runs entirely on official Meta Cloud API endpoints. No sketchy third-party tools, no ban risk, no shortcuts that put your business at risk.",
    },
    {
      title: "No-Fluff Transparency",
      description:
        "You'll always know exactly what's working and what isn't. Real numbers, real timelines, real conversations - no vanity metrics dressed up as wins.",
    },
    {
      title: "Built for Founders, Not Committees",
      description:
        "We move at founder speed. Fast decisions, fast execution, no bureaucratic sign-off chains slowing down your growth.",
    },
  ],
  ctaHeading: "Ready to Work With People Who Actually Ship?",
  ctaText: "Let's talk about what growth actually looks like for your business.",
  ctaButtonText: "Get Side-Eyed",
};

function renderHeroHeadline(headline: string, highlightWord: string) {
  if (!highlightWord || !headline.includes(highlightWord)) {
    return headline;
  }
  const parts = headline.split(highlightWord);
  return (
    <>
      {parts[0]}
      <span className="text-accent">{highlightWord}</span>
      {parts[1]}
    </>
  );
}

export default async function AboutPage() {
  const content = await getPageContent<AboutContent>("about", defaultContent);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-black/10 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {content.heroEyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight text-ink sm:mt-6 sm:text-5xl lg:text-6xl">
              {renderHeroHeadline(content.heroHeadline, content.heroHighlightWord)}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-xl">
              {content.heroDescription}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Our Story */}
      <section className="border-b border-black/10 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {content.storyEyebrow}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-4xl">
                {content.storyHeadline}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
                {content.storyParagraph1}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                {content.storyParagraph2}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="border-b border-black/10 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow={content.differentiatorsEyebrow}
              title={content.differentiatorsHeadline}
            />
          </FadeIn>

          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6">
            {content.differentiators.map((item, i) => (
              <FadeIn key={item.title || i} delay={i * 0.05}>
                <article className="h-full border-t-4 border-t-accent border border-black/10 bg-surface p-6 shadow-[8px_8px_0_0_rgba(13,13,13,0.06)] sm:p-8">
                  <span className="font-mono text-xs uppercase tracking-wider text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-4xl">
              {content.ctaHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              {content.ctaText}
            </p>
            <div className="mt-6 flex justify-center sm:mt-8">
              <Button href="/contact">{content.ctaButtonText}</Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}