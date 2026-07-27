import { createMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import SpotlightContainer from "@/components/SpotlightContainer";
import TiltCard from "@/components/TiltCard";
import PageBanner from "@/components/PageBanner";
import { getBanner } from "@/lib/getBanner";
import { getPageContent } from "@/lib/getPageContent";
import { renderHighlighted } from "@/lib/highlightText";

export const metadata = createMetadata({
  title: "Engine 1: Services - SideEye.in",
  description:
    "We don't do awareness. We build unfair market advantages with social media, LinkedIn authority, and AI Answer Engine optimization.",
  path: "/services",
});

interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  problem: string;
  fix: string;
  deliverables: string[];
}

interface ServicesContent {
  eyebrow: string;
  headline: string;
  highlightWord: string;
  description: string;
  ctaHeading: string;
  ctaButtonText: string;
  services: ServiceItem[];
}

const defaultContent: ServicesContent = {
  eyebrow: "The Muscle",
  headline: "We Don't Do 'Awareness.' We Build Unfair Market Advantages.",
  highlightWord: "Unfair",
  description:
    "Traditional agencies charge you thousands just to post a graphic three times a week. We deploy targeted growth frameworks engineered to drive high-intent leads.",
  ctaHeading: "Ready to make competitors nervous?",
  ctaButtonText: "Get Side-Eyed",
  services: [
    {
      number: "01",
      title: "Social Media Marketing & Management",
      tagline: "Content that actually prints revenue, not just vanity double-taps.",
      problem: "Your current agency posts generic stock graphics your buyers scroll past.",
      fix: "Punchy, visual-first reels, static graphics, and scroll-stopping copy tailored to your ICP.",
      deliverables: [
        "Monthly Content Strategy",
        "Short-Form Video Editing",
        "Visual Assets",
        "Paid Amplification",
        "Community Management",
      ],
    },
    {
      number: "02",
      title: "LinkedIn Authority & B2B Lead Engine",
      tagline: "Turn founder presence into a repeatable inbound pipeline.",
      problem: "Your LinkedIn looks like a static resume and your DMs are empty.",
      fix: "Thought leadership engineered for founders and B2B leaders that positions you as the obvious authority.",
      deliverables: [
        "Profile Optimization",
        "Ghostwriting",
        "ICP Targeting",
        "Account-Based Outreach",
        "Inbound Nurturing",
      ],
    },
    {
      number: "03",
      title: "GBP SEO & AI AEO (Answer Engine Optimization)",
      tagline: "Rank on Google Local today. Rank inside ChatGPT and Claude tomorrow.",
      problem: "Buyers now ask Perplexity, ChatGPT, and Gemini who to hire, not just Google.",
      fix: "Google Business Profile optimization for local dominance plus structured-data architecture for AI Answer Engine placement.",
      deliverables: [
        "GBP Local Grid Optimization",
        "Citations",
        "Structured Data",
        "AI Engine Brand Placement",
      ],
    },
  ],
};

export default async function ServicesPage() {
  const banner = await getBanner("services");
  const content = await getPageContent<ServicesContent>("services", defaultContent);

  return (
    <>
      <section className="relative overflow-hidden border-b border-black/10">
        {banner && (
          <PageBanner
            src={banner.imagePath}
            alt={banner.alt}
            caption={banner.caption}
            grayscale={banner.grayscale}
            asBackground
          />
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={renderHighlighted(content.headline, content.highlightWord)}
              description={content.description}
            />
          </FadeIn>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-5 px-4 sm:space-y-8 sm:px-6 lg:px-8">
          {content.services.map((service, i) => (
            <FadeIn key={service.number} delay={i * 0.05}>
              <TiltCard className="w-full">
                <article className="border-t-4 border-t-accent border border-black/10 bg-surface p-6 shadow-[8px_8px_0_0_rgba(13,13,13,0.08)] transition hover:-translate-y-1 sm:p-8">
                  <span className="font-mono text-xs uppercase tracking-wider text-accent">
                    Service {service.number}
                  </span>
                  <h2 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">{service.title}</h2>
                  <p className="mt-2 text-sm font-medium text-ink sm:text-base">{service.tagline}</p>
                  <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 md:grid-cols-2">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-muted">Problem</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{service.problem}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-muted">Fix</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{service.fix}</p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted">Deliverables</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="rounded-full border border-accent/30 px-3 py-1 text-xs text-muted">{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </section>

      <SpotlightContainer as="section" className="border-t border-black/10 bg-ink-solid py-10 text-white sm:py-16">
        <FadeIn>
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-semibold sm:text-3xl">
              {content.ctaHeading}
            </h2>
            <Button href="/contact">
              {content.ctaButtonText}
            </Button>
          </div>
        </FadeIn>
      </SpotlightContainer>
    </>
  );
}