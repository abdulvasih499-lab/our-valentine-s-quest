import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import ShootingStars from "@/components/ShootingStars";

const loveNotes = [
  "I knew you'd say yes!",
  "You've just made me the happiest person in the world.",
  "Can't wait to spend this Valentine's Day — and every day — with you.",
  "You are my today and all of my tomorrows. 💕",
];

const Proposal = () => {
  const [noPos, setNoPos] = useState({ x: 50, y: 80 });
  const [noScale, setNoScale] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Cycle love notes after acceptance
  useEffect(() => {
    if (!accepted) return;
    const interval = setInterval(() => {
      setNoteIndex((i) => (i + 1) % loveNotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [accepted]);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width - 100;
    const maxY = rect.height - 40;
    setNoPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
    setNoScale((s) => Math.max(0.5, s - 0.08)); // Shrinks each time!
  }, []);

  const fireConfetti = () => {
    const heart = confetti.shapeFromPath({
      path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 26,0 57,18 76,56z",
    });

    const defaults = {
      spread: 360,
      ticks: 120,
      gravity: 0.3,
      decay: 0.94,
      startVelocity: 25,
      shapes: [heart],
      colors: ["#e8315b", "#ff6b8a", "#ff9ab5", "#ffc2d4", "#fff", "#ffb3c6"],
    };

    // Massive multi-wave confetti
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({ ...defaults, particleCount: 80, scalar: 2, origin: { x: Math.random(), y: Math.random() * 0.5 } });
        confetti({ ...defaults, particleCount: 40, scalar: 3, origin: { x: Math.random(), y: Math.random() * 0.5 } });
      }, i * 400);
    }

    // Side cannons
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } });
      confetti({ ...defaults, particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } });
    }, 200);
  };

  const handleYes = () => {
    setAccepted(true);
    fireConfetti();
  };

  if (accepted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
        <ShootingStars />
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl border border-primary/20 relative z-10 animate-scale-in">
          <div className="text-7xl mb-6 animate-bounce">💖</div>
          <h2 className="text-5xl md:text-6xl text-primary mb-6">Yay!!!</h2>
          <div className="min-h-[80px] flex items-center justify-center">
            <p
              key={noteIndex}
              className="text-muted-foreground text-lg leading-relaxed animate-fade-in"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            >
              {loveNotes[noteIndex]}
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-4 text-4xl">
            {["🥰", "✨", "🌹", "💌", "🦋"].map((e, i) => (
              <span
                key={i}
                className="animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {e}
              </span>
            ))}
          </div>

          {/* Scratch message */}
          <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl">
            <p className="text-primary text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Forever & Always — Your Valentine 💕
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center px-6 py-16 transition-all duration-1000 relative overflow-hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      <ShootingStars />

      <div className="text-center max-w-lg w-full relative z-10">
        <div className="text-6xl mb-4 animate-bounce">💝</div>
        <h2 className="text-5xl md:text-7xl text-primary mb-4">
          Will you be my Valentine?
        </h2>
        <p
          className="text-muted-foreground text-xl mb-12"
          style={{ fontFamily: "Quicksand, sans-serif" }}
        >
          This is the most important question... 💕
        </p>

        <div
          ref={containerRef}
          className="relative mx-auto"
          style={{ height: "220px" }}
        >
          {/* YES button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleYes}
              className="px-14 py-5 text-2xl rounded-full bg-gradient-to-r from-primary to-[hsl(var(--raspberry))] text-primary-foreground font-bold shadow-2xl hover:scale-110 active:scale-95 transition-all animate-pulse-glow"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            >
              YES! 💖
            </button>
          </div>

          {/* Evasive NO button - shrinks each attempt */}
          <button
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            className="absolute px-5 py-2 rounded-full bg-muted text-muted-foreground text-sm transition-all duration-300 hover:bg-muted/50"
            style={{
              fontFamily: "Quicksand, sans-serif",
              left: `${noPos.x}px`,
              top: `${noPos.y}px`,
              transform: `scale(${noScale})`,
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
