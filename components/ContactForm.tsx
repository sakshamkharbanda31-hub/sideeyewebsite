"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid business email"),
  phone: z.string().min(10, "Enter a valid WhatsApp number"),
  interest: z.enum(["Engine 1 (Services)", "Engine 2 (WhatsApp Suite)", "Both"]),
  budget: z.enum([
    "Under Rs. 50,000 / month",
    "Rs. 50,000 - Rs. 1,50,000 / month",
    "Rs. 1,50,000 - Rs. 5,00,000 / month",
    "Rs. 5,00,000+ / month",
  ]),
  message: z.string().min(10, "Tell us about your pain point (min 10 characters)"),
  website: z.string().max(0, "Invalid submission"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass =
  "w-full border border-black/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent";

export default function ContactForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: "Engine 1 (Services)",
      budget: "Under Rs. 50,000 / month",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setSubmitError(result.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      reset();
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    }
  };

  if (success) {
    return (
      <div className="border border-black/10 bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
          Request Received
        </h3>
        <p className="mt-2 text-sm text-muted">
          We&apos;ve got your details. Our team will reach out within 24 hours via email or
          WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-medium underline hover:opacity-70"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <div>
        <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
          Full Name *
        </label>
        <input id="name" className={inputClass} {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-accent">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
          Business Email *
        </label>
        <input id="email" type="email" className={inputClass} {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-accent">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
          WhatsApp Phone Number *
        </label>
        <input id="phone" type="tel" className={inputClass} {...register("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-accent">{errors.phone.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="interest" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
            Interest *
          </label>
          <select id="interest" className={inputClass} {...register("interest")}>
            <option value="Engine 1 (Services)">Engine 1 (Services)</option>
            <option value="Engine 2 (WhatsApp Suite)">Engine 2 (WhatsApp Suite)</option>
            <option value="Both">Both</option>
          </select>
          {errors.interest && <p className="mt-1 text-xs text-accent">{errors.interest.message}</p>}
        </div>

        <div>
          <label htmlFor="budget" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
            Monthly Budget / Scale *
          </label>
          <select id="budget" className={inputClass} {...register("budget")}>
            <option value="Under Rs. 50,000 / month">Under Rs. 50,000 / month</option>
            <option value="Rs. 50,000 - Rs. 1,50,000 / month">Rs. 50,000 - Rs. 1,50,000 / month</option>
            <option value="Rs. 1,50,000 - Rs. 5,00,000 / month">Rs. 1,50,000 - Rs. 5,00,000 / month</option>
            <option value="Rs. 5,00,000+ / month">Rs. 5,00,000+ / month</option>
          </select>
          {errors.budget && <p className="mt-1 text-xs text-accent">{errors.budget.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
          Message / Pain Point *
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${inputClass} resize-y`}
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-accent">{errors.message.message}</p>}
      </div>

      {submitError && (
        <p className="rounded-sm border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-accent">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-solid bg-ink-solid px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Submitting...
          </>
        ) : (
          "Submit & Request Demo"
        )}
      </button>
    </form>
  );
}