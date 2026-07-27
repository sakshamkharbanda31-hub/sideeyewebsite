import { createMetadata } from "@/lib/metadata";
import LegalLayout from "@/components/LegalLayout";

export const metadata = createMetadata({
  title: "WhatsApp API Acceptable Use Policy — SideEye.in",
  description:
    "Acceptable Use Policy for SideEye's WhatsApp Marketing Suite powered by Meta Cloud API.",
  path: "/whatsapp-acceptable-use",
});

export default function WhatsAppAUPPage() {
  return (
    <LegalLayout title="WhatsApp API Acceptable Use Policy" lastUpdated="July 24, 2026">
      <p>
        This Acceptable Use Policy (&quot;AUP&quot;) governs the use of SideEye&apos;s WhatsApp
        Marketing Suite, which operates exclusively on official Meta WhatsApp Cloud API
        infrastructure. All users and clients must comply with this policy, Meta&apos;s Business
        Messaging Policies, and applicable laws.
      </p>

      <h2>1. Permitted Use</h2>
      <p>SideEye&apos;s WhatsApp Suite may be used for:</p>
      <ul>
        <li>Transactional and promotional messaging to opted-in recipients</li>
        <li>Customer support and automated lead follow-up sequences</li>
        <li>Rich-media broadcasts including catalogs, buttons, and personalized offers</li>
        <li>Business verification and official green-tick setup assistance</li>
      </ul>

      <h2>2. Prohibited Use</h2>
      <p>The following activities are strictly prohibited:</p>
      <ul>
        <li>Sending messages to users who have not provided explicit opt-in consent</li>
        <li>Scraping, harvesting, or purchasing phone number lists</li>
        <li>Sending spam, unsolicited bulk messages, or misleading content</li>
        <li>Promoting illegal products, services, or activities</li>
        <li>Impersonating other businesses or individuals</li>
        <li>Circumventing Meta rate limits, API restrictions, or verification requirements</li>
        <li>Using unofficial or third-party WhatsApp APIs or automation tools</li>
      </ul>

      <h2>3. Opt-In Requirements</h2>
      <p>
        All recipients must provide documented, explicit consent before receiving WhatsApp
        messages. Opt-in records must include the phone number, timestamp, consent method, and
        campaign purpose. SideEye maintains opt-in records on behalf of clients and requires
        verification during campaign setup.
      </p>

      <h2>4. Opt-Out &amp; User Rights</h2>
      <p>
        All messaging templates must include clear opt-out instructions. Users who reply STOP or
        request removal must be unsubscribed immediately. SideEye processes opt-out requests within
        24 hours and maintains suppression lists to prevent re-contact.
      </p>

      <h2>5. Content Standards</h2>
      <p>All message content must:</p>
      <ul>
        <li>Accurately represent the sending business</li>
        <li>Comply with Meta&apos;s Commerce and Business Messaging Policies</li>
        <li>Not contain deceptive, harmful, or offensive material</li>
        <li>Include appropriate business identification</li>
      </ul>

      <h2>6. Data Handling</h2>
      <p>
        WhatsApp messaging data is processed through encrypted Meta Cloud API endpoints. Client data
        is stored in MongoDB Atlas with access controls. SideEye does not sell or share messaging
        data with unauthorized third parties.
      </p>

      <h2>7. Enforcement</h2>
      <p>
        Violations of this AUP may result in immediate suspension of messaging services, account
        termination, and reporting to Meta as required. SideEye reserves the right to audit client
        messaging practices and opt-in records at any time.
      </p>

      <h2>8. Reporting Violations</h2>
      <p>
        To report a violation or raise a concern, contact{" "}
        <a href="mailto:support@sideeye.in" className="underline">
          support@sideeye.in
        </a>
        .
      </p>
    </LegalLayout>
  );
}
