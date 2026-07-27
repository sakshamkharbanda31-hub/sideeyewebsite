import Link from "next/link";
import type { ReactNode } from "react";
import FadeIn from "./FadeIn";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <FadeIn>
      <article className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Legal</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted">Last updated: {lastUpdated}</p>
          <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
            {children}
          </div>
          <p className="mt-12 border-t border-black/10 pt-8 text-sm text-muted">
            Questions? Contact{" "}
            <Link href="mailto:support@sideeye.in" className="underline hover:text-ink">
              support@sideeye.in
            </Link>
          </p>
        </div>
      </article>
    </FadeIn>
  );
}
