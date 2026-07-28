"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const PAGES = [
  { key: "home", label: "Homepage" },
  { key: "results-ticker", label: "Results Ticker Strip" },
  { key: "compliance-banner", label: "Compliance Badges Strip" },
  { key: "services", label: "Services (Engine 1)" },
  { key: "tools", label: "Tools (Engine 2)" },
  { key: "case-studies", label: "Case Studies" },
  { key: "faqs", label: "FAQs" },
  { key: "contact", label: "Contact" },
  { key: "about", label: "About Us" },
];

export default function AdminContentPage() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-ink">Page Content Editor</h2>
      <p className="mt-1 text-sm text-muted">
        Select a page to edit its text content.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PAGES.map((page) => (
          <button
            key={page.key}
            type="button"
            onClick={() => setSelectedPage(page.key)}
            className={`border p-4 text-left text-sm transition ${
              selectedPage === page.key
                ? "border-accent bg-accent/5 text-accent"
                : "border-black/10 bg-surface text-ink hover:border-black/20"
            }`}
          >
            {page.label}
          </button>
        ))}
      </div>

      {selectedPage === "home" && <HomeContentEditor />}
      {selectedPage === "results-ticker" && <ResultsTickerContentEditor />}
      {selectedPage === "compliance-banner" && <ComplianceBannerContentEditor />}
      {selectedPage === "services" && <ServicesContentEditor />}
      {selectedPage === "tools" && <ToolsContentEditor />}
      {selectedPage === "case-studies" && <CaseStudiesContentEditor />}
      {selectedPage === "faqs" && <FaqsContentEditor />}
      {selectedPage === "contact" && <ContactContentEditor />}
      {selectedPage === "about" && <AboutContentEditor />}
      {selectedPage &&
        ![
          "home",
          "results-ticker",
          "compliance-banner",
          "services",
          "tools",
          "case-studies",
          "faqs",
          "contact",
          "about",
        ].includes(selectedPage) && (
          <p className="mt-6 text-sm text-muted">
            Editor for this page is coming next.
          </p>
        )}
    </div>
  );
}

function HomeContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    eyebrow: "An independent growth ecosystem - est. Gurugram",
    headline: "While Your Competitors Run $5 Ads, We Automate Their Market Share.",
    highlightWord: "Automate",
    subheadline:
      "Stop relying on 2019 tactics. We give traditional agencies the side-eye so you can give your industry a masterclass.",
    supportingText:
      "We run a dual-powered growth ecosystem: high-converting B2B execution combined with Meta-compliant automated infrastructure. No bloated decks, no empty retainer fees. Just pure revenue velocity.",
    button1Text: "Launch Engine 1",
    button2Text: "Explore Engine 2",
  });

  const [heroVideo, setHeroVideo] = useState<string | null>(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoError, setVideoError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?pageKey=home")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setForm((prev) => ({ ...prev, ...data.data }));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/admin/hero-video")
      .then((res) => res.json())
      .then((data) => {
        if (data.videoPath) setHeroVideo(data.videoPath);
      })
      .catch(() => {});
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: "home", data: form }),
      });
      if (res.ok) {
        setSaved(true);
      }
    } finally {
      setSaving(false);
    }
  };

  const uploadVideo = async (file: File) => {
    setVideoError("");
    if (!file.type.startsWith("video/")) {
      setVideoError("File must be a video");
      return;
    }
    setVideoUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/hero-video", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setVideoError(data.error || "Upload failed");
      } else {
        setHeroVideo(data.videoPath);
      }
    } catch {
      setVideoError("Network error. Try again.");
    } finally {
      setVideoUploading(false);
    }
  };

  const handleVideoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadVideo(file);
  };

  const handleVideoRemove = async () => {
    setVideoUploading(true);
    try {
      await fetch("/api/admin/hero-video", { method: "DELETE" });
      setHeroVideo(null);
    } finally {
      setVideoUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading current content...
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl space-y-5 border-t border-black/10 pt-8">
      <h3 className="font-display text-lg font-bold text-ink">Homepage Hero</h3>

      <Field label="Eyebrow text" value={form.eyebrow} onChange={(v) => handleChange("eyebrow", v)} />
      <Field label="Headline" value={form.headline} onChange={(v) => handleChange("headline", v)} textarea />
      <Field
        label="Highlight word (must appear exactly in the headline above, will be colored red)"
        value={form.highlightWord}
        onChange={(v) => handleChange("highlightWord", v)}
      />
      <Field label="Subheadline" value={form.subheadline} onChange={(v) => handleChange("subheadline", v)} textarea />
      <Field label="Supporting paragraph" value={form.supportingText} onChange={(v) => handleChange("supportingText", v)} textarea />
      <Field label="Button 1 text" value={form.button1Text} onChange={(v) => handleChange("button1Text", v)} />
      <Field label="Button 2 text" value={form.button2Text} onChange={(v) => handleChange("button2Text", v)} />

      <div className="mt-8 border-t border-black/10 pt-8">
        <h3 className="font-display text-lg font-bold text-ink">Hero Background Video</h3>
        <p className="mt-1 text-xs text-muted">Drag and drop a video file to replace the current hero background.</p>

        {heroVideo && (
          <div className="mt-4 border border-black/10 bg-surface p-3">
            <video src={heroVideo} className="max-h-40 w-full object-cover" muted loop autoPlay playsInline />
            <button
              type="button"
              onClick={handleVideoRemove}
              disabled={videoUploading}
              className="mt-2 text-xs text-muted hover:text-accent disabled:opacity-60"
            >
              Remove video (revert to default)
            </button>
          </div>
        )}

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleVideoDrop}
          className={`mt-4 flex flex-col items-center justify-center border-2 border-dashed p-8 text-center transition ${
            isDragging ? "border-accent bg-accent/5" : "border-black/20 bg-surface"
          }`}
        >
          {videoUploading ? (
            <div className="flex items-center gap-2 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Uploading...
            </div>
          ) : (
            <>
              <p className="text-sm text-muted">Drag and drop a video here, or</p>
              <label className="mt-2 cursor-pointer text-sm font-medium text-accent hover:underline">
                browse files
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadVideo(file);
                  }}
                />
              </label>
            </>
          )}
        </div>
        {videoError && <p className="mt-2 text-xs text-accent">{videoError}</p>}
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 border border-ink-solid bg-ink-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : saved ? (
          <>
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

function ResultsTickerContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [metrics, setMetrics] = useState<string[]>([
    "Rs. 45M+ Pipeline Won",
    "1.2M+ Messages Delivered",
    "#1 AI Search Ranking",
  ]);

  useEffect(() => {
    fetch("/api/admin/content?pageKey=results-ticker")
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.metrics) setMetrics(data.data.metrics);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (index: number, value: string) => {
    setMetrics((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setSaved(false);
  };

  const addMetric = () => {
    setMetrics((prev) => [...prev, ""]);
    setSaved(false);
  };

  const removeMetric = (index: number) => {
    setMetrics((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: "results-ticker", data: { metrics } }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading current content...
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl space-y-5 border-t border-black/10 pt-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-ink">Results Ticker Metrics</h3>
        <button type="button" onClick={addMetric} className="text-xs font-medium text-accent hover:underline">
          + Add Metric
        </button>
      </div>

      {metrics.map((metric, i) => (
        <div key={i} className="flex items-end gap-2">
          <div className="flex-1">
            <Field label={`Metric ${i + 1}`} value={metric} onChange={(v) => handleChange(i, v)} />
          </div>
          <button type="button" onClick={() => removeMetric(i)} className="mb-1 text-xs text-muted hover:text-accent">
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 border border-ink-solid bg-ink-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : saved ? (
          <>
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

function ComplianceBannerContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [badges, setBadges] = useState<string[]>([
    "🛡️ Meta Cloud API Compliant Partner",
    "Official Developer Endpoints",
    "256-Bit Data Encryption",
    "100% Opt-in Verified Messaging",
  ]);

  useEffect(() => {
    fetch("/api/admin/content?pageKey=compliance-banner")
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.badges) setBadges(data.data.badges);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (index: number, value: string) => {
    setBadges((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setSaved(false);
  };

  const addBadge = () => {
    setBadges((prev) => [...prev, ""]);
    setSaved(false);
  };

  const removeBadge = (index: number) => {
    setBadges((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: "compliance-banner", data: { badges } }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading current content...
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl space-y-5 border-t border-black/10 pt-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-ink">Compliance Badges</h3>
        <button type="button" onClick={addBadge} className="text-xs font-medium text-accent hover:underline">
          + Add Badge
        </button>
      </div>

      {badges.map((badge, i) => (
        <div key={i} className="flex items-end gap-2">
          <div className="flex-1">
            <Field label={`Badge ${i + 1}`} value={badge} onChange={(v) => handleChange(i, v)} />
          </div>
          <button type="button" onClick={() => removeBadge(i)} className="mb-1 text-xs text-muted hover:text-accent">
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 border border-ink-solid bg-ink-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : saved ? (
          <>
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

interface ServiceItemForm {
  number: string;
  title: string;
  tagline: string;
  problem: string;
  fix: string;
  deliverables: string;
}

function ServicesContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    eyebrow: "The Muscle",
    headline: "We Don't Do 'Awareness.' We Build Unfair Market Advantages.",
    highlightWord: "Unfair",
    description:
      "Traditional agencies charge you thousands just to post a graphic three times a week. We deploy targeted growth frameworks engineered to drive high-intent leads.",
    ctaHeading: "Ready to make competitors nervous?",
    ctaButtonText: "Get Side-Eyed",
  });
  const [services, setServices] = useState<ServiceItemForm[]>([
    {
      number: "01",
      title: "Social Media Marketing & Management",
      tagline: "Content that actually prints revenue, not just vanity double-taps.",
      problem: "Your current agency posts generic stock graphics your buyers scroll past.",
      fix: "Punchy, visual-first reels, static graphics, and scroll-stopping copy tailored to your ICP.",
      deliverables: "Monthly Content Strategy, Short-Form Video Editing, Visual Assets, Paid Amplification, Community Management",
    },
    {
      number: "02",
      title: "LinkedIn Authority & B2B Lead Engine",
      tagline: "Turn founder presence into a repeatable inbound pipeline.",
      problem: "Your LinkedIn looks like a static resume and your DMs are empty.",
      fix: "Thought leadership engineered for founders and B2B leaders that positions you as the obvious authority.",
      deliverables: "Profile Optimization, Ghostwriting, ICP Targeting, Account-Based Outreach, Inbound Nurturing",
    },
    {
      number: "03",
      title: "GBP SEO & AI AEO (Answer Engine Optimization)",
      tagline: "Rank on Google Local today. Rank inside ChatGPT and Claude tomorrow.",
      problem: "Buyers now ask Perplexity, ChatGPT, and Gemini who to hire, not just Google.",
      fix: "Google Business Profile optimization for local dominance plus structured-data architecture for AI Answer Engine placement.",
      deliverables: "GBP Local Grid Optimization, Citations, Structured Data, AI Engine Brand Placement",
    },
  ]);

  useEffect(() => {
    fetch("/api/admin/content?pageKey=services")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const { services: savedServices, ...rest } = data.data;
          setForm((prev) => ({ ...prev, ...rest }));
          if (savedServices) {
            setServices(
              savedServices.map((s: any) => ({
                ...s,
                deliverables: Array.isArray(s.deliverables) ? s.deliverables.join(", ") : s.deliverables,
              }))
            );
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleServiceChange = (index: number, field: keyof ServiceItemForm, value: string) => {
    setServices((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload = {
        ...form,
        services: services.map((s) => ({
          ...s,
          deliverables: s.deliverables.split(",").map((d) => d.trim()).filter(Boolean),
        })),
      };
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: "services", data: payload }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading current content...
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl space-y-5 border-t border-black/10 pt-8">
      <h3 className="font-display text-lg font-bold text-ink">Services Page Header</h3>

      <Field label="Eyebrow text" value={form.eyebrow} onChange={(v) => handleChange("eyebrow", v)} />
      <Field label="Headline" value={form.headline} onChange={(v) => handleChange("headline", v)} textarea />
      <Field
        label="Highlight word (must appear exactly in the headline above)"
        value={form.highlightWord}
        onChange={(v) => handleChange("highlightWord", v)}
      />
      <Field label="Description" value={form.description} onChange={(v) => handleChange("description", v)} textarea />

      <h3 className="mt-8 font-display text-lg font-bold text-ink">Service Cards</h3>

      {services.map((service, i) => (
        <div key={i} className="space-y-3 border border-black/10 bg-surface p-5">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            Service {service.number}
          </p>
          <Field label="Title" value={service.title} onChange={(v) => handleServiceChange(i, "title", v)} />
          <Field label="Tagline" value={service.tagline} onChange={(v) => handleServiceChange(i, "tagline", v)} />
          <Field label="Problem" value={service.problem} onChange={(v) => handleServiceChange(i, "problem", v)} textarea />
          <Field label="Fix" value={service.fix} onChange={(v) => handleServiceChange(i, "fix", v)} textarea />
          <Field
            label="Deliverables (comma-separated)"
            value={service.deliverables}
            onChange={(v) => handleServiceChange(i, "deliverables", v)}
            textarea
          />
        </div>
      ))}

      <h3 className="mt-8 font-display text-lg font-bold text-ink">Closing CTA</h3>
      <Field label="CTA Heading" value={form.ctaHeading} onChange={(v) => handleChange("ctaHeading", v)} />
      <Field label="CTA Button Text" value={form.ctaButtonText} onChange={(v) => handleChange("ctaButtonText", v)} />

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 border border-ink-solid bg-ink-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : saved ? (
          <>
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

interface ToolsFeatureForm {
  title: string;
  description: string;
}

function ToolsContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    eyebrow: "The Automation",
    headline: "Official WhatsApp Marketing Engine",
    complianceLabel: "Meta Compliance",
    complianceBoldText: "BUILT FOR ENTERPRISE-GRADE COMPLIANCE",
    complianceText:
      " — SideEye's WhatsApp Suite operates strictly on official Meta WhatsApp Cloud API infrastructure. We adhere fully to Meta's Commerce & Business Messaging Policies, enforcing user consent, opt-in management, and encrypted data routing.",
    comingSoonLabel: "🔮 Under Development in the SideEye Lab",
    comingSoonHeading: "Coming Soon",
  });
  const [features, setFeatures] = useState<ToolsFeatureForm[]>([
    {
      title: "High-Volume Broadcasts Without the Ban Risk",
      description:
        "Run hyper-targeted bulk campaigns to opted-in customers. Rich-media catalogs, interactive buttons, personalized offers, high open rates — without phone number bans.",
    },
    {
      title: "Automated Lead Follow-up & Chatbot Sequences",
      description:
        "Instantly capture, qualify, and route website/ad leads into automated WhatsApp conversations.",
    },
    {
      title: "Green-Tick Official Verification Setup",
      description:
        "Guided official Meta Business Verification to secure the WhatsApp Green Tick.",
    },
  ]);
  const [comingSoonItems, setComingSoonItems] = useState<string[]>([
    "AI Inbound Voice Agent — AI-powered voice qualification for incoming calls.",
    "Multi-Channel CRM Sync — Real-time sync between WhatsApp, HubSpot, and client databases.",
  ]);

  useEffect(() => {
    fetch("/api/admin/content?pageKey=tools")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const { features: savedFeatures, comingSoonItems: savedItems, ...rest } = data.data;
          setForm((prev) => ({ ...prev, ...rest }));
          if (savedFeatures) setFeatures(savedFeatures);
          if (savedItems) setComingSoonItems(savedItems);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleFeatureChange = (index: number, field: keyof ToolsFeatureForm, value: string) => {
    setFeatures((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    setSaved(false);
  };

  const addFeature = () => {
    setFeatures((prev) => [...prev, { title: "", description: "" }]);
    setSaved(false);
  };

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleComingSoonChange = (index: number, value: string) => {
    setComingSoonItems((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setSaved(false);
  };

  const addComingSoonItem = () => {
    setComingSoonItems((prev) => [...prev, ""]);
    setSaved(false);
  };

  const removeComingSoonItem = (index: number) => {
    setComingSoonItems((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload = { ...form, features, comingSoonItems };
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: "tools", data: payload }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading current content...
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl space-y-5 border-t border-black/10 pt-8">
      <h3 className="font-display text-lg font-bold text-ink">Tools Page Header</h3>

      <Field label="Eyebrow text" value={form.eyebrow} onChange={(v) => handleChange("eyebrow", v)} />
      <Field label="Headline" value={form.headline} onChange={(v) => handleChange("headline", v)} textarea />

      <h3 className="mt-8 font-display text-lg font-bold text-ink">Compliance Box</h3>
      <Field label="Label" value={form.complianceLabel} onChange={(v) => handleChange("complianceLabel", v)} />
      <Field
        label="Bold intro phrase"
        value={form.complianceBoldText}
        onChange={(v) => handleChange("complianceBoldText", v)}
      />
      <Field
        label="Rest of the paragraph (continues right after the bold phrase above)"
        value={form.complianceText}
        onChange={(v) => handleChange("complianceText", v)}
        textarea
      />

      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-ink">Feature Cards</h3>
        <button type="button" onClick={addFeature} className="text-xs font-medium text-accent hover:underline">
          + Add Feature
        </button>
      </div>

      {features.map((feature, i) => (
        <div key={i} className="space-y-3 border border-black/10 bg-surface p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">Feature {i + 1}</p>
            <button type="button" onClick={() => removeFeature(i)} className="text-xs text-muted hover:text-accent">
              Remove
            </button>
          </div>
          <Field label="Title" value={feature.title} onChange={(v) => handleFeatureChange(i, "title", v)} />
          <Field
            label="Description"
            value={feature.description}
            onChange={(v) => handleFeatureChange(i, "description", v)}
            textarea
          />
        </div>
      ))}

      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-ink">Coming Soon</h3>
        <button type="button" onClick={addComingSoonItem} className="text-xs font-medium text-accent hover:underline">
          + Add Item
        </button>
      </div>
      <Field label="Section label" value={form.comingSoonLabel} onChange={(v) => handleChange("comingSoonLabel", v)} />
      <Field label="Section heading" value={form.comingSoonHeading} onChange={(v) => handleChange("comingSoonHeading", v)} />

      {comingSoonItems.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1">
            <Field label={`Item ${i + 1}`} value={item} onChange={(v) => handleComingSoonChange(i, v)} textarea />
          </div>
          <button
            type="button"
            onClick={() => removeComingSoonItem(i)}
            className="mt-7 text-xs text-muted hover:text-accent"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 border border-ink-solid bg-ink-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : saved ? (
          <>
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

interface CaseStudyStatForm {
  value: string;
  prefix: string;
  suffix: string;
  label: string;
  useKFormat: boolean;
}

interface CaseStudyForm {
  id: string;
  client: string;
  headlineStat: string;
  subtitle: string;
  challenge: string;
  strategy: string;
  stats: CaseStudyStatForm[];
}

const defaultCaseStudies: CaseStudyForm[] = [
  {
    id: "01",
    client: "Grain Connect",
    headlineStat: "6+ B2B Client Conversions in 60 Days",
    subtitle: "Zero-to-One LinkedIn Brand Positioning",
    challenge: "Zero organic presence on LinkedIn, reliant on cold, low-converting calls.",
    strategy:
      "Rebuilt executive LinkedIn profiles from scratch, published authoritative industry analysis, deployed targeted B2B messaging.",
    stats: [
      { value: "2000", prefix: "", suffix: "+", label: "Followers (60 days)", useKFormat: false },
      { value: "6", prefix: "", suffix: "+", label: "B2B Client Conversions", useKFormat: true },
      { value: "50000", prefix: "", suffix: "+", label: "Impressions", useKFormat: false },
      { value: "60", prefix: "", suffix: " Days", label: "Timeline", useKFormat: true },
    ],
  },
  {
    id: "02",
    client: "Ajay Trading Company",
    headlineStat: "10 Inbound Enquiries · Zero Ad Spend",
    subtitle: "Hyper-Local Reel Funnel",
    challenge: "Stagnant foot traffic and high cost-per-lead on standard Google Ads.",
    strategy:
      "Localized short-form Reel campaigns on high-margin products paired with automated WhatsApp broadcast follow-ups.",
    stats: [
      { value: "10", prefix: "", suffix: "", label: "Inbound Enquiries", useKFormat: true },
      { value: "23000", prefix: "", suffix: "+", label: "Impressions", useKFormat: false },
      { value: "0", prefix: "", suffix: "", label: "Ad Spend", useKFormat: true },
      { value: "7", prefix: "", suffix: "", label: "Reels", useKFormat: true },
    ],
  },
];

function CaseStudiesContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    eyebrow: "Selected Work",
    headline: "Receipts, Not Promises.",
  });
  const [caseStudies, setCaseStudies] = useState<CaseStudyForm[]>(defaultCaseStudies);

  useEffect(() => {
    fetch("/api/admin/content?pageKey=case-studies")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const { caseStudies: savedStudies, ...rest } = data.data;
          setForm((prev) => ({ ...prev, ...rest }));
          if (savedStudies) {
            setCaseStudies(
              savedStudies.map((s: any) => ({
                ...s,
                stats: (s.stats || []).map((st: any) => ({
                  value: String(st.value ?? ""),
                  prefix: st.prefix || "",
                  suffix: st.suffix || "",
                  label: st.label || "",
                  useKFormat: st.useKFormat !== false,
                })),
              }))
            );
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleStudyChange = (
    index: number,
    field: keyof Omit<CaseStudyForm, "stats">,
    value: string
  ) => {
    setCaseStudies((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    setSaved(false);
  };

  const addCaseStudy = () => {
    setCaseStudies((prev) => [
      ...prev,
      {
        id: String(prev.length + 1).padStart(2, "0"),
        client: "",
        headlineStat: "",
        subtitle: "",
        challenge: "",
        strategy: "",
        stats: [],
      },
    ]);
    setSaved(false);
  };

  const removeCaseStudy = (index: number) => {
    setCaseStudies((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleStatChange = (
    studyIndex: number,
    statIndex: number,
    field: keyof CaseStudyStatForm,
    value: string | boolean
  ) => {
    setCaseStudies((prev) => {
      const next = [...prev];
      const stats = [...next[studyIndex].stats];
      stats[statIndex] = { ...stats[statIndex], [field]: value };
      next[studyIndex] = { ...next[studyIndex], stats };
      return next;
    });
    setSaved(false);
  };

  const addStat = (studyIndex: number) => {
    setCaseStudies((prev) => {
      const next = [...prev];
      next[studyIndex] = {
        ...next[studyIndex],
        stats: [
          ...next[studyIndex].stats,
          { value: "0", prefix: "", suffix: "", label: "", useKFormat: true },
        ],
      };
      return next;
    });
    setSaved(false);
  };

  const removeStat = (studyIndex: number, statIndex: number) => {
    setCaseStudies((prev) => {
      const next = [...prev];
      next[studyIndex] = {
        ...next[studyIndex],
        stats: next[studyIndex].stats.filter((_, i) => i !== statIndex),
      };
      return next;
    });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload = {
        ...form,
        caseStudies: caseStudies.map((s) => ({
          ...s,
          stats: s.stats.map((st) => ({
            value: Number(st.value) || 0,
            prefix: st.prefix,
            suffix: st.suffix,
            label: st.label,
            useKFormat: st.useKFormat,
          })),
        })),
      };
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: "case-studies", data: payload }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading current content...
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl space-y-5 border-t border-black/10 pt-8">
      <h3 className="font-display text-lg font-bold text-ink">Case Studies Page Header</h3>

      <Field label="Eyebrow text" value={form.eyebrow} onChange={(v) => handleChange("eyebrow", v)} />
      <Field label="Headline" value={form.headline} onChange={(v) => handleChange("headline", v)} textarea />

      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-ink">Case Studies</h3>
        <button type="button" onClick={addCaseStudy} className="text-xs font-medium text-accent hover:underline">
          + Add Case Study
        </button>
      </div>

      {caseStudies.map((study, si) => (
        <div key={si} className="space-y-3 border border-black/10 bg-surface p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Case Study {study.id || si + 1}
            </p>
            <button
              type="button"
              onClick={() => removeCaseStudy(si)}
              className="text-xs text-muted hover:text-accent"
            >
              Remove
            </button>
          </div>
          <Field label="ID (e.g. 01)" value={study.id} onChange={(v) => handleStudyChange(si, "id", v)} />
          <Field label="Client name" value={study.client} onChange={(v) => handleStudyChange(si, "client", v)} />
          <Field label="Subtitle" value={study.subtitle} onChange={(v) => handleStudyChange(si, "subtitle", v)} />
          <Field
            label="Headline stat (shown always visible, e.g. '6+ B2B Client Conversions in 60 Days')"
            value={study.headlineStat}
            onChange={(v) => handleStudyChange(si, "headlineStat", v)}
            textarea
          />
          <Field label="Problem / Challenge" value={study.challenge} onChange={(v) => handleStudyChange(si, "challenge", v)} textarea />
          <Field label="Strategy" value={study.strategy} onChange={(v) => handleStudyChange(si, "strategy", v)} textarea />

          <div className="mt-4 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">Result Stats</p>
            <button
              type="button"
              onClick={() => addStat(si)}
              className="text-xs font-medium text-accent hover:underline"
            >
              + Add Stat
            </button>
          </div>

          {study.stats.map((stat, sti) => (
            <div key={sti} className="grid grid-cols-2 gap-2 border border-black/10 bg-stone p-3 sm:grid-cols-5 sm:items-end">
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(si, sti, "value", e.target.value)}
                  className="w-full border border-black/10 bg-surface px-2 py-2 text-xs text-ink outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">Prefix</label>
                <input
                  type="text"
                  value={stat.prefix}
                  onChange={(e) => handleStatChange(si, sti, "prefix", e.target.value)}
                  className="w-full border border-black/10 bg-surface px-2 py-2 text-xs text-ink outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">Suffix</label>
                <input
                  type="text"
                  value={stat.suffix}
                  onChange={(e) => handleStatChange(si, sti, "suffix", e.target.value)}
                  className="w-full border border-black/10 bg-surface px-2 py-2 text-xs text-ink outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(si, sti, "label", e.target.value)}
                  className="w-full border border-black/10 bg-surface px-2 py-2 text-xs text-ink outline-none focus:border-accent"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 text-[10px] text-muted">
                  <input
                    type="checkbox"
                    checked={stat.useKFormat}
                    onChange={(e) => handleStatChange(si, sti, "useKFormat", e.target.checked)}
                  />
                  Use 1.2K format
                </label>
                <button
                  type="button"
                  onClick={() => removeStat(si, sti)}
                  className="ml-auto text-[10px] text-muted hover:text-accent"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 border border-ink-solid bg-ink-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : saved ? (
          <>
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

interface FaqItemForm {
  question: string;
  answer: string;
}

function FaqsContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    eyebrow: "Questions",
    headline: "Frequently Asked Questions",
    bottomLabel: "One more thing",
    bottomText: "Still have questions? Or just want to see how many agency clichés you've survived?",
  });
  const [faqs, setFaqs] = useState<FaqItemForm[]>([
    {
      question: "Why shouldn't I just hire an in-house team or a cheap freelancer?",
      answer:
        "Because an in-house hire takes months to ramp, costs more than you'd expect, and still lacks cross-channel expertise. Freelancers execute tasks — SideEye builds growth systems with proven frameworks, compliance infrastructure, and measurable pipeline outcomes.",
    },
    {
      question: "Is your WhatsApp Marketing Suite compliant with Meta's policies?",
      answer:
        "Yes — we operate exclusively on official Meta Cloud API endpoints. No scraping, no spam, no grey-market tools. Every campaign requires documented opt-in records, and we enforce consent management as part of our onboarding process.",
    },
    {
      question: "How quickly can we launch?",
      answer:
        "Engine 1 (Services) onboarding begins within 48 hours of contract signing. Engine 2 (WhatsApp API setup & Meta verification) typically takes 3–5 business days, depending on your documentation readiness and Meta review timelines.",
    },
    {
      question: "Do you offer guarantees?",
      answer:
        "We guarantee operator-grade execution, transparent data reporting, and rapid iteration cycles. We don't promise vanity metrics — we commit to building systems that generate measurable inbound pipeline and compliant messaging infrastructure.",
    },
  ]);

  useEffect(() => {
    fetch("/api/admin/content?pageKey=faqs")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const { faqs: savedFaqs, ...rest } = data.data;
          setForm((prev) => ({ ...prev, ...rest }));
          if (savedFaqs) setFaqs(savedFaqs);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleFaqChange = (index: number, field: keyof FaqItemForm, value: string) => {
    setFaqs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    setSaved(false);
  };

  const addFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
    setSaved(false);
  };

  const removeFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload = { ...form, faqs };
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: "faqs", data: payload }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading current content...
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl space-y-5 border-t border-black/10 pt-8">
      <h3 className="font-display text-lg font-bold text-ink">FAQs Page Header</h3>

      <Field label="Eyebrow text" value={form.eyebrow} onChange={(v) => handleChange("eyebrow", v)} />
      <Field label="Headline" value={form.headline} onChange={(v) => handleChange("headline", v)} />

      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-ink">Questions</h3>
        <button type="button" onClick={addFaq} className="text-xs font-medium text-accent hover:underline">
          + Add Question
        </button>
      </div>

      {faqs.map((faq, i) => (
        <div key={i} className="space-y-3 border border-black/10 bg-surface p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">Question {i + 1}</p>
            <button type="button" onClick={() => removeFaq(i)} className="text-xs text-muted hover:text-accent">
              Remove
            </button>
          </div>
          <Field label="Question" value={faq.question} onChange={(v) => handleFaqChange(i, "question", v)} textarea />
          <Field label="Answer" value={faq.answer} onChange={(v) => handleFaqChange(i, "answer", v)} textarea />
        </div>
      ))}

      <h3 className="mt-8 font-display text-lg font-bold text-ink">Bottom Section</h3>
      <Field label="Label" value={form.bottomLabel} onChange={(v) => handleChange("bottomLabel", v)} />
      <Field label="Text" value={form.bottomText} onChange={(v) => handleChange("bottomText", v)} textarea />

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 border border-ink-solid bg-ink-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : saved ? (
          <>
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

function ContactContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    eyebrow: "Get In Touch",
    headline: "Ready to Stop Getting Side-Eyed by Your Competitors?",
    description: "Fill out the form below or chat with us directly via our verified WhatsApp channel.",
  });

  useEffect(() => {
    fetch("/api/admin/content?pageKey=contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setForm((prev) => ({ ...prev, ...data.data }));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: "contact", data: form }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading current content...
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl space-y-5 border-t border-black/10 pt-8">
      <h3 className="font-display text-lg font-bold text-ink">Contact Page Header</h3>
      <p className="text-xs text-muted">
        Note: the email, phone, WhatsApp, and location details are pulled from site config and are not editable here.
      </p>

      <Field label="Eyebrow text" value={form.eyebrow} onChange={(v) => handleChange("eyebrow", v)} />
      <Field label="Headline" value={form.headline} onChange={(v) => handleChange("headline", v)} textarea />
      <Field label="Description" value={form.description} onChange={(v) => handleChange("description", v)} textarea />

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 border border-ink-solid bg-ink-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : saved ? (
          <>
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

interface AboutDifferentiatorForm {
  title: string;
  description: string;
}

function AboutContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    heroEyebrow: "Who we are",
    heroHeadline: "We're Not Here to Impress You With Jargon.",
    heroHighlightWord: "Jargon",
    heroDescription:
      "SideEye.in is an independent growth ecosystem built by people who got tired of watching agencies charge premium prices for outdated playbooks. So we built something better.",
    storyEyebrow: "Our Story",
    storyHeadline: "Built Out of Gurugram, For Founders Who Are Done Waiting.",
    storyParagraph1:
      "We started SideEye because we kept seeing the same pattern: businesses paying big retainers for agencies that delivered pretty reports and little else. Meanwhile, the tools to actually move revenue - real LinkedIn authority, real local search dominance, real compliant automation - were sitting right there, underused.",
    storyParagraph2:
      "So we built a dual-powered ecosystem: sharp, high-conviction service execution paired with scalable, Meta-compliant automation tools. No bloated decks. No empty promises. Just infrastructure that prints results.",
    differentiatorsEyebrow: "Why We're Different",
    differentiatorsHeadline: "Four Reasons Founders Stick With Us.",
    ctaHeading: "Ready to Work With People Who Actually Ship?",
    ctaText: "Let's talk about what growth actually looks like for your business.",
    ctaButtonText: "Get Side-Eyed",
  });
  const [differentiators, setDifferentiators] = useState<AboutDifferentiatorForm[]>([
    {
      title: "Operator-Grade Execution",
      description:
        "We don't hand you a strategy deck and disappear. Every campaign is run by people who've actually shipped growth for real businesses, not just presented slides about it.",
    },
    {
      title: "Meta-Compliant Infrastructure",
      description:
        "Our WhatsApp automation runs entirely on official Meta Cloud API endpoints. No sketchy third-party tools, no ban risk, no shortcuts that put your business at risk.",
    },
    {
      title: "No-Fluff Transparency",
      description:
        "You'll always know exactly what's working and what isn't. Real numbers, real timelines, real conversations - no vanity metrics dressed up as wins.",
    },
    {
      title: "Built for Founders, Not Committees",
      description:
        "We move at founder speed. Fast decisions, fast execution, no bureaucratic sign-off chains slowing down your growth.",
    },
  ]);

  useEffect(() => {
    fetch("/api/admin/content?pageKey=about")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const { differentiators: savedDiffs, ...rest } = data.data;
          setForm((prev) => ({ ...prev, ...rest }));
          if (savedDiffs) setDifferentiators(savedDiffs);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleDiffChange = (index: number, field: keyof AboutDifferentiatorForm, value: string) => {
    setDifferentiators((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    setSaved(false);
  };

  const addDifferentiator = () => {
    setDifferentiators((prev) => [...prev, { title: "", description: "" }]);
    setSaved(false);
  };

  const removeDifferentiator = (index: number) => {
    setDifferentiators((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload = { ...form, differentiators };
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: "about", data: payload }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading current content...
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl space-y-5 border-t border-black/10 pt-8">
      <h3 className="font-display text-lg font-bold text-ink">Hero Section</h3>

      <Field label="Eyebrow text" value={form.heroEyebrow} onChange={(v) => handleChange("heroEyebrow", v)} />
      <Field label="Headline" value={form.heroHeadline} onChange={(v) => handleChange("heroHeadline", v)} textarea />
      <Field
        label="Highlight word (must appear exactly in the headline above, will be colored red)"
        value={form.heroHighlightWord}
        onChange={(v) => handleChange("heroHighlightWord", v)}
      />
      <Field label="Description" value={form.heroDescription} onChange={(v) => handleChange("heroDescription", v)} textarea />

      <h3 className="mt-8 font-display text-lg font-bold text-ink">Our Story</h3>
      <Field label="Eyebrow text" value={form.storyEyebrow} onChange={(v) => handleChange("storyEyebrow", v)} />
      <Field label="Headline" value={form.storyHeadline} onChange={(v) => handleChange("storyHeadline", v)} textarea />
      <Field label="Paragraph 1" value={form.storyParagraph1} onChange={(v) => handleChange("storyParagraph1", v)} textarea />
      <Field label="Paragraph 2" value={form.storyParagraph2} onChange={(v) => handleChange("storyParagraph2", v)} textarea />

      <h3 className="mt-8 font-display text-lg font-bold text-ink">Why We're Different — Header</h3>
      <Field label="Eyebrow text" value={form.differentiatorsEyebrow} onChange={(v) => handleChange("differentiatorsEyebrow", v)} />
      <Field label="Headline" value={form.differentiatorsHeadline} onChange={(v) => handleChange("differentiatorsHeadline", v)} textarea />

      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-ink">Differentiator Cards</h3>
        <button type="button" onClick={addDifferentiator} className="text-xs font-medium text-accent hover:underline">
          + Add Card
        </button>
      </div>

      {differentiators.map((item, i) => (
        <div key={i} className="space-y-3 border border-black/10 bg-surface p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">Card 0{i + 1}</p>
            <button type="button" onClick={() => removeDifferentiator(i)} className="text-xs text-muted hover:text-accent">
              Remove
            </button>
          </div>
          <Field label="Title" value={item.title} onChange={(v) => handleDiffChange(i, "title", v)} />
          <Field label="Description" value={item.description} onChange={(v) => handleDiffChange(i, "description", v)} textarea />
        </div>
      ))}

      <h3 className="mt-8 font-display text-lg font-bold text-ink">Closing CTA</h3>
      <Field label="CTA Heading" value={form.ctaHeading} onChange={(v) => handleChange("ctaHeading", v)} textarea />
      <Field label="CTA Text" value={form.ctaText} onChange={(v) => handleChange("ctaText", v)} textarea />
      <Field label="CTA Button Text" value={form.ctaButtonText} onChange={(v) => handleChange("ctaButtonText", v)} />

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 border border-ink-solid bg-ink-solid px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : saved ? (
          <>
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full border border-black/10 bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-black/10 bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-accent"
        />
      )}
    </div>
  );
}