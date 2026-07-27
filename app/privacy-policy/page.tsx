import { createMetadata } from "@/lib/metadata";
import LegalLayout from "@/components/LegalLayout";

export const metadata = createMetadata({
  title: "Privacy Policy — SideEye.in",
  description: "Privacy Policy for SideEye.in covering data collection, storage, usage, and user rights.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="July 24, 2026">
      <p>
        SideEye Media / Mod Creation Group (&quot;SideEye,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) operates sideeye.in and related B2B growth services. This Privacy Policy
        explains how we collect, use, store, and protect personal information.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following categories of personal data:</p>
      <ul>
        <li>
          <strong>Contact form submissions:</strong> Full name, business email, WhatsApp phone
          number, service interest, budget range, and message content submitted via our website
          contact form.
        </li>
        <li>
          <strong>WhatsApp opt-in records:</strong> Phone numbers, consent timestamps, campaign
          preferences, and interaction logs for users who opt in to receive WhatsApp messages
          through our Meta Cloud API infrastructure.
        </li>
        <li>
          <strong>Technical data:</strong> IP address, browser type, device information, and
          analytics data collected automatically when you visit our website.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use collected data to:</p>
      <ul>
        <li>Respond to inquiries and schedule demos</li>
        <li>Deliver WhatsApp messaging services to opted-in users</li>
        <li>Improve our website and service offerings</li>
        <li>Comply with legal obligations and Meta platform policies</li>
      </ul>
      <p>
        We do not sell, rent, or trade your personal information to third parties for marketing
        purposes.
      </p>

      <h2>3. Data Storage</h2>
      <p>
        Contact form leads are stored securely in MongoDB Atlas, a cloud-hosted database with
        encryption at rest and in transit. Access is restricted to authorized SideEye personnel
        only. WhatsApp messaging data is processed through official Meta Cloud API endpoints with
        industry-standard encryption.
      </p>

      <h2>4. WhatsApp Messaging &amp; Opt-In</h2>
      <p>
        WhatsApp messages are sent only to users who have provided explicit opt-in consent. Users
        may opt out at any time by replying STOP to any message or contacting support@sideeye.in.
        We maintain opt-in records as required by Meta&apos;s Business Messaging Policies.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        Contact form submissions are retained for up to 24 months unless a longer retention period
        is required for legal or contractual purposes. WhatsApp opt-in records are retained for the
        duration of the messaging relationship plus any period required by applicable law or Meta
        policy.
      </p>

      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Request access to your personal data</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data (subject to legal retention requirements)</li>
        <li>Withdraw consent for WhatsApp messaging at any time</li>
      </ul>
      <p>
        To exercise these rights, contact us at{" "}
        <a href="mailto:support@sideeye.in" className="underline">
          support@sideeye.in
        </a>
        .
      </p>

      <h2>7. Cookies &amp; Analytics</h2>
      <p>
        Our website may use essential cookies and analytics tools to understand site usage. You can
        control cookie preferences through your browser settings.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. Material changes will be posted on this
        page with an updated &quot;Last updated&quot; date.
      </p>
    </LegalLayout>
  );
}
