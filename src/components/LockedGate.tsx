import { useState } from "react";
import gateBg from "@/assets/gate-bg.jpg";

interface LockedGateProps {
  onUnlock: () => void;
}

const LockedGate = ({ onUnlock }: LockedGateProps) => {
  const [password, setPassword] = useState("");
  const [shaking, setShaking] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === "pizza") {
      setUnlocking(true);
      setTimeout(onUnlock, 1200);
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        unlocking ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={gateBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-md w-full">
        <h1 className="text-5xl md:text-7xl text-white mb-2 drop-shadow-lg">
          Valentine's Quest
        </h1>
        <p className="text-white/80 text-lg mb-8 font-light" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          💕 A journey made for two 💕
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={shaking ? "animate-shake" : ""}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Our favorite secret word..."
              className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 text-center text-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              style={{ fontFamily: 'Quicksand, sans-serif' }}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-full bg-primary text-primary-foreground text-lg font-semibold hover:opacity-90 transition-all animate-pulse-glow"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            Unlock Our Story 🔓
          </button>
        </form>

        <p className="text-white/50 text-sm mt-4" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          Hint: Our favorite secret word
        </p>
      </div>
    </div>
  );
};

export default LockedGate;
