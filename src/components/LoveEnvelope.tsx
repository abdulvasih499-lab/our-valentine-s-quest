import { useState, useEffect, useRef } from "react";

const LoveEnvelope = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"closed" | "opening" | "letter-rising" | "done">("closed");
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setPhase("opening"), 400);
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (phase === "opening") {
      timerRef.current = setTimeout(() => setPhase("letter-rising"), 800);
    } else if (phase === "letter-rising") {
      timerRef.current = setTimeout(() => setPhase("done"), 1500);
    } else if (phase === "done") {
      timerRef.current = setTimeout(onComplete, 600);
    }
    return () => clearTimeout(timerRef.current);
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-72 h-52 md:w-96 md:h-64">
        {/* Letter */}
        <div
          className={`absolute inset-x-4 bg-white rounded-lg shadow-lg flex items-center justify-center transition-all duration-1000 ease-out ${
            phase === "closed"
              ? "top-8 bottom-4"
              : phase === "opening"
              ? "top-4 bottom-4"
              : "top-0 bottom-0 -translate-y-8 scale-105"
          } ${phase === "done" ? "opacity-0 -translate-y-16" : "opacity-100"}`}
        >
          <div className="text-center px-6">
            <p className="text-primary text-2xl md:text-3xl mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Our Love Story
            </p>
            <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Scroll to begin... 💕
            </p>
          </div>
        </div>

        {/* Envelope body */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            phase === "done" ? "opacity-0 scale-95" : "opacity-100"
          }`}
        >
          {/* Bottom part */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[hsl(350,60%,88%)] rounded-b-xl border-2 border-primary/20" />
          {/* Flap */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-700 ease-in-out ${
              phase !== "closed" ? "rotate-x-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              background: "linear-gradient(to bottom, hsl(340, 82%, 52%), hsl(350, 60%, 88%))",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoveEnvelope;
