"use client";
import { useEffect, useState } from "react";
import { Loader2, Upload, CheckCircle2, Trash2 } from "lucide-react";

const PAGES = [
  { key: "home", label: "Homepage" },
  { key: "services", label: "Services (Engine 1)" },
  { key: "tools", label: "Tools (Engine 2)" },
  { key: "about", label: "About Us" },
  { key: "case-studies", label: "Case Studies" },
  { key: "faqs", label: "FAQs" },
  { key: "contact", label: "Contact" },
];

interface BannerRecord {
  pageKey: string;
  imagePath: string;
  alt: string;
  caption: string;
  grayscale: boolean;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Record<string, BannerRecord>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/banners")
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, BannerRecord> = {};
        (data.banners || []).forEach((b: BannerRecord) => {
          map[b.pageKey] = b;
        });
        setBanners(map);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRemove = (pageKey: string) => {
    setBanners((prev) => {
      const next = { ...prev };
      delete next[pageKey];
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading banners...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-ink">Page Banners</h2>
      <p className="text-sm text-muted">
        Upload a background image for each page. Remove it to go back to no
        banner on that page.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {PAGES.map((page) => (
          <BannerCard
            key={page.key}
            pageKey={page.key}
            label={page.label}
            existing={banners[page.key]}
            onUpdated={(record) =>
              setBanners((prev) => ({ ...prev, [page.key]: record }))
            }
            onRemoved={() => handleRemove(page.key)}
          />
        ))}
      </div>
    </div>
  );
}

function BannerCard({
  pageKey,
  label,
  existing,
  onUpdated,
  onRemoved,
}: {
  pageKey: string;
  label: string;
  existing?: BannerRecord;
  onUpdated: (record: BannerRecord) => void;
  onRemoved: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState(existing?.alt || "");
  const [caption, setCaption] = useState(existing?.caption || "");
  const [grayscale, setGrayscale] = useState(existing?.grayscale ?? true);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Choose an image file first");
      return;
    }
    setError("");
    setUploading(true);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pageKey", pageKey);
      formData.append("alt", alt);
      formData.append("caption", caption);
      formData.append("grayscale", String(grayscale));

      const res = await fetch("/api/admin/banners", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        setUploading(false);
        return;
      }

      onUpdated({ pageKey, imagePath: data.imagePath, alt, caption, grayscale });
      setSuccess(true);
      setFile(null);
      setUploading(false);
    } catch {
      setError("Network error. Please try again.");
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!existing) return;
    setRemoving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/banners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Remove failed");
        setRemoving(false);
        return;
      }

      onRemoved();
      setAlt("");
      setCaption("");
      setSuccess(false);
      setRemoving(false);
    } catch {
      setError("Network error. Please try again.");
      setRemoving(false);
    }
  };

  return (
    <div className="border border-black/10 bg-surface p-5">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        {label}
      </p>

      {existing?.imagePath && (
        <div className="mt-3">
          <div className="h-32 w-full overflow-hidden border border-black/10">
            <img
              src={existing.imagePath}
              alt={existing.alt}
              className={`h-full w-full object-cover ${existing.grayscale ? "grayscale" : ""}`}
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-accent disabled:opacity-60"
          >
            {removing ? (
              <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
            ) : (
              <Trash2 className="h-3 w-3" aria-hidden />
            )}
            Remove banner
          </button>
        </div>
      )}

      <div className="mt-4 space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-xs text-muted file:mr-3 file:border file:border-black/10 file:bg-background file:px-3 file:py-1.5 file:text-xs file:text-ink"
        />
        <input
          type="text"
          placeholder="Alt text (for accessibility)"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          className="w-full border border-black/10 bg-background px-3 py-2 text-xs text-ink outline-none focus:border-accent"
        />
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border border-black/10 bg-background px-3 py-2 text-xs text-ink outline-none focus:border-accent"
        />
        <label className="flex items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={grayscale}
            onChange={(e) => setGrayscale(e.target.checked)}
          />
          Black & white
        </label>

        {error && <p className="text-xs text-accent">{error}</p>}

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="inline-flex w-full items-center justify-center gap-2 border border-ink-solid bg-ink-solid px-4 py-2 text-xs font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              Uploading...
            </>
          ) : success ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              Updated
            </>
          ) : (
            <>
              <Upload className="h-3.5 w-3.5" aria-hidden />
              Upload
            </>
          )}
        </button>
      </div>
    </div>
  );
}
