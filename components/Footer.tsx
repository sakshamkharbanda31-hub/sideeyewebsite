import Link from "next/link";
import { legalLinks, siteConfig } from "@/lib/site-config";
import SpotlightContainer from "./SpotlightContainer";
export default function Footer() {
  return (
    <SpotlightContainer as="footer" className="mt-auto border-t border-black/10 bg-ink-solid text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">
              Brand
            </p>
            <h2 className="mt-3 font-display text-xl font-semibold sm:text-2xl">
              SIDE EYE ENTERPRISE SERVICES
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Operating out of {siteConfig.location}
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">
              Business Details
            </p>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-white/70">
              <li>Registered Business Name: {siteConfig.businessName}</li>
              <li>Physical Office Address: {siteConfig.address}</li>
              <li>
                Support Email:{" "}
                <a href={`mailto:${siteConfig.supportEmail}`} className="underline hover:text-white">
                  {siteConfig.supportEmail}
                </a>{" "}
                /{" "}
                <a href={`mailto:${siteConfig.helloEmail}`} className="underline hover:text-white">
                  {siteConfig.helloEmail}
                </a>
              </li>
              <li>Official Customer Care: {siteConfig.phone}</li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">
              Legal
            </p>
            <ul className="mt-3 space-y-2.5 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 underline hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-12 sm:pt-8">
          <p className="text-xs leading-relaxed text-white/50">
            SideEye.in is an independent growth agency and technology provider. WhatsApp is a
            registered trademark of Meta Platforms, Inc. Use of the WhatsApp Cloud API is subject
            to Meta&apos;s Business &amp; Developer Policies.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <p className="font-mono text-xs uppercase tracking-wider text-white/40">
              © 2026 SideEye.in. All Rights Reserved.
            </p>
            <Link
              href="/admin"
              className="font-mono text-[10px] uppercase tracking-wider text-white/30 hover:text-white/60"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </SpotlightContainer>
  );
}