import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypewriterText = ({ text, speed = 80, delay = 500, className = "" }: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // Blink cursor then hide
      const timer = setTimeout(() => setShowCursor(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [started, displayed, text, speed]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && started && (
        <span className="animate-pulse ml-0.5">|</span>
      )}
    </span>
  );
};

export default TypewriterText;
