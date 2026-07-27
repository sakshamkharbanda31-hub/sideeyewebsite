import { getPageContent } from "@/lib/getPageContent";

interface ComplianceContent {
  badges: string[];
}

const defaultContent: ComplianceContent = {
  badges: [
    "🛡️ Meta Cloud API Compliant Partner",
    "Official Developer Endpoints",
    "256-Bit Data Encryption",
    "100% Opt-in Verified Messaging",
  ],
};

export default async function ComplianceBanner() {
  const content = await getPageContent<ComplianceContent>("compliance-banner", defaultContent);

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-3 px-4 sm:justify-center sm:px-0">
        {content.badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex shrink-0 items-center rounded-full border border-black/10 bg-surface px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-ink sm:text-xs"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}