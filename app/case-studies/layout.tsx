import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Case Studies — SideEye.in",
  description:
    "Receipts, not promises. Real B2B growth results from LinkedIn authority and hyper-local reel funnels.",
  path: "/case-studies",
});

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
