import { createMetadata } from "@/lib/metadata";
import GrowthQuiz from "@/components/GrowthQuiz";

export const metadata = createMetadata({
  title: "Growth Velocity Quiz — SideEye.in",
  description:
    "Take our 60-second Growth Velocity self-audit and find out if your growth engine is flatlining, idling, or already in velocity mode.",
  path: "/growth-quiz",
});

export default function GrowthQuizPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GrowthQuiz />
      </div>
    </section>
  );
}