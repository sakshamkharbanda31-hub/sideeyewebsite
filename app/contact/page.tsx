import { createMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { getPageContent } from "@/lib/getPageContent";

export const metadata = createMetadata({
  title: "Contact - SideEye.in",
  description:
    "Ready to stop getting side-eyed by your competitors? Get in touch with SideEye's B2B growth team in Gurugram.",
  path: "/contact",
});

interface ContactContent {
  eyebrow: string;
  headline: string;
  description: string;
}

const defaultContent: ContactContent = {
  eyebrow: "Get In Touch",
  headline: "Ready to Stop Getting Side-Eyed by Your Competitors?",
  description: "Fill out the form below or chat with us directly via our verified WhatsApp channel.",
};

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.helloEmail,
    href: `mailto:${siteConfig.helloEmail}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us directly",
    href: `https://wa.me/${siteConfig.phone.replace(/[^0-9+]/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    href: undefined,
  },
];

export default async function ContactPage() {
  const content = await getPageContent<ContactContent>("contact", defaultContent);

  return (
    <>
      <section className="border-b border-black/10 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.headline}
              description={content.description}
            />
          </FadeIn>
        </div>
      </section>
      <section className="py-12 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-5 lg:px-8">
          <FadeIn className="lg:col-span-3">
            <div className="border border-black/10 bg-surface p-5 sm:p-8">
              <ContactForm />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-2">
            <div className="space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <TiltCard>
                    <div className="flex items-center gap-4 border border-black/10 bg-surface p-4 transition hover:border-accent/40">
                      <Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                      <div className="flex-1">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-sm text-ink">{item.value}</p>
                      </div>
                      {item.href && (
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted" aria-hidden />
                      )}
                    </div>
                  </TiltCard>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}