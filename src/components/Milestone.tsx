import { useEffect, useRef, useState } from "react";

interface MilestoneProps {
  image: string;
  title: string;
  caption: string;
  variant: "polaroid" | "circle" | "polaroid-alt";
  index: number;
}

const Milestone = ({ image, title, caption, variant, index }: MilestoneProps) => {
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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const renderImage = () => {
    if (variant === "circle") {
      return (
        <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      );
    }
    // polaroid style
    const rotation = variant === "polaroid" ? "-rotate-2" : "rotate-2";
    return (
      <div className={`bg-white p-3 pb-12 shadow-xl ${rotation} mx-auto max-w-xs md:max-w-sm`}>
        <img src={image} alt={title} className="w-full aspect-square object-cover" />
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`py-16 md:py-24 px-6 transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="max-w-lg mx-auto text-center space-y-6">
        {renderImage()}
        <h2 className="text-4xl md:text-5xl text-primary mt-6">{title}</h2>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          {caption}
        </p>
      </div>
    </div>
  );
};

export default Milestone;
