import { createMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import { getPageContent } from "@/lib/getPageContent";
import CaseStudyCard, { CaseStudy } from "@/components/CaseStudyCard";
export const metadata = createMetadata({
  title: "Case Studies - SideEye.in",
  description:
    "Receipts, not promises. Real B2B pipeline and lead conversion results from SideEye campaigns.",
  path: "/case-studies",
});
interface CaseStudiesContent {
  eyebrow: string;
  headline: string;
  caseStudies: CaseStudy[];
}
const defaultContent: CaseStudiesContent = {
  eyebrow: "Selected Work",
  headline: "Receipts, Not Promises.",
  caseStudies: [
    {
      id: "01",
      client: "Grain Connect",
      headlineStat: "6+ B2B Client Conversions in 60 Days",
      subtitle: "Zero-to-One LinkedIn Brand Positioning",
      challenge:
        "Zero organic presence on LinkedIn, reliant on cold, low-converting calls.",
      strategy:
        "Rebuilt executive LinkedIn profiles from scratch, published authoritative industry analysis, deployed targeted B2B messaging.",
      stats: [
        { value: 2000, suffix: "+", label: "Followers (60 days)", useKFormat: false },
        { value: 6, suffix: "+", label: "B2B Client Conversions", useKFormat: true },
        { value: 50000, suffix: "+", label: "Impressions", useKFormat: false },
        { value: 60, suffix: " Days", label: "Timeline", useKFormat: true },
      ],
    },
    {
      id: "02",
      client: "Ajay Trading Company",
      headlineStat: "10 Inbound Enquiries · Zero Ad Spend",
      subtitle: "Hyper-Local Reel Funnel",
      challenge:
        "Stagnant foot traffic and high cost-per-lead on standard Google Ads.",
      strategy:
        "Localized short-form Reel campaigns on high-margin products paired with automated WhatsApp broadcast follow-ups.",
      stats: [
        { value: 10, label: "Inbound Enquiries", useKFormat: true },
        { value: 23000, suffix: "+", label: "Impressions", useKFormat: false },
        { value: 0, label: "Ad Spend", useKFormat: true },
        { value: 7, label: "Reels", useKFormat: true },
      ],
    },
  ],
};
export default async function CaseStudiesPage() {
  const content = await getPageContent<CaseStudiesContent>("case-studies", defaultContent);
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
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:space-y-12 sm:px-6 lg:px-8">
          {content.caseStudies.map((study, i) => (
            <FadeIn key={study.id || i} delay={i * 0.05}>
              <CaseStudyCard study={study} />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}