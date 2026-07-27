export interface QuizOption {
  label: string;
  points: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "content",
    question: "How consistently does your brand publish content right now?",
    options: [
      { label: "We post whenever someone remembers to", points: 4 },
      { label: "A few times a month, no real strategy", points: 10 },
      { label: "Weekly, with some planning", points: 15 },
      { label: "Daily, with a documented content system", points: 20 },
    ],
  },
  {
    id: "linkedin",
    question: "How would you describe your founder/leadership LinkedIn presence?",
    options: [
      { label: "It's basically a digital resume, nothing more", points: 4 },
      { label: "We post occasionally, low engagement", points: 10 },
      { label: "Regular posting, growing a bit of authority", points: 15 },
      { label: "Consistent thought leadership, inbound DMs happen", points: 20 },
    ],
  },
  {
    id: "leadSpeed",
    question: "How fast does a new inbound lead get a response?",
    options: [
      { label: "Whenever someone gets around to it", points: 4 },
      { label: "Within a day or two", points: 10 },
      { label: "Within a few hours", points: 15 },
      { label: "Instantly, via automated follow-up", points: 20 },
    ],
  },
  {
    id: "aiSearch",
    question: "Does your brand show up when people ask ChatGPT or Perplexity for recommendations in your space?",
    options: [
      { label: "No idea, never checked", points: 4 },
      { label: "Checked once, weren't mentioned", points: 10 },
      { label: "Show up sometimes, inconsistently", points: 15 },
      { label: "Yes, we actively optimize for AI search", points: 20 },
    ],
  },
  {
    id: "systemMaturity",
    question: "If you stopped manually pushing marketing for a month, what happens?",
    options: [
      { label: "Everything stops completely", points: 4 },
      { label: "It slows down a lot", points: 10 },
      { label: "It dips but mostly holds", points: 15 },
      { label: "Barely notice — the system runs itself", points: 20 },
    ],
  },
];

export interface ScoreBand {
  label: string;
  min: number;
  max: number;
  summary: string;
}

export const SCORE_BANDS: ScoreBand[] = [
  {
    label: "Flatlining",
    min: 0,
    max: 40,
    summary:
      "Growth is currently running on hope, not a system. There's real upside available just from putting basic infrastructure in place.",
  },
  {
    label: "Idling",
    min: 41,
    max: 65,
    summary:
      "The pieces exist, but they're not compounding yet. A few structural fixes could turn scattered effort into real pipeline.",
  },
  {
    label: "Accelerating",
    min: 66,
    max: 85,
    summary:
      "There's genuine momentum here. A handful of targeted upgrades would push this from good to genuinely hard to compete with.",
  },
  {
    label: "Velocity Mode",
    min: 86,
    max: 100,
    summary:
      "This is already ahead of most competitors. The opportunity now is compounding what's working, not fixing what's broken.",
  },
];

// TODO: swap this for an AI-based analysis call (e.g. Claude API) that takes
// the raw answers and generates a more nuanced, personalized write-up instead
// of a fixed score band. Keep the function signature the same so callers
// don't need to change.
export function calculateGrowthScore(answers: Record<string, number>): {
  score: number;
  band: ScoreBand;
} {
  const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const band =
    SCORE_BANDS.find((b) => total >= b.min && total <= b.max) ??
    SCORE_BANDS[SCORE_BANDS.length - 1];
  return { score: total, band };
}