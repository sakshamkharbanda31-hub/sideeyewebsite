import { createMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import Accordion from "@/components/Accordion";
import AgencyBingoTrigger from "@/components/AgencyBingoTrigger";
import { getPageContent } from "@/lib/getPageContent";
export const metadata = createMetadata({
  title: "FAQs — SideEye.in",
  description:
    "Frequently asked questions about SideEye's B2B growth services and Meta-compliant WhatsApp Marketing Suite.",
  path: "/faqs",
});
interface FaqItem {
  question: string;
  answer: string;
}
interface FaqsContent {
  eyebrow: string;
  headline: string;
  faqs: FaqItem[];
  bottomLabel: string;
  bottomText: string;
}
const defaultContent: FaqsContent = {
  eyebrow: "Questions",
  headline: "Frequently Asked Questions",
  faqs: [
    {
      question: "Why shouldn't I just hire an in-house team or a cheap freelancer?",
      answer:
        "Because an in-house hire takes months to ramp, costs more than you'd expect, and still lacks cross-channel expertise. Freelancers execute tasks — SideEye builds growth systems with proven frameworks, compliance infrastructure, and measurable pipeline outcomes.",
    },
    {
      question: "Is your WhatsApp Marketing Suite compliant with Meta's policies?",
      answer:
        "Yes — we operate exclusively on official Meta Cloud API endpoints. No scraping, no spam, no grey-market tools. Every campaign requires documented opt-in records, and we enforce consent management as part of our onboarding process.",
    },
    {
      question: "How quickly can we launch?",
      answer:
        "Engine 1 (Services) onboarding begins within 48 hours of contract signing. Engine 2 (WhatsApp API setup & Meta verification) typically takes 3–5 business days, depending on your documentation readiness and Meta review timelines.",
    },
    {
      question: "Do you offer guarantees?",
      answer:
        "We guarantee operator-grade execution, transparent data reporting, and rapid iteration cycles. We don't promise vanity metrics — we commit to building systems that generate measurable inbound pipeline and compliant messaging infrastructure.",
    },
  ],
  bottomLabel: "One more thing",
  bottomText: "Still have questions? Or just want to see how many agency clichés you've survived?",
};
export default async function FAQsPage() {
  const content = await getPageContent<FaqsContent>("faqs", defaultContent);
  return (
    <>
      <section className="border-b border-black/10 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading eyebrow={content.eyebrow} title={content.headline} />
          </FadeIn>
        </div>
      </section>
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Accordion items={content.faqs} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10 border-t border-black/10 pt-8 text-center sm:mt-16 sm:pt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                {content.bottomLabel}
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                {content.bottomText}
              </p>
              <div className="mt-5">
                <AgencyBingoTrigger />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}