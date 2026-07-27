"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { QUIZ_QUESTIONS, calculateGrowthScore } from "@/lib/growthQuiz";

type Stage = "intro" | "quiz" | "results";

const leadSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid business email"),
  phone: z.string().min(10, "Enter a valid WhatsApp number"),
});
type LeadFormData = z.infer<typeof leadSchema>;

export default function GrowthQuiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const question = QUIZ_QUESTIONS[currentQ];
  const progress = (currentQ / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = (points: number) => {
    const updated = { ...answers, [question.id]: points };
    setAnswers(updated);
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setStage("results");
    }
  };

  const { score, band } = calculateGrowthScore(answers);

  const onSubmitLead = async (data: LeadFormData) => {
    setSubmitState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          interest: "Growth Velocity Quiz",
          budget: "Not specified",
          message: "Growth Velocity Quiz result: " + score + "/100 (" + band.label + "). " + band.summary,
          website: "",
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          60-second self-audit
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
          What&apos;s Your Growth Velocity Score?
        </h1>
        <p className="mt-4 text-muted">
          Five quick questions. No fluff. Find out if your growth engine is
          flatlining, idling, or already in velocity mode.
        </p>
        <button
          type="button"
          onClick={() => setStage("quiz")}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink-solid bg-ink-solid px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Start the Quiz <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    );
  }

  if (stage === "quiz") {
    return (
      <div className="mx-auto max-w-xl">
        <div className="h-1 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: progress + "%" }}
          />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
          Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold text-ink">
          {question.question}
        </h2>
        <div className="mt-6 flex flex-col gap-3">
          {question.options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => handleAnswer(option.points)}
              className="border border-black/10 bg-surface px-5 py-4 text-left text-sm text-ink transition hover:border-accent hover:bg-accent/5"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (submitState === "success") {
    return (
      <div className="mx-auto max-w-xl text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-bold text-ink">
          Sent. We&apos;ll Reach Out Shortly.
        </h2>
        <p className="mt-2 text-sm text-muted">
          Your Growth Velocity Score ({score}/100 — {band.label}) has been
          logged. Our team will follow up with a tailored plan.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
        Your Result
      </p>
      <p className="mt-4 font-display text-6xl font-bold text-ink">{score}</p>
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
        / 100
      </p>
      <p className="mt-4 font-display text-2xl font-bold text-accent">
        {band.label}
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">{band.summary}</p>

      <form
        onSubmit={handleSubmit(onSubmitLead)}
        className="mx-auto mt-10 max-w-sm space-y-4 border border-black/10 bg-surface p-6 text-left"
        noValidate
      >
        <p className="text-center font-mono text-xs uppercase tracking-wider text-muted">
          Get your custom growth plan
        </p>
        <div>
          <input
            placeholder="Full name"
            className="w-full border border-black/10 bg-background px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-accent">{errors.name.message}</p>}
        </div>
        <div>
          <input
            placeholder="Business email"
            className="w-full border border-black/10 bg-background px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-accent">{errors.email.message}</p>}
        </div>
        <div>
          <input
            placeholder="WhatsApp number"
            className="w-full border border-black/10 bg-background px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1 text-xs text-accent">{errors.phone.message}</p>}
        </div>
        {submitState === "error" && (
          <p className="text-xs text-accent">Something went wrong. Please try again.</p>
        )}
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-solid bg-ink-solid px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {submitState === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending...
            </>
          ) : (
            "Get My Growth Plan"
          )}
        </button>
      </form>
    </div>
  );
}