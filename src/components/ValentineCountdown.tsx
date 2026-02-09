import { useState, useEffect } from "react";

const ValentineCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const getNextValentines = () => {
      const now = new Date();
      let year = now.getFullYear();
      let vday = new Date(year, 1, 14); // Feb 14
      if (now > vday) {
        // Check if it's Valentine's Day
        if (now.getMonth() === 1 && now.getDate() === 14) {
          setIsPast(false);
          return vday;
        }
        vday = new Date(year + 1, 1, 14);
      }
      return vday;
    };

    const update = () => {
      const now = new Date();
      const target = getNextValentines();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0 && now.getMonth() === 1 && now.getDate() === 14) {
        setIsPast(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/60 backdrop-blur-md rounded-2xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg border border-primary/10">
        <span
          className="text-2xl md:text-3xl font-bold text-primary"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="text-xs md:text-sm text-muted-foreground mt-2"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );

  if (isPast) {
    return (
      <div className="text-center py-12">
        <h3 className="text-3xl md:text-4xl text-primary mb-2">
          Happy Valentine's Day! 💕
        </h3>
        <p className="text-muted-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          Today is our special day ✨
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12 px-6">
      <h3 className="text-3xl md:text-4xl text-primary mb-6">
        Counting Down to Our Day 💕
      </h3>
      <div className="flex justify-center gap-3 md:gap-5">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Mins" />
        <TimeBlock value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

export default ValentineCountdown;
