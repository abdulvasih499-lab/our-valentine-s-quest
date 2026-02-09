import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 16 + 8,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.left}%`,
            bottom: "-20px",
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `float-heart ${heart.duration}s ease-in ${heart.delay}s infinite`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
