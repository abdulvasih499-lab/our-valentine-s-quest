import { useEffect, useRef, useState } from "react";

interface MilestoneProps {
  image: string;
  title: string;
  caption: string;
  variant: "polaroid" | "circle" | "polaroid-alt";
  index: number;
  emoji: string;
}

const Milestone = ({ image, title, caption, variant, index, emoji }: MilestoneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  const renderImage = () => {
    if (variant === "circle") {
      return (
        <div className="relative group">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto transition-transform duration-700 group-hover:scale-105">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          {/* Decorative ring */}
          <div className="absolute inset-0 w-56 h-56 md:w-72 md:h-72 mx-auto rounded-full border-2 border-primary/20 scale-110 animate-pulse" />
        </div>
      );
    }
    const rotation = variant === "polaroid" ? "-rotate-3" : "rotate-3";
    return (
      <div className={`bg-white p-3 pb-14 shadow-2xl ${rotation} mx-auto max-w-xs md:max-w-sm transition-transform duration-700 hover:rotate-0 hover:scale-105 cursor-pointer group`}>
        <img src={image} alt={title} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        <p className="absolute bottom-4 left-0 right-0 text-center text-muted-foreground text-sm italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
          {emoji} {title}
        </p>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`py-12 md:py-20 px-6 transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${200}ms` }}
    >
      <div className={`max-w-2xl mx-auto flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}>
        <div className="flex-shrink-0">
          {renderImage()}
        </div>
        <div className={`text-center ${isEven ? "md:text-left" : "md:text-right"} space-y-4`}>
          <div className="text-4xl">{emoji}</div>
          <h2 className="text-4xl md:text-5xl text-primary">{title}</h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed" style={{ fontFamily: "Quicksand, sans-serif" }}>
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Milestone;
