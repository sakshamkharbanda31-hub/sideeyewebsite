import { createMetadata } from "@/lib/metadata";
import LegalLayout from "@/components/LegalLayout";

export const metadata = createMetadata({
  title: "Data Protection Standards — SideEye.in",
  description:
    "Data Protection Standards outlining SideEye's security practices for client and user data.",
  path: "/data-protection",
});

export default function DataProtectionPage() {
  return (
    <LegalLayout title="Data Protection Standards" lastUpdated="July 24, 2026">
      <p>
        SideEye Media / Mod Creation Group is committed to protecting the personal and business
        data of our clients, website visitors, and WhatsApp messaging recipients. This document
        outlines our data protection standards and security practices.
      </p>

      <h2>1. Data Classification</h2>
      <p>We classify data into the following categories:</p>
      <ul>
        <li>
          <strong>Contact &amp; lead data:</strong> Names, emails, phone numbers, and inquiry
          details submitted via our website
        </li>
        <li>
          <strong>Messaging data:</strong> WhatsApp opt-in records, conversation logs, and campaign
          analytics
        </li>
        <li>
          <strong>Client business data:</strong> Campaign configurations, audience segments, and
          performance reports
        </li>
      </ul>

      <h2>2. Storage &amp; Encryption</h2>
      <ul>
        <li>Contact form leads are stored in MongoDB Atlas with encryption at rest (AES-256)</li>
        <li>All data in transit is protected via TLS 1.2+ encryption</li>
        <li>WhatsApp messaging flows through Meta&apos;s encrypted Cloud API endpoints</li>
        <li>Database access credentials are stored as environment variables, never in source code</li>
      </ul>

      <h2>3. Access Controls</h2>
      <p>
        Access to client and user data is restricted to authorized SideEye personnel on a
        need-to-know basis. We implement role-based access controls and audit logging for database
        operations.
      </p>

      <h2>4. Data Retention &amp; Deletion</h2>
      <ul>
        <li>Contact form submissions: retained up to 24 months, then securely deleted</li>
        <li>WhatsApp opt-in records: retained for the duration of the messaging relationship</li>
        <li>Deletion requests are processed within 30 days of verified identity confirmation</li>
      </ul>

      <h2>5. Third-Party Processors</h2>
      <p>We use the following third-party services to process data:</p>
      <ul>
        <li>
          <strong>MongoDB Atlas:</strong> Database hosting for contact form leads
        </li>
        <li>
          <strong>Meta WhatsApp Cloud API:</strong> Official messaging infrastructure
        </li>
        <li>
          <strong>Vercel:</strong> Website hosting and deployment
        </li>
      </ul>
      <p>
        We do not sell personal data to third parties. Data shared with processors is limited to
        what is necessary for service delivery.
      </p>

      <h2>6. Incident Response</h2>
      <p>
        In the event of a data breach, SideEye will notify affected clients and relevant authorities
        within 72 hours of discovery, in accordance with applicable data protection regulations.
      </p>

      <h2>7. User Rights</h2>
      <p>
        Individuals may request access, correction, or deletion of their personal data by contacting{" "}
        <a href="mailto:support@sideeye.in" className="underline">
          support@sideeye.in
        </a>
        . We will respond to verified requests within 30 days.
      </p>

      <h2>8. Compliance Framework</h2>
      <p>
        Our data protection practices align with Meta&apos;s Business Messaging Policies, the
        Information Technology Act, 2000 (India), and applicable data protection guidelines. We
        review and update these standards annually.
      </p>
    </LegalLayout>
  );
}
