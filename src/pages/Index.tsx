import { useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import LockedGate from "@/components/LockedGate";
import Milestone from "@/components/Milestone";
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
  },
  {
    image: milestone2,
    title: "The Laughs",
    caption:
      "From silly inside jokes to laughing until our stomachs hurt — every moment with you is my favorite kind of chaos.",
    variant: "circle" as const,
  },
  {
    image: milestone3,
    title: "The Moment I Knew",
    caption:
      "Under a sky full of stars, I looked at you and just knew — you're the one I want beside me for every adventure to come.",
    variant: "polaroid-alt" as const,
  },
];

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(var(--blush))] relative overflow-x-hidden">
      <FloatingHearts />

      {!unlocked && <LockedGate onUnlock={() => setUnlocked(true)} />}

      <main className={`relative z-10 transition-opacity duration-1000 ${unlocked ? "opacity-100" : "opacity-0"}`}>
        {/* Journey milestones */}
        <div className="pt-8">
          {milestones.map((m, i) => (
            <Milestone key={i} {...m} index={i} />
          ))}
        </div>

        {/* Proposal */}
        <Proposal />
      </main>
    </div>
  );
};

export default Index;
