import { createMetadata } from "@/lib/metadata";
import LegalLayout from "@/components/LegalLayout";

export const metadata = createMetadata({
  title: "Terms & Conditions — SideEye.in",
  description: "Terms and Conditions governing the use of SideEye.in website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="July 24, 2026">
      <p>
        These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the
        SideEye.in website and services provided by SideEye Media / Mod Creation Group
        (&quot;SideEye,&quot; &quot;we,&quot; &quot;us&quot;).
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing our website or engaging our services, you agree to be bound by these Terms. If
        you do not agree, please do not use our website or services.
      </p>

      <h2>2. Services</h2>
      <p>
        SideEye provides B2B growth marketing services (&quot;Engine 1&quot;) and WhatsApp
        marketing automation tools (&quot;Engine 2&quot;) powered by official Meta Cloud API
        infrastructure. Service scope, deliverables, and pricing are defined in individual client
        agreements.
      </p>

      <h2>3. Client Responsibilities</h2>
      <ul>
        <li>Provide accurate information during onboarding and throughout the engagement</li>
        <li>
          Ensure all WhatsApp messaging recipients have provided valid opt-in consent before
          campaigns are launched
        </li>
        <li>Comply with applicable laws, Meta platform policies, and industry regulations</li>
        <li>Review and approve content and campaigns in a timely manner</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        All content, branding, and materials on sideeye.in are owned by SideEye unless otherwise
        stated. Client-specific deliverables and intellectual property rights are governed by
        individual service agreements.
      </p>

      <h2>5. Payment &amp; Refunds</h2>
      <p>
        Payment terms are specified in client agreements. Unless otherwise stated, fees are
        non-refundable once services have commenced. SideEye reserves the right to suspend services
        for overdue payments.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        SideEye provides services on a best-effort basis. We do not guarantee specific business
        outcomes, revenue figures, or platform approval timelines (including Meta Business
        Verification). Our liability is limited to the fees paid for the specific service in
        question during the preceding three months.
      </p>

      <h2>7. WhatsApp &amp; Meta Platform Compliance</h2>
      <p>
        Use of SideEye&apos;s WhatsApp Marketing Suite is subject to Meta&apos;s Business &
        Developer Policies. SideEye is not responsible for account restrictions resulting from
        client non-compliance with opt-in requirements or prohibited messaging practices.
      </p>

      <h2>8. Termination</h2>
      <p>
        Either party may terminate a service agreement as specified in the client contract. Upon
        termination, SideEye will cease messaging services and provide data export upon request,
        subject to applicable retention requirements.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms are governed by the laws of India. Any disputes shall be subject to the
        exclusive jurisdiction of courts in Gurugram, Haryana.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions regarding these Terms, contact{" "}
        <a href="mailto:support@sideeye.in" className="underline">
          support@sideeye.in
        </a>
        .
      </p>
    </LegalLayout>
  );
}
