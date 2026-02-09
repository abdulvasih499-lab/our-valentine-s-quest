import { useState, useEffect, useRef } from "react";
import gateBg from "@/assets/gate-bg.jpg";
import TypewriterText from "@/components/TypewriterText";

interface LockedGateProps {
  onUnlock: () => void;
}

const LockedGate = ({ onUnlock }: LockedGateProps) => {
  const [password, setPassword] = useState("");
  const [shaking, setShaking] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const lockRef = useRef<HTMLDivElement>(null);

  // Animate lock icon on unlock
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === "pizza") {
      setUnlocking(true);
      setTimeout(onUnlock, 1400);
    } else {
      setShaking(true);
      setAttempts((a) => a + 1);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const hints = [
    "Hint: Our favorite secret word",
    "Think about what we love to eat together... 🍕",
    "It's round, cheesy, and delicious!",
    "Okay fine... it rhymes with 'piazza' 😉",
  ];

  return (
    <div
      ref={lockRef}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        unlocking ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Background with parallax-like Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={gateBg}
          alt=""
          className="w-full h-full object-cover scale-110 animate-[kenburns_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Animated particles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `float-heart ${Math.random() * 6 + 6}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-md w-full">
        {/* Lock icon */}
        <div className={`text-5xl mb-4 transition-transform duration-500 ${unlocking ? "rotate-12 scale-150 opacity-0" : ""}`}>
          {unlocking ? "🔓" : "🔒"}
        </div>

        <h1 className="text-5xl md:text-7xl text-white mb-2 drop-shadow-lg">
          <TypewriterText text="Valentine's Quest" speed={100} />
        </h1>
        <p className="text-white/80 text-lg mb-8 font-light" style={{ fontFamily: "Quicksand, sans-serif" }}>
          💕 A journey made for two 💕
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={shaking ? "animate-shake" : ""}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the secret word..."
              className="w-full px-6 py-4 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white placeholder-white/50 text-center text-lg focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all"
              style={{ fontFamily: "Quicksand, sans-serif" }}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-full bg-primary text-primary-foreground text-lg font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all animate-pulse-glow"
            style={{ fontFamily: "Quicksand, sans-serif" }}
          >
            Unlock Our Story 🔓
          </button>
        </form>

        <p
          className="text-white/50 text-sm mt-4 transition-all duration-500"
          style={{ fontFamily: "Quicksand, sans-serif" }}
        >
          {hints[Math.min(attempts, hints.length - 1)]}
        </p>
      </div>
    </div>
  );
};

export default LockedGate;
