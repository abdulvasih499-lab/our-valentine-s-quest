import { useState, useCallback } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import SparkleTrail from "@/components/SparkleTrail";
import LockedGate from "@/components/LockedGate";
import LoveEnvelope from "@/components/LoveEnvelope";
import Milestone from "@/components/Milestone";
import TimelineConnector from "@/components/TimelineConnector";
import ValentineCountdown from "@/components/ValentineCountdown";
import Proposal from "@/components/Proposal";
import milestone1 from "@/assets/milestone-1.jpg";
import milestone2 from "@/assets/milestone-2.jpg";
import milestone3 from "@/assets/milestone-3.jpg";

const milestones = [
  {
    image: milestone1,
    title: "Where It Began",
    caption:
      "Two strangers, one coffee shop, and a conversation that never really ended. That golden afternoon changed everything.",
    variant: "polaroid" as const,
    emoji: "☕",
  },
  {
    image: milestone2,
    title: "The Laughs",
    caption:
      "From silly inside jokes to laughing until our stomachs hurt — every moment with you is my favorite kind of chaos.",
    variant: "circle" as const,
    emoji: "😂",
  },
  {
    image: milestone3,
    title: "The Moment I Knew",
    caption:
      "Under a sky full of stars, I looked at you and just knew — you're the one I want beside me for every adventure to come.",
    variant: "polaroid-alt" as const,
    emoji: "🌟",
  },
];

const Index = () => {
  const [phase, setPhase] = useState<"gate" | "envelope" | "journey">("gate");

  const handleUnlock = useCallback(() => {
    setPhase("envelope");
  }, []);

  const handleEnvelopeDone = useCallback(() => {
    setPhase("journey");
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--blush))] relative overflow-x-hidden">
      <FloatingHearts />
      <SparkleTrail />

      {phase === "gate" && <LockedGate onUnlock={handleUnlock} />}
      {phase === "envelope" && <LoveEnvelope onComplete={handleEnvelopeDone} />}

      <main
        className={`relative z-10 transition-all duration-1000 ${
          phase === "journey" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="text-center pt-12 pb-4 px-6">
          <h1 className="text-5xl md:text-7xl text-primary mb-2">Our Love Story</h1>
          <p className="text-muted-foreground text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Every chapter written with love ✨
          </p>
        </div>

        {/* Countdown */}
        <ValentineCountdown />

        {/* Journey milestones with connectors */}
        <div className="pt-4">
          {milestones.map((m, i) => (
            <div key={i}>
              <Milestone {...m} index={i} />
              {i < milestones.length - 1 && <TimelineConnector />}
            </div>
          ))}
        </div>

        {/* Proposal */}
        <Proposal />

        {/* Footer */}
        <div className="text-center py-12 px-6">
          <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Made with 💖 just for you
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
