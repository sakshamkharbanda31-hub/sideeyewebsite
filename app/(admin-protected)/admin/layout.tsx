import Link from "next/link";
import { getSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

async function handleLogout() {
  "use server";
  await destroySession();
  redirect("/admin/login");
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 border-b border-black/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            Signed in as
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink">
            {session.username}
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-5" aria-label="Admin navigation">
            <Link
              href="/admin/leads"
              className="text-sm text-muted transition hover:text-accent"
            >
              Leads
            </Link>
            <Link
              href="/admin/banners"
              className="text-sm text-muted transition hover:text-accent"
            >
              Banners
            </Link>
            <Link
              href="/admin/content"
              className="text-sm text-muted transition hover:text-accent"
            >
              Content
            </Link>
          </nav>
          <form action={handleLogout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 border border-black/10 bg-surface px-4 py-2 text-sm text-ink transition hover:border-accent hover:text-accent"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Log Out
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}