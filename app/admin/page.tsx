import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Link
        href="/admin/leads"
        className="border border-black/10 bg-surface p-6 shadow-[6px_6px_0_0_rgba(13,13,13,0.06)] transition hover:-translate-y-1"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          View
        </p>
        <h2 className="mt-2 font-display text-xl font-bold text-ink">Leads</h2>
        <p className="mt-2 text-sm text-muted">
          Contact form and Growth Quiz submissions.
        </p>
      </Link>

      <Link
        href="/admin/banners"
        className="border border-black/10 bg-surface p-6 shadow-[6px_6px_0_0_rgba(13,13,13,0.06)] transition hover:-translate-y-1"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          Manage
        </p>
        <h2 className="mt-2 font-display text-xl font-bold text-ink">Banners</h2>
        <p className="mt-2 text-sm text-muted">
          Update page banner images site-wide.
        </p>
      </Link>
    </div>
  );
}