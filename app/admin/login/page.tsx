"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm border border-black/10 bg-surface p-8 shadow-[8px_8px_0_0_rgba(13,13,13,0.08)]">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-solid bg-ink-solid text-white">
            <Lock className="h-5 w-5" aria-hidden />
          </div>
        </div>
        <h1 className="mt-4 text-center font-display text-xl font-bold text-ink">
          Admin Access
        </h1>
        <p className="mt-1 text-center text-sm text-muted">
          SideEye.in control panel
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-black/10 bg-background px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black/10 bg-background px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="border border-accent/30 bg-accent/5 px-3 py-2 text-xs text-accent">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-solid bg-ink-solid px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}