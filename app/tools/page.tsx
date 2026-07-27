import { createMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import PageBanner from "@/components/PageBanner";
import { getBanner } from "@/lib/getBanner";
import { getPageContent } from "@/lib/getPageContent";

export const metadata = createMetadata({
  title: "Engine 2: WhatsApp Marketing Suite — SideEye.in",
  description:
    "Official WhatsApp Marketing Engine built on Meta Cloud API. Broadcasts, chatbots, and green-tick verification — fully compliant.",
  path: "/tools",
});

interface ToolsFeature {
  title: string;
  description: string;
}

interface ToolsContent {
  eyebrow: string;
  headline: string;
  complianceLabel: string;
  complianceBoldText: string;
  complianceText: string;
  features: ToolsFeature[];
  comingSoonLabel: string;
  comingSoonHeading: string;
  comingSoonItems: string[];
}

const defaultContent: ToolsContent = {
  eyebrow: "The Automation",
  headline: "Official WhatsApp Marketing Engine",
  complianceLabel: "Meta Compliance",
  complianceBoldText: "BUILT FOR ENTERPRISE-GRADE COMPLIANCE",
  complianceText:
    " — SideEye's WhatsApp Suite operates strictly on official Meta WhatsApp Cloud API infrastructure. We adhere fully to Meta's Commerce & Business Messaging Policies, enforcing user consent, opt-in management, and encrypted data routing.",
  features: [
    {
      title: "High-Volume Broadcasts Without the Ban Risk",
      description:
        "Run hyper-targeted bulk campaigns to opted-in customers. Rich-media catalogs, interactive buttons, personalized offers, high open rates — without phone number bans.",
    },
    {
      title: "Automated Lead Follow-up & Chatbot Sequences",
      description:
        "Instantly capture, qualify, and route website/ad leads into automated WhatsApp conversations.",
    },
    {
      title: "Green-Tick Official Verification Setup",
      description:
        "Guided official Meta Business Verification to secure the WhatsApp Green Tick.",
    },
  ],
  comingSoonLabel: "🔮 Under Development in the SideEye Lab",
  comingSoonHeading: "Coming Soon",
  comingSoonItems: [
    "AI Inbound Voice Agent — AI-powered voice qualification for incoming calls.",
    "Multi-Channel CRM Sync — Real-time sync between WhatsApp, HubSpot, and client databases.",
  ],
};

export default async function ToolsPage() {
  const banner = await getBanner("tools");
  const content = await getPageContent<ToolsContent>("tools", defaultContent);

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
            <SectionHeading eyebrow={content.eyebrow} title={content.headline} />
          </FadeIn>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="border-2 border-ink bg-surface p-5 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {content.complianceLabel}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink sm:mt-4 sm:text-base">
                <strong>{content.complianceBoldText}</strong>
                {content.complianceText}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-12 sm:pb-20">
        <div className="mx-auto max-w-7xl space-y-4 px-4 sm:space-y-6 sm:px-6 lg:px-8">
          {content.features.map((feature, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <article className="border border-black/10 bg-surface p-5 shadow-[8px_8px_0_0_rgba(13,13,13,0.06)] sm:p-8">
                <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">{feature.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{feature.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-t border-black/10 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="border border-dashed border-black/20 bg-black/[0.02] p-5 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {content.comingSoonLabel}
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold text-ink sm:text-2xl">
                {content.comingSoonHeading}
              </h2>
              <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                {content.comingSoonItems.map((item, i) => (
                  <li key={i} className="border-l-2 border-black/10 pl-4 text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}