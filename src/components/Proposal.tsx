import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const Proposal = () => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [visible, setVisible] = useState(false);
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
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width - 120;
    const maxY = rect.height - 50;
    setNoPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  }, []);

  const fireConfetti = () => {
    const heart = confetti.shapeFromPath({
      path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 26,0 57,18 76,56z",
    });

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.4,
      decay: 0.94,
      startVelocity: 20,
      shapes: [heart],
      colors: ["#e8315b", "#ff6b8a", "#ff9ab5", "#ffc2d4", "#fff"],
    };

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({ ...defaults, particleCount: 60, scalar: 2 });
        confetti({ ...defaults, particleCount: 30, scalar: 3 });
      }, i * 300);
    }
  };

  const handleYes = () => {
    setAccepted(true);
    fireConfetti();
  };

  if (accepted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl border border-primary/20 animate-scale-in">
          <div className="text-6xl mb-4">💖</div>
          <h2 className="text-4xl md:text-5xl text-primary mb-4">Yay!!!</h2>
          <p
            className="text-muted-foreground text-lg leading-relaxed"
            style={{ fontFamily: "Quicksand, sans-serif" }}
          >
            I knew you'd say yes! You've just made me the happiest person in the
            world. Can't wait to spend this Valentine's Day — and every day —
            with you. 💕
          </p>
          <div className="mt-6 text-3xl">🥰✨🌹</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center px-6 py-16 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      <div className="text-center max-w-lg w-full">
        <h2 className="text-5xl md:text-7xl text-primary mb-8">
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
          style={{ height: "200px" }}
        >
          {/* YES button - centered */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleYes}
              className="px-12 py-4 text-2xl rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:scale-110 transition-transform animate-pulse-glow"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            >
              YES! 💖
            </button>
          </div>

          {/* NO button - evasive */}
          <button
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            className="absolute px-6 py-2 rounded-full bg-muted text-muted-foreground text-sm transition-all duration-200"
            style={{
              fontFamily: "Quicksand, sans-serif",
              left: `${noPos.x}px`,
              top: `${noPos.y + 60}px`,
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
